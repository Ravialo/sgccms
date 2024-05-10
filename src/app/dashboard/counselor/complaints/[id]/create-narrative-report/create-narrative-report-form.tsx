"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import NarrativeSearchStudents from "@/components/narrative-search-students";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { generateCaseReportNo, getDashboardLink } from "@/lib/utils";
import { createNarrativeReport } from "@/server/actions/narrative-report.action";
import { ComplaintData } from "@/server/schemas/complaint.schema";
import { CreateNarrativeReportPayload, createNarrativeReportSchema } from "@/server/schemas/narrative-report.schema";
import { StudentData } from "@/server/schemas/student.schema";

type CreateNarrativeReportFormProps = {
  data: ComplaintData;
  students: StudentData[];
};

function CreateNarrativeReportForm({ data, students }: CreateNarrativeReportFormProps) {
  const [parties, setParties] = useState<StudentData[]>([]);
  const [studentSearchOpen, setStudentSearchOpen] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<CreateNarrativeReportPayload>({
    resolver: zodResolver(createNarrativeReportSchema),
    defaultValues: {
      school_year_id: data.school_year_id,
      student_id: data.student_id,
      complaint_id: data.id,
      case_report_no: generateCaseReportNo(),
      reported_by: `${data.user.first_name} ${data.user.last_name}`,
      incident: "",
      date_reported: "",
      time_reported: "",
      detail_of_event: "",
      action_taken: "",
      summary: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: CreateNarrativeReportPayload) {
    const data = await createNarrativeReport({
      ...values,
      parties: parties.map((party) => party.id),
    });

    if (data && !data.success) {
      toast({
        variant: "destructive",
        title: data.message,
      });
    } else {
      toast({
        title: data.message,
      });
      router.push(getDashboardLink("counselor", "/narrative-reports"));
    }
  }

  function addPartyName(student: StudentData) {
    if (parties.indexOf(student) !== -1) {
      toast({
        variant: "destructive",
        title: "Student is already in the list.",
      });
    } else {
      setParties([...parties, student]);
    }
    setStudentSearchOpen(false);
  }

  function removePartyName(indexToRemove: number) {
    setParties((prevArray) => {
      return prevArray.filter((_, index) => index !== indexToRemove);
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="case_report_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Case Report Number</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormDescription className="text-xs">This is auto-generated</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reported_by"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reported By</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormDescription className="text-xs">This is auto-generated</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="incident"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Incident</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_reported"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Report</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time_reported"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="detail_of_event"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detail of Event</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="action_taken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action Taken</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-2 max-w-[500px]">
            <Label>Parties Involved</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Button type="button" size="icon" variant="outline" onClick={() => setStudentSearchOpen(true)}>
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              {parties.length > 0 &&
                parties.map((item, index) => (
                  <div key={index} className="flex items-center justify-between gap-2">
                    <div className="border rounded-sm w-full p-2">
                      <h3 className="text-sm">{`${item.last_name}, ${item.first_name} (${item.grade.grade} - ${item.section.section})`}</h3>
                    </div>
                    <Button type="button" size="icon" variant="outline" onClick={() => removePartyName(index)}>
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SubmitButton pending={isSubmitting}>Create</SubmitButton>
            <Button
              type="button"
              disabled={isSubmitting}
              variant="destructive"
              onClick={() => {
                form.reset();
                setParties([]);
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
      <NarrativeSearchStudents
        students={students}
        open={studentSearchOpen}
        setOpen={setStudentSearchOpen}
        onSelectStudent={addPartyName}
      />
    </>
  );
}

export default CreateNarrativeReportForm;
