"use server";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { Resend } from "resend";

import WelcomeEmail from "@/emails/welcome";
import { CONFIG } from "@/lib/config";

type LeadActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function captureLeadAction(
  _prevState: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  try {
    const name = String(formData.get("name") || "").trim();
    const businessType = String(formData.get("businessType") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const city = String(formData.get("city") || CONFIG.DEFAULT_CITY).trim();

    if (!name || !businessType || !email) {
      return { status: "error", message: "Please fill in all required fields." };
    }

    const lead = {
      name,
      businessType,
      email,
      city,
      createdAt: new Date().toISOString(),
    };

    // MVP persistence: write locally in dev, fallback to logs in Vercel runtime.
    if (process.env.VERCEL) {
      console.log("Lead captured (vercel):", lead);
    } else {
      try {
        const dataDir = path.join(process.cwd(), "data");
        const leadsFile = path.join(dataDir, "leads.json");
        await mkdir(dataDir, { recursive: true });

        let leads: unknown[] = [];
        try {
          const raw = await readFile(leadsFile, "utf-8");
          const parsed = JSON.parse(raw) as unknown[];
          if (Array.isArray(parsed)) {
            leads = parsed;
          }
        } catch {
          leads = [];
        }

        leads.unshift(lead);
        await writeFile(leadsFile, JSON.stringify(leads, null, 2), "utf-8");
      } catch (error) {
        console.error("Lead file persistence failed:", error);
        console.log("Lead captured (fallback):", lead);
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return {
        status: "error",
        message:
          "Lead saved, but RESEND_API_KEY is missing. Add it in Vercel/ENV to send emails.",
      };
    }

    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "SnapLocal <onboarding@resend.dev>",
        to: email,
        subject: "Welcome to SnapLocal - Your free website preview",
        react: WelcomeEmail({ name, businessType, city }),
      });
    } catch (error) {
      console.error("Resend delivery failed:", error);
      return {
        status: "error",
        message: "Lead saved, but welcome email could not be sent.",
      };
    }

    return {
      status: "success",
      message: "Thanks! Your preview request is in and your welcome email is sent.",
    };
  } catch (error) {
    console.error("captureLeadAction failed:", error);
    return {
      status: "error",
      message: "Something went wrong while submitting. Please try again.",
    };
  }
}
