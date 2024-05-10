"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";
import { SideNav } from "@/types";

type SidebarNavProps = SideNav;
function SidebarNav({ path, label, icon }: SidebarNavProps) {
  const pathname = usePathname();
  const Icon = icon;

  return (
    <Link
      href={path || "#"}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all group",
        pathname === path && "bg-muted font-semibold"
      )}
    >
      {Icon && (
        <div
          className={cn(
            "border rounded-sm p-1",
            "group-hover:bg-primary group-hover:text-white",
            "dark:group-hover:bg-primary-foreground dark:group-hover:text-white",
            pathname === path && "bg-primary text-white dark:bg-primary-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      )}
      <span className={cn("text-primary/85 group-hover:text-primary dark:group-hover:text-white")}>{label}</span>
    </Link>
  );
}
export default SidebarNav;
