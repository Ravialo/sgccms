"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { complaintStatuses } from "@/contants";
import { updateComplaint } from "@/server/actions/complaint.action";
import { ComplaintData, UpdateComplaintPayload, updateComplaintSchema } from "@/server/schemas/complaint.schema";

type UpdateComplaintFormProps = {
  data: ComplaintData;
};

function UpdateComplaintForm({ data }: UpdateComplaintFormProps) {
  const form = useForm<UpdateComplaintPayload>({
    resolver: zodResolver(updateComplaintSchema),
    defaultValues: {
      id: data.id,
      place: data.place,
      what_happened: data.what_happened,
      what_behavior: data.what_behavior || "",
      behavior_reaction: data.behavior_reaction || "",
      learner_reaction: data.learner_reaction || "",
      recommendation: data.recommendation || "",
      status: data.status,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: UpdateComplaintPayload) {
    const data = await updateComplaint(values);

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
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {complaintStatuses.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormDescription className="text-xs">Put N/A if not applicable.</FormDescription>
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
              <FormDescription className="text-xs">Put N/A if not applicable.</FormDescription>
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
              <FormDescription className="text-xs">Put N/A if not applicable.</FormDescription>
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
              <FormDescription className="text-xs">Put N/A if not applicable.</FormDescription>
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
              <FormDescription className="text-xs">Put N/A if not applicable.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton pending={isSubmitting}>Save</SubmitButton>
      </form>
    </Form>
  );
}
export default UpdateComplaintForm;
