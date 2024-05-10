import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getGradeById } from "@/server/actions/grade-section.action";

import UpdateGradeForm from "./update-grade-form";

type UpdateGradePageProps = {
  params: {
    id: string;
  };
};

async function UpdateGradePage({ params }: UpdateGradePageProps) {
  const grade = await getGradeById(Number(params.id));
  if (!grade) return redirect(getDashboardLink("principal", "/grades"));

  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Grade Details</span>
          <ButtonLink href={getDashboardLink("principal", "/school-year")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateGradeForm data={grade} />
      </CardContent>
    </Card>
  );
}
export default UpdateGradePage;
