import { ArrowLeft } from "lucide-react";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getComplaintById } from "@/server/actions/complaint.action";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";
import { getStudents } from "@/server/actions/student.action";

import CreateNarrativeReportForm from "./create-narrative-report-form";

type CreateNarrativeReportProps = {
  params: { id: string };
};
async function CreateNarrativeReportPage({ params }: CreateNarrativeReportProps) {
  const schoolYear = await getDefaultSchoolYear();
  const students = await getStudents({
    school_year_id: schoolYear?.id,
  });
  const complaint = await getComplaintById(Number(params.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Create Narrative Report</span>
          <ButtonLink href={getDashboardLink("counselor", "/complaints")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CreateNarrativeReportForm data={complaint} students={students} />
      </CardContent>
    </Card>
  );
}
export default CreateNarrativeReportPage;
