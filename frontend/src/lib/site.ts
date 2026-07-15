// Central site configuration: brand info, navigation, socials, contact.
// Edit these values to rebrand or update links in one place.

export const site = {
  name: "CaliMUV",
  slogan: "Minimal Power",
  tagline: "North Bangalore's Premier Calisthenics Institute",
  marketingTagline: "Build Muscle. Burn Fat. Boost Confidence.",
  locationBadge: "North Bangalore's Best Calisthenics",
  venue: "Spark7 Sports Arena",
  description:
    "CaliMUV — North Bangalore's premier calisthenics training institute at Spark7 Sports Arena, Yelahanka. Build muscle, burn fat, and master bodyweight skills with expert coaching for every level.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  contact: {
    // TODO: add a real email if you have one
    email: "calimuv.minimalpower@gmail.com",
    phone: "+91 99002 83417",
    address:
      "Spark7 Sports Arena, Kattigenahalli, Bagalur Main Road, Yelahanka, Bengaluru 560064",
    locationTagline: "Where Strength meets Community.",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Spark7+Sports+Arena+Kattigenahalli+Bagalur+Road+Yelahanka&output=embed",
  },

  socials: {
    instagram: "https://instagram.com/calimuv.minimalpower",
    instagramHandle: "@calimuv.minimalpower",
    youtube: "https://youtube.com/",
    facebook: "https://facebook.com/",
    x: "https://x.com/",
  },
} as const;

// Primary navigation shown in the navbar and footer.
export const navLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Founder", href: "/founder" },
  { label: "Trainers", href: "/trainers" },
  { label: "Programs", href: "/programs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Gallery", href: "/gallery" },
  { label: "Transformations", href: "/transformations" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Schedule", href: "/schedule" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];
