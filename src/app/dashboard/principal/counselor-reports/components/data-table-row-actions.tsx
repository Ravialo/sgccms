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

interface DataTableRowActionsProps {
  row: CounselorReportData;
}

function DataTableRowActions({ row }: DataTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Link href={getDashboardLink("principal", `/counselor-reports/${row.id}`)}>
          <DropdownMenuItem>View Details</DropdownMenuItem>
        </Link>
        <Link href={getDashboardLink("principal", `/counselor-reports/${row.id}/print`)}>
          <DropdownMenuItem>Print Report</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default DataTableRowActions;
