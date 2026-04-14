import Link from "next/link";

import { Button } from "@/components/ui/button";

const demos = [
  {
    name: "Bella Napoli",
    subtitle: "Pizza Restaurant",
    type: "pizza",
    route: "/demos/pizza-hildesheim",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Rohrfix Hildesheim",
    subtitle: "24/7 Emergency Plumber",
    type: "plumber",
    route: "/demos/plumber-hildesheim",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Iron Pulse Gym",
    subtitle: "Fitness Studio",
    type: "gym",
    route: "/demos/gym-hildesheim",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Cut & Style Hildesheim",
    subtitle: "Modern Barber Shop",
    type: "barber",
    route: "/demos/barber-hildesheim",
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Frische Räume",
    subtitle: "House Cleaning Service",
    type: "cleaning",
    route: "/demos/cleaning-hildesheim",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function DemosGalleryPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="container py-10 md:py-14">
        <section className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">Template Gallery</p>
          <h1 className="mt-2 text-4xl font-black md:text-5xl">
            See what SnapLocal can build in 30 seconds
          </h1>
          <p className="mt-3 text-zinc-300">
            Explore five conversion-focused local business templates and launch your own version instantly.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {demos.map((demo) => (
            <article key={demo.name} className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <div className="h-44 w-full bg-cover bg-center" style={{ backgroundImage: `url(${demo.image})` }} />
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-zinc-400">{demo.subtitle}</p>
                <h2 className="mt-1 text-xl font-bold">{demo.name}</h2>
                <div className="mt-4 flex gap-2">
                  <Button asChild className="rounded-full bg-cyan-600 font-semibold hover:bg-cyan-500">
                    <Link href={`/generator?type=${demo.type}`}>Try this template</Link>
                  </Button>
                  <Button asChild variant="secondary" className="rounded-full font-semibold">
                    <Link href={demo.route}>View demo</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
