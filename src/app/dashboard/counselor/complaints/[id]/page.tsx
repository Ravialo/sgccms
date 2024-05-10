import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getComplaintById } from "@/server/actions/complaint.action";

import UpdateComplaintForm from "./update-complaint-form";

type UpdateComplaintPageProps = {
  params: {
    id: string;
  };
};

async function UpdateComplaintPage({ params }: UpdateComplaintPageProps) {
  const complaint = await getComplaintById(Number(params.id));

  if (!complaint) {
    redirect(getDashboardLink("counselor", "/complaints"));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Complaint Details</span>
          <ButtonLink href={getDashboardLink("counselor", "/complaints")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateComplaintForm data={complaint} />
      </CardContent>
    </Card>
  );
}
export default UpdateComplaintPage;
