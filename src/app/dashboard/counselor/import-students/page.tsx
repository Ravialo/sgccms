"use client";

import { CircleCheck, CircleXIcon, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { readCsvFile } from "@/lib/csv";
import { cn } from "@/lib/utils";
import { ImportStudentError, importStudents } from "@/server/actions/student.action";

function ImportStudentsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ImportStudentError[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files && e.target.files[0]);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      toast({
        variant: "destructive",
        title: "Please upload CSV file.",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await readCsvFile(file!);

      if (!result.success && !result.rows) {
        toast({
          variant: "destructive",
          title: "Please upload CSV file.",
        });
        return;
      }

      const response = await importStudents(result.rows);
      if (response && !response?.success && response?.errors.length > 0) {
        setErrors(response.errors);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Import Students</CardTitle>
          <p className="mt-2 text-sm leading-sm">
            Import a CSV file using the template below and fill in the student information.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-4">
            <div className="grid mb-2">
              <Label className="font-semibold">Import Template:</Label>
              <Link
                className="hover:underline text-sm"
                href={"/students-import-template.csv"}
                target="_blank"
                rel="noopener noreferrer"
                locale={false}
                download
              >
                Download
              </Link>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">Choose File</Label>
              <p className="text-xs leading-none">Only .csv files are allowed.</p>
              <Input ref={fileRef} accept=".csv" id="file" type="file" onChange={onFileChange} />
            </div>
            <div className="flex gap-2">
              <SubmitButton disabled={file === null || loading} pending={loading}>
                Import
              </SubmitButton>
              <Button
                disabled={file === null || loading}
                type="button"
                variant="destructive"
                onClick={() => {
                  setFile(null);
                  setErrors([]);
                  if (fileRef.current) fileRef.current.value = "";
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {errors.length > 0 && (
        <Card className="w-full border">
          <CardHeader>
            <CardTitle>Import CSV Status</CardTitle>
            <CardDescription className="text-xs">
              Start counting the row number next to the header of your csv file when checking status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Type</TableHead>
                  <TableHead className="w-[100px]">Row No.</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {errors.map((error, index) => (
                  <TableRow key={index}>
                    <TableCell className={cn("text-sm font-bold")}>
                      {error.type === "error" && (
                        <span title="Error">
                          <CircleXIcon className="text-red-700" />
                        </span>
                      )}
                      {error.type === "warning" && (
                        <span title="Warning">
                          <TriangleAlertIcon className="text-orange-500" />
                        </span>
                      )}
                      {error.type === "success" && (
                        <span title="Success">
                          <CircleCheck className="text-green-600" />
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="font-bold text-sm">{error.rowNumber}</TableCell>
                    <TableCell className="text-sm">{error.error}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
export default ImportStudentsPage;
