import { getSanityClient } from "./sanity/client";
import { siteConfig } from "@/config/site-config";
import { faqsQuery, homepageQuery, servicesQuery, siteSettingsQuery, serviceCategoriesQuery, locationsQuery } from "./sanity/queries";

export type HomepageContent = {
  heroTitle?: string;
  heroTagline?: string;
  heroDescription?: string;
  heroImageUrl?: string;
} | null;

export type CMSFaq = { q: string; a: string };

export type CMSService = {
  _id?: string;
  name: string;
  slug: string;
  shortDescription?: string;
  imageUrl?: string;
};

export type CMSServiceCategory = {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
};

export type CMSLocation = {
  _id?: string;
  name: string;
  slug: string;
  phone?: string;
  email?: string;
  address?: { line1?: string; city?: string; state?: string; postalCode?: string };
  geo?: { lat: number; lng: number };
};

export type CMSSiteSettings = {
  businessName?: string;
  email?: string;
  phone?: string;
  defaultDescription?: string;
  address?: {
    line1?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
} | null;

export const isSanityConfigured = () => {
  try {
    const cfg = siteConfig.integrations.sanity;
    if (!cfg || !cfg.projectId || cfg.projectId.trim() === '') {
      return false;
    }
    const client = getSanityClient();
    return Boolean(client.config().projectId);
  } catch {
    return false;
  }
};

export async function getHomepageContent(): Promise<HomepageContent> {
  if (!isSanityConfigured()) return null;
  const client = getSanityClient();
  try {
    const data = await client.fetch<HomepageContent>(homepageQuery);
    return data || null;
  } catch {
    return null;
  }
}

export async function getFaqs(): Promise<CMSFaq[]> {
  if (!isSanityConfigured()) return [];
  const client = getSanityClient();
  try {
    const data = await client.fetch<CMSFaq[]>(faqsQuery);
    return Array.isArray(data) ? data.filter((f): f is CMSFaq => Boolean(f?.q && f?.a)) : [];
  } catch {
    return [];
  }
}

export async function getServices(): Promise<CMSService[]> {
  if (!isSanityConfigured()) return [];
  const client = getSanityClient();
  try {
    const data = await client.fetch<CMSService[]>(servicesQuery);
    return Array.isArray(data) ? data.filter((s): s is CMSService => Boolean(s?.name && s?.slug)) : [];
  } catch {
    return [];
  }
}

export async function getServiceCategories(): Promise<CMSServiceCategory[]> {
  if (!isSanityConfigured()) return [];
  const client = getSanityClient();
  try {
    const data = await client.fetch<CMSServiceCategory[]>(serviceCategoriesQuery);
    return Array.isArray(data) ? data.filter((c): c is CMSServiceCategory => Boolean(c?.name && c?.slug)) : [];
  } catch {
    return [];
  }
}

export async function getLocations(): Promise<CMSLocation[]> {
  if (!isSanityConfigured()) return [];
  const client = getSanityClient();
  try {
    const data = await client.fetch<CMSLocation[]>(locationsQuery);
    return Array.isArray(data) ? data.filter((l): l is CMSLocation => Boolean(l?.name && l?.slug)) : [];
  } catch {
    return [];
  }
}

export async function getSiteSettings(): Promise<CMSSiteSettings> {
  if (!isSanityConfigured()) return null;
  const client = getSanityClient();
  try {
    const data = await client.fetch<CMSSiteSettings>(siteSettingsQuery);
    return data || null;
  } catch {
    return null;
  }
}

// Helpers to build fallbacks in components
export const fallbackServiceItems = () => {
  return siteConfig.taxonomy.services.slice(0, 6).map((s) => ({
    name: s.name,
    slug: s.slug,
    shortDescription: s.shortDescription,
    imageUrl: s.images?.[0]?.src || siteConfig.media.serviceCardDefault?.src || "",
  }));
};
