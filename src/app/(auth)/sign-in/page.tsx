"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import Logo from "/public/logo.png";
import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "@/server/actions/auth.action";
import { SignInPayload, signInSchema } from "@/server/schemas/auth.schema";

function SignInPage() {
  const form = useForm<SignInPayload>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: SignInPayload) {
    const data = await signIn(values);
    if (data && !data.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: data.message,
      });
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-secondary p-5">
      <Card className="w-[350px]">
        <CardHeader className="mt-2 space-y-1">
          <CardTitle className="text-2xl">
            <Image className="mx-auto p-0" src={Logo} alt="logo" width={100} height={100} priority />
            Login
          </CardTitle>
          <CardDescription>Enter your account below to login.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input autoComplete="username" tabIndex={1} placeholder="Enter Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link tabIndex={4} href="/forgot-password" className="ml-auto inline-block text-sm underline">
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input tabIndex={2} placeholder="Enter Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton tabIndex={3} className="w-full" pending={isSubmitting}>
                Sign In
              </SubmitButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignInPage;
