"use client";

import { useState } from "react";

import { signOut } from "@/server/actions/auth.action";
import { SideNav } from "@/types";

import { ModeToggle } from "../mode-toggle";
import NavbarUser from "./navbar-user";
import SidebarMobile from "./sidebar-mobile";

type NavbarProps = {
  navs: SideNav[];
  user: {
    first_name: string;
    last_name: string;
    role: string;
  };
};

function Navbar({ navs, user }: NavbarProps) {
  const [logoutDialog, setLogoutDialog] = useState(false);

  async function logout() {
    await signOut();
    setLogoutDialog(false);
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <SidebarMobile navs={navs} />
      {/* navbar items */}
      <div className="w-full flex-1"></div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <NavbarUser user={user} logoutDialog={logoutDialog} setLogoutDialog={setLogoutDialog} logout={() => logout()} />
      </div>
    </header>
  );
}
export default Navbar;
