"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { appointmentCounsellings, appointmentPurposes } from "@/contants";
import { createAppointment } from "@/server/actions/appointment.action";
import { CreateAppointmentPayload, createAppointmentSchema } from "@/server/schemas/appointment.schema";
import { StudentData } from "@/server/schemas/student.schema";

type CreateAppointFormProps = {
  data: StudentData;
};

function CreateAppointForm({ data }: CreateAppointFormProps) {
  const router = useRouter();
  const form = useForm<CreateAppointmentPayload>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      student_id: data.id,
      contact_no: "",
      purpose: "",
      purpose_details: "",
      status: "open",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: CreateAppointmentPayload) {
    const data = await createAppointment(values);

    if (data && !data.success) {
      toast({
        variant: "destructive",
        title: data.message,
      });
    } else {
      form.reset();
      router.push("/dashboard/student/appointments");
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {data.first_name && data.last_name && (
          <div className="col-span-2 space-y-2">
            <Label>Name</Label>
            <Input disabled defaultValue={`${data.first_name} ${data.last_name}`} />
          </div>
        )}

        {data.grade && (
          <div className="space-y-2">
            <Label>Grade</Label>
            <Input disabled defaultValue={`${data.grade.grade}`} />
          </div>
        )}

        {data.section && (
          <div className="space-y-2">
            <Label>Section</Label>
            <Input disabled defaultValue={`${data.section.section}`} />
          </div>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="contact_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact No</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Purpose" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {appointmentPurposes.map((purpose) => (
                      <SelectItem key={purpose.value} value={purpose.value}>
                        {purpose.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("purpose") === "Counselling" && (
            <FormField
              control={form.control}
              name="purpose_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Counselling Options</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Counselling Options" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appointmentCounsellings.map((counsellingOption) => (
                        <SelectItem key={counsellingOption.value} value={counsellingOption.value}>
                          {counsellingOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {(form.watch("purpose") === "Referred" || form.watch("purpose") === "Inquiry") && (
            <FormField
              control={form.control}
              name="purpose_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {form.watch("purpose") === "Others" && (
            <FormField
              control={form.control}
              name="purpose_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex items-center gap-2">
            <SubmitButton pending={isSubmitting}>Create</SubmitButton>
            <Button type="button" variant="destructive" onClick={() => form.reset()}>
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateAppointForm;
