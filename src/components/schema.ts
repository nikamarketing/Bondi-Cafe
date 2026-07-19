import { SITE_CONFIG } from '../utils/config';
import { MENU_CATEGORIES } from '../utils/menu';

const config = SITE_CONFIG;

function locationSchema(): object {
  const loc = config.locations[0];
  return {
    '@type': ['Restaurant', 'CafeOrCoffeeShop'],
    name: config.brand.fullName,
    image: `${config.seo.siteUrl}${config.seo.ogImage}`,
    '@id': `${config.seo.siteUrl}/#${loc.id}`,
    url: config.seo.siteUrl,
    telephone: loc.phoneFormatted,
    priceRange: config.brand.priceRange,
    servesCuisine: config.brand.cuisine,
    acceptsReservations: 'True',
    menu: `${config.seo.siteUrl}/menu.html`,
    hasMenu: `${config.seo.siteUrl}/menu.html`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.address.street,
      addressLocality: loc.address.city,
      addressRegion: loc.address.province,
      postalCode: loc.address.postalCode,
      addressCountry: loc.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.coordinates.lat,
      longitude: loc.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '05:00',
        closes: '23:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: loc.googleRating,
      bestRating: 5,
      worstRating: 1,
      reviewCount: loc.googleReviewCount,
    },
    sameAs: [
      config.social.facebook,
      config.social.instagram,
    ].filter(Boolean),
  };
}

export function generateRestaurantSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    ...locationSchema(),
  };
  return JSON.stringify(schema);
}

export function generateLocalBusinessSchemas(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    ...locationSchema(),
  };
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  return JSON.stringify(schema);
}

export function generateSingleLocationSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    ...locationSchema(),
  };
  return JSON.stringify(schema);
}

export function generateMenuSchema(): string {
  const menuSections = MENU_CATEGORIES.map(cat => ({
    '@type': 'MenuSection',
    name: cat.label,
    hasMenuItem: cat.items.map(item => ({
      '@type': 'MenuItem',
      name: item.name,
      offers: {
        '@type': 'Offer',
        price: item.price,
        priceCurrency: 'AUD',
      },
      ...(item.note ? { description: item.note } : {}),
    })),
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `${config.brand.name} Menu`,
    url: `${config.seo.siteUrl}/menu.html`,
    inLanguage: 'en',
    hasMenuSection: menuSections,
  };
  return JSON.stringify(schema);
}

export function generateOrganizationSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.brand.fullName,
    url: config.seo.siteUrl,
    logo: `${config.seo.siteUrl}/assets/images/logo.svg`,
    image: `${config.seo.siteUrl}${config.seo.ogImage}`,
    description: config.brand.description,
    telephone: config.locations[0].phoneFormatted,
    sameAs: [
      config.social.facebook,
      config.social.instagram,
    ].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: config.locations[0].phoneFormatted,
      contactType: 'reservations',
      areaServed: 'AU',
      availableLanguage: 'English',
    },
  };
  return JSON.stringify(schema);
}

export function generateWebSiteSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.brand.name,
    url: config.seo.siteUrl,
  };
  return JSON.stringify(schema);
}

export function generateReviewSchema(): string {
  const reviews = [
    {
      body: "Best flat white in Sydney, hands down. The beans are incredible and the view of Bondi with your morning coffee is unbeatable.",
      source: "Google Review",
      rating: 5,
    },
    {
      body: "The Big Bondi Breakfast after a morning swim is a ritual now. Generous, fresh and the staff remember your order. Highly recommended!",
      source: "TripAdvisor Review",
      rating: 5,
    },
    {
      body: "Came for brunch, stayed for espresso martinis at sunset. Beautiful room, warm service and everything we ate was spot on.",
      source: "Google Review",
      rating: 5,
    },
  ];

  return reviews.map(r => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Review',
      reviewBody: r.body,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
      },
      author: {
        '@type': 'Person',
        name: r.source,
      },
      itemReviewed: {
        '@type': 'Restaurant',
        name: config.brand.fullName,
      },
    };
    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
  }).join('\n');
}

export function generateImageGallerySchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${config.brand.name} Photo Gallery`,
    url: `${config.seo.siteUrl}/gallery.html`,
    description: `Photos of our specialty coffee, all-day breakfast, brunch plates, pastries, cocktails and beachside cafe at ${config.brand.name} in Bondi Beach, Sydney.`,
    about: {
      '@type': 'Restaurant',
      name: config.brand.fullName,
    },
  };
  return JSON.stringify(schema);
}

// Schema for the SEO category landing pages (Coffee, Breakfast & Brunch, Drinks).
export function generateCategoryPageSchema(page: {
  name: string;
  description: string;
  path: string;
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.name,
    description: page.description,
    url: `${config.seo.siteUrl}${page.path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: config.brand.name,
      url: config.seo.siteUrl,
    },
    about: {
      '@type': 'Restaurant',
      name: config.brand.fullName,
      servesCuisine: config.brand.cuisine,
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.locations[0].address.street,
        addressLocality: config.locations[0].address.city,
        addressRegion: config.locations[0].address.province,
        postalCode: config.locations[0].address.postalCode,
        addressCountry: config.locations[0].address.countryCode,
      },
      telephone: config.locations[0].phoneFormatted,
    },
  };
  return JSON.stringify(schema);
}

// Schema for a single menu category — used on category landing pages.
export function generateMenuSectionSchema(categoryId: string): string {
  const cat = MENU_CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return '';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `${cat.label} — ${config.brand.name}`,
    inLanguage: 'en',
    hasMenuSection: [{
      '@type': 'MenuSection',
      name: cat.label,
      ...(cat.note ? { description: cat.note } : {}),
      hasMenuItem: cat.items.map(item => ({
        '@type': 'MenuItem',
        name: item.name,
        ...(item.note ? { description: item.note } : {}),
        offers: {
          '@type': 'Offer',
          price: item.price,
          priceCurrency: 'AUD',
        },
      })),
    }],
  };
  return JSON.stringify(schema);
}
