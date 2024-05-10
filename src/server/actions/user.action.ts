"use server";

import { Prisma, UserRole, UserStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { hashPassword } from "@/lib/auth";
import db from "@/lib/db";
import { handleError } from "@/lib/utils";

import { AddUserPayload, addUserSchema, UpdateUserPayload, updateUserSchema, UserData } from "../schemas/user.schema";
import { getDefaultSchoolYear } from "./school-year.action";

const userSelect: Prisma.UserSelect = {
  id: true,
  username: true,
  first_name: true,
  last_name: true,
  email: true,
  role: true,
  status: true,
  student: true,
  advisor: {
    include: {
      section: {
        include: {
          grade: true,
        },
      },
    },
  },
};
export type GetUsersFilter = Prisma.UserWhereInput & {
  includeStudents?: boolean;
};

export const getUsers = async (filter?: GetUsersFilter) => {
  const includeStudents = filter?.includeStudents || false;

  const query: GetUsersFilter = {
    deleted: false,
    role: {
      not: "student",
    },
  };

  if (filter?.role) {
    query.role = filter.role as UserRole;
  }

  if (includeStudents) {
    query.role = {};
  }

  if (filter?.status) {
    query.status = filter.status as UserStatus;
  }

  const users = await db.user.findMany({
    where: query,
    orderBy: {
      id: "desc",
    },
    select: userSelect,
  });

  revalidatePath("/dashboard");
  return users as unknown as UserData[];
};

export const getStudentIdByUserId = async (userId: number) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: userSelect,
  });

  const usr = user as unknown as UserData;
  if (!user) return null;
  return usr.student?.id;
};

export const getUserById = async (id: number) => {
  const user = await db.user.findUnique({
    where: { id },
    select: userSelect,
  });

  revalidatePath("/dashboard");
  return user as unknown as UserData;
};

export const addUser = async (payload: AddUserPayload) => {
  const schoolYear = await getDefaultSchoolYear();
  if (!schoolYear) {
    return handleError("No default school year selected.");
  }

  const schema = addUserSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  if (data.role === "student") {
    return handleError("Unable to create user for student. Please use the import student feature by the counselor");
  }

  const user = await db.user.findFirst({
    where: {
      username: data.username,
      deleted: false,
    },
  });

  if (user) {
    return handleError("Username already exist");
  }

  const hashedPassword = await hashPassword(data.password);

  const userData: Prisma.UserCreateInput = {
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email || "",
    password: hashedPassword,
    role: data.role as UserRole,
    status: "active",
  };

  await db.user.create({
    data: userData,
  });

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "User created successfully",
  };
};

export const updateUser = async (payload: UpdateUserPayload) => {
  const schema = updateUserSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  if (data.role === "student") {
    return handleError("Unable to create user for student. Please use the import student feature by the counselor");
  }

  const user = await db.user.findUnique({
    where: { id: data.id },
  });

  if (!user) {
    return handleError("User ID not found");
  }

  const userData: Prisma.UserUpdateInput = {
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email || "",
    role: data.role,
    status: data.status as UserStatus,
  };

  if (data.password) {
    const hashedPassword = await hashPassword(data.password);
    userData.password = hashedPassword;
  }

  const updatedUser = await db.user.update({
    where: {
      id: user.id,
    },
    data: userData,
  });

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "User updated successfully",
  };
};

export const deleteUser = async (id: number) => {
  const user = await db.user.findUnique({
    where: { id },
  });

  if (!user) {
    return handleError("User ID not found");
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      username: `${Date.now()}-${user.username}`,
      deleted: true,
      deleted_username: user.username,
    },
  });

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "User deleted successfully",
  };
};
