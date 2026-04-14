"use client";

import { Menu, UserCircle2, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { getAuthState, loginAsDemoOwner, logout } from "@/lib/store";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/generator", label: "Generator" },
  { href: "/dashboard", label: "My Dashboard" },
  { href: "/demos", label: "Demos" },
  { href: "/pricing", label: "Pricing" },
];

export default function SharedNav() {
  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [businessName, setBusinessName] = useState("SnapLocal Business");

  useEffect(() => {
    const auth = getAuthState();
    setIsLoggedIn(auth.isLoggedIn);
    setBusinessName(auth.currentUser?.businessName || "SnapLocal Business");
  }, []);

  function handleLogin() {
    const auth = loginAsDemoOwner();
    setIsLoggedIn(auth.isLoggedIn);
    setBusinessName(auth.currentUser?.businessName || "SnapLocal Business");
    setShowLoginModal(false);
  }

  function handleLogout() {
    logout();
    setIsLoggedIn(false);
    setBusinessName("SnapLocal Business");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="text-sm font-extrabold tracking-wide text-cyan-300">
          SnapLocal
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {navLinks
            .filter((item) => (item.label === "My Dashboard" ? isLoggedIn : true))
            .map((item) => (
            <Link key={item.label} href={item.href} className="text-sm text-zinc-300 hover:text-white">
              {item.label}
            </Link>
            ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isLoggedIn ? (
            <>
              <p className="text-xs text-zinc-300">{businessName}</p>
              <UserCircle2 className="h-7 w-7 text-zinc-300" />
              <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white" onClick={() => setShowLoginModal(true)}>
              Login
            </Button>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-zinc-800 bg-zinc-900 md:hidden">
          <nav className="container flex flex-col py-3">
            {navLinks
              .filter((item) => (item.label === "My Dashboard" ? isLoggedIn : true))
              .map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-md px-2 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
              ))}
            {isLoggedIn ? (
              <button
                type="button"
                className="mt-2 rounded-md px-2 py-2 text-left text-sm text-zinc-200 hover:bg-zinc-800"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                className="mt-2 rounded-md px-2 py-2 text-left text-sm text-zinc-200 hover:bg-zinc-800"
                onClick={() => {
                  setOpen(false);
                  setShowLoginModal(true);
                }}
              >
                Login
              </button>
            )}
          </nav>
        </div>
      ) : null}

      {showLoginModal ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Access your dashboard and claimed sites instantly for this demo.
            </p>
            <Button onClick={handleLogin} className="mt-5 w-full rounded-full bg-cyan-600 font-semibold hover:bg-cyan-500">
              Login as Demo Owner
            </Button>
            <Button variant="ghost" className="mt-2 w-full" onClick={() => setShowLoginModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
