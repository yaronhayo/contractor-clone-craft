export const blogListQuery = `*[_type == "post"] | order(publishedAt desc)[0...12]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "imageUrl": coalesce(mainImage.asset->url, ""),
  categories[]->{title}
}`;

export const blogPostBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  excerpt,
  body,
  publishedAt,
  "imageUrl": coalesce(mainImage.asset->url, ""),
  "slug": slug.current,
  "category": categories[0]->title
}`;

// Added content-first queries for the starter
export const homepageQuery = `*[_type == "homepage"][0]{
  "heroTitle": coalesce(heroTitle, ""),
  "heroTagline": coalesce(heroTagline, ""),
  "heroDescription": coalesce(heroDescription, ""),
  "heroImageUrl": coalesce(heroImage.asset->url, "")
}`;

export const servicesQuery = `*[_type == "service"] | order(name asc){
  _id,
  name,
  "slug": slug.current,
  shortDescription,
  "imageUrl": coalesce(images[0].asset->url, "")
}`;

export const faqsQuery = `*[_type == "faq"]{ _id, "q": coalesce(question, q), "a": coalesce(answer, a) }`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  "businessName": coalesce(businessName, name),
  email,
  phone,
  "defaultDescription": coalesce(seo.defaultDescription, defaultDescription, ""),
  "address": {
    "line1": coalesce(address.line1, ""),
    "city": coalesce(address.city, ""),
    "state": coalesce(address.state, ""),
    "postalCode": coalesce(address.postalCode, "")
  }
}`;
