"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Grade, Section } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { studentGenders } from "@/contants";
import { getDashboardLink, numberInputKeyDown } from "@/lib/utils";
import { updateStudent } from "@/server/actions/student.action";
import { StudentData, UpdateStudentPayload, updateStudentSchema } from "@/server/schemas/student.schema";

type UpdateStudentFormProps = {
  data: StudentData;
  grades: Grade[];
  sections: Section[];
};

function UpdateStudentForm({ data, grades, sections }: UpdateStudentFormProps) {
  const router = useRouter();
  const form = useForm<UpdateStudentPayload>({
    resolver: zodResolver(updateStudentSchema),
    defaultValues: {
      id: data.id,
      lrn_no: data.lrn_no,
      first_name: data.first_name,
      middle_name: data.middle_name ?? "",
      last_name: data.last_name,
      suffix: data.suffix ?? "",
      gender: data.gender,
      age: `${data.age}`,
      grade_id: data.grade_id ? `${data.grade_id}` : undefined,
      section_id: data.section_id ? `${data.section_id}` : undefined,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: UpdateStudentPayload) {
    const data = await updateStudent(values);

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
      router.push(getDashboardLink("counselor", "/students"));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="lrn_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LRN Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="middle_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={numberInputKeyDown} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {studentGenders.map((item) => (
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
          name="grade_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <Select
                onValueChange={(val) => {
                  form.setValue("section_id", "");
                  field.onChange(val);
                }}
                value={field.value?.toString() || ""}
              >
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
          name="section_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section</FormLabel>
              <Select onValueChange={field.onChange} value={field.value?.toString() || ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sections
                    .filter((item) => item.grade_id === Number(form.getValues().grade_id))
                    .map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.section}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
          <SubmitButton pending={isSubmitting}>Update Student</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
export default UpdateStudentForm;
