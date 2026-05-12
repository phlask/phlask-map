import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  ogType?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const SEO = ({
  title,
  description,
  ogType = 'website',
  ogImage = 'https://phlask.me/assets/favicon.png',
  canonicalUrl
}: SEOProps) => {
  const siteTitle = 'PHLASK';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription =
    'An ecosystem for finding and sharing free resources like water, food, bathrooms, and foraging in Philadelphia.';
  const metaDescription = description || defaultDescription;
  const url = canonicalUrl || 'https://phlask.me';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
