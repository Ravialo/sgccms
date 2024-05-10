"use server";

import { Prisma, StudentGender } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { hashPassword } from "@/lib/auth";
import db from "@/lib/db";
import { handleError } from "@/lib/utils";

import {
  AddStudentPayload,
  addStudentSchema,
  ImportStudentPayload,
  importStudentSchema,
  UpdateStudentPayload,
  updateStudentSchema,
} from "../schemas/student.schema";
import { getSession } from "./auth.action";
import { getDefaultSchoolYear } from "./school-year.action";

const studentInclude: Prisma.StudentInclude = {
  school_year: true,
  grade: true,
  section: true,
};

type GetStudentsFilter = Prisma.StudentWhereInput;

export const getStudents = async (filter?: GetStudentsFilter) => {
  const where: GetStudentsFilter = {
    deleted: false,
  };

  if (filter?.grade_id && filter?.section_id) {
    where.grade_id = filter.grade_id;
    where.section_id = filter.section_id;
  }

  const items = await db.student.findMany({
    where,
    orderBy: {
      last_name: "asc",
    },
    include: studentInclude,
  });

  revalidatePath("/dashboard");
  return items;
};

export const getStudentById = async (id: number | null) => {
  if (!id) {
    return null;
  }

  const student = await db.student.findUnique({
    where: { id },
    include: studentInclude,
  });

  return student;
};

export type ImportStudentError = {
  rowNumber: number;
  type: "error" | "warning" | "success";
  error: string;
};

export const importStudents = async (students: ImportStudentPayload[]) => {
  const rows: ImportStudentPayload[] = [];
  const errors: ImportStudentError[] = [];

  // validate import rows from csv
  for (let i = 0; i < students.length; i++) {
    const student = students[i];

    const schema = importStudentSchema.safeParse(student);
    if (!schema.success) {
      for (const error of schema.error.errors) {
        errors.push({
          rowNumber: i + 1,
          type: "error",
          error: error.message,
        });
      }
    } else {
      rows.push(schema.data);
    }
  }
  // end of validate import rows from csv

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const validStudents: ImportStudentPayload[] = [];

  // validate students rows to database
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    const schoolYear = await db.schoolYear.findFirst({
      where: { year: row.school_year, default: "yes" },
    });

    if (!schoolYear) {
      errors.push({
        rowNumber: i + 1,
        type: "error",
        error: "Invalid School Year",
      });
    } else {
      const student = await db.student.findFirst({
        where: {
          school_year_id: schoolYear?.id,
          lrn_no: row.lrn_no,
          grade: {
            grade: { contains: row.grade },
          },
          section: {
            section: { contains: row.section },
          },
        },
      });

      if (student) {
        errors.push({
          rowNumber: i + 1,
          type: "error",
          error: "Student already exist.",
        });
      } else {
        validStudents.push(row);
      }
    }
  }
  // end of validate students rows to database

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const defaultSY = await db.schoolYear.findFirst({
    where: { default: "yes" },
  });

  // save student and new student user
  for (let i = 0; i < validStudents.length; i++) {
    const student = validStudents[i];

    const gradeSection = await db.section.findFirst({
      where: {
        school_year_id: defaultSY?.id,
        grade: {
          grade: { contains: student.grade },
        },
        section: { contains: student.section },
      },
      include: {
        grade: true,
      },
    });

    if (gradeSection) {
      // create student user
      const hashedPassword = await hashPassword(`${gradeSection.grade}-${student.lrn_no}`);
      const newUser = await db.user.create({
        data: {
          username: `${student.grade}-${student.lrn_no}`,
          first_name: student.first_name,
          last_name: student.last_name,
          password: hashedPassword,
          role: "student",
          status: "active",
        },
      });

      // create new student
      await db.student.create({
        data: {
          school_year: {
            connect: { id: gradeSection.school_year_id },
          },
          grade: {
            connect: { id: gradeSection.grade_id },
          },
          section: {
            connect: { id: gradeSection.id },
          },
          user: {
            connect: { id: newUser.id },
          },
          lrn_no: student.lrn_no,
          first_name: student.first_name,
          middle_name: student.middle_name,
          last_name: student.last_name,
          gender: student.gender.toLowerCase() as StudentGender,
          age: Number(student.age),
        },
      });

      errors.push({
        rowNumber: i + 1,
        type: "success",
        error: "Student successfully imported.",
      });
    }
  }

  revalidatePath("/dashboard");
  return {
    success: false,
    errors,
  };
};

