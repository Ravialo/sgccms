import { Grade, SchoolYear, Section, Student, User } from "@prisma/client";
import { z } from "zod";

export type StudentData = Student & {
  school_year: SchoolYear;
  grade: Grade;
  section: Section;
  user: User;
};

export const importStudentSchema = z.object({
  school_year: z.string().min(1, { message: "School Year is required" }),
  lrn_no: z.string().min(1, { message: "School Year is required" }),
  first_name: z.string().min(1, { message: "First Name is required" }),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, { message: "Last Name is required" }),
  suffix: z.string().optional(),
  gender: z.string().min(1, { message: "Gender is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  grade: z.string().min(1, { message: "Grade is required" }),
  section: z.string().min(1, { message: "Section is required" }),
});

export type ImportStudentPayload = z.infer<typeof importStudentSchema>;

export const addStudentSchema = z.object({
  lrn_no: z.string().min(1, { message: "School Year is required" }),
  first_name: z.string().min(1, { message: "First Name is required" }),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, { message: "Last Name is required" }),
  suffix: z.string().optional(),
  gender: z.string().min(1, { message: "Gender is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  grade_id: z.string().min(1, { message: "Grade is required" }),
  section_id: z.string().min(1, { message: "Section is required" }),
});

export type AddStudentPayload = z.infer<typeof addStudentSchema>;

export const updateStudentSchema = z.object({
  id: z.number(),
  lrn_no: z.string().min(1, { message: "LRN No is required" }),
  first_name: z.string().min(1, { message: "First Name is required" }),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, { message: "Last Name is required" }),
  suffix: z.string().optional(),
  gender: z.string().min(1, { message: "Gender is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  grade_id: z.string().min(1, { message: "Grade is required" }),
  section_id: z.string().min(1, { message: "Section is required" }),
});

export type UpdateStudentPayload = z.infer<typeof updateStudentSchema>;
