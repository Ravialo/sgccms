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

export const schoolYear: Partial<SchoolYear>[] = [
  {
    id: 1,
    year: "2024",
    default: "yes",
  },
];

export const grades: Partial<Grade>[] = [
  {
    id: 1,
    school_year_id: 1,
    grade: "7",
  },
  {
    id: 2,
    school_year_id: 1,
    grade: "8",
  },
  {
    id: 3,
    school_year_id: 1,
    grade: "9",
  },
  {
    id: 4,
    school_year_id: 1,
    grade: "10",
  },
  {
    id: 5,
    school_year_id: 1,
    grade: "11",
  },
  {
    id: 6,
    school_year_id: 1,
    grade: "12",
  },
];

export const sections: Partial<Section>[] = [
  {
    id: 1,
    school_year_id: 1,
    grade_id: 1,
    section: "St. Therese",
  },
  {
    id: 2,
    school_year_id: 1,
    grade_id: 1,
    section: "St. Agnes",
  },
  {
    id: 3,
    school_year_id: 1,
    grade_id: 2,
    section: "St. John",
  },
  {
    id: 4,
    school_year_id: 1,
    grade_id: 2,
    section: "St. Micheal",
  },
  {
    id: 5,
    school_year_id: 1,
    grade_id: 3,
    section: "St. Ignatius",
  },
  {
    id: 6,
    school_year_id: 1,
    grade_id: 3,
    section: "St. Agustine",
  },
  {
    id: 7,
    school_year_id: 1,
    grade_id: 4,
    section: "St. Thomas",
  },
  {
    id: 8,
    school_year_id: 1,
    grade_id: 4,
    section: "St. Benedict",
  },
  {
    id: 9,
    school_year_id: 1,
    grade_id: 5,
    section: "St. Catherine",
  },
  {
    id: 10,
    school_year_id: 1,
    grade_id: 5,
    section: "St. Anne",
  },
  {
    id: 11,
    school_year_id: 1,
    grade_id: 6,
    section: "St. Andrew",
  },
  {
    id: 12,
    school_year_id: 1,
    grade_id: 6,
    section: "St. James",
  },
  {
    id: 13,
    school_year_id: 1,
    grade_id: 6,
    section: "St. Mary",
  },
];

export const students: Partial<Student>[] = [
  {
    id: 1,
    school_year_id: 1,
    user_id: 1,
    lrn_no: "1234567890",
    first_name: "John",
    last_name: "Doe",
    middle_name: "",
    suffix: "",
    gender: "male",
    age: 12,
    grade_id: 1,
    section_id: 1,
    status: "active",
  },
];

// all passwords: pass1234
export const users: Partial<User>[] = [
  {
    id: 1,
    username: "7-1234567890",
    first_name: "John",
    last_name: "Doe",
    email: "student1.sgccms@yopmail.com",
    password: "$2a$12$Q4Hx1AVc30Yd9W8BB0Qo3OQpgqsMjJ8fsEdh87SpQhG0IbQAU2M12",
    role: "student",
    status: "active",
  },
  {
    id: 2,
    username: "advisor1",
    first_name: "Olive",
    last_name: "Tree",
    email: "advisor1.sgccms@yopmail.com",
    password: "$2a$12$Q4Hx1AVc30Yd9W8BB0Qo3OQpgqsMjJ8fsEdh87SpQhG0IbQAU2M12",
    role: "advisor",
    status: "active",
  },
  {
    id: 3,
    username: "counselor1",
    first_name: "John",
    last_name: "Smith",
    email: "counselor1.sgccms@yopmail.com",
    password: "$2a$12$Q4Hx1AVc30Yd9W8BB0Qo3OQpgqsMjJ8fsEdh87SpQhG0IbQAU2M12",
    role: "counselor",
    status: "active",
  },
  {
    id: 4,
    username: "principal1",
    first_name: "Harry",
    last_name: "Potter",
    email: "principal1.sgccms@yopmail.com",
    password: "$2a$12$Q4Hx1AVc30Yd9W8BB0Qo3OQpgqsMjJ8fsEdh87SpQhG0IbQAU2M12",
    role: "principal",
    status: "active",
  },
];

export const advisors: Partial<Advisor>[] = [
  {
    id: 1,
    section_id: 1,
    user_id: 2,
  },
];

export const appointments: Partial<Appointment>[] = [
  {
    id: 1,
    school_year_id: 1,
    user_id: 1, // student user id
    student_id: 1,
    contact_no: "09123456789",
    purpose: "Inquiry",
    purpose_details: "Grade",
    status: "open",
  },
  {
    id: 2,
    school_year_id: 1,
    user_id: 1, // student user id
    student_id: 1,
    date: new Date(),
    contact_no: "09123456789",
    purpose: "Counselling",
    purpose_details: "Academic",
    status: "closed",
  },
  {
    id: 3,
    school_year_id: 1,
    user_id: 1, // student user id
    student_id: 1,
    date: new Date(),
    contact_no: "09123456789",
    purpose: "Inquiry",
    purpose_details: "Grade",
    status: "pending",
  },
];

export const complaints: Partial<Complaint>[] = [
  {
    id: 1,
    school_year_id: 1,
    user_id: 2, //advisor id
    student_id: 1,
    place: "Room",
    what_happened: "not listening",
    what_behavior: "NA",
    behavior_reaction: "NA",
    learner_reaction: "NA",
    recommendation: "Study more",
    status: "open",
  },
];

export const narrativeReports: Partial<NarrativeReport>[] = [
  {
    id: 1,
    school_year_id: 1,
    user_id: 3, // counselor id
    student_id: 1,
    appointment_id: 2, // closed appointment id
    case_report_no: "20240330-0001",
    incident: "Counselling Academic",
    reported_by: "John Doe",
    date_reported: "2024-03-30",
    time_reported: "12:00:00",
    detail_of_event: "Just counselling",
    action_taken: "Give advise",
    summary: "NA",
  },
];

export const counselorReports: Partial<CounselorReport>[] = [
  {
    id: 1,
    school_year_id: 1,
    user_id: 3, // counselor id
    student_id: 1,
    appointment_id: 2, // closed appointment
    summary: "Counselling Academics",
    recommendations: "Give advise on academics",
  },
];
