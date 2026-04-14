import type { Metadata } from "next";
import { Suspense } from "react";

import PizzaDemoPage from "@/demos/pizza-hildesheim/pizza-demo-page";

const title = "Bella Napoli Hildesheim | Reserve Table & Pizza Delivery";
const description =
  "Bella Napoli in Hildesheim offers authentic Italian pizza, dine-in, takeaway, and delivery. Reserve your table or order via WhatsApp in seconds.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "de_DE",
    url: "https://snaplocal.local/demos/pizza-hildesheim",
    images: [
      {
        url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Fresh pizza from Bella Napoli",
      },
    ],
  },
};

export default function PizzaHildesheimPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
      <PizzaDemoPage />
    </Suspense>
  );
}
