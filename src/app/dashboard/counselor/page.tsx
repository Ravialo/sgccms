import { CalendarCheckIcon, FilesIcon, MessageSquareWarningIcon, UsersIcon } from "lucide-react";

import DashboardStat from "@/components/dashboard-stat";
import {
  getTotalAppointments,
  getTotalComplaints,
  getTotalCounselorReports,
  getTotalNarrativeReports,
  getTotalStudents,
} from "@/server/actions/dashboard.action";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";

async function DashboardPage() {
  const schoolYear = await getDefaultSchoolYear();
  if (!schoolYear) return null;

  const totalStudents = await getTotalStudents({
    school_year_id: schoolYear.id,
  });
  const totalAppointments = await getTotalAppointments({
    school_year_id: schoolYear.id,
  });
  const totalComplaints = await getTotalComplaints({
    school_year_id: schoolYear.id,
  });
  const totalCounselorReports = await getTotalCounselorReports({
    school_year_id: schoolYear.id,
  });
  const totalNarrativeReports = await getTotalNarrativeReports({
    school_year_id: schoolYear.id,
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DashboardStat title="Total Students" value={totalStudents} icon={UsersIcon} />
      <DashboardStat title="Total Appointments" value={totalAppointments} icon={CalendarCheckIcon} />
      <DashboardStat title="Total Complaints" value={totalComplaints} icon={MessageSquareWarningIcon} />
      <DashboardStat title="Total Narrative Reports" value={totalCounselorReports} icon={FilesIcon} />
      <DashboardStat title="Total Counselor Reports" value={totalNarrativeReports} icon={FilesIcon} />
    </div>
  );
}
export default DashboardPage;
