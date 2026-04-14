import type { Metadata } from "next";

import PlumberDemoPage from "@/demos/plumber-hildesheim/plumber-demo-page";

const title = "Rohrfix Hildesheim | 24/7 Emergency Plumber";
const description =
  "Rohrfix Hildesheim provides 24/7 emergency plumbing with instant call and WhatsApp booking. Fast arrival, transparent pricing, trusted local experts.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "de_DE",
    url: "https://snaplocal.local/demos/plumber-hildesheim",
    images: [
      {
        url: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Emergency plumber at work",
      },
    ],
  },
};

export default function PlumberHildesheimPage() {
  return <PlumberDemoPage />;
}
