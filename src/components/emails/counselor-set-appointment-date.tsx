import { Text } from "@react-email/components";

import EmailLayout from "./layout/email-layout";

type CounselorSetAppointmentDateProps = {
  studentName: string;
  purpose: string;
  purposeDetails: string;
  date: string;
  status: string;
};

function CounselorSetAppointmentDate(props: CounselorSetAppointmentDateProps) {
  return (
    <EmailLayout>
      <Text>Hello {props.studentName},</Text>

      <Text>
        I hope you&lsquo;re doing well. I wanted to let you know that your counselor has set the date of your
        appointment. Here are the details:
      </Text>
      <Text>
        Purpose: <span className="font-bold">{props.purpose}</span>
      </Text>
      <Text className="-mt-5">
        Purpose Details: <span className="font-bold">{props.purposeDetails}</span>
      </Text>
      <Text className="-mt-5">
        Date: <span className="font-bold">{props.date}</span>
      </Text>
      <Text className="-mt-5">
        Status: <span className="font-bold">{props.status}</span>
      </Text>
      <Text>Please login to your account to view the full details of the appointment.</Text>
      <Text className="mt-5">Thank you,</Text>
      <Text className="-mt-3">SGCCMS Dev Team</Text>
    </EmailLayout>
  );
}
export default CounselorSetAppointmentDate;
