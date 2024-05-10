"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getDashboardLink } from "@/lib/utils";
import { UserData } from "@/server/schemas/user.schema";

import DeleteUserForm from "./delete-user-form";

interface DataTableRowActionsProps {
  row: UserData;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
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
          <Link href={getDashboardLink("principal", `/users/${row.id}`)}>
            <DropdownMenuItem>Edit User</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setDeleteDialog(true)}>Delete User</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteUserForm data={row} open={deleteDialog} setOpen={setDeleteDialog} />
    </>
  );
}
export default DataTableRowActions;
