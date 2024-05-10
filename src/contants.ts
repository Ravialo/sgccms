import {
  CalendarCheckIcon,
  CalendarPlusIcon,
  FilesIcon,
  LayoutDashboardIcon,
  LayoutListIcon,
  ListChecksIcon,
  MessageSquareWarningIcon,
  UploadIcon,
  UsersIcon,
} from "lucide-react";

import { SideNavByRole } from "./types";

export const sidebarTitle: string = "SGCCMS";

export const sidebarNavs: SideNavByRole = {
  student: [
    {
      label: "Dashboard",
      path: "/dashboard/student",
      icon: LayoutDashboardIcon,
    },
    {
      label: "Create Appointment",
      path: "/dashboard/student/create-appointment",
      icon: CalendarPlusIcon,
    },
    {
      label: "Appointments",
      path: "/dashboard/student/appointments",
      icon: CalendarCheckIcon,
    },
  ],
  counselor: [
    {
      label: "Dashboard",
      path: "/dashboard/counselor",
      icon: LayoutDashboardIcon,
    },
    {
      label: "Import Students",
      path: "/dashboard/counselor/import-students",
      icon: UploadIcon,
    },
    {
      label: "Students",
      path: "/dashboard/counselor/students",
      icon: UsersIcon,
    },
    {
      label: "Appointments",
      path: "/dashboard/counselor/appointments",
      icon: CalendarCheckIcon,
    },
    {
      label: "Complaints",
      path: "/dashboard/counselor/complaints",
      icon: MessageSquareWarningIcon,
    },
    {
      label: "Counselor Reports",
      path: "/dashboard/counselor/counselor-reports",
      icon: FilesIcon,
    },
    {
      label: "Narrative Reports",
      path: "/dashboard/counselor/narrative-reports",
      icon: FilesIcon,
    },
  ],
  advisor: [
    {
      label: "Dashboard",
      path: "/dashboard/advisor",
      icon: LayoutDashboardIcon,
    },
    {
      label: "Students",
      path: "/dashboard/advisor/students",
      icon: UsersIcon,
    },
    {
      label: "Complaints",
      path: "/dashboard/advisor/complaints",
      icon: MessageSquareWarningIcon,
    },
  ],
  principal: [
    {
      label: "Dashboard",
      path: "/dashboard/principal",
      icon: LayoutDashboardIcon,
    },
    {
      label: "Counselor Reports",
      path: "/dashboard/principal/counselor-reports",
      icon: FilesIcon,
    },
    {
      label: "Narrative Reports",
      path: "/dashboard/principal/narrative-reports",
      icon: FilesIcon,
    },
    {
      separator: true,
    },
    {
      label: "School Year",
      path: "/dashboard/principal/school-year",
      icon: LayoutListIcon,
    },
    {
      label: "Grades",
      path: "/dashboard/principal/grades",
      icon: ListChecksIcon,
    },
    {
      label: "Sections",
      path: "/dashboard/principal/sections",
      icon: ListChecksIcon,
    },
    {
      label: "Users",
      path: "/dashboard/principal/users",
      icon: UsersIcon,
    },
  ],
};

export const roles = {
  student: {
    basePath: "/dashboard/student",
  },
  counselor: {
    basePath: "/dashboard/counselor",
  },
  advisor: {
    basePath: "/dashboard/advisor",
  },
  principal: {
    basePath: "/dashboard/principal",
  },
};

export const publicPaths = ["/", "/sign-in", "/forgot-password"];

export const appointmentPurposes = [
  {
    value: "Initial Interview",
    label: "Initial Interview",
  },
  {
    value: "Exit Interview",
    label: "Exit Interview",
  },
  {
    value: "Follow-Up Interview",
    label: "Follow-Up Interview",
  },
  {
    value: "Counselling",
    label: "Counselling",
  },
  {
    value: "Referred",
    label: "Referred",
  },
  {
    value: "Inquiry",
    label: "Inquiry",
  },
  {
    value: "Others",
    label: "Others",
  },
];

export const appointmentCounsellings = [
  {
    value: "Academic",
    label: "Academic",
  },
  {
    value: "Personal Social",
    label: "Personal Social",
  },
  {
    value: "Career / Vocationall",
    label: "Career / Vocational",
  },
  {
    value: "Others",
    label: "Others",
  },
];

export const appointmentStatuses = [
  {
    value: "open",
    label: "Open",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "closed",
    label: "Closed",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
];

export const complaintStatuses = [
  {
    value: "open",
    label: "Open",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "closed",
    label: "Closed",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
];

export const userRoles = [
  {
    label: "Advisor",
    value: "advisor",
  },
  {
    label: "Counselor",
    value: "counselor",
  },
  {
    label: "Principal",
    value: "principal",
  },
];

export const studentGenders = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "others",
  },
];

export const syDefaults = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
];

export const EMAILS = {
  forgotPasswordSendCode: {
    subject: "SGCCMS - Verification Code for Password Recovery",
  },
  forgotPasswordResetSuccess: {
    subject: "SGCCMS - Password Recovery Success",
  },
  counselorCreateCounselor: {
    subject: "SGCCMS - Counselor Report",
  },
  counselorCreateNarrative: {
    subject: "SGCCMS - Narrative Report",
  },
  counselorRequestAppointment: {
    subject: "SGCCMS - New Appointment",
  },
  counselorSetAppointmentDate: {
    subject: "SGCCMS - Set Appointment Date",
  },
  counselorUpdateAppointmentStatus: {
    subject: "SGCCMS - Update Appointment Status",
  },
  counselorUpdateComplaintStatus: {
    subject: "SGCCMS - Update Complaint Status",
  },
  advisorCreateComplaint: {
    subject: "SGCCMS - New Complaint",
  },
  studentCreateAppointment: {
    subject: "SGCCMS - New Appointment",
  },
};
