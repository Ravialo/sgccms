import { Text } from "@react-email/components";

import EmailLayout from "./layout/email-layout";

type ForgotResetSuccessProps = {
  name: string;
};
export function ForgotResetSuccess({ name }: ForgotResetSuccessProps) {
  return (
    <EmailLayout>
      <Text>Hi {name},</Text>
      <Text>
        Your password has been recovered successfully. If you&lsquo;re not the one who requested for a change, please
        report immediately to the Admin Team.
      </Text>
      <Text className="mt-5">Thank you,</Text>
      <Text className="-mt-3">SGCCMS Dev Team</Text>
    </EmailLayout>
  );
}
export default ForgotResetSuccess;
