import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getGrades, getSections } from "@/server/actions/grade-section.action";
import { getDefaultSchoolYear } from "@/server/actions/school-year.action";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

async function SectionsPage() {
  const schoolYear = await getDefaultSchoolYear();
  const items = await getSections({
    school_year_id: schoolYear?.id,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sections</CardTitle>
        <Link href={getDashboardLink("principal", "/sections/create")}>
          <Button>Create</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={items} />
      </CardContent>
    </Card>
  );
}
export default SectionsPage;
