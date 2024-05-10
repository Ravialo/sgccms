"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { formatStudentName } from "@/lib/utils";
import { createComplaint } from "@/server/actions/complaint.action";
import { CreateComplaintPayload, createComplaintSchema } from "@/server/schemas/complaint.schema";
import { StudentData } from "@/server/schemas/student.schema";

type CreateComplaintFormProps = {
  data: StudentData | null;
};

function CreateComplaintForm({ data }: CreateComplaintFormProps) {
  const router = useRouter();
  const form = useForm<CreateComplaintPayload>({
    resolver: zodResolver(createComplaintSchema),
    defaultValues: {
      student_id: data?.id || 0,
      place: "",
      what_happened: "",
      what_behavior: "",
      behavior_reaction: "",
      learner_reaction: "",
      recommendation: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: CreateComplaintPayload) {
    const data = await createComplaint(values);

    if (data && !data.success) {
      toast({
        variant: "destructive",
        title: data.message,
      });
    } else {
      toast({
        title: data.message,
      });
      form.reset();
      router.push("/dashboard/advisor/complaints");
    }
  }

  return (
    <Form {...form}>
      <div className="grid gap-4 mb-4">
        {data && (
          <div className="col-span-2 space-y-2">
            <Label>Student Name</Label>
            <Input disabled defaultValue={formatStudentName(data)} />
          </div>
        )}
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Place</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="what_happened"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What happened?</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="what_behavior"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What behavior was manifested?</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="behavior_reaction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did you react/respond to the manifested behavior?</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="learner_reaction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did the learner react/respond to others?</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recommendation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recommendation/s</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          <SubmitButton pending={isSubmitting}>Create</SubmitButton>
          <Button type="button" variant="destructive" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default CreateComplaintForm;
