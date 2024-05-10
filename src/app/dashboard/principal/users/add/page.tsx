import { ArrowLeft } from "lucide-react";

import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";

import AddUserForm from "./add-user-form";

async function AddUserPage() {
  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Add User</span>
          <ButtonLink href={getDashboardLink("principal", "/users")} icon={ArrowLeft} variant="outline">
            Back
          </ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AddUserForm />
      </CardContent>
    </Card>
  );
}
export default AddUserPage;
