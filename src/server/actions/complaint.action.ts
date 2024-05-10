"use server";

import { ComplainStatus, Prisma } from "@prisma/client";
import { render } from "@react-email/render";
import { revalidatePath } from "next/cache";

import AdvisorRequestComplaint from "@/components/emails/advisor-request-complaint";
import CounselorUpdateComplaintStatus from "@/components/emails/counselor-update-complaint-status";
import { EMAILS } from "@/contants";
import db from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { handleError } from "@/lib/utils";

import {
  ComplaintData,
  CreateComplaintPayload,
  createComplaintSchema,
  UpdateComplaintPayload,
  updateComplaintSchema,
} from "../schemas/complaint.schema";
import { getSession } from "./auth.action";
import { getDefaultSchoolYear } from "./school-year.action";
import { getUsers } from "./user.action";

const complaintInclude: Prisma.ComplaintInclude = {
  school_year: true,
  student: {
    include: {
      school_year: true,
      grade: true,
      section: true,
      user: true,
    },
  },
  user: {
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      first_name: true,
      last_name: true,
    },
  },
};

export type GetComplaintsFilter = Prisma.ComplaintWhereInput;

export async function getComplaints(filter?: GetComplaintsFilter) {
  const query: GetComplaintsFilter = {
    ...filter,
    deleted: false,
  };

  const items = await db.complaint.findMany({
    where: query,
    orderBy: {
      id: "desc",
    },
    include: complaintInclude,
  });

  revalidatePath("/dashboard");
  return items as unknown as ComplaintData[];
}

export async function getComplaintById(id: number) {
  const complaint = await db.complaint.findUnique({
    where: { id },
    include: complaintInclude,
  });

  revalidatePath("/dashboard");
  return complaint as unknown as ComplaintData;
}

export async function createComplaint(payload: CreateComplaintPayload) {
  const session = await getSession();
  if (!session) {
    return handleError("Unauthorized");
  }

  const schoolYear = await getDefaultSchoolYear();
  if (!schoolYear) {
    return handleError("No default school year found");
  }

  const schema = createComplaintSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const newComplaint = (await db.complaint.create({
    data: {
      school_year: {
        connect: { id: schoolYear.id },
      },
      user: {
        connect: { id: session.id },
      },
      student: {
        connect: { id: data.student_id },
      },
      place: data.place,
      what_happened: data.what_happened,
      what_behavior: data.what_behavior,
      behavior_reaction: data.behavior_reaction,
      learner_reaction: data.learner_reaction,
      recommendation: data.recommendation,
    },
    include: complaintInclude,
  })) as unknown as ComplaintData;

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
        AdvisorRequestComplaint({
          advisorName: `${newComplaint.user.first_name} ${newComplaint.user.last_name}`,
          counselorName: `${counselor.first_name} ${counselor.last_name}`,
          studentName: `${newComplaint.student.first_name} ${newComplaint.student.last_name}`,
          gradeSection: `${newComplaint.student.grade.grade} - ${newComplaint.student.section.section}`,
          place: newComplaint.place,
          whatHappened: newComplaint.what_happened,
        })
      );
      await sendEmail({
        to: counselor.email!,
        subject: EMAILS.advisorCreateComplaint.subject,
        html,
      });
    }
  }

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Complaint created successfully",
  };
}

export async function updateComplaint(payload: UpdateComplaintPayload) {
  const session = await getSession();

  const schema = updateComplaintSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const complaint = await db.complaint.findUnique({
    where: { id: data.id },
  });

  if (!complaint) {
    return handleError("Complaint not found");
  }

  if (session && session.role === "advisor" && complaint.status !== "open") {
    return handleError("Invalid request! Complaint was already in pending or closed status");
  }

  if (complaint.status !== "open" && data.status === "open") {
    return handleError("Unable to open complaint that was already processed");
  }

  const updatedComplaint = (await db.complaint.update({
    where: {
      id: data.id,
    },
    data: {
      place: data.place,
      what_happened: data.what_happened,
      what_behavior: data.what_behavior,
      behavior_reaction: data.behavior_reaction,
      learner_reaction: data.learner_reaction,
      recommendation: data.recommendation,
      status: data.status as ComplainStatus,
    },
    include: complaintInclude,
  })) as unknown as ComplaintData;

  // SEND EMAIL TO ADVISOR USER IF COUNSELOR UPDATE STATUS
  if (complaint.status !== updatedComplaint.status) {
    const html = render(
      CounselorUpdateComplaintStatus({
        advisorName: `${updatedComplaint.user.first_name} ${updatedComplaint.user.last_name}`,
        studentName: `${updatedComplaint.student.first_name} ${updatedComplaint.student.last_name}`,
        gradeSection: `${updatedComplaint.student.grade.grade} - ${updatedComplaint.student.section.section}`,
        place: updatedComplaint.place,
        whatHappened: updatedComplaint.what_happened,
        status: updatedComplaint.status.toUpperCase(),
      })
    );
    await sendEmail({
      to: updatedComplaint.user.email!,
      subject: EMAILS.counselorUpdateComplaintStatus.subject,
      html,
    });
  }

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Complaint updated successfully",
  };
}
