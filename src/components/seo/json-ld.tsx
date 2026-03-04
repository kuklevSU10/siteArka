import { siteConfig } from "@/config/site";

// --- Organization / LocalBusiness (root layout) ---

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/og-image.jpg`,
    image: `${siteConfig.url}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 55.7558,
      longitude: 37.6173,
    },
    sameAs: [
      siteConfig.links.instagram,
      siteConfig.links.telegram,
      siteConfig.links.whatsapp,
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
    areaServed: {
      "@type": "City",
      name: "Москва",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// --- Service schema ---

interface ServiceJsonLdProps {
  services: Array<{
    name: string;
    description: string;
  }>;
}

export function ServiceJsonLd({ services }: ServiceJsonLdProps) {
  const jsonLd = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "LocalBusiness",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
    },
    name: service.name,
    description: service.description,
    areaServed: {
      "@type": "City",
      name: "Москва",
    },
    serviceType: "Дизайн интерьера",
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// --- FAQPage schema ---

interface FAQJsonLdProps {
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQJsonLd({ items }: FAQJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// --- BreadcrumbList schema ---

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
