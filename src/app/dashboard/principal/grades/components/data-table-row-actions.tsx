"use client";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getDashboardLink } from "@/lib/utils";
import { GradeData } from "@/server/schemas/grade-section.schema";

import DeleteGradeForm from "./delete-grade-form";

interface DataTableRowActionsProps {
  row: GradeData;
}

function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [deleteDialog, setDeleteDialog] = useState(false);
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
          <Link href={getDashboardLink("principal", `/grades/${row.id}`)}>
            <DropdownMenuItem>Grade Details</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setDeleteDialog(true)}>Delete Grade</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteGradeForm data={row} open={deleteDialog} setOpen={setDeleteDialog} />
    </>
  );
}
export default DataTableRowActions;
