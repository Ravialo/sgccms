import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCounselorReports } from "@/server/actions/counselor-report.action";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

async function CounselorReportsPage() {
  const items = await getCounselorReports();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Counselor Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={items} />
      </CardContent>
    </Card>
  );
}

export default CounselorReportsPage;
