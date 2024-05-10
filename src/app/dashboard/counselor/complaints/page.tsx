import { Calendar } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getComplaints } from "@/server/actions/complaint.action";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

async function ComplaintsPage() {
  const items = await getComplaints();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Complaints</CardTitle>
        <Link href={getDashboardLink("counselor", "/complaints/calendar")}>
          <Button>
            <Calendar className="mr-2" /> Calendar
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={items} />
      </CardContent>
    </Card>
  );
}

export default ComplaintsPage;
