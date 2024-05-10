import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getSchoolYears } from "@/server/actions/school-year.action";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

async function SchoolYearPage() {
  const items = await getSchoolYears();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>School Year</CardTitle>
        <Link href={getDashboardLink("principal", "/school-year/create")}>
          <Button>Create</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={items} />
      </CardContent>
    </Card>
  );
}
export default SchoolYearPage;
