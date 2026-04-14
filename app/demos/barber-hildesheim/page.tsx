import type { Metadata } from "next";

import BarberDemoPage from "@/demos/barber-hildesheim/barber-demo-page";

const title = "Cut & Style Hildesheim | Modern Barber Appointments";
const description =
  "Cut & Style Hildesheim offers modern barber services with easy service selection and appointment slots, plus instant WhatsApp booking.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "de_DE",
    url: "https://snaplocal.local/demos/barber-hildesheim",
    images: [
      {
        url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Barber cutting hair",
      },
    ],
  },
};

export default function BarberHildesheimPage() {
  return <BarberDemoPage />;
}
