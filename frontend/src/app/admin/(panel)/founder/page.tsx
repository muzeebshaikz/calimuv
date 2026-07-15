"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { admin, API_URL } from "@/lib/api";
import type { Founder } from "@/lib/types";

type Form = {
  name: string;
  title: string;
  bio: string;
  quote: string;
  photo_url: string;
  years_experience: string;
  social_links: string;
  email: string;
  phone: string;
};

const EMPTY: Form = {
  name: "",
  title: "",
  bio: "",
  quote: "",
  photo_url: "",
  years_experience: "",
  social_links: "",
  email: "",
  phone: "",
};

export default function FounderAdminPage() {
  const [id, setId] = useState<number | null>(null);
  const [form, setForm] = useState<Form>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/founder`, { cache: "no-store" })
      .then((r) => r.json())
      .then((f: Founder | null) => {
        if (f) {
          setId(f.id);
          setForm({
            name: f.name ?? "",
            title: f.title ?? "",
            bio: f.bio ?? "",
            quote: f.quote ?? "",
            photo_url: f.photo_url ?? "",
            years_experience: f.years_experience?.toString() ?? "",
            social_links: f.social_links ? JSON.stringify(f.social_links, null, 2) : "",
            email: f.email ?? "",
            phone: f.phone ?? "",
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function set<K extends keyof Form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        title: form.title || null,
        bio: form.bio || null,
        quote: form.quote || null,
        photo_url: form.photo_url || null,
        years_experience: form.years_experience ? Number(form.years_experience) : null,
        social_links: form.social_links.trim() ? JSON.parse(form.social_links) : null,
        email: form.email || null,
        phone: form.phone || null,
      };
      if (id) {
        await admin.update("founder", id, payload);
      } else {
        const created = await admin.create<Founder>("founder", payload);
        setId(created.id);
      }
      toast.success("Founder profile saved");
    } catch (err) {
      toast.error((err as Error).message || "Save failed (check social links JSON)");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="grid place-items-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">Founder Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        This single profile appears on the Founder page.
      </p>

      <div className="mt-8 space-y-4">
        <Field label="Name" required><Input value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Title"><Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Founder & Head Coach" /></Field>
        <Field label="Quote"><Input value={form.quote} onChange={(e) => set("quote", e.target.value)} /></Field>
        <Field label="Bio"><Textarea rows={5} value={form.bio} onChange={(e) => set("bio", e.target.value)} /></Field>
        <Field label="Photo URL" help="Cloudinary URL or /images/... path"><Input value={form.photo_url} onChange={(e) => set("photo_url", e.target.value)} /></Field>
        <Field label="Years of experience"><Input type="number" value={form.years_experience} onChange={(e) => set("years_experience", e.target.value)} /></Field>
        <Field label="Email"><Input value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="Phone"><Input value={form.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
        <Field label="Social links (JSON)" help='e.g. {"instagram": "https://...", "youtube": "https://..."}'>
          <Textarea rows={4} className="font-mono text-xs" value={form.social_links} onChange={(e) => set("social_links", e.target.value)} />
        </Field>

        <Button onClick={save} disabled={saving}>
          {saving && <Loader2 className="size-4 animate-spin" />}
          Save profile
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  help,
  children,
}: {
  label: string;
  required?: boolean;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
      {help && <p className="text-xs text-muted-foreground">{help}</p>}
    </div>
  );
}
