"use client";

import { PrinterIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { Button } from "@/components/ui/button";
import { convertTo12HourFormat, formatDate } from "@/lib/utils";
import { NarrativeReportData } from "@/server/schemas/narrative-report.schema";

type NarrativePrintFormProps = {
  data: NarrativeReportData;
};

function NarrativePrintForm({ data }: NarrativePrintFormProps) {
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
            <div className="text-2xl uppercase font-semibold">Narrative Report</div>
          </div>
        </div>

        {/* sub header */}
        <div className="flex flex-col space-y-2 mb-8">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-nowrap">Case Report Number:</h3>
            <div className="w-full underline underline-offset-4 font-light">{data.case_report_no}</div>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-nowrap">Incident:</h3>
            <div className="w-full underline underline-offset-4 font-light">{data.incident}</div>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-nowrap">Reported By:</h3>
            <div className="w-full underline underline-offset-4 font-light">{data.reported_by}</div>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-nowrap">Date of Report:</h3>
            <div className="w-full underline underline-offset-4 font-light">
              {formatDate(data.date_reported, "MM/DD/YYYY")}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-nowrap">Time:</h3>
            <div className="w-full underline underline-offset-4 font-light">
              {convertTo12HourFormat(data.time_reported)}
            </div>
          </div>
        </div>

        {/* form */}
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex flex-col gap-2">
            <h3 className="uppercase text-lg font-semibold underline">Detail of Event</h3>
            <div className="underline w-full font-light underline-offset-4 text-justify">{data.detail_of_event}</div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="uppercase text-lg font-semibold underline">Actions Taken:</h3>
            <div className="underline w-full font-light underline-offset-4 text-justify">{data.action_taken}</div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="uppercase text-lg font-semibold underline">Summary</h3>
            <div className="underline w-full font-light underline-offset-4 text-justify">{data.summary}</div>
          </div>
        </div>

        {/* parties involve */}
        <div className="space-y-4">
          <h3 className="uppercase text-lg font-semibold">Parties Involved:</h3>
          <div>
            {data.narrativeReportParties &&
              Array.from(data.narrativeReportParties).map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <h3>P{index + 1}:</h3>
                  <div className="underline w-full font-light underline-offset-4">{`${item.student.last_name}, ${item.student.first_name} (${item.student.grade.grade} - ${item.student.section.section})`}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default NarrativePrintForm;
