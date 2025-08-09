import { createClient, type ClientConfig } from "@sanity/client";
import { siteConfig } from "@/config/site-config";

export const getSanityClient = () => {
  const cfg = siteConfig.integrations.sanity || {};
  const clientConfig: ClientConfig = {
    projectId: cfg.projectId || "",
    dataset: cfg.dataset || "production",
    apiVersion: cfg.apiVersion || "2023-01-01",
    useCdn: cfg.useCdn ?? true,
  };
  return createClient(clientConfig);
};

export async function fetchBySlug<T>(
  type: string,
  slug: string,
  projection: string = "..."
): Promise<T | null> {
  const client = getSanityClient();
  if (!client.config().projectId) return null; // not configured yet
  const query = `*[_type == $type && slug.current == $slug][0]{${projection}}`;
  return client.fetch<T | null>(query, { type, slug });
}
