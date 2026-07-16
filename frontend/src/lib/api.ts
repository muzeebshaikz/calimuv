// API client for the Calimuv FastAPI backend.
//
// - `apiGet` is used by Server Components to read public content (ISR-cached).
// - Auth + admin mutation helpers run in the browser and attach the JWT.

import * as content from "./content";
import type {
  Admin,
  FAQ,
  Founder,
  GalleryImage,
  HomeData,
  Pricing,
  Program,
  Testimonial,
  Trainer,
} from "./types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const DEFAULT_REVALIDATE = 60; // seconds — content refreshes at most once/min

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// ---------------------------------------------------------------------------
// Server-side reads
// ---------------------------------------------------------------------------
async function apiGet<T>(path: string, revalidate = DEFAULT_REVALIDATE): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate },
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new ApiError(res.status, `GET ${path} failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

// Safe wrapper: returns a fallback instead of throwing, so a page still renders
// if the backend is unavailable (e.g. Render free tier waking up).
async function safeGet<T>(path: string, fallback: T, revalidate?: number): Promise<T> {
  try {
    return await apiGet<T>(path, revalidate);
  } catch (err) {
    console.error(`[api] ${path}:`, (err as Error).message);
    return fallback;
  }
}

// Fallbacks use the built-in content so the site is populated even without a
// live backend. When the backend IS reachable, its data is returned instead.
export const getHome = () => safeGet<HomeData>("/home", content.homeData);

export const getFounder = () =>
  safeGet<Founder | null>("/founder", content.founder);
export const getTrainers = () => safeGet<Trainer[]>("/trainers", content.trainers);
export const getTrainer = (slug: string) =>
  safeGet<Trainer | null>(
    `/trainers/${slug}`,
    content.trainers.find((t) => t.slug === slug) ?? null
  );
export const getPrograms = () => safeGet<Program[]>("/programs", content.programs);
export const getProgram = (slug: string) =>
  safeGet<Program | null>(
    `/programs/${slug}`,
    content.programs.find((p) => p.slug === slug) ?? null
  );
export const getPricing = () => safeGet<Pricing[]>("/pricing", content.pricing);
export const getGallery = () => safeGet<GalleryImage[]>("/gallery", []);
export const getTestimonials = () =>
  safeGet<Testimonial[]>("/testimonials", content.testimonials);
export const getTransformations = () =>
  safeGet<Testimonial[]>(
    "/testimonials/transformations",
    content.testimonials.filter((t) => t.is_transformation)
  );
export const getFaqs = () => safeGet<FAQ[]>("/faqs", []);

// ---------------------------------------------------------------------------
// Public contact form (client-side)
// ---------------------------------------------------------------------------
export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export async function submitContact(payload: ContactPayload): Promise<string> {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(res.status, data?.detail || "Failed to send message");
  }
  return data.detail as string;
}

// ---------------------------------------------------------------------------
// Auth + token storage (browser)
// ---------------------------------------------------------------------------
const TOKEN_KEY = "calimuv_admin_token";

export const tokenStore = {
  get: (): string | null =>
    typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY),
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export async function login(email: string, password: string): Promise<string> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(res.status, data?.detail || "Login failed");
  }
  tokenStore.set(data.access_token);
  return data.access_token;
}

export async function getMe(): Promise<Admin> {
  return authFetch<Admin>("/auth/me");
}

export function logout() {
  tokenStore.clear();
}

// ---------------------------------------------------------------------------
// Authenticated fetch for admin operations (browser)
// ---------------------------------------------------------------------------
export async function authFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = tokenStore.get();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (res.status === 401) {
    tokenStore.clear();
    throw new ApiError(401, "Session expired. Please log in again.");
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(res.status, data?.detail || `Request failed (${res.status})`);
  }
  return data as T;
}

// Generic admin CRUD (client-side, authenticated).
export const admin = {
  list: <T>(resource: string) => authFetch<T[]>(`/${resource}`),
  create: <T>(resource: string, body: unknown) =>
    authFetch<T>(`/${resource}`, { method: "POST", body: JSON.stringify(body) }),
  update: <T>(resource: string, id: number, body: unknown) =>
    authFetch<T>(`/${resource}/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  remove: (resource: string, id: number) =>
    authFetch<{ detail: string }>(`/${resource}/${id}`, { method: "DELETE" }),
};

export { ApiError };
