import { NarrativeReport, NarrativeReportParty, SchoolYear } from "@prisma/client";
import { z } from "zod";

import { AppointmentData } from "./appointment.schema";
import { ComplaintData } from "./complaint.schema";
import { StudentData } from "./student.schema";
import { UserData } from "./user.schema";

export type NarrativeReportData = NarrativeReport & {
  school_year: SchoolYear;
  user: UserData;
  student: StudentData;
  appointment?: AppointmentData;
  complaint?: ComplaintData;
  narrativeReportParties: NarrativeReportParty &
    {
      student: StudentData;
    }[];
};

export const createNarrativeReportSchema = z.object({
  school_year_id: z.number(),
  student_id: z.number(),
  appointment_id: z.number().optional(),
  complaint_id: z.number().optional(),
  case_report_no: z.string().min(1, { message: "Case Report No is required" }),
  incident: z.string().min(1, { message: "Incident is required" }),
  reported_by: z.string().min(1, { message: "Reported By is required" }),
  date_reported: z.string().min(1, { message: "Date Reported is required" }),
  time_reported: z.string().min(1, { message: "Time Reported is required" }),
  detail_of_event: z.string().min(1, { message: "Detail of Event is required" }),
  action_taken: z.string().min(1, { message: "Action Taken is required" }),
  summary: z.string().min(1, { message: "Summary is required" }),
  parties: z.array(z.number()).optional(),
});

export type CreateNarrativeReportPayload = z.infer<typeof createNarrativeReportSchema>;

export const updateNarrativeReportSchema = z.object({
  id: z.number(),
  incident: z.string().min(1, { message: "Incident is required" }),
  date_reported: z.string().min(1, { message: "Date Reported is required" }),
  time_reported: z.string().min(1, { message: "Time Reported is required" }),
  detail_of_event: z.string().min(1, { message: "Detail of Event is required" }),
  action_taken: z.string().min(1, { message: "Action Taken is required" }),
  summary: z.string().min(1, { message: "Summary is required" }),
  parties: z.array(z.number()).optional(),
});

export type UpdateNarrativeReportPayload = z.infer<typeof updateNarrativeReportSchema>;

export const deleteNarrativeReportSchema = z.object({
  id: z.number(),
});

export type DeleteNarrativeReportPayload = z.infer<typeof deleteNarrativeReportSchema>;
