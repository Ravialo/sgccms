import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getUsers } from "@/server/actions/user.action";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

async function UsersPage() {
  const users = await getUsers();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Users</CardTitle>
        <Link href={getDashboardLink("principal", "/users/add")}>
          <Button>Add</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={users} />
      </CardContent>
    </Card>
  );
}
export default UsersPage;
