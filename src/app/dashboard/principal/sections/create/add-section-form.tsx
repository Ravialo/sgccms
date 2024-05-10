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
import { getDashboardLink } from "@/lib/utils";
import { createSection } from "@/server/actions/grade-section.action";
import { CreateSectionPayload, createSectionSchema, GradeData } from "@/server/schemas/grade-section.schema";

type CreateSectionFormProps = {
  schoolYear: SchoolYear;
  grades: GradeData[];
  advisors: {
    id: number;
    first_name: string;
    last_name: string;
    email: string | null;
  }[];
};

function CreateSectionForm({ schoolYear, grades, advisors }: CreateSectionFormProps) {
  const router = useRouter();
  const form = useForm<CreateSectionPayload>({
    resolver: zodResolver(createSectionSchema),
    defaultValues: {
      school_year_id: schoolYear.id,
      grade_id: undefined,
      section: "",
      advisor_id: null,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: CreateSectionPayload) {
    const data = await createSection(values);

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
      router.push(getDashboardLink("principal", "/sections"));
    }
  }

  return (
    <Form {...form}>
      <div className="mb-4">
        <div className="flex flex-col gap-2">
          <Label>School Year</Label>
          <Input disabled defaultValue={schoolYear.year} />
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="grade_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Grade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {grades.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.grade}
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
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="advisor_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Advisor</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Advisor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {advisors.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {`${item.first_name} ${item.last_name}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
export default CreateSectionForm;
