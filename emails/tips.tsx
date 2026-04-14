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

type TipsEmailProps = {
  name: string;
};

export default function TipsEmail({ name }: TipsEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Day 2 tips to get more local bookings</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Day 2: Quick tips for more leads</Heading>
          <Text style={text}>Hi {name}, here are 3 quick wins:</Text>
          <Text style={text}>1) Keep your WhatsApp button visible on mobile.</Text>
          <Text style={text}>2) Ask every happy customer for a Google review.</Text>
          <Text style={text}>3) Put your booking CTA above the fold.</Text>
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
