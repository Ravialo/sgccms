import { Text } from "@react-email/components";

import EmailLayout from "./layout/email-layout";

type CounselorUpdateComplaintStatusProps = {
  advisorName: string;
  studentName: string;
  gradeSection: string;
  place: string;
  whatHappened: string;
  status: string;
};

function CounselorUpdateComplaintStatus(props: CounselorUpdateComplaintStatusProps) {
  return (
    <EmailLayout>
      <Text>Hello {props.advisorName},</Text>

      <Text>
        I hope you&lsquo;re doing well. I wanted to let you know that your counselor has updated the status of your
        complaint. Here are the details:
      </Text>
      <Text>
        Student Name: <span className="font-bold">{props.studentName}</span>
      </Text>
      <Text className="-mt-5">
        Grade & Section: <span className="font-bold">{props.gradeSection}</span>
      </Text>
      <Text className="-mt-5">
        Place: <span className="font-bold">{props.place}</span>
      </Text>
      <Text className="-mt-5">
        What Happened: <span className="font-bold">{props.whatHappened}</span>
      </Text>
      <Text className="-mt-5">
        Status: <span className="font-bold">{props.status}</span>
      </Text>

      <Text>Please login to your account to view the full details of the complaint.</Text>
      <Text className="mt-5">Thank you,</Text>
      <Text className="-mt-3">SGCCMS Dev Team</Text>
    </EmailLayout>
  );
}
export default CounselorUpdateComplaintStatus;
