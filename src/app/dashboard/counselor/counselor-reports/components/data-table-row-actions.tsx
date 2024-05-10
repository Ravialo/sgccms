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
import { CounselorReportData } from "@/server/schemas/counselor-report.schema";

import DeleteCounselorReportForm from "./delete-counselor-report-form";

interface DataTableRowActionsProps {
  row: CounselorReportData;
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
          <Link href={getDashboardLink("counselor", `/counselor-reports/${row.id}`)}>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setDeleteDialog(true)}>Delete Report</DropdownMenuItem>
          <Link href={getDashboardLink("counselor", `/counselor-reports/${row.id}/print`)}>
            <DropdownMenuItem>Print Report</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteCounselorReportForm data={row} open={deleteDialog} setOpen={setDeleteDialog} />
    </>
  );
}
export default DataTableRowActions;
