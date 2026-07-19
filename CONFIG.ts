// ============================================================
// CONFIG.ts — Aaron's Koshe Cafe & Restaurant
// SINGLE SOURCE OF TRUTH for all business info, tracking IDs,
// and meta tags. Update this file ONLY to change business data.
// ============================================================

export const SITE_CONFIG = {

  // ── BRAND ──────────────────────────────────────────────────
  brand: {
    name: "Aaron's Koshe",
    fullName: "Aaron's Koshe Cafe & Restaurant",
    tagline: "Cafe & Restaurant on Bondi Beach",
    description:
      "Aaron's Koshe is Bondi Beach's home of specialty coffee and all-day dining. Single-origin espresso, all-day breakfast, fresh brunch plates, house-baked pastries and evening cocktails, served steps from the sand on Campbell Parade.",
    cuisine: ["Cafe", "Breakfast", "Brunch", "Coffee", "Cocktail Bar"],
    priceRange: "$$",
    logoPath: "/assets/images/logo.svg",
    faviconPath: "/assets/images/favicon-32.png",
  },

  // ── LOCATIONS (NAP) ────────────────────────────────────────
  locations: [
    {
      id: "location-1",
      label: "Aaron's Koshe — Bondi Beach",
      address: {
        street: "94 Campbell Parade",
        city: "Bondi Beach",
        district: "Waverley",
        province: "NSW",
        postalCode: "2026",
        country: "Australia",
        countryCode: "AU",
        full: "94 Campbell Parade, Bondi Beach NSW 2026, Australia",
      },
      coordinates: {
        lat: -33.8908,
        lng: 151.2743,
      },
      phone: "+61293651234",
      phoneFormatted: "+61 2 9365 1234",
      hours: {
        open: "05:00",
        close: "23:00",
        days: "Mon–Sun",
        display: "Open daily 5:00 AM – 11:00 PM · Kitchen until 3:00 PM · Bar from 5:00 PM",
      },
      googleMapsUrl: "https://maps.google.com/?q=94+Campbell+Parade+Bondi+Beach+NSW+2026",
      googleRating: 4.8,
      googleReviewCount: 287,
    },
  ],

  // ── RESERVATION ────────────────────────────────────────────
  reservationUrl: "https://www.quandoo.com.au/en/checkout-widget/widget?merchantId=109686&primaryColor=15588c&theme=brand&aid=146&utm_source=quandoo-partner&utm_medium=widget-link",

  // ── DELIVERY PLATFORMS ─────────────────────────────────────
  delivery: {
    uberEats: "https://www.ubereats.com",
    doorDash: "https://www.doordash.com",
    hungryPanda: "https://www.hungrypanda.co",
  },

  // ── SOCIAL MEDIA ───────────────────────────────────────────
  social: {
    facebook: "https://facebook.com/aaronskoshe",
    instagram: "https://instagram.com/aaronskoshe",
    instagramHandle: "@aaronskoshe",
  },

  // ── TRACKING & ANALYTICS ───────────────────────────────────
  tracking: {
    googleTagManagerId: "GTM-XXXXXXXX",
    googleAnalyticsId: "G-XXXXXXXXXX",
    metaPixelId: "XXXXXXXXXXXXXXXX",
    googleSiteVerification: "",
  },

  // ── SEO DEFAULTS ───────────────────────────────────────────
  seo: {
    siteName: "Aaron's Koshe",
    siteUrl: "https://aaronskoshe.com.au",
    defaultTitle: "Aaron's Koshe — Cafe & Restaurant in Bondi Beach",
    titleTemplate: "%s | Aaron's Koshe — Bondi Beach",
    defaultDescription:
      "Aaron's Koshe — specialty coffee, all-day breakfast, brunch and evening cocktails on Bondi Beach. House-baked pastries, fresh seasonal plates and single-origin espresso on Campbell Parade. Open daily 5AM–11PM.",
    keywords: [
      "cafe Bondi Beach",
      "breakfast Bondi Beach",
      "brunch Bondi",
      "specialty coffee Bondi",
      "all day breakfast Sydney",
      "best cafe Bondi Beach",
      "Aaron's Koshe",
      "Campbell Parade cafe",
      "cocktail bar Bondi Beach",
    ],
    ogImage: "/assets/images/og-image.png",
    locale: "en_AU",
    twitterCard: "summary_large_image",
  },

};

export default SITE_CONFIG;
