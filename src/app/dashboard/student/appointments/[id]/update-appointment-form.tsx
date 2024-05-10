"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { appointmentCounsellings, appointmentPurposes } from "@/contants";
import { cn, formatDate, formatStudentName, toTitleCase } from "@/lib/utils";
import { updateAppointment } from "@/server/actions/appointment.action";
import {
  AppointmentData,
  UpdateAppointmentPayload,
  updateAppointmentSchema,
} from "@/server/schemas/appointment.schema";

type UpdateAppointmentFormProps = {
  data: AppointmentData;
};

function UpdateAppointmentForm({ data }: UpdateAppointmentFormProps) {
  const form = useForm<UpdateAppointmentPayload>({
    resolver: zodResolver(updateAppointmentSchema),
    defaultValues: {
      id: data.id,
      contact_no: data.contact_no || "",
      purpose: data.purpose,
      purpose_details: data.purpose_details || "",
      status: data.status,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: UpdateAppointmentPayload) {
    const data = await updateAppointment(values);

    if (data && !data.success) {
      toast({
        variant: "destructive",
        title: data.message,
      });
    } else {
      toast({
        title: data.message,
      });
    }
  }

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
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="contact_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact No</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Purpose" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {appointmentPurposes.map((purpose) => (
                      <SelectItem key={purpose.value} value={purpose.value}>
                        {purpose.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("purpose") === "Counselling" && (
            <FormField
              control={form.control}
              name="purpose_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Counselling Options</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Counselling Options" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appointmentCounsellings.map((counsellingOption) => (
                        <SelectItem key={counsellingOption.value} value={counsellingOption.value}>
                          {counsellingOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {(form.watch("purpose") === "Referred" || form.watch("purpose") === "Inquiry") && (
            <FormField
              control={form.control}
              name="purpose_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {form.watch("purpose") === "Others" && (
            <FormField
              control={form.control}
              name="purpose_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Details</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <SubmitButton pending={isSubmitting}>Save</SubmitButton>
        </form>
      </Form>
    </div>
  );
}

export default UpdateAppointmentForm;
