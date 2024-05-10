"use client";

import "react-big-calendar/lib/css/react-big-calendar.css";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Calendar, dayjsLocalizer, Event, Views } from "react-big-calendar";

import { getDashboardLink } from "@/lib/utils";

const localizer = dayjsLocalizer(dayjs);

type CalendarFormProps = {
  events: Event[];
};
function CalendarForm({ events }: CalendarFormProps) {
  const router = useRouter();

  const handleSelectEvent = useCallback(
    (event: any) => {
      router.push(getDashboardLink("advisor", `/complaints/${event.id}`));
    },
    [router]
  );

  const handleSelectSlot = useCallback(() => {
    const confirm = window.confirm("To create complaints, go to the students page. Proceed?");
    if (confirm) {
      router.push(getDashboardLink("advisor", "/students"));
    }
  }, [router]);

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(),
    }),
    []
  );

  return (
    <Calendar
      defaultDate={defaultDate}
      localizer={localizer}
      events={events}
      selectable
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
      defaultView={Views.MONTH}
      scrollToTime={scrollToTime}
    />
  );
}
export default CalendarForm;
