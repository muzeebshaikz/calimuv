import { site } from "@/lib/site";

/**
 * JSON-LD LocalBusiness markup so Google understands CaliMUV is a local gym
 * (name, address, phone, area) — helps local search + rich results.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": site.url,
    name: site.name,
    alternateName: "CaliMUV Minimal Power",
    description: site.description,
    url: site.url,
    telephone: site.contact.phone,
    image: `${site.url}/opengraph-image.jpg`,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Spark7 Sports Arena, Kattigenahalli, Bagalur Main Road",
      addressLocality: "Yelahanka",
      addressRegion: "Karnataka",
      postalCode: "560064",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "Place", name: "Yelahanka" },
      { "@type": "Place", name: "North Bangalore" },
    ],
    sameAs: [site.socials.instagram],
    knowsAbout: [
      "Calisthenics",
      "Bodyweight training",
      "Personal training",
      "Group fitness",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
