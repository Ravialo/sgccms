import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getSession } from "@/server/actions/auth.action";
import { getStudentById } from "@/server/actions/student.action";

import CreateForm from "./create-appointment-form";

async function CreateAppointmentPage() {
  const session = await getSession();
  if (!session || !session.student?.id) return null;

  const student = await getStudentById(session.student?.id);
  if (!student) return null;

  return (
    <Card>
      <CardHeader>Guidance Office Appointment Form</CardHeader>
      <CardContent>
        <CreateForm data={student} />
      </CardContent>
    </Card>
  );
}
export default CreateAppointmentPage;
