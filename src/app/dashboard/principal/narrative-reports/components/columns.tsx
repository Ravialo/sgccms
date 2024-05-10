"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { convertTo12HourFormat, formatDate, formatStudentName, getDashboardLink } from "@/lib/utils";
import { NarrativeReportData } from "@/server/schemas/narrative-report.schema";

import DataTableRowActions from "./data-table-row-actions";

export const columns: ColumnDef<NarrativeReportData>[] = [
  {
    accessorKey: "case_report_no",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Case Report No" />,
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
    accessorKey: "incident",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Incident" />,
  },
  {
    accessorKey: "reported_by",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reported By" />,
  },
  {
    accessorKey: "date_reported",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const value = row.original.date_reported;
      return <span>{value ? formatDate(value, "MM/DD/YYYY") : ""}</span>;
    },
  },
  {
    accessorKey: "time_reported",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Time" />,
    cell: ({ row }) => {
      const value = row.original.time_reported;
      return <span>{value ? convertTo12HourFormat(value) : ""}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row.original} />,
  },
];
