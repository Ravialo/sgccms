"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { extractInitials } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type NavbarUserProps = {
  photo?: string;
  user: {
    first_name: string;
    last_name: string;
    role: string;
  };
  logout?: () => void;
  logoutDialog: boolean;
  setLogoutDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function NavbarUser({ photo, user, logout, logoutDialog, setLogoutDialog }: NavbarUserProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={photo} alt="user-image" />
            <AvatarFallback className="bg-green-900 text-white">
              {extractInitials(`${user.first_name} ${user.last_name}`)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[200px]">
          <DropdownMenuLabel className="font-normal">
            <div className="flex justify-start items-center gap-2">
              <Avatar>
                <AvatarImage src={photo} alt="user-image" />
                <AvatarFallback className="bg-green-900 text-white">
                  {extractInitials(`${user.first_name} ${user.last_name}`)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium leading-none">{`${user.first_name} ${user.last_name}`}</p>
                <p className="text-xs font-medium">Role: {user.role}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/dashboard/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setLogoutDialog(true)}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={logoutDialog} onOpenChange={setLogoutDialog}>
        <AlertDialogContent className="sm:max-w-[350px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to logout?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setLogoutDialog(false)}>No</AlertDialogCancel>
            <AlertDialogAction onClick={logout}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
export default NavbarUser;
