"use client";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StudentData } from "@/server/schemas/student.schema";

interface DataTableRowActionsProps {
  row: StudentData;
}

function DataTableRowActions({ row }: DataTableRowActionsProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Link href={`/dashboard/counselor/students/${row.id}`}>
            <DropdownMenuItem>Edit Student</DropdownMenuItem>
          </Link>
          <Link href={`/dashboard/counselor/students/create-appointment?student_id=${row.id}`}>
            <DropdownMenuItem>Create Appointment</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
export default DataTableRowActions;
