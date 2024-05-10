"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SchoolYear } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { syDefaults } from "@/contants";
import { getDashboardLink } from "@/lib/utils";
import { createGrade } from "@/server/actions/grade-section.action";
import { CreateGradePayload, createGradeSchema } from "@/server/schemas/grade-section.schema";

type CreateGradeFormProps = {
  data: SchoolYear;
};

function CreateGradeForm({ data }: CreateGradeFormProps) {
  const router = useRouter();
  const form = useForm<CreateGradePayload>({
    resolver: zodResolver(createGradeSchema),
    defaultValues: {
      school_year_id: data.id,
      grade: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: CreateGradePayload) {
    const data = await createGrade(values);

    if (data && !data.success) {
      toast({
        variant: "destructive",
        title: data.message,
      });
    } else {
      form.reset();
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
          <Input disabled defaultValue={data.year} />
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <div className="flex items-center gap-2">
          <SubmitButton pending={isSubmitting}>Create</SubmitButton>
          <Button type="button" variant="destructive" disabled={isSubmitting} onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default CreateGradeForm;
