"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { SectionData } from "@/server/schemas/grade-section.schema";

import DataTableRowActions from "./data-table-row-actions";

export const columns: ColumnDef<SectionData>[] = [
  {
    accessorKey: "school_year",
    accessorFn: (row) => `${row.school_year.year}`,
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="School Year" />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "grade",
    accessorFn: (row) => `${row.grade.grade}`,
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Grade" />;
    },
  },
  {
    accessorKey: "section",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Section" />;
    },
  },
  {
    accessorKey: "advisor",
    accessorFn: (row) => {
      if (row.advisor) {
        return `${row.advisor.user.last_name}, ${row.advisor.user.first_name}`;
      }
      return "N/A";
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Advisor" />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row.original} />,
  },
];
