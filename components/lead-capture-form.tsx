"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { captureLeadAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { CONFIG } from "@/lib/config";

const initialLeadActionState = {
  status: "idle",
  message: "",
} as const;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      className="h-12 w-full rounded-full bg-cyan-600 text-base font-bold hover:bg-cyan-500"
      disabled={pending}
    >
      {pending ? "Sending..." : "Send me my preview"}
    </Button>
  );
}

export default function LeadCaptureForm() {
  const [state, formAction] = useActionState(
    captureLeadAction,
    initialLeadActionState,
  );

  return (
    <section className="mx-auto mt-10 max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-7">
      <h2 className="text-2xl font-black md:text-3xl">
        Get your free website preview + marketing tips
      </h2>
      <p className="mt-2 text-sm text-zinc-300">
        Enter your details and we will send your Day 0 welcome email immediately.
      </p>

      <form action={formAction} className="mt-5 space-y-4">
        <label className="block text-sm">
          <span className="mb-1 block text-zinc-300">Name</span>
          <input
            name="name"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block text-zinc-300">Business type</span>
            <select
              name="businessType"
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            >
              <option value="">Select business type</option>
              <option value="Pizza Restaurant">Pizza Restaurant</option>
              <option value="Emergency Plumber">Emergency Plumber</option>
              <option value="Fitness Gym">Fitness Gym</option>
              <option value="Barber Shop">Barber Shop</option>
              <option value="House Cleaning">House Cleaning</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-zinc-300">Email</span>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
          </label>
        </div>

        <label className="block text-sm">
          <span className="mb-1 block text-zinc-300">City</span>
          <input
            name="city"
            defaultValue={CONFIG.DEFAULT_CITY}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
          />
        </label>

        <SubmitButton />
      </form>

      {state.status !== "idle" ? (
        <p
          className={`mt-3 text-sm ${
            state.status === "success" ? "text-emerald-300" : "text-amber-300"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </section>
  );
}
