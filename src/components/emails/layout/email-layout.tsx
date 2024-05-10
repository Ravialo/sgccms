import { Body, Container, Head, Html, Img, Row, Section, Tailwind, Text } from "@react-email/components";

const logo = "https://sg-ccms.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.cfabc950.png&w=128&q=75";

export function EmailLayout({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-400 p-4">
          <Container className="bg-white border-2 border-gray-700 rounded-lg p-5">
            <Section className="flex items-center justify-center">
              <Img className="text-center" src={logo} width="100" height="100" alt="Logo" />
            </Section>
            <Section className="mt-6">{children}</Section>
          </Container>

          <Section className="max-w-[580px] mx-auto">
            <Row>
              <Text className="text-center text-gray-800">© 2024 SGCCMS, All Rights Reserved.</Text>
            </Row>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}
export default EmailLayout;
