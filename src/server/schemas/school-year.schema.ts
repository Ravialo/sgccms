import { z } from "zod";

export const createSchoolYearSchema = z.object({
  year: z.string().min(1, { message: "School year is required" }),
  default: z.string().min(1, { message: "Default Option is required" }),
});

export type CreateSchoolYearPayload = z.infer<typeof createSchoolYearSchema>;

export const updateSchoolYearSchema = z.object({
  id: z.number(),
  year: z.string().min(1, { message: "School year is required" }),
  default: z.string().min(1, { message: "Default Option is required" }),
});

export type UpdateSchoolYearPayload = z.infer<typeof updateSchoolYearSchema>;

export const deleteSchoolYearSchema = z.object({
  id: z.number(),
});

export type DeleteSchoolYearPayload = z.infer<typeof deleteSchoolYearSchema>;
