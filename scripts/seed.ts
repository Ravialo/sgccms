import {
  Advisor,
  Appointment,
  Complaint,
  CounselorReport,
  Grade,
  NarrativeReport,
  PrismaClient,
  SchoolYear,
  Section,
  Student,
  User,
} from "@prisma/client";

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
} from "./data";

const prisma = new PrismaClient();

const resetTables = async () => {
  // reset tables
  console.log("resetting tables");
  await prisma.counselorReport.deleteMany({});
  await prisma.narrativeReport.deleteMany({});
  await prisma.complaint.deleteMany({});
  await prisma.appointment.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.section.deleteMany({});
  await prisma.grade.deleteMany({});
  await prisma.schoolYear.deleteMany({});
  console.log("resetting tables done");
};

const insertData = async () => {
  console.log("inserting data...");
  await prisma.schoolYear.createMany({
    data: schoolYear as Required<SchoolYear>[],
  });
  await prisma.grade.createMany({
    data: grades as Required<Grade>[],
  });
  await prisma.section.createMany({
    data: sections as Required<Section>[],
  });
  await prisma.user.createMany({
    data: users as Required<User>[],
  });
  await prisma.student.createMany({
    data: students as Required<Student>[],
  });
  await prisma.advisor.createMany({
    data: advisors as Required<Advisor>[],
  });
  await prisma.appointment.createMany({
    data: appointments as Required<Appointment>[],
  });
  await prisma.complaint.createMany({
    data: complaints as Required<Complaint>[],
  });
  await prisma.narrativeReport.createMany({
    data: narrativeReports as Required<NarrativeReport>[],
  });
  await prisma.counselorReport.createMany({
    data: counselorReports as Required<CounselorReport>[],
  });

  console.log("inserting data done");
};

const main = async () => {
  try {
    await resetTables();
    await insertData();
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
};

main();
