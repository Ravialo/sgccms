"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SchoolYear } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { syDefaults, userRoles } from "@/contants";
import { getDashboardLink } from "@/lib/utils";
import { updateSchoolYear } from "@/server/actions/school-year.action";
import { UpdateSchoolYearPayload, updateSchoolYearSchema } from "@/server/schemas/school-year.schema";

type UpdateUserFormProps = {
  data: SchoolYear;
};

function UpdateUserForm({ data }: UpdateUserFormProps) {
  const router = useRouter();
  const form = useForm<UpdateSchoolYearPayload>({
    resolver: zodResolver(updateSchoolYearSchema),
    defaultValues: {
      id: data.id,
      year: data.year,
      default: data.default,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: UpdateSchoolYearPayload) {
    const data = await updateSchoolYear(values);

    if (data && !data.success) {
      toast({
        variant: "destructive",
        title: data.message,
      });
    } else {
      toast({
        title: data.message,
      });
      router.push(getDashboardLink("principal", "/school-year"));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
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

        <SubmitButton pending={isSubmitting}>Save</SubmitButton>
      </form>
    </Form>
  );
}
export default UpdateUserForm;
