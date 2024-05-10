import { ArrowLeft } from "lucide-react";

import ButtonLink from "@/components/button-link";
import NarrativePrintForm from "@/components/reports/narrative-report-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getNarrativeReportById } from "@/server/actions/narrative-report.action";

type NarrativeReportPrintPageProps = {
  params: {
    id: string;
  };
};
async function NarrativeReportPrintPage({ params }: NarrativeReportPrintPageProps) {
  const narrativeReport = await getNarrativeReportById(Number(params.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Narrative Report</span>
          <ButtonLink href={getDashboardLink("principal", "/narrative-reports")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {narrativeReport ? <NarrativePrintForm data={narrativeReport} /> : <div>No report to print</div>}
      </CardContent>
    </Card>
  );
}
export default NarrativeReportPrintPage;
