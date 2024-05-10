import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getAppointmentById } from "@/server/actions/appointment.action";

import AppointmentDetailsForm from "./appointment-details-form";

type AppointmentDetailsPageProps = {
  params: {
    id: string;
  };
};

async function AppointmentDetailsPage({ params }: AppointmentDetailsPageProps) {
  const appointment = await getAppointmentById(Number(params.id));

  if (!appointment) {
    redirect("/dashboard/advisor/appointments");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Appointment Details</span>
          <ButtonLink href={getDashboardLink("advisor", "/appointments")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AppointmentDetailsForm data={appointment} />
      </CardContent>
    </Card>
  );
}
export default AppointmentDetailsPage;
