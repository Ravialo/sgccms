import { Text } from "@react-email/components";

import EmailLayout from "./layout/email-layout";

type CounselorRequestAppointmentProps = {
  counselorName: string;
  studentName: string;
  purpose: string;
  purposeDetails: string;
  date: string;
};

function CounselorRequestAppointment(props: CounselorRequestAppointmentProps) {
  return (
    <EmailLayout>
      <Text>Hello {props.studentName},</Text>

      <Text>
        I hope you&lsquo;re doing well. I wanted to let you know that your counselor has created a new appointment
        request. Here are the details:
      </Text>

      <Text>
        Counselor Name: <span className="font-bold">{props.counselorName}</span>
      </Text>
      <Text className="-mt-5">
        Purpose: <span className="font-bold">{props.purpose}</span>
      </Text>
      <Text className="-mt-5">
        Purpose Details: <span className="font-bold">{props.purposeDetails}</span>
      </Text>
      <Text className="-mt-5">
        Date: <span className="font-bold">{props.date}</span>
      </Text>

      <Text>Please login to your account to view the full details of the appointment request.</Text>
      <Text className="mt-5">Thank you,</Text>
      <Text className="-mt-3">SGCCMS Dev Team</Text>
    </EmailLayout>
  );
}
export default CounselorRequestAppointment;
