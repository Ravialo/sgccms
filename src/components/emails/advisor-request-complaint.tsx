import { Text } from "@react-email/components";

import EmailLayout from "./layout/email-layout";

type AdvisorRequestComplaintProps = {
  counselorName: string;
  advisorName: string;
  studentName: string;
  gradeSection: string;
  whatHappened: string;
  place: string;
};

function AdvisorRequestComplaint(props: AdvisorRequestComplaintProps) {
  return (
    <EmailLayout>
      <Text>Hello {props.counselorName},</Text>

      <Text>
        I hope you&lsquo;re doing well. I wanted to let you know that an advisor has created a new complaint request.
        Here are the details:
      </Text>
      <Text>
        Advisor Name: <span className="font-bold">{props.advisorName}</span>
      </Text>
      <Text className="-mt-5">
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

      <Text>Please login to your account to view the full details of the complaint request.</Text>
      <Text className="mt-5">Thank you,</Text>
      <Text className="-mt-3">SGCCMS Dev Team</Text>
    </EmailLayout>
  );
}
export default AdvisorRequestComplaint;
