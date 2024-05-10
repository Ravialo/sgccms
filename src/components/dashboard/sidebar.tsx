"use client";

import { SideNav } from "@/types";

import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import SidebarLogo from "./sidebar-logo";
import SidebarNav from "./sidebar-nav";

type SidebarProps = {
  navs: SideNav[];
  loading: boolean;
};

function Sidebar({ navs, loading }: SidebarProps) {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <SidebarLogo />
        </div>
        <div className="flex-1">
          {loading && (
            <nav className="flex flex-col gap-2 px-6">
              <Skeleton className="w-full h-10 rounded-sm" />
              <Skeleton className="w-full h-10 rounded-sm" />
              <Skeleton className="w-full h-10 rounded-sm" />
              <Skeleton className="w-full h-10 rounded-sm" />
            </nav>
          )}
          {!loading && (
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navs.map((item, index) => (
                <div key={index}>
                  {item.header ? (
                    <h1 className="text-muted-foreground mt-2 font-normal">{item.header}</h1>
                  ) : item.separator ? (
                    <Separator className="my-4" />
                  ) : (
                    <SidebarNav path={item.path} label={item.label} icon={item.icon} />
                  )}
                </div>
              ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
