"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { getDashboardLink } from "@/lib/utils";
import { updateSectionById } from "@/server/actions/grade-section.action";
import {
  GradeData,
  SectionData,
  UpdateSectionPayload,
  updateSectionSchema,
} from "@/server/schemas/grade-section.schema";

type UpdateSectionFormProps = {
  grades: GradeData[];
  advisors: {
    id: number;
    first_name: string;
    last_name: string;
    email: string | null;
  }[];
  data: SectionData;
};

function UpdateSectionForm({ grades, advisors, data }: UpdateSectionFormProps) {
  const router = useRouter();
  const form = useForm<UpdateSectionPayload>({
    resolver: zodResolver(updateSectionSchema),
    defaultValues: {
      id: data.id,
      grade_id: `${data.grade_id}`,
      section: data.section,
      advisor_id: data.advisor ? `${data.advisor.user_id}` : null,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: UpdateSectionPayload) {
    const data = await updateSectionById(values);

    if (data && !data.success) {
      toast({
        variant: "destructive",
        title: data.message,
      });
    } else {
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
          <Input disabled defaultValue={data.school_year.year} />
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <SubmitButton pending={isSubmitting}>Save</SubmitButton>
      </form>
    </Form>
  );
}
export default UpdateSectionForm;
