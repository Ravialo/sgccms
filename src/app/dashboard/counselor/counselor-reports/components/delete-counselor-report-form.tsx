"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { deleteCounselorReportById } from "@/server/actions/counselor-report.action";
import {
  CounselorReportData,
  DeleteCounselorReportPayload,
  deleteCounselorReportSchema,
} from "@/server/schemas/counselor-report.schema";

type DeleteCounselorReportFormProps = {
  data: CounselorReportData;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function DeleteCounselorReportForm({ data, open, setOpen }: DeleteCounselorReportFormProps) {
  const form = useForm<DeleteCounselorReportPayload>({
    resolver: zodResolver(deleteCounselorReportSchema),
    defaultValues: {
      id: data.id,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: DeleteCounselorReportPayload) {
    const data = await deleteCounselorReportById(values);

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
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to delete this counselor report?</AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" disabled={isSubmitting} onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <SubmitButton pending={isSubmitting} variant="destructive">
                Delete
              </SubmitButton>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default DeleteCounselorReportForm;
