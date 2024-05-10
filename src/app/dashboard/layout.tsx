"use client";

import { useEffect, useState } from "react";

import Footer from "@/components/dashboard/footer";
import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import { sidebarNavs } from "@/contants";
import { toTitleCase } from "@/lib/utils";
import { getSession } from "@/server/actions/auth.action";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";
import { SideNav } from "@/types";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [navs, setNavs] = useState<SideNav[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    role: "",
  });
  const [schoolYear, setSchoolYear] = useState("");

  useEffect(() => {
    async function getUserAndNavs() {
      setLoading(true);
      const session = await getSession();

      if (session) {
        setNavs(sidebarNavs[session.role]);
        setUser({
          first_name: session.first_name || "",
          last_name: session.last_name || "",
          role: toTitleCase(session.role),
        });

        const sy = await getDefaultSchoolYear();
        setSchoolYear(sy!.year);
      }
      setLoading(false);
    }
    getUserAndNavs();
  }, []);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr]">
      <Sidebar navs={navs} loading={loading} />
      <div className="flex flex-col">
        <Navbar navs={navs} user={user} />
        <main className="flex-1 p-6">{children}</main>
        <Footer role={user.role} schoolYear={schoolYear} currentYear={new Date().getFullYear().toString()} />
      </div>
    </div>
  );
}
export default DashboardLayout;
