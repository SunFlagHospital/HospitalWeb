import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = 'Sunflag Global Hospital Rohtak | World-Class Healthcare',
  description = 'Sunflag Global Hospital Rohtak — Advanced medical care with compassion. Expert doctors in cardiology, oncology, orthopedics, neurology and 50+ specialities.',
  keywords = 'hospital rohtak, best hospital haryana, cardiology rohtak, orthopedics rohtak, cancer treatment haryana, emergency hospital rohtak',
  ogImage = '/og-image.jpg',
  canonical,
}) => {
  const fullTitle = title.includes('Sunflag') ? title : `${title} | Sunflag Global Hospital Rohtak`
  const url = canonical ? `https://sunflaghospital.com${canonical}` : 'https://sunflaghospital.com'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Sunflag Global Hospital" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema.org */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Hospital",
        "name": "Sunflag Global Hospital",
        "url": "https://sunflaghospital.com",
        "telephone": "+91-1262-255555",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Delhi Bypass Road",
          "addressLocality": "Rohtak",
          "addressRegion": "Haryana",
          "postalCode": "124001",
          "addressCountry": "IN"
        }
      })}</script>
    </Helmet>
  )
}

export default SEO
