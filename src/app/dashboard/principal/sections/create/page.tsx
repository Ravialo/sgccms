import { ArrowLeft } from "lucide-react";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getAdvisors, getGrades } from "@/server/actions/grade-section.action";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";

import CreateGradeForm from "./add-section-form";

async function CreateSchoolYearPage() {
  const schoolYear = await getDefaultSchoolYear();
  if (!schoolYear) return null;
  const grades = await getGrades({
    school_year_id: schoolYear.id,
  });
  const advisors = await getAdvisors();

  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Create Section</span>
          <ButtonLink href={getDashboardLink("principal", "/sections")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CreateGradeForm schoolYear={schoolYear} grades={grades} advisors={advisors} />
      </CardContent>
    </Card>
  );
}

export default CreateSchoolYearPage;
