"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { cn, formatGradeSection, formatStudentName, truncateText } from "@/lib/utils";
import { ComplaintData } from "@/server/schemas/complaint.schema";

import DataTableRowActions from "./data-table-row-actions";

export const columns: ColumnDef<ComplaintData>[] = [
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
    accessorFn: (row) => formatGradeSection(row.student.grade, row.student.section),
    header: ({ column }) => <DataTableColumnHeader column={column} title="Grade & Section" />,
  },
  {
    accessorKey: "place",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Place" />,
    cell: ({ row }) => <span title={row.original.place}>{truncateText(row.original.place, 50)}</span>,
  },
  {
    accessorKey: "what_happened",
    header: ({ column }) => <DataTableColumnHeader column={column} title="What Happened" />,
    cell: ({ row }) => <span title={row.original.what_happened}>{truncateText(row.original.what_happened, 50)}</span>,
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
    cell: ({ row }) => {
      const data = row.original as ComplaintData;
      return <DataTableRowActions row={data} />;
    },
  },
];
