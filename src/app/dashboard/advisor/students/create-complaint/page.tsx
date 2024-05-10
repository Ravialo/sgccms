import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStudentById } from "@/server/actions/student.action";

import CreateComplaintForm from "./create-complaint-form";

type CreateComplaintsPageProps = {
  searchParams: {
    student_id: string;
  };
};

async function CreateComplaintsPage({ searchParams }: CreateComplaintsPageProps) {
  if (!searchParams.student_id) {
    redirect("/dashboard/advisor/students");
  }

  const student = await getStudentById(Number(searchParams.student_id));

  if (!student) {
    redirect("/dashboard/advisor/students");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Complaint</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateComplaintForm data={student} />
      </CardContent>
    </Card>
  );
}
export default CreateComplaintsPage;
