import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getUserById } from "@/server/actions/user.action";

import UpdateUserForm from "./update-user-form";

type UpdateUserPageProps = {
  params: {
    id: string;
  };
};

async function UpdateUserPage({ params }: UpdateUserPageProps) {
  const user = await getUserById(Number(params.id));
  if (!user) return redirect(getDashboardLink("principal", "/users"));

  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Edit User</span>
          <ButtonLink href={getDashboardLink("principal", "/users")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateUserForm user={user} />
      </CardContent>
    </Card>
  );
}
export default UpdateUserPage;
