import { Calendar } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getAppointments } from "@/server/actions/appointment.action";
import { getSession } from "@/server/actions/auth.action";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";
import { getStudentIdByUserId } from "@/server/actions/user.action";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

async function AppointmentsPage() {
  const session = await getSession();
  if (!session || !session.student?.id) return null;

  const schoolYear = await getDefaultSchoolYear();
  if (!schoolYear) return null;

  const items = await getAppointments({ student_id: session.student?.id, school_year_id: schoolYear.id });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Appointments</CardTitle>
        <Link href={getDashboardLink("student", "/appointments/calendar")}>
          <Button>
            <Calendar className="mr-2" /> Calendar
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={items} />
      </CardContent>
    </Card>
  );
}
export default AppointmentsPage;
