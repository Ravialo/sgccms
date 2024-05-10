"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { getDashboardLink } from "@/lib/utils";
import { updateGradeById } from "@/server/actions/grade-section.action";
import { GradeData, UpdateGradePayload, updateGradeSchema } from "@/server/schemas/grade-section.schema";

type UpdateGradeFormProps = {
  data: GradeData;
};

function UpdateGradeForm({ data }: UpdateGradeFormProps) {
  const router = useRouter();
  const form = useForm<UpdateGradePayload>({
    resolver: zodResolver(updateGradeSchema),
    defaultValues: {
      id: data.id,
      grade: data.grade,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: UpdateGradePayload) {
    const data = await updateGradeById(values);

    if (data && !data.success) {
      toast({
        variant: "destructive",
        title: data.message,
      });
    } else {
      toast({
        title: data.message,
      });
      router.push(getDashboardLink("principal", "/grades"));
    }
  }

  return (
    <Form {...form}>
      <div className="mb-4">
        <div className="flex flex-col gap-2">
          <Label>School Year</Label>
          <Input disabled defaultValue={data.school_year.year} />
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton pending={isSubmitting}>Save</SubmitButton>
      </form>
    </Form>
  );
}
export default UpdateGradeForm;
