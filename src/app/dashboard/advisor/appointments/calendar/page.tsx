import { Event } from "react-big-calendar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatStudentName } from "@/lib/utils";
import { getAppointments } from "@/server/actions/appointment.action";
import { getSession } from "@/server/actions/auth.action";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";

import CalendarForm from "./calendar-form";

async function AppointmentsCalendarPage() {
  const schoolYear = await getDefaultSchoolYear();
  if (!schoolYear) return null;

  const appointments = await getAppointments({ school_year_id: schoolYear.id });

  const events = appointments
    .filter((item) => item.date)
    .map((item) => {
      return {
        id: item.id,
        title: `${formatStudentName(item.student)} - ${item.purpose}`,
        description: item.purpose_details,
        start: item.date && new Date(item.date),
        end: item.date && new Date(item.date),
      };
    }) as Event[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments Calendar</CardTitle>
      </CardHeader>
      <CardContent className="h-screen">
        <CalendarForm events={events} />
      </CardContent>
    </Card>
  );
}
export default AppointmentsCalendarPage;
