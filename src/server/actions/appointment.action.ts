"use server";

import { AppointmentStatus, Prisma } from "@prisma/client";
import { render } from "@react-email/render";
import { revalidatePath } from "next/cache";

import CounselorRequestAppointment from "@/components/emails/counselor-request-appointment";
import CounselorSetAppointmentDate from "@/components/emails/counselor-set-appointment-date";
import CounselorUpdateAppointmentStatus from "@/components/emails/counselor-update-appointment-status";
import StudentAppointment from "@/components/emails/student-request-appointment";
import { EMAILS } from "@/contants";
import db from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { formatDate, handleError } from "@/lib/utils";

import {
  AppointmentData,
  CreateAppointmentPayload,
  createAppointmentSchema,
  UpdateAppointmentPayload,
  updateAppointmentSchema,
} from "../schemas/appointment.schema";
import { getSession } from "./auth.action";
import { getDefaultSchoolYear } from "./school-year.action";
import { getUsers } from "./user.action";

const appointmentInclude: Prisma.AppointmentInclude = {
  user: {
    select: {
      id: true,
      username: true,
      role: true,
      first_name: true,
      last_name: true,
    },
  },
  school_year: true,
  student: {
    include: {
      school_year: true,
      grade: true,
      section: true,
      user: true,
    },
  },
};

export async function createAppointment(payload: CreateAppointmentPayload) {
  const session = await getSession();
  if (!session) {
    return handleError("Unauthorized");
  }

  const schoolYear = await getDefaultSchoolYear();
  if (!schoolYear) {
    return handleError("No default school year found");
  }

  const schema = createAppointmentSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const appointmentData: Prisma.AppointmentCreateInput = {
    user: {
      connect: { id: session.id },
    },
    school_year: {
      connect: { id: schoolYear.id },
    },
    student: {
      connect: { id: data.student_id },
    },
    contact_no: data.contact_no,
    purpose: data.purpose,
    purpose_details: data.purpose_details,
  };

  if (data.date) {
    appointmentData.date = new Date(data.date);
  }

  if (data.status) {
    appointmentData.status = data.status as AppointmentStatus;
  }

  const newAppointment = (await db.appointment.create({
    data: appointmentData,
    include: appointmentInclude,
  })) as unknown as AppointmentData;

  if (newAppointment.user.role === "student") {
    // SEND EMAIL TO COUNSELOR USERS
    const counselorUsers = await getUsers({
      role: "counselor",
      email: {
        not: null,
      },
    });

    if (counselorUsers.length > 0) {
      for (const counselor of counselorUsers) {
        const html = render(
          StudentAppointment({
            studentName: `${newAppointment.student.first_name} ${newAppointment.student.last_name}`,
            counselorName: `${counselor.first_name} ${counselor.last_name}`,
            gradeSection: `${newAppointment.student.grade.grade} - ${newAppointment.student.section.section}`,
            contactNumber: newAppointment.contact_no,
          })
        );
        await sendEmail({
          to: counselor.email!,
          subject: EMAILS.studentCreateAppointment.subject,
          html,
        });
      }
    }
  } else if (newAppointment.user.role === "counselor") {
    // SEND EMAIL TO STUDENT USER
    const html = render(
      CounselorRequestAppointment({
        studentName: `${newAppointment.student.first_name} ${newAppointment.student.last_name}`,
        counselorName: `${newAppointment.user.first_name} ${newAppointment.user.last_name}`,
        purpose: newAppointment.purpose,
        purposeDetails: newAppointment.purpose_details || "N/A",
        date: newAppointment.date ? formatDate(newAppointment.date) : "N/A",
      })
    );
    await sendEmail({
      to: newAppointment.student.user.email!,
      subject: EMAILS.counselorRequestAppointment.subject,
      html,
    });
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Appointment created successfully",
  };
}

export type GetAppointmentsFilter = Prisma.AppointmentWhereInput;

export async function getAppointments(filter?: GetAppointmentsFilter) {
  const query: Prisma.AppointmentWhereInput = {
    ...filter,
    deleted: false,
  };

  if (filter?.school_year_id) {
    query.school_year_id = filter?.school_year_id;
  }

  if (filter?.student_id) {
    query.student_id = filter?.student_id;
  }

  if (filter?.user_id) {
    query.user_id = filter?.user_id;
  }

  const items = await db.appointment.findMany({
    where: query,
    orderBy: {
      id: "desc",
    },
    include: appointmentInclude,
  });

  revalidatePath("/dashboard");
  return items as unknown as AppointmentData[];
}

export async function getAppointmentById(id: number) {
  const appointment = await db.appointment.findUnique({
    where: { id },
    include: appointmentInclude,
  });

  revalidatePath("/dashboard");
  return appointment as unknown as AppointmentData;
}

export async function updateAppointment(payload: UpdateAppointmentPayload) {
  const session = await getSession();

  const schema = updateAppointmentSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const appointment = await db.appointment.findUnique({
    where: { id: data.id },
  });

  if (!appointment) {
    return handleError("Appointment not found");
  }

  if (session && session.role === "student" && appointment.status !== "open") {
    return handleError("Invalid request! Appointment was already in pending or closed status");
  }

  const appointmentData: Prisma.AppointmentUpdateInput = {
    contact_no: data.contact_no,
    purpose: data.purpose,
    purpose_details: data.purpose_details,
    status: data.status as AppointmentStatus,
  };

  if (data.date) {
    appointmentData.date = new Date(data.date);
  }

  const updatedAppointment = (await db.appointment.update({
    where: {
      id: data.id,
    },
    data: appointmentData,
    include: appointmentInclude,
  })) as unknown as AppointmentData;

  // SEND EMAIL TO STUDENT USER IF COUNSELOR SET APPOINTMENT DATE
  if (!appointment.date && updatedAppointment.date) {
    const html = render(
      CounselorSetAppointmentDate({
        studentName: `${updatedAppointment.student.first_name} ${updatedAppointment.student.last_name}`,
        purpose: updatedAppointment.purpose,
        purposeDetails: updatedAppointment.purpose_details || "N/A",
        date: updatedAppointment.date ? formatDate(updatedAppointment.date) : "N/A",
        status: updatedAppointment.status.toUpperCase(),
      })
    );
    await sendEmail({
      to: updatedAppointment.student.user.email!,
      subject: EMAILS.counselorSetAppointmentDate.subject,
      html,
    });
  }

  // SEND EMAIL TO STUDENT USER IF COUNSELOR UPDATE STATUS
  if (appointment.status !== updatedAppointment.status) {
    const html = render(
      CounselorUpdateAppointmentStatus({
        studentName: `${updatedAppointment.student.first_name} ${updatedAppointment.student.last_name}`,
        purpose: updatedAppointment.purpose,
        purposeDetails: updatedAppointment.purpose_details || "N/A",
        date: updatedAppointment.date ? formatDate(updatedAppointment.date) : "N/A",
        status: updatedAppointment.status.toUpperCase(),
      })
    );
    await sendEmail({
      to: updatedAppointment.student.user.email!,
      subject: EMAILS.counselorUpdateAppointmentStatus.subject,
      html,
    });
  }

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Appointment updated successfully",
  };
}
