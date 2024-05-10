import { CalendarCheckIcon } from "lucide-react";

import DashboardStat from "@/components/dashboard-stat";
import { getSession } from "@/server/actions/auth.action";
import { getTotalAppointments } from "@/server/actions/dashboard.action";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";

async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const student = session.student;
  if (!student) {
    return null;
  }

  const schoolYear = await getDefaultSchoolYear();
  if (!schoolYear) return null;

  const totalAppointments = await getTotalAppointments({
    student_id: student.id,
  });
  const totalOpenAppointments = await getTotalAppointments({
    status: "open",
    student_id: student.id,
    school_year_id: schoolYear.id,
  });
  const totalPendingAppointments = await getTotalAppointments({
    status: "pending",
    student_id: student.id,
    school_year_id: schoolYear.id,
  });
  const totalClosedAppointments = await getTotalAppointments({
    status: "closed",
    student_id: student.id,
    school_year_id: schoolYear.id,
  });
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardStat title="Appointments" value={totalAppointments} icon={CalendarCheckIcon} />
      <DashboardStat title="Open Appointments" value={totalOpenAppointments} icon={CalendarCheckIcon} />
      <DashboardStat title="Pending Appointments" value={totalPendingAppointments} icon={CalendarCheckIcon} />
      <DashboardStat title="Closed Appointments" value={totalClosedAppointments} icon={CalendarCheckIcon} />
    </div>
  );
}
export default DashboardPage;
