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
import { getDashboardLink } from "@/lib/utils";
import { ComplaintData } from "@/server/schemas/complaint.schema";

interface DataTableRowActionsProps {
  row: ComplaintData;
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
          <Link href={getDashboardLink("counselor", `/complaints/${row.id}`)}>
            <DropdownMenuItem>View Complaint</DropdownMenuItem>
          </Link>
          <Link href={getDashboardLink("counselor", `/complaints/${row.id}/create-counselor-report`)}>
            <DropdownMenuItem>Create Counselor Report</DropdownMenuItem>
          </Link>
          <Link href={getDashboardLink("counselor", `/complaints/${row.id}/create-narrative-report`)}>
            <DropdownMenuItem>Create Narrative Report</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
export default DataTableRowActions;
