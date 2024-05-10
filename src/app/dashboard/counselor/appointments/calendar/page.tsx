import { Event } from "react-big-calendar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAppointments } from "@/server/actions/appointment.action";

import CalendarForm from "./calendar-form";

async function AppointmentsCalendarPage() {
  const appointments = await getAppointments({});

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
