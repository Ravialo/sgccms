"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatDate, formatStudentName, toTitleCase } from "@/lib/utils";
import { AppointmentData } from "@/server/schemas/appointment.schema";

type AppointmentDetailsFormProps = {
  data: AppointmentData;
};

function AppointmentDetailsForm({ data }: AppointmentDetailsFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {data.student.first_name && data.student.last_name && (
          <div className="col-span-2 space-y-2">
            <Label>Name</Label>
            <Input disabled defaultValue={formatStudentName(data.student)} />
          </div>
        )}

        {data.student.grade && (
          <div className="space-y-2">
            <Label>Grade</Label>
            <Input disabled defaultValue={`${data.student.grade.grade}`} />
          </div>
        )}

        {data.student.section && (
          <div className="space-y-2">
            <Label>Section</Label>
            <Input disabled defaultValue={`${data.student.section.section}`} />
          </div>
        )}

        {data.status && (
          <div className={cn("space-y-2", !data.date && "col-span-2")}>
            <Label>Status</Label>
            <Input disabled defaultValue={toTitleCase(data.status)} />
          </div>
        )}

        {data.date && (
          <div className="space-y-2">
            <Label>Date</Label>
            <Input disabled defaultValue={formatDate(data.date)} />
          </div>
        )}

        {data.contact_no && (
          <div className="space-y-2 col-span-2">
            <Label>Contact No</Label>
            <Input disabled defaultValue={data.contact_no} />
          </div>
        )}

        {data.purpose && (
          <div className="space-y-2 col-span-2">
            <Label>Purpose</Label>
            <Input disabled defaultValue={data.purpose} />
          </div>
        )}

        {data.purpose_details && (
          <div className="space-y-2 col-span-2">
            <Label>Purpose Details</Label>
            <Textarea disabled defaultValue={data.purpose_details} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentDetailsForm;
