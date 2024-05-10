"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate, formatStudentName, toTitleCase, truncateText } from "@/lib/utils";
import { AppointmentData } from "@/server/schemas/appointment.schema";

import DataTableRowActions from "./data-table-row-actions";

export const columns: ColumnDef<AppointmentData>[] = [
  {
    accessorKey: "lrn_no",
    accessorFn: (row) => `${row.student.lrn_no}`,
    header: ({ column }) => <DataTableColumnHeader column={column} title="LRN No" />,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    accessorFn: (row) => formatStudentName(row.student),
    header: ({ column }) => <DataTableColumnHeader column={column} title="Student Name" />,
  },
  {
    accessorKey: "grade_section",
    accessorFn: (row) => `${row.student.grade.grade} - ${row.student?.section.section}`,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Grade & Section" />,
  },
  {
    accessorKey: "purpose",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Purpose" />,
  },
  {
    accessorKey: "set_by",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Set By" />,
    cell: ({ row }) => {
      const role = row.original.user.role;
      return <span>{toTitleCase(role)}</span>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const value = row.original.date;
      return value ? <span>{formatDate(value)}</span> : "";
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant="outline"
          className={cn(
            "uppercase text-[8px]",
            status === "open" && "bg-gray-500 text-white",
            status === "pending" && "bg-yellow-500 text-white",
            status === "closed" && "bg-green-500 text-white"
          )}
        >
          {row.getValue("status")}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row.original} />,
  },
];
