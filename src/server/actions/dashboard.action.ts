"use server";

import { Prisma } from "@prisma/client";

import db from "@/lib/db";

export async function getTotalAppointments(filter: Prisma.AppointmentWhereInput = {}) {
  return db.appointment.count({
    where: filter,
  });
}

export async function getTotalComplaints(filter: Prisma.ComplaintWhereInput = {}) {
  return db.complaint.count({
    where: filter,
  });
}

export async function getTotalNarrativeReports(filter: Prisma.NarrativeReportWhereInput = {}) {
  return db.narrativeReport.count({
    where: filter,
  });
}

export async function getTotalCounselorReports(filter: Prisma.CounselorReportWhereInput = {}) {
  return db.counselorReport.count({
    where: filter,
  });
}

export async function getTotalGrades(filter: Prisma.GradeWhereInput = {}) {
  return db.grade.count({
    where: filter,
  });
}

export async function getTotalSections(filter: Prisma.SectionWhereInput = {}) {
  return db.section.count({
    where: filter,
  });
}

export async function getTotalStudents(filter: Prisma.StudentWhereInput = {}) {
  return db.student.count({
    where: filter,
  });
}

export async function getTotalUsers(filter: Prisma.UserWhereInput = {}) {
  return db.user.count({
    where: filter,
  });
}
