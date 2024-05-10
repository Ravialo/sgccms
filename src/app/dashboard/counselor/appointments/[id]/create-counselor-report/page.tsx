import { ArrowLeft } from "lucide-react";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getAppointmentById } from "@/server/actions/appointment.action";

import CreateCounselorReportForm from "./create-counselor-report-form";

type CreateCounselorReportProps = {
  params: { id: string };
};
async function CreateCounselorReportPage({ params }: CreateCounselorReportProps) {
  const appointment = await getAppointmentById(Number(params.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Create Counselor Report</span>
          <ButtonLink href={getDashboardLink("counselor", "/appointments")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CreateCounselorReportForm data={appointment} />
      </CardContent>
    </Card>
  );
}
export default CreateCounselorReportPage;
