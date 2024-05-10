"use server";

import { render } from "@react-email/render";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ForgotResetSuccess from "@/components/emails/forgot-reset-success";
import { ForgotPasswordSendCode } from "@/components/emails/forgot-send-code";
import { EMAILS, roles } from "@/contants";
import { comparePassword, decryptToken, encryptToken, hashPassword } from "@/lib/auth";
import db from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { getIP, setRateLimit } from "@/lib/redis";
import { generateRandomCode, handleError } from "@/lib/utils";
import { ActionResponse, TokenUser } from "@/types";

import {
  ForgotResendCodePayload,
  forgotResendCodeSchema,
  ForgotResetPasswordPayload,
  forgotResetPasswordSchema,
  ForgotSendCodePayload,
  forgotSendCodeSchema,
  ForgotVerifyCodePayload,
  forgotVerifyCodeSchema,
  SignInPayload,
  signInSchema,
} from "../schemas/auth.schema";

export async function getSession() {
  const session = cookies().get("Authorization")?.value;
  if (!session) return null;

  const token = await decryptToken<TokenUser>(session);
  if (!token) return null;

  const user = await db.user.findUnique({
    where: {
      id: token.user.id,
    },
    select: {
      id: true,
      role: true,
      username: true,
      first_name: true,
      last_name: true,
      student: true,
      advisor: {
        include: {
          section: true,
        },
      },
    },
  });

  revalidatePath("/dashboard");
  return user;
}

