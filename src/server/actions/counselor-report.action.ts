"use server";

import { Prisma } from "@prisma/client";
import { render } from "@react-email/render";
import { revalidatePath } from "next/cache";

import CounselorCreateCounselor from "@/components/emails/counselor-create-counselor";
import { EMAILS } from "@/contants";
import db from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { formatDate, handleError } from "@/lib/utils";

import {
  CounselorReportData,
  CreateCounselorReportPayload,
  createCounselorReportSchema,
  DeleteCounselorReportPayload,
  deleteCounselorReportSchema,
  UpdateCounselorReportPayload,
  updateCounselorReportSchema,
} from "../schemas/counselor-report.schema";
import { getSession } from "./auth.action";
import { getUsers } from "./user.action";

const counselorReportInclude: Prisma.CounselorReportInclude = {
  school_year: true,
  user: true,
  student: {
    include: {
      grade: true,
      section: true,
    },
  },
  appointment: true,
  complaint: true,
};

export type GetCounselorReportsFilter = Prisma.CounselorReportWhereInput;

export const getCounselorReports = async (filter?: GetCounselorReportsFilter) => {
  const query: GetCounselorReportsFilter = {
    ...filter,
    deleted: false,
  };

  const counselorReports = await db.counselorReport.findMany({
    where: query,
    include: counselorReportInclude,
  });

  revalidatePath("/dashboard");
  return counselorReports as unknown as CounselorReportData[];
};

export const getCounselorReportById = async (id: number) => {
  const counselorReport = await db.counselorReport.findUnique({
    where: { id },
    include: counselorReportInclude,
  });

  revalidatePath("/dashboard");
  return counselorReport as unknown as CounselorReportData;
};

export const createCounselorReport = async (payload: CreateCounselorReportPayload) => {
  const session = await getSession();
  if (!session) {
    return handleError("Unauthorized");
  }

  const schema = createCounselorReportSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const counselorReportData: Prisma.CounselorReportCreateInput = {
    school_year: {
      connect: { id: data.school_year_id },
    },
    user: {
      connect: { id: session.id },
    },
    student: {
      connect: { id: data.student_id },
    },
    summary: data.summary,
    recommendations: data.recommendations,
  };

  if (data.appointment_id) {
    const appointment = await db.counselorReport.findFirst({
      where: { appointment_id: data.appointment_id, deleted: false },
    });

    if (appointment) {
      return handleError("Counselor report already created on this appointment.");
    } else {
      counselorReportData.appointment = {
        connect: { id: data.appointment_id },
      };
    }
  }

  if (data.complaint_id) {
    const complaint = await db.counselorReport.findFirst({
      where: { complaint_id: data.complaint_id, deleted: false },
    });

    if (complaint) {
      return handleError("Counselor report already created on this complaint.");
    } else {
      counselorReportData.complaint = {
        connect: { id: data.complaint_id },
      };
    }
  }

  const counselorReport = await db.counselorReport.create({
    data: counselorReportData,
    include: counselorReportInclude,
  });

  // SEND EMAIL TO PRINCIPAL USERS
  const principalUsers = await getUsers({
    role: "principal",
    email: {
      not: null,
    },
  });

  if (principalUsers.length > 0) {
    for (const principal of principalUsers) {
      const html = render(
        CounselorCreateCounselor({
          principalName: `${principal.first_name} ${principal.last_name}`,
          type: counselorReport.appointment_id ? "Appointment" : "Complaint",
          counselorName: `${counselorReport.user.first_name} ${counselorReport.user.last_name}`,
          date: formatDate(counselorReport.created_at, "MM/DD/YYYY"),
          summary: counselorReport.summary,
          recommendations: counselorReport.recommendations,
        })
      );

      await sendEmail({
        to: principal.email!,
        subject: EMAILS.counselorCreateCounselor.subject,
        html,
      });
    }
  }

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Counselor Report created successfully",
  };
};

export const updateCounselorReportById = async (payload: UpdateCounselorReportPayload) => {
  const schema = updateCounselorReportSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const counselorReport = await db.counselorReport.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!counselorReport) {
    return handleError("Counselor Report ID not found");
  }

  await db.counselorReport.update({
    where: { id: data.id },
    data: {
      summary: data.summary,
      recommendations: data.recommendations,
    },
  });

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Counselor Report updated successfully",
  };
};

export const deleteCounselorReportById = async (payload: DeleteCounselorReportPayload) => {
  const schema = deleteCounselorReportSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  await db.counselorReport.delete({
    where: { id: data.id },
  });

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Counselor Report deleted successfully",
  };
};
