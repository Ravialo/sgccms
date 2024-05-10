import { ArrowLeft } from "lucide-react";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getNarrativeReportById } from "@/server/actions/narrative-report.action";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";
import { getStudents } from "@/server/actions/student.action";

import ReportDetailsForm from "./report-details-form";

type NarrativeReportDetailsPageProps = {
  params: {
    id: string;
  };
};

async function NarrativeReportDetailsPage({ params }: NarrativeReportDetailsPageProps) {
  const schoolYear = await getDefaultSchoolYear();
  const students = await getStudents({
    school_year_id: schoolYear?.id,
  });
  const narrativeReport = await getNarrativeReportById(Number(params.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Narrative Report Details</span>
          <ButtonLink href={getDashboardLink("counselor", "/narrative-reports")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ReportDetailsForm data={narrativeReport} students={students} />
      </CardContent>
    </Card>
  );
}
export default NarrativeReportDetailsPage;
