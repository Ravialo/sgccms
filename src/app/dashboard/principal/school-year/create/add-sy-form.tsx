"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { syDefaults } from "@/contants";
import { getDashboardLink } from "@/lib/utils";
import { createSchoolYear } from "@/server/actions/school-year.action";
import { CreateSchoolYearPayload, createSchoolYearSchema } from "@/server/schemas/school-year.schema";

function CreateSyForm() {
  const router = useRouter();
  const form = useForm<CreateSchoolYearPayload>({
    resolver: zodResolver(createSchoolYearSchema),
    defaultValues: {
      year: "",
      default: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: CreateSchoolYearPayload) {
    const data = await createSchoolYear(values);

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
      router.push(getDashboardLink("principal", "/school-year"));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Year</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="default"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Default" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {syDefaults.map((item) => (
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
        <SubmitButton pending={isSubmitting}>Create</SubmitButton>
      </form>
    </Form>
  );
}
export default CreateSyForm;