export const addStudent = async (data: AddStudentPayload) => {
  const session = await getSession();
  if (!session) {
    return handleError("Unauthorized");
  }

  const schoolYear = await getDefaultSchoolYear();
  if (!schoolYear) {
    return handleError("Default School Year not set.");
  }

  const schema = addStudentSchema.safeParse(data);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const gradeSection = await db.section.findFirst({
    where: {
      id: Number(data.section_id),
      school_year_id: schoolYear.id,
      grade_id: Number(data.grade_id),
    },
    include: {
      grade: true,
    },
  });

  if (!gradeSection) {
    return handleError("Invalid Grade & Section.");
  }

  const student = await db.student.findFirst({
    where: {
      lrn_no: data.lrn_no,
      grade_id: Number(data.grade_id),
      section_id: Number(data.section_id),
    },
  });

  if (student) {
    return {
      success: false,
      message: "Student already exist.",
    };
  }

  const gradeLabel = gradeSection.grade.grade;
  const hashedPassword = await hashPassword(`${gradeLabel}-${data.lrn_no}`);

  const newUser = await db.user.create({
    data: {
      username: `${gradeLabel}-${data.lrn_no}`,
      first_name: data.first_name,
      last_name: data.last_name,
      password: hashedPassword,
      role: "student",
      status: "active",
    },
  });

  await db.student.create({
    data: {
      school_year: {
        connect: { id: schoolYear.id },
      },
      grade: {
        connect: { id: Number(data.grade_id) },
      },
      section: {
        connect: { id: Number(data.section_id) },
      },
      user: {
        connect: { id: newUser.id },
      },
      lrn_no: data.lrn_no,
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      suffix: data.suffix,
      gender: data.gender as StudentGender,
      age: Number(data.age),
    },
    include: studentInclude,
  });

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Student added successfully.",
  };
};

export const updateStudent = async (data: UpdateStudentPayload) => {
  const session = await getSession();
  if (!session) {
    return handleError("Unauthorized");
  }

  const schema = updateStudentSchema.safeParse(data);
  if (!schema.success) {
    return handleError(schema.error.errors[0].message);
  }

  const gradeSection = await db.section.findUnique({
    where: {
      id: Number(data.section_id),
    },
  });

  if (!gradeSection) {
    return handleError("Invalid Grade & Section.");
  }

  const student = await db.student.findUnique({
    where: { id: data.id },
    include: studentInclude,
  });

  if (!student) {
    return {
      success: false,
      message: "Student not found.",
    };
  }

  const updatedStudent = await db.student.update({
    where: { id: data.id },
    data: {
      grade: {
        connect: { id: Number(data.grade_id) },
      },
      section: {
        connect: { id: Number(data.section_id) },
      },
      lrn_no: data.lrn_no,
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      suffix: data.suffix,
      gender: data.gender as StudentGender,
      age: Number(data.age),
    },
    include: studentInclude,
  });

  if (updatedStudent) {
    const gradeLabel = updatedStudent.grade.grade;
    const hashedPassword = await hashPassword(`${gradeLabel}-${updatedStudent.lrn_no}`);
    await db.user.update({
      where: {
        id: updatedStudent.user_id,
      },
      data: {
        username: `${gradeLabel}-${updatedStudent.lrn_no}`,
        password: hashedPassword,
        first_name: data.first_name,
        last_name: data.last_name,
      },
    });
  }

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Student updated successfully.",
  };
};
