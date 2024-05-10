"use client";

import { useState } from "react";

import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { resetDBTables } from "@/server/actions/_base.action";
import { signOut } from "@/server/actions/auth.action";

function ResetDBPage() {
  const [loading, setLoading] = useState(false);

  const reset = async () => {
    setLoading(true);
    const result = await resetDBTables();
    if (!result.success) {
      toast({
        variant: "destructive",
        title: result.message,
      });
    } else {
      toast({
        title: result.message,
        description: "You will be sign-out in 5 seconds",
      });
      setTimeout(async () => {
        await signOut();
      }, 5000);
    }
    setLoading(false);
  };
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Reset DB</CardTitle>
        <CardDescription className="text-sm">
          This page is for demo purposes only and will be deleted if deployed in production
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SubmitButton type="button" pending={loading} onClick={reset}>
          Reset database and re-seed default data?
        </SubmitButton>
      </CardContent>
    </Card>
  );
}
export default ResetDBPage;
