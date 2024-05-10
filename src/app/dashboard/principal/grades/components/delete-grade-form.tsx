"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SchoolYear } from "@prisma/client";
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
import { deleteGradeById } from "@/server/actions/grade-section.action";
import { DeleteGradePayload, deleteGradeSchema, GradeData } from "@/server/schemas/grade-section.schema";

type DeleteGradeFormProps = {
  data: GradeData;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function DeleteGradeForm({ data, open, setOpen }: DeleteGradeFormProps) {
  const form = useForm<DeleteGradePayload>({
    resolver: zodResolver(deleteGradeSchema),
    defaultValues: {
      id: data.id,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: DeleteGradePayload) {
    const data = await deleteGradeById(values);

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
          <AlertDialogTitle>Delete Grade</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to delete this grade?</AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" disabled={isSubmitting} onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <SubmitButton pending={isSubmitting}>Delete</SubmitButton>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default DeleteGradeForm;
