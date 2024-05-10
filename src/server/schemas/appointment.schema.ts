import { Appointment, Grade, SchoolYear, Section, Student, UserRole } from "@prisma/client";
import { z } from "zod";

export type AppointmentData = Appointment & {
  user: {
    id: number | null;
    username: string;
    email: string | null;
    role: UserRole;
    first_name: string;
    last_name: string;
  };
  school_year: SchoolYear;
  student: Student & {
    school_year: SchoolYear;
    grade: Grade;
    section: Section;
    user: {
      id: string;
      email: string | null;
    };
  };
};

export const createAppointmentSchema = z.object({
  student_id: z.number(),
  contact_no: z.string().min(1, { message: "Contact No is required" }),
  purpose: z.string().min(1, { message: "Purpose is required" }),
  purpose_details: z.string().optional(),
  date: z.string().optional(),
  status: z.string().min(1, { message: "Please select status" }),
});

export type CreateAppointmentPayload = z.infer<typeof createAppointmentSchema>;

export const updateAppointmentSchema = z.object({
  id: z.number(),
  contact_no: z.string().min(1, { message: "Contact No is required" }),
  purpose: z.string().min(1, { message: "Purpose is required" }),
  purpose_details: z.string().optional(),
  date: z.string().optional(),
  status: z.string().min(1, { message: "Please select status" }),
});

export type UpdateAppointmentPayload = z.infer<typeof updateAppointmentSchema>;
