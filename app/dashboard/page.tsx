"use client";

import { BarChart3, Crown, ExternalLink, Link2, Pencil, Rocket, WalletCards } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { CONFIG } from "@/lib/config";
import { type ClaimedSite, getMyClaimedSites } from "@/lib/store";

export default function DashboardPage() {
  const router = useRouter();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [mySites, setMySites] = useState<ClaimedSite[]>([]);
  const [selectedSiteId, setSelectedSiteId] = useState("");

  useEffect(() => {
    const sites = getMyClaimedSites();
    setMySites(sites);
    setSelectedSiteId(sites[0]?.id || "");
  }, []);

  const trafficBars = useMemo(() => [7, 5, 9, 6, 8, 4, 8], []);
  const selectedSite = mySites.find((site) => site.id === selectedSiteId) || mySites[0];
  const greetingName = selectedSite?.businessName || "Business Owner";

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2200);
  }

  function handleEditWebsite() {
    if (!selectedSite) {
      showToast("Claim a site first.");
      return;
    }
    const params = new URLSearchParams({
      type: selectedSite.businessType,
      city: selectedSite.city,
      name: selectedSite.businessName,
      phone: selectedSite.phoneNumber,
      description: selectedSite.description,
    });
    router.push(`/generator?${params.toString()}`);
  }

  async function handleShareLink() {
    if (!selectedSite) {
      showToast("Claim a site first.");
      return;
    }
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}${selectedSite.previewUrl}`,
      );
      showToast("Live site link copied to clipboard.");
    } catch {
      showToast("Could not copy link.");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="container py-8 md:py-10">
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">Owner Dashboard</p>
          <h1 className="mt-2 text-3xl font-black md:text-4xl">Welcome back, {greetingName}!</h1>
          <p className="mt-2 text-sm text-zinc-300">Your website is live and attracting local leads.</p>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 lg:col-span-2">
            <div className="border-b border-zinc-800 px-5 py-3">
              <h2 className="text-lg font-bold">My Sites</h2>
            </div>
            <div className="space-y-4 p-5">
              {mySites.length > 0 ? (
                <label className="block text-sm">
                  <span className="mb-1 block text-zinc-300">Selected site</span>
                  <select
                    value={selectedSiteId}
                    onChange={(event) => setSelectedSiteId(event.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                  >
                    {mySites.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.businessName}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
              {mySites.length === 0 ? (
                <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-5 text-sm text-zinc-300">
                  No claimed sites yet. Generate and claim your first website from{" "}
                  <Link href="/generator" className="text-cyan-300 hover:underline">
                    the generator
                  </Link>.
                </div>
              ) : (
                mySites.map((site) => (
                  <div key={site.id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                    <div className="overflow-hidden rounded-lg border border-zinc-800">
                      <iframe
                        title={`${site.businessName} preview`}
                        src={site.previewUrl}
                        className="h-48 w-full bg-white md:h-64"
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold">{site.businessName}</p>
                        <p className="text-xs text-zinc-400">
                          {site.businessType} template · claimed{" "}
                          {new Date(site.claimedAt).toLocaleDateString("de-DE")}
                        </p>
                      </div>
                      <Button asChild className="rounded-full bg-cyan-600 font-semibold hover:bg-cyan-500">
                        <a href={site.previewUrl} target="_blank" rel="noreferrer">
                          View live site <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="text-lg font-bold">Analytics</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-lg bg-zinc-800/70 p-3">Today&apos;s bookings: <span className="font-bold text-cyan-300">3</span></div>
              <div className="rounded-lg bg-zinc-800/70 p-3">Top keyword: <span className="font-bold text-cyan-300">pizza hildesheim</span></div>
              <div className="rounded-lg bg-zinc-800/70 p-3">WhatsApp messages received: <span className="font-bold text-cyan-300">12</span></div>
            </div>
            <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-950 p-3">
              <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
                <span>This week&apos;s traffic</span>
                <span>47 visitors</span>
              </div>
              <div className="flex h-24 items-end gap-2">
                {trafficBars.map((height, index) => (
                  <div key={index} className="flex-1 rounded-t bg-cyan-500/80" style={{ height: `${height * 10}%` }} />
                ))}
              </div>
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="text-lg font-bold">Quick actions</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="secondary" className="justify-start rounded-xl font-medium" onClick={handleEditWebsite}>
              <Pencil className="mr-2 h-4 w-4" />Edit website
            </Button>
            <Button variant="secondary" className="justify-start rounded-xl font-medium" onClick={handleShareLink}>
              <Link2 className="mr-2 h-4 w-4" />Share link
            </Button>
            <Button variant="secondary" className="justify-start rounded-xl font-medium" onClick={() => setShowBookingsModal(true)}>
              <BarChart3 className="mr-2 h-4 w-4" />See bookings
            </Button>
            <Button variant="secondary" className="justify-start rounded-xl font-medium" onClick={() => setShowPaymentModal(true)}>
              <Crown className="mr-2 h-4 w-4" />Upgrade to Premium Analytics
            </Button>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
          <h2 className="text-xl font-bold">
            Your site is live! Keep it running for EUR{CONFIG.MONTHLY_PRICE}/month
          </h2>
          <p className="mt-2 text-sm text-zinc-200">
            Keep hosting, updates, and lead tracking active with one click.
          </p>
          <Button onClick={() => setShowPaymentModal(true)} className="mt-4 rounded-full bg-emerald-600 font-semibold hover:bg-emerald-500">
            <WalletCards className="mr-2 h-4 w-4" />Subscribe now
          </Button>
        </section>
      </div>

      {showPaymentModal ? (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-6 text-center">
            <Rocket className="mx-auto h-10 w-10 text-emerald-400" />
            <h2 className="mt-3 text-2xl font-bold">Payment flow coming soon</h2>
            <p className="mt-2 text-sm text-zinc-300">
              You&apos;ll be able to activate your monthly subscription in the next step.
            </p>
            <Button onClick={() => setShowPaymentModal(false)} className="mt-5 rounded-full bg-emerald-600 px-8 font-semibold hover:bg-emerald-500">
              Close
            </Button>
          </div>
        </div>
      ) : null}

      {showBookingsModal ? (
        <div className="fixed inset-0 z-[75] grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">Recent bookings</h2>
            <p className="mt-1 text-sm text-zinc-300">
              Live booking feed for {selectedSite?.businessName || "your site"}.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-zinc-700">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-800 text-zinc-200">
                  <tr>
                    <th className="px-3 py-2">Customer</th>
                    <th className="px-3 py-2">Service</th>
                    <th className="px-3 py-2">Time</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-zinc-800">
                    <td className="px-3 py-2">Anna Meyer</td>
                    <td className="px-3 py-2">Table reservation</td>
                    <td className="px-3 py-2">Today 18:30</td>
                    <td className="px-3 py-2 text-emerald-300">Confirmed</td>
                  </tr>
                  <tr className="border-t border-zinc-800">
                    <td className="px-3 py-2">Lukas Brandt</td>
                    <td className="px-3 py-2">WhatsApp inquiry</td>
                    <td className="px-3 py-2">Today 14:10</td>
                    <td className="px-3 py-2 text-cyan-300">New</td>
                  </tr>
                  <tr className="border-t border-zinc-800">
                    <td className="px-3 py-2">Nina Hoffmann</td>
                    <td className="px-3 py-2">Booking request</td>
                    <td className="px-3 py-2">Tomorrow 11:00</td>
                    <td className="px-3 py-2 text-amber-300">Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button className="mt-5 rounded-full bg-cyan-600 px-8 font-semibold hover:bg-cyan-500" onClick={() => setShowBookingsModal(false)}>
              Close
            </Button>
          </div>
        </div>
      ) : null}

      {toastMessage ? (
        <div className="fixed right-4 top-20 z-[95] rounded-lg border border-cyan-400/40 bg-cyan-500/15 px-4 py-3 text-sm text-cyan-200 shadow-lg">
          {toastMessage}
        </div>
      ) : null}
    </main>
  );
}
