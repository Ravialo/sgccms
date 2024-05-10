import { Text } from "@react-email/components";

import EmailLayout from "./layout/email-layout";

type ForgotSendCodeProps = {
  name: string;
  code: string;
};

export function ForgotPasswordSendCode({ name, code }: ForgotSendCodeProps) {
  return (
    <EmailLayout>
      <Text>Hi {name},</Text>
      <Text>We have received a request to reset your password. Your verification code is:</Text>
      <Text className="font-bold text-lg">{code}</Text>
      <Text>
        Please enter this code in the password recovery page to proceed with the reset process. If you did not request a
        password reset, please ignore this email.
      </Text>
      <Text className="mt-5">Thank you,</Text>
      <Text className="-mt-3">SGCCMS Dev Team</Text>
    </EmailLayout>
  );
}
export default ForgotPasswordSendCode;