export async function signIn(payload: SignInPayload) {
  const IP = getIP(headers());
  const limitResponse = await setRateLimit({ ip: IP, feature: "Sign-in" });
  if (!limitResponse.success) {
    return handleError(limitResponse.message);
  }

  const schema = signInSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const { username, password } = schema.data;

  const user = await db.user.findUnique({
    where: { username, deleted: false, status: "active" },
  });
  if (!user) {
    return handleError("Incorrect Username or Password");
  }

  const passwordMatched = await comparePassword(password, user.password);
  if (!passwordMatched) {
    return handleError("Incorrect Username or Password");
  }

  const userData = {
    id: user.id,
    role: user.role,
  };
  const expires = Date.now() + 60 * 60 * 24 * 7 * 1000; // One week in milliseconds;
  const session = await encryptToken(
    {
      user: userData,
    },
    { expires }
  );

  // Save the session in a cookie
  cookies().set("Authorization", session, {
    expires,
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  const basePath = roles[user.role].basePath;
  redirect(basePath);
}

export async function signOut() {
  cookies().set("Authorization", "", { expires: new Date(0) });
  redirect("/sign-in");
}

export async function forgotSendCode(payload: ForgotSendCodePayload): Promise<ActionResponse> {
  const IP = getIP(headers());
  const limitResponse = await setRateLimit({ ip: IP, feature: "Forgot Password Verification Code" });
  if (!limitResponse.success) {
    return handleError(limitResponse.message);
  }

  const schema = forgotSendCodeSchema.safeParse(payload);

  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const user = await db.user.findFirst({
    where: { email: data.email, deleted: false, status: "active" },
  });

  if (!user) {
    return handleError("Invalid Email");
  }

  if (user && !user.email) {
    return handleError("Invalid Email");
  }

  const code = generateRandomCode();

  const html = render(ForgotPasswordSendCode({ name: user.first_name!, code }));
  const sendEmailResponse = await sendEmail({
    to: user.email!,
    subject: EMAILS.forgotPasswordSendCode.subject,
    html,
  });

  if (!sendEmailResponse.success) {
    return handleError(sendEmailResponse.message);
  }

  const verifyToken = await encryptToken(
    {
      user_id: user.id,
    },
    { expires: "15m" }
  );

  await db.userResetPassword.deleteMany({ where: { user_id: user.id } });
  await db.userResetPassword.create({
    data: {
      user: {
        connect: { id: user.id },
      },
      code,
      verify_token: verifyToken,
    },
  });

  revalidatePath("/forgot-password");
  return {
    success: true,
    message: "Verification code sent to your email",
    data: {
      verify_token: verifyToken,
    },
  };
}

export async function forgotResendCode(payload: ForgotResendCodePayload): Promise<ActionResponse> {
  const IP = getIP(headers());
  const limitResponse = await setRateLimit({ ip: IP, feature: "Forgot Password Verification Code" });
  if (!limitResponse.success) {
    return handleError(limitResponse.message);
  }

  const schema = forgotResendCodeSchema.safeParse(payload);

  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const decodedToken = await decryptToken<{ user_id: number }>(data.token);

  if (!decodedToken) {
    return handleError("Invalid Token");
  }

  const user = await db.user.findUnique({
    where: { id: decodedToken.user_id },
  });

  if (!user) {
    return handleError("Invalid Email");
  }

  if (user && !user.email) {
    return handleError("Invalid Email");
  }

  const code = generateRandomCode();

  const html = render(ForgotPasswordSendCode({ name: user.first_name!, code }));
  const sendEmailResponse = await sendEmail({
    to: user.email!,
    subject: EMAILS.forgotPasswordSendCode.subject,
    html,
  });

  if (!sendEmailResponse.success) {
    return handleError(sendEmailResponse.message);
  }

  const verifyToken = await encryptToken(
    {
      user_id: user.id,
    },
    { expires: "15m" }
  );

  await db.userResetPassword.deleteMany({ where: { user_id: user.id } });
  await db.userResetPassword.create({
    data: {
      user: {
        connect: { id: user.id },
      },
      code,
      verify_token: verifyToken,
    },
  });

  revalidatePath("/forgot-password");
  return {
    success: true,
    message: "Verification code re-sent to your email",
    data: {
      verify_token: verifyToken,
    },
  };
}

export async function forgotVerifyCode(payload: ForgotVerifyCodePayload): Promise<ActionResponse> {
  const schema = forgotVerifyCodeSchema.safeParse(payload);

  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const decodedToken = await decryptToken<{ user_id: number }>(data.token);

  if (!decodedToken) {
    return handleError("Invalid Token");
  }

  const user = await db.user.findUnique({
    where: { id: decodedToken.user_id },
  });

  if (!user) {
    return handleError("Invalid Email");
  }

  if (user && !user.email) {
    return handleError("Invalid Email");
  }

  const resetPassword = await db.userResetPassword.findFirst({
    where: {
      user_id: user.id,
      code: data.code,
      verify_token: data.token,
    },
  });

  if (!resetPassword) {
    return handleError("Invalid Code");
  }

  const resetToken = await encryptToken(
    {
      user_id: user.id,
    },
    { expires: "15m" }
  );

  await db.userResetPassword.update({
    where: {
      id: resetPassword.id,
    },
    data: {
      reset_token: resetToken,
    },
  });

  revalidatePath("/forgot-password");
  return {
    success: true,
    message: "Code verified successfully! Please reset your password",
    data: {
      reset_token: resetToken,
    },
  };
}

export async function forgotResetPassword(payload: ForgotResetPasswordPayload): Promise<ActionResponse> {
  const schema = forgotResetPasswordSchema.safeParse(payload);

  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const decodedToken = await decryptToken<{ user_id: number }>(data.token);

  if (!decodedToken) {
    return handleError("Invalid Token");
  }

  const user = await db.user.findUnique({
    where: { id: decodedToken.user_id },
  });

  if (!user) {
    return handleError("Invalid Email");
  }

  if (user && !user.email) {
    return handleError("Invalid Email");
  }

  const resetPassword = await db.userResetPassword.findFirst({
    where: {
      user_id: user.id,
      reset_token: data.token,
    },
  });

  if (!resetPassword) {
    return handleError("Invalid Token");
  }

  const hashedPassword = await hashPassword(data.password);
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.userResetPassword.delete({
    where: { id: resetPassword.id },
  });

  const html = render(ForgotResetSuccess({ name: user.first_name! }));
  const sendEmailResponse = await sendEmail({
    to: user.email!,
    subject: EMAILS.forgotPasswordResetSuccess.subject,
    html,
  });

  if (!sendEmailResponse.success) {
    return handleError(sendEmailResponse.message);
  }

  revalidatePath("/forgot-password");
  return {
    success: true,
    message: "Password reset successfully",
  };
}
