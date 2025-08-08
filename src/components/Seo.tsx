import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
}

const Seo = ({ title, description, canonical = "/" }: SeoProps) => {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const canonicalUrl = `${siteUrl}${canonical}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: title,
    url: canonicalUrl,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default Seo;
