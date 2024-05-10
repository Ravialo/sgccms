"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { forgotResendCode, forgotVerifyCode } from "@/server/actions/auth.action";
import { ForgotVerifyCodePayload, forgotVerifyCodeSchema } from "@/server/schemas/auth.schema";

const VerifyCodePage = () => {
  const [resendLoading, setResendLoading] = useState(false);
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

  const form = useForm<ForgotVerifyCodePayload>({
    resolver: zodResolver(forgotVerifyCodeSchema),
    defaultValues: {
      token,
      code: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: ForgotVerifyCodePayload) {
    const data = await forgotVerifyCode({
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
        title: data.message,
      });

      router.push(`/forgot-password/reset?token=${data.data.reset_token}`);
    }
  }

  async function onResendCode() {
    setResendLoading(true);
    const data = await forgotResendCode({ token });
    if (!data.success) {
      toast({
        variant: "destructive",
        title: data.message,
      });
    } else {
      toast({
        title: data.message,
      });
      form.reset();
      router.replace(`/forgot-password/verify?token=${data.data.verify_token}`);
    }
    setResendLoading(false);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-secondary p-5">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Code Verification</CardTitle>
          <CardDescription>Please enter the verification code from your email</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder="xxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <SubmitButton type="button" variant="outline" pending={resendLoading} onClick={onResendCode}>
                  Re-send
                </SubmitButton>
                <SubmitButton pending={isSubmitting}>Submit</SubmitButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyCodePage;
