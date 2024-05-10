import { Advisor, Grade, SchoolYear, Section } from "@prisma/client";
import { z } from "zod";

export type GradeData = Grade & {
  school_year: SchoolYear;
};

export type SectionData = Section & {
  school_year: SchoolYear;
  grade: Grade;
  advisor: Advisor & {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
    section: Section;
  };
};

export const createGradeSchema = z.object({
  school_year_id: z.number(),
  grade: z.string().min(1, { message: "Grade is required" }),
});

export type CreateGradePayload = z.infer<typeof createGradeSchema>;

export const updateGradeSchema = z.object({
  id: z.number(),
  grade: z.string().min(1, { message: "Grade is required" }),
});

export type UpdateGradePayload = z.infer<typeof updateGradeSchema>;

export const deleteGradeSchema = z.object({
  id: z.number(),
});

export type DeleteGradePayload = z.infer<typeof deleteGradeSchema>;

export const createSectionSchema = z.object({
  school_year_id: z.number(),
  grade_id: z.string().min(1, { message: "Grade is required" }),
  section: z.string().min(1, { message: "Section is required" }),
  advisor_id: z.string().nullable(),
});

export type CreateSectionPayload = z.infer<typeof createSectionSchema>;

export const updateSectionSchema = z.object({
  id: z.number(),
  grade_id: z.string().min(1, { message: "Grade is required" }),
  section: z.string().min(1, { message: "Section is required" }),
  advisor_id: z.string().nullable(),
});

export type UpdateSectionPayload = z.infer<typeof updateSectionSchema>;

export const deleteSectionSchema = z.object({
  id: z.number(),
});

export type DeleteSectionPayload = z.infer<typeof deleteSectionSchema>;
