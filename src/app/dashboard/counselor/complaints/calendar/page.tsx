import { Event } from "react-big-calendar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatStudentName } from "@/lib/utils";
import { getComplaints } from "@/server/actions/complaint.action";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";

import CalendarForm from "./calendar-form";

async function ComplaintsCalendarPage() {
  const schoolYear = await getDefaultSchoolYear();
  if (!schoolYear) return null;

  const complaints = await getComplaints({});

  const events = complaints
    .filter((item) => item.created_at)
    .map((item) => {
      return {
        id: item.id,
        title: item.place,
        description: item.what_happened,
        start: new Date(item.created_at),
        end: new Date(item.created_at),
      };
    }) as Event[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complaints Calendar</CardTitle>
      </CardHeader>
      <CardContent className="h-screen">
        <CalendarForm events={events} />
      </CardContent>
    </Card>
  );
}
export default ComplaintsCalendarPage;
