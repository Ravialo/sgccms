import { Event } from "react-big-calendar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAppointments } from "@/server/actions/appointment.action";
import { getSession } from "@/server/actions/auth.action";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";

import CalendarForm from "./calendar-form";

async function AppointmentsCalendarPage() {
  const session = await getSession();
  if (!session || !session.student?.id) return null;

  const schoolYear = await getDefaultSchoolYear();
  if (!schoolYear) return null;

  const appointments = await getAppointments({ student_id: session.student?.id, school_year_id: schoolYear.id });

  const events = appointments
    .filter((item) => item.date)
    .map((item) => {
      return {
        id: item.id,
        title: item.purpose,
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
