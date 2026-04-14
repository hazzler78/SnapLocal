import Link from "next/link";

import LeadCaptureForm from "@/components/lead-capture-form";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <div className="container py-16 md:py-24">
        <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
          SnapLocal AI Website Builder
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
          Your website live in 30 seconds.
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-300 md:text-lg">
          Generate a premium, conversion-focused local business website with
          booking, WhatsApp, map, and social proof in one click.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-cyan-600 px-8 text-base font-bold hover:bg-cyan-500"
          >
            <Link href="/generator">Start for free</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="h-12 rounded-full px-8 font-semibold">
            <Link href="/demos">View example demos</Link>
          </Button>
        </div>
        <LeadCaptureForm />
      </div>
    </main>
  );
}
