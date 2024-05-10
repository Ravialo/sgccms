import { Complaint, Grade, SchoolYear, Section, Student, User } from "@prisma/client";
import { z } from "zod";

export type ComplaintData = Complaint & {
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
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    last_name: string;
    first_name: string;
  };
};

export const createComplaintSchema = z.object({
  student_id: z.number(),
  place: z.string().min(1, { message: "Place is required" }),
  what_happened: z.string().min(1, { message: "This is required" }),
  what_behavior: z.string().optional(),
  behavior_reaction: z.string().optional(),
  learner_reaction: z.string().optional(),
  recommendation: z.string().optional(),
});

export type CreateComplaintPayload = z.infer<typeof createComplaintSchema>;

export const updateComplaintSchema = z.object({
  id: z.number(),
  place: z.string().min(1, { message: "Place is required" }),
  what_happened: z.string().min(1, { message: "This is required" }),
  what_behavior: z.string().min(1, { message: "This is required" }),
  behavior_reaction: z.string().min(1, { message: "This is required" }),
  learner_reaction: z.string().min(1, { message: "This is required" }),
  recommendation: z.string().min(1, { message: "This is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});

export type UpdateComplaintPayload = z.infer<typeof updateComplaintSchema>;
