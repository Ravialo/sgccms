"use client";

type FooterProps = {
  schoolYear: string;
  role: string;
  currentYear: string;
};

function Footer({ role, schoolYear, currentYear }: FooterProps) {
  return (
    <footer className="border-t">
      <div className="w-full flex items-center h-12 px-4 bg-muted/50">
        {role && schoolYear && (
          <div className="text-sm text-muted-foreground">
            School Year: {schoolYear} | Role: {role}
          </div>
        )}
        {currentYear && (
          <div className="ml-auto text-sm text-muted-foreground">
            <span className="hidden md:block">Student Guidance Complaint and Counselling Management System</span>
            <span className="block md:hidden">SGCCMS © {currentYear}</span>
          </div>
        )}
      </div>
    </footer>
  );
}
export default Footer;
