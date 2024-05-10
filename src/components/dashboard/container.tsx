"use client";

import Footer from "@/components/dashboard/footer";
import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import { SideNav } from "@/types";

type DashboardContainerProps = {
  children: React.ReactNode;
  navs: SideNav[];
  loading: boolean;
  user: {
    first_name: string;
    last_name: string;
    role: string;
  };
  schoolYear: string;
};

function DashboardContainer({ children, navs, loading, user, schoolYear }: DashboardContainerProps) {
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
export default DashboardContainer;
