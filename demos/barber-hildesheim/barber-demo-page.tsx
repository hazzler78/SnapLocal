"use client";

import { Calendar, Clock3, MapPin, MessageCircle, Scissors, Star, UserRound } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CONFIG } from "@/lib/config";

const BUSINESS_NAME = "Cut & Style Hildesheim";
const PHONE_NUMBER = "+49 5121 444222";
const ADDRESS = "Hoher Weg 5, 31134 Hildesheim";

const services = [
  { name: "Classic Haircut", price: "24 EUR" },
  { name: "Skin Fade", price: "29 EUR" },
  { name: "Beard Trim", price: "16 EUR" },
  { name: "Haircut + Beard Combo", price: "39 EUR" },
];

const slots = ["10:00", "11:00", "13:00", "15:00", "17:00", "18:00"];

export default function BarberDemoPage() {
  const searchParams = useSearchParams();
  const businessName = searchParams.get("name") || BUSINESS_NAME;
  const phoneNumber = searchParams.get("phone") || PHONE_NUMBER;
  const city = searchParams.get("city") || CONFIG.DEFAULT_CITY;
  const shortDescription =
    searchParams.get("description") ||
    "Premium cuts, clean fades, sharp beard styling, and a relaxed studio atmosphere.";
  const businessAddress = searchParams.get("address") || ADDRESS;
  const whatsappNumber = CONFIG.WHATSAPP_NUMBER.replace(/[^\d]/g, "");

  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState(services[0].name);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(slots[0]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const msg = `Hi ${businessName}, I want to book ${service} on ${date} at ${slot}.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  }

  return (
    <main className="bg-zinc-950 pb-24 text-white md:pb-0">
      <section className="relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1800&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-zinc-950" />
        <div className="container relative py-12 md:py-20">
          <p className="inline-flex rounded-full border border-amber-300/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-200">Modern barber shop in {city}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight md:text-6xl">{businessName}</h1>
          <p className="mt-4 max-w-2xl text-zinc-200 md:text-lg">{shortDescription} Serving {city}.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => setIsOpen(true)} className="h-12 rounded-full bg-amber-600 px-8 text-base font-bold hover:bg-amber-500">Book Now</Button>
            <Button asChild size="lg" variant="secondary" className="h-12 rounded-full px-8 text-base font-bold"><a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${businessName}, I want an appointment.`)}`} target="_blank" rel="noreferrer">WhatsApp Booking</a></Button>
          </div>
          <div className="mt-8 grid max-w-3xl gap-3 text-sm text-zinc-200 sm:grid-cols-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-3"><Scissors className="mb-1 h-4 w-4 text-amber-300" />Expert barbers</div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-3"><Clock3 className="mb-1 h-4 w-4 text-amber-300" />Easy appointment slots</div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-3"><Star className="mb-1 h-4 w-4 text-amber-300" />4.8/5 client reviews</div>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Service selection</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {services.map((item) => (
            <article key={item.name} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-semibold">{item.name}</p>
              <p className="mt-1 text-sm text-amber-300">{item.price}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900/70">
        <div className="container py-12 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Testimonials</h2>
          <div className="mt-5 space-y-3 text-sm text-zinc-200">
            <p className="rounded-lg bg-zinc-900 p-3">"Best fade in {city}, always on time." - Dennis F.</p>
            <p className="rounded-lg bg-zinc-900 p-3">"Great vibe, clean tools, and sharp beard line every time." - Karim A.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/60">
        <div className="container py-12">
          <h2 className="text-2xl font-bold">Location</h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-zinc-300"><MapPin className="h-4 w-4 text-amber-300" />{businessAddress}</p>
          <div className="mt-5 overflow-hidden rounded-xl border border-zinc-700">
            <iframe title="Cut and Style map" src={`https://www.google.com/maps?q=${encodeURIComponent(businessAddress)}&output=embed`} className="h-72 w-full" loading="lazy" />
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-amber-600 font-semibold hover:bg-amber-500"><a href={`https://maps.google.com/?q=${encodeURIComponent(businessAddress)}`} target="_blank" rel="noreferrer">Open in Google Maps</a></Button>
            <Button asChild variant="secondary" className="rounded-full font-semibold"><a href="https://g.page/r/fake-cut-style-review" target="_blank" rel="noreferrer">Leave a Google Review</a></Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="container py-8 text-sm text-zinc-400">
          <p>{businessName} | {businessAddress} | Phone {phoneNumber}</p>
          <p className="mt-2 text-zinc-300">See your live traffic dashboard.</p>
        </div>
      </footer>

      <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${businessName}, I have a question.`)}`} target="_blank" rel="noreferrer" aria-label="Open WhatsApp chat" className="fixed bottom-24 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-black/40 transition hover:bg-green-400 md:bottom-6"><MessageCircle className="h-7 w-7" /></a>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-800 bg-zinc-950/95 p-3 backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => setIsOpen(true)} className="h-11 rounded-full bg-amber-600 font-semibold hover:bg-amber-500">Book Now</Button>
          <Button asChild variant="secondary" className="h-11 rounded-full font-semibold"><a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${businessName}, I want to book an appointment.`)}`} target="_blank" rel="noreferrer">WhatsApp</a></Button>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
            <h3 className="text-xl font-bold">Book appointment</h3>
            <p className="mt-1 text-sm text-zinc-300">Select service and appointment slot.</p>
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
              <label className="block text-sm"><span className="mb-1 inline-flex items-center gap-2 text-zinc-300"><Scissors className="h-4 w-4" />Service</span><select value={service} onChange={(e) => setService(e.target.value)} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2">{services.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
              <label className="block text-sm"><span className="mb-1 inline-flex items-center gap-2 text-zinc-300"><Calendar className="h-4 w-4" />Date</span><input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" /></label>
              <div><p className="mb-2 inline-flex items-center gap-2 text-sm text-zinc-300"><UserRound className="h-4 w-4" />Appointment slots</p><div className="grid grid-cols-3 gap-2">{slots.map((s) => <button key={s} type="button" onClick={() => setSlot(s)} className={`rounded-lg border px-2 py-2 text-sm ${slot === s ? "border-amber-400 bg-amber-600/20 text-amber-200" : "border-zinc-700 bg-zinc-950"}`}>{s}</button>)}</div></div>
              <Button type="submit" className="w-full rounded-full bg-amber-600 font-bold hover:bg-amber-500">Confirm booking</Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setIsOpen(false)}>Close</Button>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
