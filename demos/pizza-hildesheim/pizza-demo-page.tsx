"use client";

import { Calendar, Clock3, MapPin, MessageCircle, Star, Truck, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { CONFIG } from "@/lib/config";

const PHONE_NUMBER = "+49 5121 123456";
const BUSINESS_NAME = "Bella Napoli";
const ADDRESS = "Marktstraße 12, 31134 Hildesheim";

const pizzas = [
  { name: "Margherita", price: "9.90 EUR" },
  { name: "Salame", price: "11.50 EUR" },
  { name: "Prosciutto", price: "12.20 EUR" },
  { name: "Diavola", price: "12.80 EUR" },
  { name: "Quattro Formaggi", price: "13.40 EUR" },
  { name: "Tonno Cipolla", price: "12.90 EUR" },
  { name: "Vegetaria", price: "11.90 EUR" },
  { name: "Bella Napoli Special", price: "14.50 EUR" },
];

const drinks = [
  { name: "Cola 0.33L", price: "2.90 EUR" },
  { name: "Sprite 0.33L", price: "2.90 EUR" },
  { name: "Still Water 0.5L", price: "2.50 EUR" },
  { name: "Chianti Glass 0.2L", price: "5.90 EUR" },
];

const openingHours = [
  { day: "Monday", hours: "11:00 - 22:00" },
  { day: "Tuesday", hours: "11:00 - 22:00" },
  { day: "Wednesday", hours: "11:00 - 22:00" },
  { day: "Thursday", hours: "11:00 - 22:00" },
  { day: "Friday", hours: "11:00 - 23:00" },
  { day: "Saturday", hours: "12:00 - 23:00" },
  { day: "Sunday", hours: "12:00 - 22:00" },
];

const timeSlots = ["12:00", "13:00", "18:00", "19:00", "20:00", "21:00"];

export default function PizzaDemoPage() {
  const searchParams = useSearchParams();
  const businessName = searchParams.get("name") || BUSINESS_NAME;
  const phoneNumber = searchParams.get("phone") || PHONE_NUMBER;
  const city = searchParams.get("city") || CONFIG.DEFAULT_CITY;
  const shortDescription =
    searchParams.get("description") ||
    "Authentic Italian pizza, fresh ingredients, family-friendly atmosphere.";
  const businessAddress = searchParams.get("address") || ADDRESS;
  const whatsappNumber = CONFIG.WHATSAPP_NUMBER.replace(/[^\d]/g, "");

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPeople, setSelectedPeople] = useState("2");
  const [selectedTime, setSelectedTime] = useState("19:00");

  const todayName = useMemo(() => {
    const day = new Date().getDay();
    const map = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return map[day];
  }, []);

  function handleBookingSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dateLabel = selectedDate || "today";
    const message = `Hi ${businessName}, I want to reserve a table for ${selectedPeople} people on ${dateLabel} at ${selectedTime}.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setIsBookingOpen(false);
  }

  return (
    <main className="bg-zinc-950 pb-24 text-white md:pb-0">
      <section className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-zinc-950" />
        <div className="container relative py-12 md:py-20">
          <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Authentic Italian pizza in {city}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            {businessName}
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-200 md:text-lg">
            {shortDescription} Dine in, takeaway, or fast delivery in {city}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={() => setIsBookingOpen(true)}
              className="h-12 rounded-full bg-red-600 px-8 text-base font-bold hover:bg-red-500"
            >
              Book Now
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="h-12 rounded-full px-8 text-base font-bold"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${businessName}, I want to order pizza.`)}`}
                target="_blank"
                rel="noreferrer"
              >
                Order via WhatsApp
              </a>
            </Button>
          </div>
          <div className="mt-8 grid max-w-3xl gap-3 text-sm text-zinc-200 sm:grid-cols-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-3">
              <Truck className="mb-1 h-4 w-4 text-red-300" />
              Delivery in 25-35 min
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-3">
              <Clock3 className="mb-1 h-4 w-4 text-red-300" />
              Open every day
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-3">
              <Star className="mb-1 h-4 w-4 text-red-300" />
              Rated 4.8/5 by locals
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Menu</h2>
        <p className="mt-2 text-zinc-300">Freshly baked pizzas and cold drinks.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h3 className="text-lg font-bold">Pizzas</h3>
            <ul className="mt-4 space-y-3">
              {pizzas.map((item) => (
                <li key={item.name} className="flex items-center justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-semibold text-red-300">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h3 className="text-lg font-bold">Drinks</h3>
            <ul className="mt-4 space-y-3">
              {drinks.map((item) => (
                <li key={item.name} className="flex items-center justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-semibold text-red-300">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900/70">
        <div className="container py-12 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Services</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">Dine-in</div>
            <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">Takeaway</div>
            <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">Delivery</div>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Book a table</h2>
        <p className="mt-2 text-zinc-300">2 to 8 guests, instant confirmation on WhatsApp.</p>
        <Button
          size="lg"
          onClick={() => setIsBookingOpen(true)}
          className="mt-5 rounded-full bg-red-600 px-8 font-bold hover:bg-red-500"
        >
          Book Now
        </Button>
      </section>

      <section className="container pb-12 md:pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="text-2xl font-bold">Opening hours</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {openingHours.map((item) => {
                const isToday = item.day === todayName;
                return (
                  <li
                    key={item.day}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                      isToday ? "bg-red-600/20 text-red-200" : "bg-zinc-800/70"
                    }`}
                  >
                    <span>{item.day}</span>
                    <span className="font-semibold">{item.hours}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="text-2xl font-bold">What guests say</h2>
            <div className="mt-4 space-y-3 text-sm text-zinc-200">
              <p className="rounded-lg bg-zinc-800/70 p-3">
                "Best pizza in town and super friendly service." - Anna K.
              </p>
              <p className="rounded-lg bg-zinc-800/70 p-3">
                "We reserve every Friday night, always consistent." - Marcel R.
              </p>
              <p className="rounded-lg bg-zinc-800/70 p-3">
                "Fast delivery, hot food, perfect crust." - Laura D.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/60">
        <div className="container py-12">
          <h2 className="text-2xl font-bold">Location</h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-zinc-300">
            <MapPin className="h-4 w-4 text-red-300" />
            {businessAddress}
          </p>
          <div className="mt-5 overflow-hidden rounded-xl border border-zinc-700">
            <iframe
              title="Bella Napoli Map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(businessAddress)}&output=embed`}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-red-600 font-semibold hover:bg-red-500">
              <a href={`https://maps.google.com/?q=${encodeURIComponent(businessAddress)}`} target="_blank" rel="noreferrer">
                Open in Google Maps
              </a>
            </Button>
            <Button asChild variant="secondary" className="rounded-full font-semibold">
              <a href="https://g.page/r/fake-bella-napoli-review" target="_blank" rel="noreferrer">
                Leave a Google Review
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="container py-8 text-sm text-zinc-400">
          <p>
            {businessName} | {businessAddress} | Phone {phoneNumber}
          </p>
          <p className="mt-2 text-zinc-300">See your live traffic dashboard.</p>
        </div>
      </footer>

      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${businessName}, I have a question.`)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Open WhatsApp chat"
        className="fixed bottom-24 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-black/40 transition hover:bg-green-400 md:bottom-6"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-800 bg-zinc-950/95 p-3 backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => setIsBookingOpen(true)} className="h-11 rounded-full bg-red-600 font-semibold hover:bg-red-500">
            Book Now
          </Button>
          <Button asChild variant="secondary" className="h-11 rounded-full font-semibold">
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${businessName}, I want to order pizza.`)}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </Button>
        </div>
      </div>

      {isBookingOpen ? (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Reserve a table</h3>
                <p className="mt-1 text-sm text-zinc-300">Choose date, guests, and time slot.</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsBookingOpen(false)}>
                Close
              </Button>
            </div>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <label className="block text-sm">
                <span className="mb-1 inline-flex items-center gap-2 text-zinc-300">
                  <Calendar className="h-4 w-4" />
                  Date
                </span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 inline-flex items-center gap-2 text-zinc-300">
                  <Users className="h-4 w-4" />
                  Guests (2-8)
                </span>
                <select
                  value={selectedPeople}
                  onChange={(event) => setSelectedPeople(event.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                >
                  {["2", "3", "4", "5", "6", "7", "8"].map((count) => (
                    <option key={count} value={count}>
                      {count} people
                    </option>
                  ))}
                </select>
              </label>
              <div>
                <p className="mb-2 inline-flex items-center gap-2 text-sm text-zinc-300">
                  <Clock3 className="h-4 w-4" />
                  Time slots
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`rounded-lg border px-2 py-2 text-sm ${
                        selectedTime === slot
                          ? "border-red-400 bg-red-600/20 text-red-200"
                          : "border-zinc-700 bg-zinc-950"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full rounded-full bg-red-600 font-bold hover:bg-red-500">
                Confirm on WhatsApp
              </Button>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
