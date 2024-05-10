"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { updatePassword } from "@/server/actions/profile.action";
import { UpdatePasswordPayload, updatePasswordSchema } from "@/server/schemas/profile.schema";

function SecurityForm() {
  const form = useForm<UpdatePasswordPayload>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: UpdatePasswordPayload) {
    const data = await updatePassword(values);

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
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <SubmitButton pending={isSubmitting}>Save</SubmitButton>
        </CardFooter>
      </form>
    </Form>
  );
}

export default SecurityForm;
