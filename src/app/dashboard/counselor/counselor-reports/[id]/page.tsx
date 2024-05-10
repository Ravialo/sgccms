import { ArrowLeft } from "lucide-react";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getCounselorReportById } from "@/server/actions/counselor-report.action";

import ReportDetailsForm from "./report-details-form";

type CounselorReportDetailsPageProps = {
  params: {
    id: string;
  };
};

async function CounselorReportDetailsPage({ params }: CounselorReportDetailsPageProps) {
  const counselorReport = await getCounselorReportById(Number(params.id));
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Counselor Report Details</span>
          <ButtonLink href={getDashboardLink("counselor", "/counselor-reports")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ReportDetailsForm data={counselorReport} />
      </CardContent>
    </Card>
  );
}
export default CounselorReportDetailsPage;
