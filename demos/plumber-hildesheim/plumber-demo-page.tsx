"use client";

import { AlertTriangle, Clock3, Droplets, MapPin, MessageCircle, ShieldCheck, Star, Wrench } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CONFIG } from "@/lib/config";

const BUSINESS_NAME = "Rohrfix Hildesheim";
const PHONE_NUMBER = "+49 5121 987654";
const ADDRESS = "Almsstraße 8, 31134 Hildesheim";

const services = [
  "Emergency pipe burst repair",
  "Blocked drain cleaning",
  "Water heater diagnostics",
  "Leak detection and sealing",
];

const timeSlots = ["Now", "Within 30 min", "Within 1 hour", "Today 18:00"];

export default function PlumberDemoPage() {
  const searchParams = useSearchParams();
  const businessName = searchParams.get("name") || BUSINESS_NAME;
  const phoneNumber = searchParams.get("phone") || PHONE_NUMBER;
  const city = searchParams.get("city") || CONFIG.DEFAULT_CITY;
  const shortDescription =
    searchParams.get("description") ||
    "Fast local emergency plumbers. We stop water damage quickly and fix the root cause.";
  const businessAddress = searchParams.get("address") || ADDRESS;
  const whatsappNumber = CONFIG.WHATSAPP_NUMBER.replace(/[^\d]/g, "");

  const [isOpen, setIsOpen] = useState(false);
  const [issue, setIssue] = useState(services[0]);
  const [slot, setSlot] = useState(timeSlots[0]);
  const [address, setAddress] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const msg = `Emergency request for ${businessName}. Issue: ${issue}. Preferred arrival: ${slot}. Address: ${address}.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  }

  return (
    <main className="bg-zinc-950 pb-24 text-white md:pb-0">
      <section className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-zinc-950" />
        <div className="container relative py-12 md:py-20">
          <p className="inline-flex rounded-full border border-red-300/40 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-200">
            24/7 emergency plumbing
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight md:text-6xl">{businessName}</h1>
          <p className="mt-4 max-w-2xl text-zinc-200 md:text-lg">
            {shortDescription} Fast local support in {city}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-red-600 px-8 text-base font-bold hover:bg-red-500"
            >
              <a href={`tel:${phoneNumber.replace(/\s/g, "")}`}>Emergency Call</a>
            </Button>
            <Button size="lg" variant="secondary" onClick={() => setIsOpen(true)} className="h-12 rounded-full px-8 font-bold">
              Book Now
            </Button>
          </div>
          <div className="mt-8 grid max-w-3xl gap-3 text-sm text-zinc-200 sm:grid-cols-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-3"><Clock3 className="mb-1 h-4 w-4 text-red-300" />Arrival in 30-60 min</div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-3"><ShieldCheck className="mb-1 h-4 w-4 text-red-300" />Licensed technicians</div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-3"><Star className="mb-1 h-4 w-4 text-red-300" />4.9/5 emergency rating</div>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Emergency services</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {services.map((item) => (
            <article key={item} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <Wrench className="mb-2 h-5 w-5 text-red-300" />
              <p className="font-semibold">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900/70">
        <div className="container py-12 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Why locals choose Rohrfix</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">24/7 availability</div>
            <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">Transparent pricing</div>
            <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">Damage prevention first</div>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Customer testimonials</h2>
        <div className="mt-5 space-y-3 text-sm text-zinc-200">
          <p className="rounded-lg bg-zinc-900 p-3">"They arrived in 25 minutes and saved our kitchen." - Petra L.</p>
          <p className="rounded-lg bg-zinc-900 p-3">"Professional, fast, and clear pricing." - Tobias M.</p>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/60">
        <div className="container py-12">
          <h2 className="text-2xl font-bold">Location</h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-zinc-300"><MapPin className="h-4 w-4 text-red-300" />{businessAddress}</p>
          <div className="mt-5 overflow-hidden rounded-xl border border-zinc-700">
            <iframe title="Rohrfix map" src={`https://www.google.com/maps?q=${encodeURIComponent(businessAddress)}&output=embed`} className="h-72 w-full" loading="lazy" />
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-red-600 font-semibold hover:bg-red-500"><a href={`https://maps.google.com/?q=${encodeURIComponent(businessAddress)}`} target="_blank" rel="noreferrer">Open in Google Maps</a></Button>
            <Button asChild variant="secondary" className="rounded-full font-semibold"><a href="https://g.page/r/fake-rohrfix-review" target="_blank" rel="noreferrer">Leave a Google Review</a></Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="container py-8 text-sm text-zinc-400">
          <p>{businessName} | {businessAddress} | Phone {phoneNumber}</p>
          <p className="mt-2 text-zinc-300">See your live traffic dashboard.</p>
        </div>
      </footer>

      <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${businessName}, I need an emergency plumber now.`)}`} target="_blank" rel="noreferrer" aria-label="Open WhatsApp chat" className="fixed bottom-24 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-black/40 transition hover:bg-green-400 md:bottom-6">
        <MessageCircle className="h-7 w-7" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-800 bg-zinc-950/95 p-3 backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <Button asChild className="h-11 rounded-full bg-red-600 font-semibold hover:bg-red-500"><a href={`tel:${phoneNumber.replace(/\s/g, "")}`}>Emergency Call</a></Button>
          <Button asChild variant="secondary" className="h-11 rounded-full font-semibold"><a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${businessName}, I need an emergency plumber now.`)}`} target="_blank" rel="noreferrer">WhatsApp</a></Button>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
            <h3 className="text-xl font-bold">Emergency booking</h3>
            <p className="mt-1 text-sm text-zinc-300">Send us details and we confirm instantly via WhatsApp.</p>
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
              <label className="block text-sm"><span className="mb-1 inline-flex items-center gap-2 text-zinc-300"><Droplets className="h-4 w-4" />Issue</span><select value={issue} onChange={(e) => setIssue(e.target.value)} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2">{services.map((s) => <option key={s}>{s}</option>)}</select></label>
              <label className="block text-sm"><span className="mb-1 inline-flex items-center gap-2 text-zinc-300"><Clock3 className="h-4 w-4" />Arrival window</span><select value={slot} onChange={(e) => setSlot(e.target.value)} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2">{timeSlots.map((s) => <option key={s}>{s}</option>)}</select></label>
              <label className="block text-sm"><span className="mb-1 inline-flex items-center gap-2 text-zinc-300"><MapPin className="h-4 w-4" />Address</span><input required value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" placeholder="Street and number" /></label>
              <Button type="submit" className="w-full rounded-full bg-red-600 font-bold hover:bg-red-500"><AlertTriangle className="mr-2 h-4 w-4" />Send emergency request</Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setIsOpen(false)}>Close</Button>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
