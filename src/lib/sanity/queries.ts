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
