import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getAdvisors, getGrades, getSectionById } from "@/server/actions/grade-section.action";

import UpdateSectionForm from "./update-section-form";

type UpdateSectionPageProps = {
  params: {
    id: string;
  };
};

async function UpdateSectionPage({ params }: UpdateSectionPageProps) {
  const section = await getSectionById(Number(params.id));
  if (!section) return redirect(getDashboardLink("principal", "/sections"));
  const grades = await getGrades({
    school_year_id: section.school_year.id,
  });
  const advisors = await getAdvisors();

  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Section Details</span>
          <ButtonLink href={getDashboardLink("principal", "/sections")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateSectionForm grades={grades} advisors={advisors} data={section} />
      </CardContent>
    </Card>
  );
}
export default UpdateSectionPage;
