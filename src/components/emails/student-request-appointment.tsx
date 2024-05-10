import { Text } from "@react-email/components";

import EmailLayout from "./layout/email-layout";

type StudentAppointmentProps = {
  counselorName: string;
  studentName: string;
  gradeSection: string;
  contactNumber: string;
};

function StudentAppointment(props: StudentAppointmentProps) {
  return (
    <EmailLayout>
      <Text>Hello {props.counselorName},</Text>

      <Text>
        I hope you&lsquo;re doing well. I wanted to let you know that a student has created a new appointment request.
        Here are the details:
      </Text>

      <Text>
        Student Name: <span className="font-bold">{props.studentName}</span>
      </Text>
      <Text className="-mt-5">
        Grade & Section: <span className="font-bold">{props.gradeSection}</span>
      </Text>
      <Text className="-mt-5">
        Contact Number: <span className="font-bold">{props.contactNumber}</span>
      </Text>

      <Text>Please login to your account to view the full details of the appointment request.</Text>
      <Text className="mt-5">Thank you,</Text>
      <Text className="-mt-3">SGCCMS Dev Team</Text>
    </EmailLayout>
  );
}
export default StudentAppointment;
