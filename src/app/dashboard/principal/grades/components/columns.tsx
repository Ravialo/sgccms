"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { GradeData } from "@/server/schemas/grade-section.schema";

import DataTableRowActions from "./data-table-row-actions";

export const columns: ColumnDef<GradeData>[] = [
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
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Grade" />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row.original} />,
  },
];
