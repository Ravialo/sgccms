"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate, toTitleCase } from "@/lib/utils";
import { AppointmentData } from "@/server/schemas/appointment.schema";

import DataTableRowActions from "./data-table-row-actions";

export const columns: ColumnDef<AppointmentData>[] = [
  {
    accessorKey: "purpose",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Purpose" />,
    enableHiding: false,
  },
  {
    accessorKey: "purpose_details",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Purpose Details" />,
  },
  {
    accessorKey: "contact_no",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Contact No" />,
  },
  {
    accessorKey: "set_by",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Set By" />,
    cell: ({ row }) => {
      const role = row.original.user.role;
      return role === "student" ? <span>You</span> : <span>{toTitleCase(role)}</span>;
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
    header: ({ column }) => <DataTableColumnHeader className="justify-center" column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={cn(
              "uppercase text-[8px]",
              status === "open" && "bg-gray-500 text-white",
              status === "pending" && "bg-yellow-500 text-white",
              status === "closed" && "bg-green-500 text-white",
              status === "cancelled" && "bg-red-500 text-white"
            )}
          >
            {row.getValue("status")}
          </Badge>
        </div>
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
