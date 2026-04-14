export type BusinessType = "pizza" | "plumber" | "gym" | "barber" | "cleaning" | "other";

export type ClaimedSite = {
  businessType: BusinessType;
  city: string;
  businessName: string;
  phoneNumber: string;
  description: string;
  address: string;
  templateRoute: string;
  previewUrl: string;
  claimedAt: string;
};

export const CLAIMED_SITE_STORAGE_KEY = "snaplocal.claimedSite";

export function saveClaimedSite(site: ClaimedSite) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(CLAIMED_SITE_STORAGE_KEY, JSON.stringify(site));
}

export function getClaimedSite(): ClaimedSite | null {
  if (typeof window === "undefined") {
    return null;
  }
  const raw = window.localStorage.getItem(CLAIMED_SITE_STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as ClaimedSite;
  } catch {
    return null;
  }
}
