import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

type ReadyToGoEmailProps = {
  name: string;
};

export default function ReadyToGoEmail({ name }: ReadyToGoEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Day 5: Your website is ready to launch</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Day 5: You are ready to go live</Heading>
          <Text style={text}>Hi {name}, your SnapLocal site setup is complete.</Text>
          <Text style={text}>
            Final step: publish and start collecting leads through booking and
            WhatsApp.
          </Text>
          <Text style={text}>
            Reply to this email if you want a done-for-you optimization pass.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>SnapLocal • AI websites for local businesses</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#09090b",
  fontFamily: "Inter, Arial, sans-serif",
  padding: "24px 0",
};

const container = {
  backgroundColor: "#18181b",
  border: "1px solid #27272a",
  borderRadius: "12px",
  margin: "0 auto",
  maxWidth: "560px",
  padding: "24px",
};

const h1 = { color: "#f4f4f5", fontSize: "24px", margin: "0 0 12px" };
const text = { color: "#d4d4d8", fontSize: "14px", lineHeight: "1.6", margin: "0 0 10px" };
const hr = { borderColor: "#27272a", margin: "16px 0" };
const footer = { color: "#a1a1aa", fontSize: "12px", margin: "0" };
