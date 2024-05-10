import { Calendar } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardLink } from "@/lib/utils";
import { getSession } from "@/server/actions/auth.action";
import { getComplaints } from "@/server/actions/complaint.action";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

async function ComplaintsPage() {
  const session = await getSession();
  if (!session) return null;

  const items = await getComplaints({
    user_id: session.id,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Complaints</CardTitle>
        <Link href={getDashboardLink("advisor", "/complaints/calendar")}>
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
