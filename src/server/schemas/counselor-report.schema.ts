import { CounselorReport, SchoolYear, User } from "@prisma/client";
import { z } from "zod";

import { AppointmentData } from "./appointment.schema";
import { ComplaintData } from "./complaint.schema";
import { StudentData } from "./student.schema";

export type CounselorReportData = CounselorReport & {
  school_year: SchoolYear;
  user: User;
  student: StudentData;
  appointment?: AppointmentData;
  complaint?: ComplaintData;
};

export const createCounselorReportSchema = z.object({
  school_year_id: z.number(),
  student_id: z.number(),
  appointment_id: z.number().optional(),
  complaint_id: z.number().optional(),
  summary: z.string().min(1, { message: "Summary is required" }),
  recommendations: z.string().min(1, { message: "Recommendations is required" }),
});

export type CreateCounselorReportPayload = z.infer<typeof createCounselorReportSchema>;

export const updateCounselorReportSchema = z.object({
  id: z.number(),
  summary: z.string().min(1, { message: "Summary is required" }),
  recommendations: z.string().min(1, { message: "Recommendations is required" }),
});

export type UpdateCounselorReportPayload = z.infer<typeof updateCounselorReportSchema>;

export const deleteCounselorReportSchema = z.object({
  id: z.number(),
});

export type DeleteCounselorReportPayload = z.infer<typeof deleteCounselorReportSchema>;
