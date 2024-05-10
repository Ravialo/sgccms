import { ArrowLeft } from "lucide-react";

import ButtonLink from "@/components/button-link";
import CounselorPrintForm from "@/components/reports/counselor-report-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getCounselorReportById } from "@/server/actions/counselor-report.action";

type CounselorReportPrintPageProps = {
  params: {
    id: string;
  };
};
async function CounselorReportPrintPage({ params }: CounselorReportPrintPageProps) {
  const counselorReport = await getCounselorReportById(Number(params.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Counselor Report</span>
          <ButtonLink href={getDashboardLink("principal", "/counselor-reports")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {counselorReport ? <CounselorPrintForm data={counselorReport} /> : <div>No report to print</div>}
      </CardContent>
    </Card>
  );
}
export default CounselorReportPrintPage;
