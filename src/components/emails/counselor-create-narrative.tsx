import { Text } from "@react-email/components";

import EmailLayout from "./layout/email-layout";

type CounselorCreateNarrativeProps = {
  principalName: string;
  type: string;
  counselorName: string;
  reportedBy: string;
  incident: string;
  date: string;
  time: string;
};

function CounselorCreateNarrative(props: CounselorCreateNarrativeProps) {
  return (
    <EmailLayout>
      <Text>Hello {props.principalName},</Text>

      <Text>
        I hope you&lsquo;re doing well. I wanted to let you know that a counselor has created a new narrative report.
        Here are the details:
      </Text>
      <Text>
        Type: <span className="font-bold">{props.type}</span>
      </Text>
      <Text className="-mt-5">
        Counselor Name: <span className="font-bold">{props.counselorName}</span>
      </Text>
      <Text className="-mt-5">
        Reported By: <span className="font-bold">{props.reportedBy}</span>
      </Text>
      <Text className="-mt-5">
        Incident: <span className="font-bold">{props.incident}</span>
      </Text>
      <Text className="-mt-5">
        Date: <span className="font-bold">{props.date}</span>
      </Text>
      <Text className="-mt-5">
        Time: <span className="font-bold">{props.time}</span>
      </Text>

      <Text>Please login to your account to view the full details of the narrative report.</Text>
      <Text className="mt-5">Thank you,</Text>
      <Text className="-mt-3">SGCCMS Dev Team</Text>
    </EmailLayout>
  );
}
export default CounselorCreateNarrative;
