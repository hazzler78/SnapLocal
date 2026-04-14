"use client";

import { CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CONFIG } from "@/lib/config";

export default function PricingPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function handleSubscribe() {
    setShowPaymentModal(false);
    setShowToast(true);
    setShowSuccessModal(true);
    window.setTimeout(() => setShowToast(false), 2500);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="container py-10 md:py-14">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">Pricing</p>
          <h1 className="mt-2 text-4xl font-black md:text-5xl">Simple pricing for local businesses</h1>
          <p className="mt-3 text-zinc-300">
            Launch and manage high-converting local business websites with one transparent monthly plan.
          </p>
        </section>

        <section className="mx-auto mt-8 max-w-2xl">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <div className="mb-4 inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              First 30 days free
            </div>
            <h2 className="text-3xl font-black">SnapLocal Pro</h2>
            <p className="mt-2 text-2xl font-bold text-cyan-300">EUR{CONFIG.MONTHLY_PRICE} per month</p>

            <ul className="mt-6 space-y-3 text-sm text-zinc-200">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />Unlimited one-click websites</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />Booking calendar + WhatsApp integration</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />Google review prompts + Maps</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />Live traffic & booking analytics</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />Mobile-first design, always yours</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />No credit card needed to start</li>
            </ul>

            <Button
              onClick={() => setShowPaymentModal(true)}
              size="lg"
              className="mt-7 h-12 w-full rounded-full bg-cyan-600 text-base font-bold hover:bg-cyan-500"
            >
              Subscribe now
            </Button>
            <p className="mt-3 text-center text-xs text-zinc-400">Cancel anytime. No contracts.</p>
          </article>
        </section>

        <div className="mt-8 text-center">
          <Button asChild variant="secondary" size="lg" className="rounded-full px-8 font-semibold">
            <Link href="/generator">Back to Generator</Link>
          </Button>
        </div>
      </div>

      {showPaymentModal ? (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
            <div className="mb-4 flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="h-5 w-5" />
              <p className="text-sm font-semibold">Secure checkout</p>
            </div>
            <h3 className="text-2xl font-bold">SnapLocal Pro</h3>
            <p className="mt-1 text-sm text-zinc-300">
              EUR{CONFIG.MONTHLY_PRICE}/month (billed monthly)
            </p>

            <div className="mt-4 space-y-3">
              <input
                placeholder="Cardholder name"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
              />
              <input
                placeholder="Email address"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
              />
            </div>

            <Button
              onClick={handleSubscribe}
              className="mt-5 w-full rounded-full bg-emerald-600 font-semibold hover:bg-emerald-500"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Pay with Stripe
            </Button>
            <Button
              variant="ghost"
              className="mt-2 w-full"
              onClick={() => setShowPaymentModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : null}

      {showSuccessModal ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-6 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
            <h3 className="mt-3 text-2xl font-bold">Welcome to SnapLocal!</h3>
            <p className="mt-2 text-sm text-zinc-300">Your site is now active.</p>
            <Button
              className="mt-5 rounded-full bg-emerald-600 px-8 font-semibold hover:bg-emerald-500"
              onClick={() => setShowSuccessModal(false)}
            >
              Great
            </Button>
          </div>
        </div>
      ) : null}

      {showToast ? (
        <div className="fixed right-4 top-20 z-[90] rounded-lg border border-emerald-400/40 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-200 shadow-lg">
          Subscription successful! SnapLocal Pro is active.
        </div>
      ) : null}
    </main>
  );
}
