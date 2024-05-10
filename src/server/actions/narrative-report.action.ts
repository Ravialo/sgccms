"use server";

import { Prisma } from "@prisma/client";
import { render } from "@react-email/render";
import { revalidatePath } from "next/cache";

import CounselorCreateNarrative from "@/components/emails/counselor-create-narrative";
import { EMAILS } from "@/contants";
import db from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { convertTo12HourFormat, formatDate, handleError } from "@/lib/utils";

import {
  CreateNarrativeReportPayload,
  createNarrativeReportSchema,
  DeleteNarrativeReportPayload,
  deleteNarrativeReportSchema,
  NarrativeReportData,
  UpdateNarrativeReportPayload,
  updateNarrativeReportSchema,
} from "../schemas/narrative-report.schema";
import { getSession } from "./auth.action";
import { getUsers } from "./user.action";

const narrativeReportInclude: Prisma.NarrativeReportInclude = {
  school_year: true,
  user: true,
  student: true,
  appointment: true,
  complaint: true,
  narrativeReportParties: {
    include: {
      student: {
        include: {
          grade: true,
          section: true,
        },
      },
    },
  },
};

type GetNarrativeReportsFilter = Prisma.NarrativeReportWhereInput;

export const getNarrativeReports = async (filter?: GetNarrativeReportsFilter) => {
  const query: GetNarrativeReportsFilter = {
    ...filter,
    deleted: false,
  };

  const narrativeReports = await db.narrativeReport.findMany({
    where: query,
    orderBy: {
      created_at: "desc",
    },
    include: narrativeReportInclude,
  });

  revalidatePath("/dashboard");

  return narrativeReports as unknown as NarrativeReportData[];
};

export const getNarrativeReportById = async (id: number) => {
  const narrativeReport = await db.narrativeReport.findUnique({
    where: { id },
    include: narrativeReportInclude,
  });

  revalidatePath("/dashboard");
  return narrativeReport as unknown as NarrativeReportData;
};

export const createNarrativeReport = async (payload: CreateNarrativeReportPayload) => {
  const session = await getSession();
  if (!session) {
    return handleError("Unauthorized");
  }

  const schema = createNarrativeReportSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const narrativeReportData: Prisma.NarrativeReportCreateInput = {
    school_year: {
      connect: { id: data.school_year_id },
    },
    user: {
      connect: { id: session.id },
    },
    student: {
      connect: { id: data.student_id },
    },
    case_report_no: data.case_report_no,
    incident: data.incident,
    reported_by: data.reported_by,
    date_reported: data.date_reported,
    time_reported: data.time_reported,
    detail_of_event: data.detail_of_event,
    action_taken: data.action_taken,
    summary: data.summary,
  };

  if (data.appointment_id) {
    const appointment = await db.narrativeReport.findFirst({
      where: { appointment_id: data.appointment_id, deleted: false },
    });

    if (appointment) {
      return handleError("Narrative report already created on this appointment.");
    } else {
      narrativeReportData.appointment = {
        connect: { id: data.appointment_id },
      };
    }
  }

  if (data.complaint_id) {
    const complaint = await db.narrativeReport.findFirst({
      where: { complaint_id: data.complaint_id, deleted: false },
    });

    if (complaint) {
      return handleError("Narrative report already created on this complaint.");
    } else {
      narrativeReportData.complaint = {
        connect: { id: data.complaint_id },
      };
    }
  }

  const narrativeReport = await db.narrativeReport.create({
    data: narrativeReportData,
    include: narrativeReportInclude,
  });

  if (data.parties && data.parties.length > 0) {
    await db.narrativeReportParty.createMany({
      data: data.parties.map((party) => ({
        narrative_report_id: narrativeReport.id,
        student_id: party,
      })),
    });
  }

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
        CounselorCreateNarrative({
          principalName: `${principal.first_name} ${principal.last_name}`,
          type: narrativeReport.appointment_id ? "Appointment" : "Complaint",
          counselorName: `${narrativeReport.user.first_name} ${narrativeReport.user.last_name}`,
          reportedBy: narrativeReport.reported_by,
          incident: narrativeReport.incident,
          date: formatDate(narrativeReport.date_reported, "MM/DD/YYYY"),
          time: convertTo12HourFormat(narrativeReport.time_reported),
        })
      );
      await sendEmail({
        to: principal.email!,
        subject: EMAILS.counselorCreateNarrative.subject,
        html,
      });
    }
  }

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Narrative Report created successfully",
  };
};

export const updateNarrativeReportById = async (payload: UpdateNarrativeReportPayload) => {
  const schema = updateNarrativeReportSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const narrativeReport = await db.narrativeReport.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!narrativeReport) {
    return handleError("Narrative Report ID not found");
  }

  await db.narrativeReport.update({
    where: { id: data.id },
    data: {
      incident: data.incident,
      date_reported: data.date_reported,
      time_reported: data.time_reported,
      detail_of_event: data.detail_of_event,
      action_taken: data.action_taken,
      summary: data.summary,
    },
  });

  if (data.parties && data.parties.length > 0) {
    await db.narrativeReportParty.deleteMany({
      where: { narrative_report_id: data.id },
    });
    await db.narrativeReportParty.createMany({
      data: data.parties.map((party) => ({
        narrative_report_id: narrativeReport.id,
        student_id: party,
      })),
    });
  }

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Narrative Report updated successfully",
  };
};

export const deleteNarrativeReportById = async (payload: DeleteNarrativeReportPayload) => {
  const schema = deleteNarrativeReportSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  await db.narrativeReport.delete({
    where: { id: data.id },
  });

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Narrative Report deleted successfully",
  };
};
