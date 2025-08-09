export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const citySlug = (city: string, stateAbbr: string) => `${slugify(city)}-${stateAbbr.toLowerCase()}`;

export const serviceCitySlug = (serviceSlug: string, citySlugValue: string) => `${serviceSlug}-${citySlugValue}`;
