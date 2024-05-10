import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/server/actions/auth.action";
import { getStudents } from "@/server/actions/student.action";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

async function StudentsPage() {
  const session = await getSession();

  const items = await getStudents({
    grade_id: session?.advisor?.section.grade_id ?? undefined,
    section_id: session?.advisor?.section_id ?? undefined,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Students</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={items} />
      </CardContent>
    </Card>
  );
}

export default StudentsPage;
