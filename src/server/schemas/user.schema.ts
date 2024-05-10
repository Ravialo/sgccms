import { Grade, Section, Student, User, UserRole, UserStatus } from "@prisma/client";
import { z } from "zod";

export type UserData = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string | null;
  role: UserRole;
  status: UserStatus;
  student: Student | null;
  advisor: {
    section_id: number | null;
    section: Section & {
      grade_id: number;
      grade: Grade;
    };
  };
};

export const addUserSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  first_name: z.string().min(1, { message: "First Name is required" }),
  last_name: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().optional(),
  role: z.string().min(1, { message: "Role is required" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Please input at least 8 characters" }),
});

export type AddUserPayload = z.infer<typeof addUserSchema>;

export const updateUserSchema = z
  .object({
    id: z.number(),
    username: z.string().min(1, { message: "Username is required" }),
    first_name: z.string().min(1, { message: "First Name is required" }),
    last_name: z.string().min(1, { message: "Last Name is required" }),
    email: z.string().optional(),
    role: z.nativeEnum(UserRole, {
      errorMap: (issue, ctx) => {
        return { message: "Please select your user role" };
      },
    }),
    password: z.string().min(8, { message: "Please input at least 8 characters" }).optional(),
    confirmPassword: z.string().optional(),
    status: z.string().min(1, { message: "Status is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type UpdateUserPayload = z.infer<typeof updateUserSchema>;

export const deleteUserSchema = z.object({
  id: z.number(),
});

export type DeleteUserPayload = z.infer<typeof deleteUserSchema>;
