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
import { NarrativeReportData } from "@/server/schemas/narrative-report.schema";

import DeleteNarrativeReportForm from "./delete-narrative-report-form";

interface DataTableRowActionsProps {
  row: NarrativeReportData;
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
          <Link href={getDashboardLink("counselor", `/narrative-reports/${row.id}`)}>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setDeleteDialog(true)}>Delete Report</DropdownMenuItem>
          <Link href={getDashboardLink("counselor", `/narrative-reports/${row.id}/print`)}>
            <DropdownMenuItem>Print Report</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteNarrativeReportForm data={row} open={deleteDialog} setOpen={setDeleteDialog} />
    </>
  );
}
export default DataTableRowActions;
