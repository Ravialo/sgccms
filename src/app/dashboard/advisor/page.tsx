import { MessageSquareWarningIcon } from "lucide-react";

import DashboardStat from "@/components/dashboard-stat";
import { getSession } from "@/server/actions/auth.action";
import { getTotalComplaints } from "@/server/actions/dashboard.action";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";

async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const schoolYear = await getDefaultSchoolYear();
  if (!schoolYear) return null;

  const totalComplaints = await getTotalComplaints({
    user_id: session.id,
    school_year_id: schoolYear.id,
  });
  const totalOpenComplaints = await getTotalComplaints({
    status: "open",
    user_id: session.id,
    school_year_id: schoolYear.id,
  });
  const totalPendingComplaints = await getTotalComplaints({
    status: "pending",
    user_id: session.id,
    school_year_id: schoolYear.id,
  });
  const totalClosedComplaints = await getTotalComplaints({
    status: "closed",
    user_id: session.id,
    school_year_id: schoolYear.id,
  });
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardStat title="Complaints" value={totalComplaints} icon={MessageSquareWarningIcon} />
      <DashboardStat title="Open Complaints" value={totalOpenComplaints} icon={MessageSquareWarningIcon} />
      <DashboardStat title="Pending Complaints" value={totalPendingComplaints} icon={MessageSquareWarningIcon} />
      <DashboardStat title="Closed Complaints" value={totalClosedComplaints} icon={MessageSquareWarningIcon} />
    </div>
  );
}
export default DashboardPage;
