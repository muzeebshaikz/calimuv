// Central site configuration: brand info, navigation, socials, contact.
// Edit these values to rebrand or update links in one place.

export const site = {
  name: "Calimuv",
  tagline: "Calisthenics Training Institute",
  description:
    "Calimuv is a premium calisthenics training institute. Build real strength, master bodyweight skills, and transform with expert coaching.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // TODO: replace with real details
  contact: {
    email: "hello@calimuv.com",
    phone: "+91 00000 00000",
    address: "Your Studio Address, City, State",
    // Google Maps embed URL — replace `q=` with your address or place ID.
    mapEmbedUrl:
      "https://www.google.com/maps?q=calisthenics+gym&output=embed",
  },

  socials: {
    instagram: "https://instagram.com/",
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
