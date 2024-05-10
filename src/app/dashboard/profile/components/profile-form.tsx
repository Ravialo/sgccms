"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { updateProfile } from "@/server/actions/profile.action";
import { UpdateProfilePayload, updateProfileSchema } from "@/server/schemas/profile.schema";

type ProfileFormProps = {
  profile: {
    role: UserRole;
    first_name: string;
    last_name: string;
    email: string | null;
    username: string;
  };
};

function ProfileForm({ profile }: ProfileFormProps) {
  const form = useForm<UpdateProfilePayload>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      email: profile.email || "",
      username: profile.username || "",
      first_name: profile.first_name,
      last_name: profile.last_name,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: UpdateProfilePayload) {
    const data = await updateProfile(values);

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input disabled={profile.role === "student"} {...field} />
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
                  <Input disabled={profile.role === "student"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Used this for recovering password and notifications.
                </FormDescription>
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

export default ProfileForm;
