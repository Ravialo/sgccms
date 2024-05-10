import { ArrowLeft } from "lucide-react";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getGrades, getSections } from "@/server/actions/grade-section.action";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";

import AddStudentForm from "./add-student-form";

async function AddStudentPage() {
  const schoolYear = await getDefaultSchoolYear();

  const grades = await getGrades({
    school_year_id: schoolYear?.id,
  });
  const sections = await getSections({
    school_year_id: schoolYear?.id,
  });

  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Add Student</span>
          <ButtonLink href={getDashboardLink("counselor", "/students")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AddStudentForm grades={grades} sections={sections} />
      </CardContent>
    </Card>
  );
}
export default AddStudentPage;
