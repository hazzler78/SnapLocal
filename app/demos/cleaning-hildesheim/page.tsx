import type { Metadata } from "next";
import { Suspense } from "react";

import CleaningDemoPage from "@/demos/cleaning-hildesheim/cleaning-demo-page";

const title = "Frische Räume | House Cleaning in Hildesheim";
const description =
  "Frische Räume offers premium home cleaning in Hildesheim with service packages and recurring booking options, plus instant WhatsApp requests.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "de_DE",
    url: "https://snaplocal.local/demos/cleaning-hildesheim",
    images: [
      {
        url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Professional home cleaning",
      },
    ],
  },
};

export default function CleaningHildesheimPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
      <CleaningDemoPage />
    </Suspense>
  );
}
