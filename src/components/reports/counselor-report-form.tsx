"use client";

import { PrinterIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { CounselorReportData } from "@/server/schemas/counselor-report.schema";

type CounselorPrintFormProps = {
  data: CounselorReportData;
};

function CounselorPrintForm({ data }: CounselorPrintFormProps) {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    removeAfterPrint: true,
  });

  useEffect(() => {
    const print = () => {
      handlePrint(null, () => contentToPrint.current);
    };
    print();
  }, [handlePrint]);

  return (
    <div>
      <Button onClick={() => handlePrint(null, () => contentToPrint.current)}>
        <PrinterIcon className="h-4 w-4 mr-2" /> Print
      </Button>
      <div ref={contentToPrint} className="w-full h-fit px-20 flex flex-col py-10">
        {/* header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center gap-2 mr-[90px]">
            <div>
              <Image src="/logo.png" alt="logo" width={100} height={100} />
            </div>
            <div className="text-center">
              <h3 className="text-3xl uppercase underline font-semibold">Santa Monica Institute INC</h3>
              <p className="text-sm">Service - Integrity - Nationalism - Christ Centeredmess - Excellence</p>
              <p className="text-sm">Poblacion I, Mabini, Bohol 6312</p>
              <p className="text-sm">School ID NO: 404200</p>
              <p className="text-sm">S.Y. 2024-2025</p>
            </div>
          </div>

          <div className="mt-8 space-y-2 flex flex-col items-center">
            <div className="text-xl uppercase font-semibold">Guidance Office</div>
            <div className="text-sm uppercase font-semibold">Counselor&lsquo;s Report</div>
          </div>
        </div>

        {/* sub header */}
        <div className="grid grid-cols-3 space-y-2 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-nowrap">Name:</h3>
              <div className="w-full underline underline-offset-4 font-light">{`${data.student.first_name} ${data.student.last_name}`}</div>
            </div>
          </div>
          <div className="col-span-1 flex items-center gap-2">
            <h3 className="font-semibold text-nowrap">Date:</h3>
            <div className="w-full underline underline-offset-4 font-light">
              {formatDate(data.created_at, "MM/DD/YYYY")}
            </div>
          </div>
          <div className="col-span-3 flex items-center gap-2">
            <h3 className="font-semibold text-nowrap">Grade and Section:</h3>
            <div className="w-full underline underline-offset-4 font-light">{`${data.student.grade.grade} - ${data.student.section.section}`}</div>
          </div>
        </div>

        {/* form */}
        <div className="flex flex-col space-y-8 mb-6">
          <div className="flex flex-col gap-2">
            <h3 className="uppercase text-lg font-semibold">Summary:</h3>
            <div className="underline w-full font-light underline-offset-4 text-justify">{data.summary}</div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="uppercase text-lg font-semibold">Recommendations:</h3>
            <div className="underline w-full font-light underline-offset-4 text-justify">{data.recommendations}</div>
          </div>
        </div>

        {/* parties involve */}
        <div className="space-y-4 mt-4 w-full">
          <h3>Prepared By:</h3>
          <div className="flex flex-col items-center">
            <div className="uppercase underline underline-offset-4 text-lg font-semibold">{`${data.user.first_name} ${data.user.last_name}`}</div>
            <div>Guidance Designate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CounselorPrintForm;
