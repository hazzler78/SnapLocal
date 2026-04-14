import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type WelcomeEmailProps = {
  name: string;
  businessType: string;
  city: string;
};

export default function WelcomeEmail({
  name,
  businessType,
  city,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your free SnapLocal website preview is in progress</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to SnapLocal, {name}!</Heading>
          <Text style={text}>
            We are generating your {businessType} preview for {city}. You will
            get practical tips over the next few days so you can launch faster.
          </Text>
          <Section style={card}>
            <Text style={text}>
              Day 0: We are preparing your website structure and conversion
              blocks.
            </Text>
            <Text style={text}>
              Next: You will receive a short checklist to get more local leads.
            </Text>
          </Section>
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
const text = { color: "#d4d4d8", fontSize: "14px", lineHeight: "1.6", margin: "0 0 12px" };
const card = { backgroundColor: "#0f172a", borderRadius: "10px", padding: "14px" };
const hr = { borderColor: "#27272a", margin: "16px 0" };
const footer = { color: "#a1a1aa", fontSize: "12px", margin: "0" };
