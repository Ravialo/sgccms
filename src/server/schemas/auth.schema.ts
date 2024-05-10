import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type SignInPayload = z.infer<typeof signInSchema>;

export const forgotSendCodeSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
});

export type ForgotSendCodePayload = z.infer<typeof forgotSendCodeSchema>;

export const forgotResendCodeSchema = z.object({
  token: z.string().min(1, { message: "Token is required" }),
});

export type ForgotResendCodePayload = z.infer<typeof forgotResendCodeSchema>;

export const forgotVerifyCodeSchema = z.object({
  token: z.string().min(1, { message: "Token is required" }),
  code: z
    .string()
    .min(1, { message: "Code is required" })
    .min(6, { message: "Invalid code" })
    .max(6, { message: "Invalid code" }),
});

export type ForgotVerifyCodePayload = z.infer<typeof forgotVerifyCodeSchema>;

export const forgotResetPasswordSchema = z
  .object({
    token: z.string().min(1, { message: "Token is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    confirm_password: z.string().min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
  });

export type ForgotResetPasswordPayload = z.infer<typeof forgotResetPasswordSchema>;
