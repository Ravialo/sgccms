"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { cn, formatGradeSection, formatStudentName, toTitleCase } from "@/lib/utils";
import { StudentData } from "@/server/schemas/student.schema";

import DataTableRowActions from "./data-table-row-actions";

export const columns: ColumnDef<StudentData>[] = [
  {
    accessorKey: "school_year",
    accessorFn: (row) => `${row.school_year.year}`,
    header: ({ column }) => <DataTableColumnHeader column={column} title="School Year" />,
    enableHiding: false,
  },
  {
    accessorKey: "lrn_no",
    header: ({ column }) => <DataTableColumnHeader column={column} title="LRN No" />,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    accessorFn: (row) => formatStudentName(row),
    header: ({ column }) => <DataTableColumnHeader column={column} title="Student Name" />,
  },
  {
    accessorKey: "grade_section",
    accessorFn: (row) => formatGradeSection(row.grade, row.section),
    header: ({ column }) => <DataTableColumnHeader column={column} title="Grade & Section" />,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Gender" />,
    cell: ({ row }) => <span>{toTitleCase(row.original.gender)}</span>,
  },
  {
    accessorKey: "age",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Age" />,
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
            status === "inactive" && "bg-gray-500 text-white",
            status === "active" && "bg-green-500 text-white"
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
