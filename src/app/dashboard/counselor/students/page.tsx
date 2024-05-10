import ButtonLink from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getStudents } from "@/server/actions/student.action";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

async function StudentsPage() {
  const items = await getStudents();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between space-x-2">
          <span>Students</span>
          <ButtonLink href={getDashboardLink("counselor", "/students/add")}>Add Student</ButtonLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={items} />
      </CardContent>
    </Card>
  );
}

export default StudentsPage;
