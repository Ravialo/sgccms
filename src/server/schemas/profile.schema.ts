import { z } from "zod";

export const updateProfileSchema = z.object({
  first_name: z.string().min(1, { message: "First Name is required" }),
  last_name: z.string().min(1, { message: "Last Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().optional(),
});

export type UpdateProfilePayload = z.infer<typeof updateProfileSchema>;

export const updatePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: "Old Password is required" })
      .min(8, { message: "Please input at least 8 characters" }),
    newPassword: z
      .string()
      .min(1, { message: "New Password is required" })
      .min(8, { message: "Please input at least 8 characters" }),
    confirmNewPassword: z.string().min(1, { message: "Confirm New Password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New Passwords don't match",
    path: ["confirmNewPassword"],
  });

export type UpdatePasswordPayload = z.infer<typeof updatePasswordSchema>;
