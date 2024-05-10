"use client";

import { SchoolYear } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Badge } from "@/components/ui/badge";

import DataTableRowActions from "./data-table-row-actions";

export const columns: ColumnDef<SchoolYear>[] = [
  {
    accessorKey: "year",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Year" />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "default",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Default" />,
    cell: ({ row }) => {
      const value = row.original.default;

      return value === "yes" ? <Badge variant="outline">Default</Badge> : null;
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
