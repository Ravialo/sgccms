"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { cn, formatGradeSection, toTitleCase } from "@/lib/utils";
import { UserData } from "@/server/schemas/user.schema";

import DataTableRowActions from "./data-table-row-actions";

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
    enableHiding: false,
  },
  {
    accessorKey: "fullname",
    accessorFn: (row) => `${row.last_name}, ${row.first_name}`,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Full Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => <span>{toTitleCase(row.original.role)}</span>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "grade_section",
  //   accessorFn: (row) => (row.advisor ? `${formatGradeSection(row.advisor.section.grade, row.advisor.section)}` : ""),
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Grade & Section" />,
  // },
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
