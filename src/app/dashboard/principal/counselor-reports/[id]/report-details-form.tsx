"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PrinterIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import ButtonLink from "@/components/button-link";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { getDashboardLink } from "@/lib/utils";
import { updateCounselorReportById } from "@/server/actions/counselor-report.action";
import {
  CounselorReportData,
  UpdateCounselorReportPayload,
  updateCounselorReportSchema,
} from "@/server/schemas/counselor-report.schema";

type ReportDetailsPageProps = {
  data: CounselorReportData;
};

function ReportDetailsPage({ data }: ReportDetailsPageProps) {
  const form = useForm<UpdateCounselorReportPayload>({
    resolver: zodResolver(updateCounselorReportSchema),
    defaultValues: {
      id: data.id,
      summary: data.summary,
      recommendations: data.recommendations,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: UpdateCounselorReportPayload) {
    const data = await updateCounselorReportById(values);

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recommendations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recommendations</FormLabel>
              <FormControl>
                <Textarea disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <SubmitButton pending={isSubmitting}>Save</SubmitButton> */}
        <div className="flex items-center gap-2">
          <ButtonLink href={getDashboardLink("principal", `/counselor-reports/${data.id}/print`)} icon={PrinterIcon}>
            Print
          </ButtonLink>
        </div>
      </form>
    </Form>
  );
}

export default ReportDetailsPage;
