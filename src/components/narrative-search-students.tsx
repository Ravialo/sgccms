"use client";

import * as React from "react";

import { CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { StudentData } from "@/server/schemas/student.schema";

type NarrativeSearchStudentsProps = {
  students: StudentData[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectStudent: (student: StudentData) => void;
};

function NarrativeSearchStudents({ students, open, setOpen, onSelectStudent }: NarrativeSearchStudentsProps) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search a student..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {students.map((student, index) => (
          <CommandItem key={index} onSelect={() => onSelectStudent(student)}>
            <span>{`${student.last_name}, ${student.first_name} (${student.grade.grade} - ${student.section.section})`}</span>
          </CommandItem>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
export default NarrativeSearchStudents;
