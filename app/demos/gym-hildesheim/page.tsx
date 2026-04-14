import type { Metadata } from "next";

import GymDemoPage from "@/demos/gym-hildesheim/gym-demo-page";

const title = "Iron Pulse Gym | Class Booking in Hildesheim";
const description =
  "Iron Pulse Gym is a modern fitness studio in Hildesheim with class schedule booking and free trial class options via instant WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "de_DE",
    url: "https://snaplocal.local/demos/gym-hildesheim",
    images: [
      {
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Modern gym interior",
      },
    ],
  },
};

export default function GymHildesheimPage() {
  return <GymDemoPage />;
}
