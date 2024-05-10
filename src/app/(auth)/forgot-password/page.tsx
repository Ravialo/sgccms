"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { forgotSendCode } from "@/server/actions/auth.action";
import { ForgotSendCodePayload, forgotSendCodeSchema } from "@/server/schemas/auth.schema";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const form = useForm<ForgotSendCodePayload>({
    resolver: zodResolver(forgotSendCodeSchema),
    defaultValues: {
      email: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: ForgotSendCodePayload) {
    const data = await forgotSendCode(values);
    if (!data.success) {
      toast({
        variant: "destructive",
        title: data.message,
      });
    } else {
      toast({
        title: data.message,
      });
      router.push(`/forgot-password/verify?token=${data.data.verify_token}`);
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-secondary p-5">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>Please enter your email to recover your password</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <Link href="/sign-in" className="text-sm underline">
                  Go back to Sign in
                </Link>
                <SubmitButton pending={isSubmitting}>Submit</SubmitButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
