"use server";

import { SchoolYearDefault } from "@prisma/client";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { handleError } from "@/lib/utils";

import {
  CreateSchoolYearPayload,
  createSchoolYearSchema,
  UpdateSchoolYearPayload,
  updateSchoolYearSchema,
} from "../schemas/school-year.schema";

export const createSchoolYear = async (payload: CreateSchoolYearPayload) => {
  const schema = createSchoolYearSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const sy = await db.schoolYear.findFirst({
    where: { year: data.year, deleted: false },
  });

  if (sy) {
    return handleError("School Year already exists");
  }

  const newSy = await db.schoolYear.create({
    data: {
      year: data.year,
      default: data.default as SchoolYearDefault,
    },
  });

  revalidatePath("/");
  return {
    success: true,
    message: "School Year created successfully",
    data: newSy,
  };
};

export const getSchoolYears = async () => {
  const items = await db.schoolYear.findMany({
    where: {
      deleted: false,
    },
    orderBy: {
      year: "desc",
    },
  });

  revalidatePath("/dashboard");
  return items;
};

export const getSchoolYearById = async (id: number) => {
  const sy = await db.schoolYear.findUnique({
    where: { id },
  });

  revalidatePath("/dashboard");
  return sy;
};

export const getDefaultSchoolYear = async () => {
  const item = await db.schoolYear.findFirst({
    where: {
      default: "yes",
      deleted: false,
    },
  });

  return item;
};

export const updateSchoolYear = async (payload: UpdateSchoolYearPayload) => {
  const schema = updateSchoolYearSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const sy = await db.schoolYear.findUnique({
    where: { id: data.id },
  });

  if (!sy) {
    return handleError("School Year ID not found");
  }

  if (sy.year === data.year && sy.default === data.default) {
    return {
      success: true,
      message: "Saved! No changes made",
    };
  }

  const existingSy = await db.schoolYear.findFirst({
    where: { id: { not: data.id }, year: sy.year },
  });

  if (existingSy) {
    return handleError("School Year already exists");
  }

  // if(existingSy && existingSy.default === "yes" && existingSy.year !== values.year){
  //   return handleError("Invalid request!");
  // }

  const updatedItem = await db.schoolYear.update({
    where: { id: data.id },
    data: {
      year: data.year,
      default: data.default as SchoolYearDefault,
    },
  });

  if (updatedItem.default === "yes") {
    await db.schoolYear.updateMany({
      where: { id: { not: updatedItem.id }, deleted: false },
      data: {
        default: "no",
      },
    });
  }

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "School Year updated successfully",
  };
};

export const deleteSchoolYear = async (id: number) => {
  const sy = await db.schoolYear.findUnique({ where: { id } });

  if (!sy) {
    return handleError("School Year ID not found");
  }

  if (sy.default === "yes") {
    return handleError("Please select other default school year first, before deleting it.");
  }

  await db.schoolYear.update({
    where: { id },
    data: { deleted: true },
  });

  revalidatePath("/");
  return {
    success: true,
    message: "School Year deleted successfully",
  };
};
