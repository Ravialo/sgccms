import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getGrades, getSections } from "@/server/actions/grade-section.action";
import { getDefaultSchoolYear, getSchoolYearById } from "@/server/actions/school-year.action";
import { getUserById } from "@/server/actions/user.action";

import UpdateSchoolYearForm from "./update-sy-form";

type UpdateSchoolYearPageProps = {
  params: {
    id: string;
  };
};

async function UpdateSchoolYearPage({ params }: UpdateSchoolYearPageProps) {
  const schoolYear = await getSchoolYearById(Number(params.id));
  if (!schoolYear) return redirect(getDashboardLink("principal", "/school-year"));

  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>School Year Details</span>
          <ButtonLink href={getDashboardLink("principal", "/school-year")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateSchoolYearForm data={schoolYear} />
      </CardContent>
    </Card>
  );
}
export default UpdateSchoolYearPage;
