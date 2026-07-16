// Built-in site content (used when the backend API isn't reachable — e.g. the
// current Netlify deploy has no live backend). Once the backend is deployed,
// its database content takes over automatically via the API in `api.ts`.
//
// To add real photos: drop files in `public/images/...` and point the
// `*_url` fields at them. To edit text/prices: change the values below.

import type {
  Founder,
  Pricing,
  Program,
  Testimonial,
  Trainer,
} from "./types";

const TS = "2026-01-01T00:00:00Z";

// --- Founders / coaching team (shown on /trainers + home) ---
export const trainers: Trainer[] = [
  {
    id: 1,
    name: "Mithun",
    slug: "mithun",
    specialization: "Founder & Head Coach",
    bio: "Co-founder of CaliMUV and head calisthenics coach. Passionate about helping members unlock their first pull-up and progress to advanced skills.",
    photo_url: "/images/founders/mithun.jpg",
    experience_years: null,
    certifications: null,
    social_links: { instagram: "https://instagram.com/calimuv.minimalpower" },
    is_active: true,
    display_order: 1,
    created_at: TS,
    updated_at: TS,
  },
  {
    id: 2,
    name: "Uday",
    slug: "uday",
    specialization: "Founder & Coach",
    bio: "Co-founder of CaliMUV. Coaches strength and skill progressions for every level.",
    photo_url: "/images/founders/uday.jpg", // TODO: add uday.jpg
    experience_years: null,
    certifications: null,
    social_links: { instagram: "https://instagram.com/calimuv.minimalpower" },
    is_active: true,
    display_order: 2,
    created_at: TS,
    updated_at: TS,
  },
  {
    id: 3,
    name: "Vivek",
    slug: "vivek",
    specialization: "Founder & Coach",
    bio: "Co-founder of CaliMUV. Focused on mobility, technique, and sustainable training.",
    photo_url: "/images/founders/vivek.jpg", // TODO: add vivek.jpg
    experience_years: null,
    certifications: null,
    social_links: { instagram: "https://instagram.com/calimuv.minimalpower" },
    is_active: true,
    display_order: 3,
    created_at: TS,
    updated_at: TS,
  },
];

// --- Founder profile (singleton, shown on /founder) ---
export const founder: Founder = {
  id: 1,
  name: "Mithun, Uday & Vivek",
  title: "Founders — CaliMUV",
  bio: "CaliMUV was founded by Mithun, Uday and Vivek with one goal: make world-class calisthenics coaching accessible in North Bangalore. From your first chin-up to advanced skills, the team coaches every member with a personalised, minimal-equipment approach at Spark7 Sports Arena, Yelahanka.",
  quote: "If the plan doesn't work, change the plan — but never the goal.",
  photo_url: "/images/founders/mithun.jpg",
  years_experience: null,
  social_links: { instagram: "https://instagram.com/calimuv.minimalpower" },
  email: null,
  phone: "+91 99002 83417",
  created_at: TS,
  updated_at: TS,
};

// --- Programs (shown on /programs + home) ---
export const programs: Program[] = [
  {
    id: 1,
    title: "Kids & Students",
    slug: "kids-and-students",
    short_description: "Build discipline & strength (age 6+).",
    description:
      "A structured calisthenics program for kids and students that builds discipline, coordination, and real strength through fun, progressive bodyweight training.",
    level: "beginner",
    duration: "Ongoing",
    image_url: null,
    features: ["Age group 6+", "Build discipline & strength", "Coach supervised"],
    is_active: true,
    display_order: 1,
    created_at: TS,
    updated_at: TS,
  },
  {
    id: 2,
    title: "All Levels — Beginner to Advanced",
    slug: "all-levels",
    short_description: "From your first pull-up to advanced skills.",
    description:
      "Whether you're just starting out or chasing the planche, our all-levels program meets you where you are and progresses you safely to advanced calisthenics skills.",
    level: "all",
    duration: "Ongoing",
    image_url: null,
    features: ["Beginner to advanced", "Skill progressions", "Personalised coaching"],
    is_active: true,
    display_order: 2,
    created_at: TS,
    updated_at: TS,
  },
  {
    id: 3,
    title: "Group Classes",
    slug: "group-classes",
    short_description: "Train together, grow together.",
    description:
      "High-energy group calisthenics classes where you train alongside a supportive community and push each other to level up.",
    level: "all",
    duration: "Ongoing",
    image_url: null,
    features: ["Community training", "Beginner & intermediate", "Fun & motivating"],
    is_active: true,
    display_order: 3,
    created_at: TS,
    updated_at: TS,
  },
];

// --- Pricing (shown on /pricing + home) ---
export const pricing: Pricing[] = [
  {
    id: 1,
    plan_name: "Group Training",
    price: "4000.00",
    currency: "INR",
    billing_period: "monthly",
    description: "Train with the community.",
    features: [
      "All group classes",
      "Beginner to advanced",
      "Coach guidance",
      "Access to Spark7 Sports Arena",
    ],
    is_featured: false,
    is_active: true,
    display_order: 1,
    created_at: TS,
    updated_at: TS,
  },
  {
    id: 2,
    plan_name: "Personal Training",
    price: "12000.00",
    currency: "INR",
    billing_period: "monthly",
    description: "1-on-1 coaching for the fastest results.",
    features: [
      "1-on-1 personal training",
      "Fully customised program",
      "Priority scheduling",
      "Form & technique focus",
    ],
    is_featured: true,
    is_active: true,
    display_order: 2,
    created_at: TS,
    updated_at: TS,
  },
];

// --- Testimonials (shown on /testimonials, /transformations + home) ---
export const testimonials: Testimonial[] = [
  {
    id: 1,
    author_name: "CaliMUV Client",
    author_context: "First chin-up in 3 weeks",
    content:
      "Casually unlocked a chin-up — in just 3 weeks! The day I do a pull-up, it's over. Thanks to the CaliMUV team.",
    rating: 5,
    photo_url: "/images/testimonials/client-1.jpg",
    is_transformation: true,
    before_image_url: null,
    after_image_url: "/images/testimonials/client-1.jpg",
    is_featured: true,
    is_active: true,
    display_order: 1,
    created_at: TS,
    updated_at: TS,
  },
];

export const homeData = {
  founder,
  trainers,
  programs,
  pricing,
  testimonials,
};
