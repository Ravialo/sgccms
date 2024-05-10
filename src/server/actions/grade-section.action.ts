"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { handleError } from "@/lib/utils";

import {
  CreateGradePayload,
  createGradeSchema,
  CreateSectionPayload,
  createSectionSchema,
  DeleteGradePayload,
  deleteGradeSchema,
  DeleteSectionPayload,
  deleteSectionSchema,
  SectionData,
  UpdateGradePayload,
  updateGradeSchema,
  UpdateSectionPayload,
  updateSectionSchema,
} from "../schemas/grade-section.schema";
import { getDefaultSchoolYear } from "./school-year.action";

const gradeInclude: Prisma.GradeInclude = {
  school_year: true,
};

const sectionInclude: Prisma.SectionInclude = {
  school_year: true,
  grade: true,
  advisor: {
    include: {
      user: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        },
      },
      section: true,
    },
  },
};

export type GetGradesFilter = Prisma.GradeWhereInput;

export const getGrades = async (filter?: GetGradesFilter) => {
  const query: GetGradesFilter = {};

  if (filter?.school_year_id) {
    query.school_year_id = filter.school_year_id;
  }

  const grades = await db.grade.findMany({
    where: query,
    include: gradeInclude,
  });

  revalidatePath("/dashboard");
  return grades;
};

export const createGrade = async (payload: CreateGradePayload) => {
  const schema = createGradeSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const grade = await db.grade.findFirst({
    where: {
      school_year_id: data.school_year_id,
      grade: { contains: data.grade },
    },
  });

  if (grade) {
    return handleError("Grade already exist.");
  }

  await db.grade.create({
    data: {
      school_year: {
        connect: { id: data.school_year_id },
      },
      grade: data.grade,
    },
  });

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Grade created successfully",
  };
};

export const getGradeById = async (id: number) => {
  const grade = await db.grade.findUnique({
    where: { id },
    include: gradeInclude,
  });

  revalidatePath("/dashboard");
  return grade;
};

export const updateGradeById = async (payload: UpdateGradePayload) => {
  const schema = updateGradeSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const grade = await db.grade.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!grade) {
    return handleError("Grade ID not found");
  }

  const existingGrades = await db.grade.findMany({
    where: {
      id: { not: grade.id },
      grade: { contains: data.grade },
      school_year_id: grade.school_year_id,
    },
  });

  if (existingGrades.length > 0) {
    return handleError("Grade already exist");
  }

  await db.grade.update({
    where: {
      id: data.id,
    },
    data: {
      grade: data.grade,
    },
  });

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Grade updated successfully",
  };
};

export const deleteGradeById = async (payload: DeleteGradePayload) => {
  const schema = deleteGradeSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  await db.grade.delete({
    where: { id: data.id },
  });

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Grade deleted successfully",
  };
};

export type GetSectionsFilter = Prisma.SectionWhereInput;

export const getSections = async (filter?: GetSectionsFilter) => {
  const query: GetSectionsFilter = {};

  if (filter?.school_year_id) {
    query.school_year_id = filter.school_year_id;
  }

  const sections = await db.section.findMany({
    where: query,
    include: sectionInclude,
  });

  revalidatePath("/dashboard");
  return sections as unknown as SectionData[];
};

export const createSection = async (payload: CreateSectionPayload) => {
  const schema = createSectionSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const section = await db.section.findFirst({
    where: {
      grade_id: Number(data.grade_id),
      section: { contains: data.section },
    },
  });

  if (section) {
    return handleError("Section already exist.");
  }

  if (data.advisor_id) {
    const advisor = await db.advisor.findFirst({
      where: {
        user_id: Number(data.advisor_id),
      },
      include: {
        section: {
          include: {
            grade: true,
          },
        },
      },
    });

    if (advisor) {
      return handleError(
        `Advisor already assigned to Grade ${advisor.section.grade.grade}, Section ${advisor.section.section}`
      );
    }
  }

  const newSection = await db.section.create({
    data: {
      school_year: {
        connect: { id: data.school_year_id },
      },
      grade: {
        connect: { id: Number(data.grade_id) },
      },
      section: data.section,
    },
  });

  if (data.advisor_id) {
    await db.advisor.create({
      data: {
        user: {
          connect: { id: Number(data.advisor_id) },
        },
        section: {
          connect: { id: newSection.id },
        },
      },
    });
  }

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Section created successfully",
  };
};

export const getSectionById = async (id: number) => {
  const section = await db.section.findUnique({
    where: { id },
    include: sectionInclude,
  });

  revalidatePath("/dashboard");
  return section as unknown as SectionData;
};

export const updateSectionById = async (payload: UpdateSectionPayload) => {
  const schema = updateSectionSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  const section = await db.section.findUnique({
    where: {
      id: data.id,
    },
    include: {
      advisor: true,
    },
  });

  if (!section) {
    return handleError("Section ID not found");
  }

  const existingSections = await db.section.findMany({
    where: {
      id: { not: section.id },
      section: { contains: data.section },
      grade_id: section.grade_id,
    },
  });

  if (existingSections.length > 0) {
    return handleError("Section name already exist");
  }

  if (data.advisor_id) {
    const advisor = await db.advisor.findFirst({
      where: {
        user_id: Number(data.advisor_id),
        section_id: { not: section.id },
      },
      include: {
        section: {
          include: {
            grade: true,
          },
        },
      },
    });

    if (advisor) {
      return handleError(
        `Advisor already assigned to Grade ${advisor.section.grade.grade}, Section ${advisor.section.section}`
      );
    }
  }

  const updatedSection = await db.section.update({
    where: {
      id: data.id,
    },
    data: {
      grade: {
        connect: { id: Number(data.grade_id) },
      },
      section: data.section,
    },
  });

  if (data.advisor_id) {
    await db.advisor.upsert({
      where: {
        section_id: updatedSection.id,
      },
      create: {
        user: {
          connect: { id: Number(data.advisor_id) },
        },
        section: {
          connect: { id: updatedSection.id },
        },
      },
      update: {
        user: {
          connect: { id: Number(data.advisor_id) },
        },
      },
    });
  } else {
    await db.advisor.delete({
      where: {
        section_id: updatedSection.id,
      },
    });
  }

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Section updated successfully",
  };
};

export const deleteSectionById = async (payload: DeleteSectionPayload) => {
  const schema = deleteSectionSchema.safeParse(payload);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const data = schema.data;

  await db.section.delete({
    where: { id: data.id },
  });

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Section deleted successfully",
  };
};

export const getAdvisors = async () => {
  const advisors = await db.user.findMany({
    where: {
      status: "active",
      deleted: false,
      role: "advisor",
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
    },
  });

  revalidatePath("/dashboard");
  return advisors;
};
