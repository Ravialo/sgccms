"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { getDashboardLink } from "@/lib/utils";
import { createCounselorReport } from "@/server/actions/counselor-report.action";
import { ComplaintData } from "@/server/schemas/complaint.schema";
import { CreateCounselorReportPayload, createCounselorReportSchema } from "@/server/schemas/counselor-report.schema";

type CreateCounselorReportFormProps = {
  data: ComplaintData;
};

function CreateCounselorReportForm({ data }: CreateCounselorReportFormProps) {
  const router = useRouter();
  const form = useForm<CreateCounselorReportPayload>({
    resolver: zodResolver(createCounselorReportSchema),
    defaultValues: {
      school_year_id: data.school_year_id,
      student_id: data.student_id,
      complaint_id: data.id,
      summary: "",
      recommendations: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: CreateCounselorReportPayload) {
    const data = await createCounselorReport(values);

    if (data && !data.success) {
      toast({
        variant: "destructive",
        title: data.message,
      });
    } else {
      toast({
        title: data.message,
      });
      router.push(getDashboardLink("counselor", "/counselor-reports"));
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
                <Input {...field} />
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
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
          <SubmitButton pending={isSubmitting}>Create</SubmitButton>
          <Button type="button" disabled={isSubmitting} variant="destructive" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateCounselorReportForm;
