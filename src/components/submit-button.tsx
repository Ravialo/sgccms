"use client";

import { Loader2 } from "lucide-react";

import { Button, ButtonProps } from "./ui/button";

type SubmitButtonProps = ButtonProps & {
  pending?: boolean;
};

export function SubmitButton({ pending, children, ...props }: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </div>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
