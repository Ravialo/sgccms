import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getAppointmentById } from "@/server/actions/appointment.action";

import UpdateAppointmentForm from "./update-appointment-form";

type UpdateAppointmentPageProps = {
  params: {
    id: string;
  };
};

async function UpdateAppointmentPage({ params }: UpdateAppointmentPageProps) {
  const appointment = await getAppointmentById(Number(params.id));

  if (!appointment) {
    redirect("/dashboard/student/appointments");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Appointment Details</span>
          <ButtonLink href={getDashboardLink("student", "/appointments")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateAppointmentForm data={appointment} />
      </CardContent>
    </Card>
  );
}
export default UpdateAppointmentPage;
