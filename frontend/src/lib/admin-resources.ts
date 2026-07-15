// Configuration that drives the generic admin ResourceManager.
// Each resource lists its editable fields and how to render them.

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "stringlist" // newline-separated -> string[]
  | "json"; // textarea of JSON -> object

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[]; // for select
  help?: string;
  /** show this field as a column in the list table */
  column?: boolean;
}

export interface ResourceConfig {
  key: string; // API path segment, e.g. "trainers"
  title: string; // plural heading
  singular: string;
  titleField: string; // main display field in the table
  fields: FieldConfig[];
}

const IMAGE_HELP = "Image URL (Cloudinary) or /images/... path. Leave blank for placeholder.";

export const RESOURCES: Record<string, ResourceConfig> = {
  trainers: {
    key: "trainers",
    title: "Trainers",
    singular: "Trainer",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, column: true },
      { name: "slug", label: "Slug", type: "text", required: true, help: "URL id, e.g. john-doe", column: true },
      { name: "specialization", label: "Specialization", type: "text", column: true },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "photo_url", label: "Photo", type: "text", help: IMAGE_HELP },
      { name: "experience_years", label: "Experience (years)", type: "number" },
      { name: "certifications", label: "Certifications", type: "stringlist", help: "One per line" },
      { name: "social_links", label: "Social links", type: "json", help: '{"instagram": "https://..."}' },
      { name: "display_order", label: "Display order", type: "number" },
      { name: "is_active", label: "Active", type: "boolean", column: true },
    ],
  },
  programs: {
    key: "programs",
    title: "Programs",
    singular: "Program",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, column: true },
      { name: "slug", label: "Slug", type: "text", required: true, column: true },
      { name: "short_description", label: "Short description", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "level", label: "Level", type: "select", options: ["beginner", "intermediate", "advanced", "all"], column: true },
      { name: "duration", label: "Duration", type: "text", placeholder: "e.g. 8 weeks" },
      { name: "image_url", label: "Image", type: "text", help: IMAGE_HELP },
      { name: "features", label: "Features", type: "stringlist", help: "One per line" },
      { name: "display_order", label: "Display order", type: "number" },
      { name: "is_active", label: "Active", type: "boolean", column: true },
    ],
  },
  pricing: {
    key: "pricing",
    title: "Pricing Plans",
    singular: "Plan",
    titleField: "plan_name",
    fields: [
      { name: "plan_name", label: "Plan name", type: "text", required: true, column: true },
      { name: "price", label: "Price", type: "number", required: true, column: true },
      { name: "currency", label: "Currency", type: "text", placeholder: "INR" },
      { name: "billing_period", label: "Billing period", type: "select", options: ["monthly", "quarterly", "yearly", "one-time"], column: true },
      { name: "description", label: "Description", type: "text" },
      { name: "features", label: "Features", type: "stringlist", help: "One per line" },
      { name: "is_featured", label: "Featured (popular)", type: "boolean", column: true },
      { name: "display_order", label: "Display order", type: "number" },
      { name: "is_active", label: "Active", type: "boolean" },
    ],
  },
  gallery: {
    key: "gallery",
    title: "Gallery",
    singular: "Image",
    titleField: "caption",
    fields: [
      { name: "image_url", label: "Image URL", type: "text", required: true, help: IMAGE_HELP, column: true },
      { name: "thumbnail_url", label: "Thumbnail URL", type: "text" },
      { name: "caption", label: "Caption", type: "text", column: true },
      { name: "category", label: "Category", type: "text", placeholder: "training / events / facility", column: true },
      { name: "display_order", label: "Display order", type: "number" },
    ],
  },
  testimonials: {
    key: "testimonials",
    title: "Testimonials",
    singular: "Testimonial",
    titleField: "author_name",
    fields: [
      { name: "author_name", label: "Author name", type: "text", required: true, column: true },
      { name: "author_context", label: "Context", type: "text", placeholder: "e.g. Lost 12kg", column: true },
      { name: "content", label: "Quote", type: "textarea", required: true },
      { name: "rating", label: "Rating (1-5)", type: "number" },
      { name: "photo_url", label: "Author photo", type: "text", help: IMAGE_HELP },
      { name: "is_transformation", label: "Show on Transformations", type: "boolean", column: true },
      { name: "before_image_url", label: "Before image", type: "text", help: IMAGE_HELP },
      { name: "after_image_url", label: "After image", type: "text", help: IMAGE_HELP },
      { name: "is_featured", label: "Featured (home page)", type: "boolean", column: true },
      { name: "display_order", label: "Display order", type: "number" },
      { name: "is_active", label: "Active", type: "boolean" },
    ],
  },
  faqs: {
    key: "faqs",
    title: "FAQs",
    singular: "FAQ",
    titleField: "question",
    fields: [
      { name: "question", label: "Question", type: "text", required: true, column: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "category", label: "Category", type: "text", column: true },
      { name: "display_order", label: "Display order", type: "number" },
      { name: "is_active", label: "Active", type: "boolean", column: true },
    ],
  },
};
