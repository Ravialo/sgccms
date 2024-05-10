"use server";

import { revalidatePath } from "next/cache";

import { comparePassword, hashPassword } from "@/lib/auth";
import db from "@/lib/db";
import { handleError } from "@/lib/utils";

import {
  UpdatePasswordPayload,
  updatePasswordSchema,
  UpdateProfilePayload,
  updateProfileSchema,
} from "../schemas/profile.schema";
import { getSession } from "./auth.action";

export async function getProfile() {
  const session = await getSession();

  if (!session) return null;

  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      first_name: true,
      last_name: true,
    },
  });

  revalidatePath("/dashboard");
  return user;
}

export async function updateProfile(payload: UpdateProfilePayload) {
  const session = await getSession();

  if (!session) {
    return handleError("Unauthorized");
  }

  const schema = updateProfileSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const { username, email, first_name, last_name } = schema.data;

  // get user by session id
  const user = await db.user.findUnique({
    where: { id: session.id },
  });

  if (!user) {
    return handleError("Account not found");
  }

  // check username if exist into other users
  const userUsernames = await db.user.findMany({
    where: {
      id: {
        not: user.id,
      },
      username,
    },
  });

  if (userUsernames.length > 0) {
    return handleError("Username already exist.");
  }

  await db.user.update({
    where: { id: session.id },
    data: {
      username,
      email,
      first_name,
      last_name,
    },
  });

  revalidatePath("/");
  return {
    success: true,
    message: "Profile updated successfully",
  };
}

export async function updatePassword(payload: UpdatePasswordPayload) {
  const session = await getSession();

  if (!session) {
    return handleError("Unauthorized");
  }

  const schema = updatePasswordSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const { oldPassword, newPassword } = schema.data;

  // get user using id
  const user = await db.user.findUnique({
    where: { id: session.id },
  });

  if (!user) {
    return handleError("Account not found");
  }

  // check old password if match else return error
  const oldPasswordMatch = await comparePassword(oldPassword, user.password);
  if (!oldPasswordMatch) {
    return handleError("Old password is incorrect");
  }

  // hash new password and update password
  const hashedNewPassword = await hashPassword(newPassword);
  await db.user.update({
    where: { id: user.id },
    data: {
      password: hashedNewPassword,
    },
  });

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Password updated successfully",
  };
}
