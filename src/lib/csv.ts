import { ImportStudentPayload } from "@/server/schemas/student.schema";

import { handleError } from "./utils";

export function csvToJson(data: string) {
  const lines = data.split("\n");

  const headers = lines[0].split(",");
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    if (lines[i]) {
      const obj: any = {};
      const currentline = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim().toLowerCase()] = currentline[j] ? currentline[j].trim() : "";
      }

      rows.push(obj);
    }
  }

  return rows;
}

export type ReadFileResult = { success: boolean; message?: string; rows: ImportStudentPayload[] };

export function readCsvFile(file: File): Promise<ReadFileResult> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = async (e: ProgressEvent<FileReader>) => {
        const rows = csvToJson(e.target?.result as string);
        resolve({
          success: true,
          rows,
        });
      };

      reader.onerror = (error) => {
        resolve({
          ...handleError("Error in reading file."),
          rows: [],
        });
      };
    } catch (error) {
      console.log(error);
      resolve({
        ...handleError("Error in reading file."),
        rows: [],
      });
    }
  });
}
