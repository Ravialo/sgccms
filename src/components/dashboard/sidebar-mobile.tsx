"use client";

import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SideNav } from "@/types";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import SidebarLogo from "./sidebar-logo";
import SidebarNav from "./sidebar-nav";

type SidebarMobileProps = {
  navs: SideNav[];
};
function SidebarMobile({ navs }: SidebarMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <SidebarLogo />
          {navs.map((item, index) => (
            <div key={index}>
              {item.header ? (
                <h1 className="text-muted-foreground mt-2 font-normal">{item.header}</h1>
              ) : item.separator ? (
                <Separator />
              ) : (
                <SidebarNav path={item.path} label={item.label} icon={item.icon} />
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
export default SidebarMobile;
