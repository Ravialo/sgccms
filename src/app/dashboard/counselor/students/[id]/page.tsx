import { ArrowLeft } from "lucide-react";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getGrades, getSections } from "@/server/actions/grade-section.action";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";
import { getStudentById } from "@/server/actions/student.action";

import UpdateStudentForm from "./update-student-form";

type UpdateStudentPageProps = {
  params: {
    id: string;
  };
};

async function UpdateStudentPage({ params }: UpdateStudentPageProps) {
  const student = await getStudentById(Number(params.id));
  if (!student) return null;

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
          <span>Update Student</span>
          <ButtonLink href={getDashboardLink("counselor", "/students")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateStudentForm data={student} grades={grades} sections={sections} />
      </CardContent>
    </Card>
  );
}
export default UpdateStudentPage;
