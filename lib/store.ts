export type BusinessType = "pizza" | "plumber" | "gym" | "barber" | "cleaning" | "other";

export type ClaimedSite = {
  id: string;
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

const MY_SITES_STORAGE_KEY = "snaplocal.myClaimedSites";
const AUTH_STORAGE_KEY = "snaplocal.auth";

export function getMyClaimedSites(): ClaimedSite[] {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(MY_SITES_STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as ClaimedSite[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMyClaimedSites(sites: ClaimedSite[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(MY_SITES_STORAGE_KEY, JSON.stringify(sites));
}

export function addClaimedSite(site: Omit<ClaimedSite, "id">): ClaimedSite {
  const nextSite: ClaimedSite = {
    ...site,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  };
  const existing = getMyClaimedSites();
  saveMyClaimedSites([nextSite, ...existing]);
  return nextSite;
}

export type AuthUser = {
  name: string;
  businessName: string;
};

export type AuthState = {
  isLoggedIn: boolean;
  currentUser: AuthUser | null;
};

export function getAuthState(): AuthState {
  if (typeof window === "undefined") {
    return { isLoggedIn: false, currentUser: null };
  }
  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return { isLoggedIn: false, currentUser: null };
  }
  try {
    const parsed = JSON.parse(raw) as AuthState;
    return {
      isLoggedIn: Boolean(parsed?.isLoggedIn),
      currentUser: parsed?.currentUser ?? null,
    };
  } catch {
    return { isLoggedIn: false, currentUser: null };
  }
}

export function saveAuthState(state: AuthState) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
}

export function loginAsDemoOwner() {
  const firstSite = getMyClaimedSites()[0];
  const authState: AuthState = {
    isLoggedIn: true,
    currentUser: {
      name: "Demo Owner",
      businessName: firstSite?.businessName || "SnapLocal Business",
    },
  };
  saveAuthState(authState);
  return authState;
}

export function logout() {
  saveAuthState({ isLoggedIn: false, currentUser: null });
}
