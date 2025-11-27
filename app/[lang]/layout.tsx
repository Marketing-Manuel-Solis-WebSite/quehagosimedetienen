import type { Metadata } from 'next';
import { LanguageProvider } from '../context/LanguageContext';
import WhatsAppButton from '../components/WhatsAppButton';
import { translations, Language } from '../lib/translations';
import Script from 'next/script';

type Props = {
  params: Promise<{ lang: Language }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang];
  
  return {
    title: t.seo.home.title,
    description: t.seo.home.description,
    keywords: t.seo.home.keywords,
    authors: [{ name: 'Manuel Solis Law Offices' }],
    openGraph: {
      title: t.seo.home.title,
      description: t.seo.home.description,
      url: 'https://comopuedoarreglar.com',
      siteName: 'Como Puedo Arreglar',
      locale: lang === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://comopuedoarreglar.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t.seo.home.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.seo.home.title,
      description: t.seo.home.description,
      images: ['https://comopuedoarreglar.com/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://comopuedoarreglar.com/${lang}`,
      languages: {
        'es-MX': 'https://comopuedoarreglar.com/es',
        'en-US': 'https://comopuedoarreglar.com/en',
      },
    },
    other: {
      'og:site_name': 'Como Puedo Arreglar',
      'article:publisher': 'https://manuelsolis.com',
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const t = translations[lang];
  
  // Schema.org JSON-LD
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Law Offices of Manuel Solis',
    alternateName: 'Como Puedo Arreglar',
    description: t.seo.home.description,
    url: 'https://comopuedoarreglar.com',
    telephone: '+1-555-555-5555',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '34.0522',
      longitude: '-118.2437',
    },
    areaServed: ['US', 'MX'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
    },
    sameAs: [
      'https://facebook.com/manuelsolis',
      'https://twitter.com/manuelsolis',
      'https://linkedin.com/company/manuelsolis',
      'https://instagram.com/manuelsolis',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Legal Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Immigration Law',
            description: 'Immigration legal services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Personal Injury',
            description: 'Accident and injury cases',
          },
        },
      ],
    },
    parentOrganization: {
      '@type': 'LegalService',
      name: 'Manuel Solis',
      url: 'https://manuelsolis.com',
    },
  };
  
  return (
    <LanguageProvider initialLanguage={lang}>
      {/* Schema.org JSON-LD */}
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      {/* Google Analytics - Actualizar con tu ID */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
      />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `,
        }}
      />
      
      {children}
      <WhatsAppButton />
    </LanguageProvider>
  );
}

export function generateStaticParams() {
  return [{ lang: 'es' as Language }, { lang: 'en' as Language }];
}