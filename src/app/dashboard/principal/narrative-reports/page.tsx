import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNarrativeReports } from "@/server/actions/narrative-report.action";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

async function NarrativeReportsPage() {
  const items = await getNarrativeReports();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Narrative Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={items} />
      </CardContent>
    </Card>
  );
}

export default NarrativeReportsPage;
