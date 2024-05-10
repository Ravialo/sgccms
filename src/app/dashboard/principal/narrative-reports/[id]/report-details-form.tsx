"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PrinterIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ButtonLink from "@/components/button-link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { getDashboardLink } from "@/lib/utils";
import { updateNarrativeReportById } from "@/server/actions/narrative-report.action";
import {
  NarrativeReportData,
  UpdateNarrativeReportPayload,
  updateNarrativeReportSchema,
} from "@/server/schemas/narrative-report.schema";
import { StudentData } from "@/server/schemas/student.schema";

type ReportDetailsFormProps = {
  data: NarrativeReportData;
};

function ReportDetailsForm({ data }: ReportDetailsFormProps) {
  const [parties] = useState<StudentData[]>(data.narrativeReportParties.map((party) => party.student));

  const form = useForm<UpdateNarrativeReportPayload>({
    resolver: zodResolver(updateNarrativeReportSchema),
    defaultValues: {
      id: data.id,
      incident: data.incident,
      date_reported: data.date_reported,
      time_reported: data.time_reported,
      detail_of_event: data.detail_of_event,
      action_taken: data.action_taken,
      summary: data.summary,
    },
  });

  async function onSubmit(values: UpdateNarrativeReportPayload) {
    const data = await updateNarrativeReportById({
      ...values,
      parties: parties.map((party) => party.id),
    });

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
    <>
      <Form {...form}>
        <div className="mb-4 space-y-4">
          <div className="flex flex-col gap-2">
            <Label>Case Report No</Label>
            <Input disabled defaultValue={data.case_report_no} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Reported By</Label>
            <Input disabled defaultValue={data.reported_by} />
          </div>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="incident"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Incident</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_reported"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Report</FormLabel>
                <FormControl>
                  <Input type="date" disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time_reported"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="detail_of_event"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detail of Event</FormLabel>
                <FormControl>
                  <Textarea disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="action_taken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action Taken</FormLabel>
                <FormControl>
                  <Textarea disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-2 max-w-[500px]">
            <Label>Parties Involved</Label>
            <div className="space-y-2">
              {parties.length > 0 &&
                parties.map((item, index) => (
                  <div key={index} className="flex items-center justify-between gap-2">
                    <div className="border rounded-sm w-full p-2">
                      <h3 className="text-sm">{`${item.last_name}, ${item.first_name} (${item.grade.grade} - ${item.section.section})`}</h3>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ButtonLink href={getDashboardLink("principal", `/narrative-reports/${data.id}/print`)} icon={PrinterIcon}>
              Print
            </ButtonLink>
          </div>
        </form>
      </Form>
    </>
  );
}

export default ReportDetailsForm;
