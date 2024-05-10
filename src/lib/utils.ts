import { Grade, Section, Student, UserRole } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function extractInitials(name: string) {
  if (!name.trim()) return "";

  let initialName = "";
  const names = name.split(" ");
  names.forEach((name) => {
    initialName += name.charAt(0);
  });
  return initialName.toUpperCase();
}

export function handleError(message: string) {
  return { success: false, message };
}

export function toTitleCase(str: string): string {
  const words = str.replace(/_/g, " ").split(/\W+/); // Split on one or more non-word characters

  return words
    .map((word) => {
      return word.length > 3 // Only capitalize words with 4 or more letters
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase();
    })
    .join(" "); // Join words back with spaces
}

export const formatDate = (dateValue: string | Date, format?: string) => {
  const dateFormat = format || "MM/DD/YYYY hh:mm:ss A";
  return dayjs(dateValue).format(dateFormat);
};

export function truncateText(text: string, maxLength: number, ellipsis = "..."): string {
  if (text.length <= maxLength) {
    return text;
  }

  // Consider space for ellipsis when calculating remaining characters
  const remaining = maxLength - ellipsis.length;

  // Truncate the text and add ellipsis
  return `${text.slice(0, remaining)}${ellipsis}`;
}

export function formatStudentName(student: Student) {
  const name = `${student.last_name}, ${student.first_name}`;
  return student.suffix ? `${name} ${student.suffix}` : name;
}

export function formatGradeSection(grade: Grade, section: Section) {
  return grade && section ? `${grade.grade} - ${section.section}` : "";
}

export function getDashboardLink(type: UserRole, path: string) {
  return `/dashboard/${type}${path}`;
}

export function generateCaseReportNo() {
  const currentDate = new Date();

  // Extracting date components
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Extracting time components
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // Constructing the formatted date-time string
  const formattedDateTime = `${year}${month}${day}-${hours}${minutes}${seconds}`;

  return formattedDateTime;
}

export function convertTo12HourFormat(time24: string) {
  // Split the time string into hours and minutes
  let [hours, minutes] = time24.split(":").map(Number);

  // Determine whether it's AM or PM
  const period = hours < 12 ? "AM" : "PM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  // Add leading zero to minutes if necessary
  const min = minutes < 10 ? "0" + minutes : minutes;

  // Return the converted time
  return hours + ":" + min + " " + period;
}

export const numberInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const eventCode = event.code.toLowerCase();
  if (
    !(
      event.code !== null &&
      (eventCode.includes("digit") ||
        eventCode.includes("arrow") ||
        eventCode.includes("home") ||
        eventCode.includes("end") ||
        eventCode.includes("backspace") ||
        (eventCode.includes("numpad") && eventCode.length === 7))
    )
  ) {
    event.preventDefault();
  }
};

export function generateRandomCode(codeLength = 6): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code.toUpperCase();
}
