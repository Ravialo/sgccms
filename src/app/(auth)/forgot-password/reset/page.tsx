"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { forgotResetPassword } from "@/server/actions/auth.action";
import { ForgotResetPasswordPayload, forgotResetPasswordSchema } from "@/server/schemas/auth.schema";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") as string;
  if (!token) {
    toast({
      variant: "destructive",
      title: "Invalid Request!",
    });
    router.push("/forgot-password");
  }

  const form = useForm<ForgotResetPasswordPayload>({
    resolver: zodResolver(forgotResetPasswordSchema),
    defaultValues: {
      token,
      password: "",
      confirm_password: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: ForgotResetPasswordPayload) {
    const data = await forgotResetPassword({
      ...values,
      token,
    });
    if (!data.success) {
      toast({
        variant: "destructive",
        title: data.message,
      });

      if (data.message === "Invalid Token") {
        router.push("/forgot-password");
      }
    } else {
      toast({
        title: "Password reset successfully! Please sign in",
      });
      form.reset();
      router.push("/sign-in");
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-secondary p-5">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Please enter and confirm your new password</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => router.push("/sign-in")}>
                  Cancel
                </Button>
                <SubmitButton pending={isSubmitting}>Reset</SubmitButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
