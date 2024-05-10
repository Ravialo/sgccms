import { Text } from "@react-email/components";

import EmailLayout from "./layout/email-layout";

type CounselorCreateCounselorProps = {
  principalName: string;
  type: string;
  counselorName: string;
  date: string;
  summary: string;
  recommendations: string;
};

function CounselorCreateCounselor(props: CounselorCreateCounselorProps) {
  return (
    <EmailLayout>
      <Text>Hello {props.principalName},</Text>

      <Text>
        I hope you&lsquo;re doing well. I wanted to let you know that a counselor has created a new counselor report.
        Here are the details:
      </Text>
      <Text>
        Type: <span className="font-bold">{props.type}</span>
      </Text>
      <Text className="-mt-5">
        Counselor Name: <span className="font-bold">{props.counselorName}</span>
      </Text>
      <Text className="-mt-5">
        Date: <span className="font-bold">{props.date}</span>
      </Text>
      <Text className="-mt-5">
        Summary: <span className="font-bold">{props.summary}</span>
      </Text>
      <Text className="-mt-5">
        Recommendations: <span className="font-bold">{props.recommendations}</span>
      </Text>

      <Text>Please login to your account to view the full details of the counselor report.</Text>
      <Text className="mt-5">Thank you,</Text>
      <Text className="-mt-3">SGCCMS Dev Team</Text>
    </EmailLayout>
  );
}
export default CounselorCreateCounselor;
