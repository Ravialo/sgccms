"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { formatDate, formatStudentName, getDashboardLink, truncateText } from "@/lib/utils";
import { CounselorReportData } from "@/server/schemas/counselor-report.schema";

import DataTableRowActions from "./data-table-row-actions";

export const columns: ColumnDef<CounselorReportData>[] = [
  {
    accessorKey: "school_year",
    accessorFn: (row) => `${row.school_year.year}`,
    header: ({ column }) => <DataTableColumnHeader column={column} title="School Year" />,
    enableHiding: false,
  },
  {
    accessorKey: "student_name",
    accessorFn: (row) => formatStudentName(row.student),
    header: ({ column }) => <DataTableColumnHeader column={column} title="Student Name" />,
  },
  {
    accessorKey: "type",
    accessorFn: (row) => `${row.appointment_id ? "Appointment" : "Complaint"}`,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const value = row.original;
      return value.appointment_id ? (
        <Link
          target="_blank"
          className="hover:underline"
          href={getDashboardLink("counselor", `/appointments/${value.appointment_id}`)}
        >
          Appointment
        </Link>
      ) : (
        <Link
          target="_blank"
          className="hover:underline"
          href={getDashboardLink("counselor", `/complaints/${value.complaint_id}`)}
        >
          Complaint
        </Link>
      );
    },
  },
  {
    accessorKey: "summary",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Summary" />,
    cell: ({ row }) => <span>{truncateText(row.original.summary, 50)}</span>,
  },
  {
    accessorKey: "date_created",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date Created" />,
    cell: ({ row }) => {
      const value = row.original.created_at;
      return <span>{value ? formatDate(value, "MM/DD/YYYY") : ""}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row.original} />,
  },
];
