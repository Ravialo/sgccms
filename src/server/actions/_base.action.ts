"use server";
//for demo purposes only
import {
  Advisor,
  Appointment,
  Complaint,
  CounselorReport,
  Grade,
  NarrativeReport,
  SchoolYear,
  Section,
  Student,
  User,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { handleError } from "@/lib/utils";

import {
  advisors,
  appointments,
  complaints,
  counselorReports,
  grades,
  narrativeReports,
  schoolYear,
  sections,
  students,
  users,
} from "../../../scripts/data";

export async function resetDBTables() {
  try {
    // reset tables
    await db.counselorReport.deleteMany({});
    await db.narrativeReportParty.deleteMany({});
    await db.narrativeReport.deleteMany({});
    await db.complaint.deleteMany({});
    await db.appointment.deleteMany({});
    await db.advisor.deleteMany({});
    await db.student.deleteMany({});
    await db.userResetPassword.deleteMany({});
    await db.user.deleteMany({});
    await db.student.deleteMany({});
    await db.section.deleteMany({});
    await db.grade.deleteMany({});
    await db.schoolYear.deleteMany({});

    await db.schoolYear.createMany({
      data: schoolYear as Required<SchoolYear>[],
    });
    await db.grade.createMany({
      data: grades as Required<Grade>[],
    });
    await db.section.createMany({
      data: sections as Required<Section>[],
    });
    await db.user.createMany({
      data: users as Required<User>[],
    });
    await db.student.createMany({
      data: students as Required<Student>[],
    });
    await db.advisor.createMany({
      data: advisors as Required<Advisor>[],
    });
    await db.appointment.createMany({
      data: appointments as Required<Appointment>[],
    });
    await db.complaint.createMany({
      data: complaints as Required<Complaint>[],
    });
    await db.narrativeReport.createMany({
      data: narrativeReports as Required<NarrativeReport>[],
    });
    await db.counselorReport.createMany({
      data: counselorReports as Required<CounselorReport>[],
    });

    revalidatePath("/dashboard");
    return {
      success: true,
      message: "DB reset and re-seeding data complete",
    };
  } catch (error: any) {
    console.log(error);
    return handleError(error.message);
  }
}
