import { ArrowLeft } from "lucide-react";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";

import CreateGradeForm from "./add-grade-form";

async function CreateGradePage() {
  const schoolYear = await getDefaultSchoolYear();
  if (!schoolYear) return null;

  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Create Grade</span>
          <ButtonLink href={getDashboardLink("principal", "/grades")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CreateGradeForm data={schoolYear} />
      </CardContent>
    </Card>
  );
}

export default CreateGradePage;
