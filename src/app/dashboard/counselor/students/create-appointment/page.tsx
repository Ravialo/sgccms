import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStudentById } from "@/server/actions/student.action";

import CreateAppointmentForm from "./create-appointment-form";

type CreateAppointmentPageProps = {
  searchParams: {
    student_id: string;
  };
};

async function CreateAppointmentPage({ searchParams }: CreateAppointmentPageProps) {
  if (!searchParams.student_id) {
    redirect("/dashboard/counselor/students");
  }

  const student = await getStudentById(Number(searchParams.student_id));

  if (!student) {
    redirect("/dashboard/counselor/students");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Student Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateAppointmentForm data={student} />
      </CardContent>
    </Card>
  );
}
export default CreateAppointmentPage;
