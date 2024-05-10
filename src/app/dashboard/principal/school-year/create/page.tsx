import { ArrowLeft } from "lucide-react";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";

import CreateSyForm from "./add-sy-form";

function CreateSchoolYearPage() {
  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Create School Year</span>
          <ButtonLink href={getDashboardLink("principal", "/school-year")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CreateSyForm />
      </CardContent>
    </Card>
  );
}

export default CreateSchoolYearPage;
