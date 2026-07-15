"use client";

import {
  HelpCircle,
  Image as ImageIcon,
  MessageSquare,
  Star,
  Tag,
  Users,
  Dumbbell,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { admin } from "@/lib/api";

const cards = [
  { key: "trainers", label: "Trainers", href: "/admin/trainers", icon: Users },
  { key: "programs", label: "Programs", href: "/admin/programs", icon: Dumbbell },
  { key: "pricing", label: "Plans", href: "/admin/pricing", icon: Tag },
  { key: "gallery", label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { key: "testimonials", label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { key: "faqs", label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { key: "contact", label: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export default function DashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    cards.forEach((c) => {
      admin
        .list(c.key)
        .then((data) =>
          setCounts((prev) => ({ ...prev, [c.key]: (data as unknown[]).length }))
        )
        .catch(() => {});
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage all your website content from here.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.key} href={c.href}>
            <Card className="flex items-center gap-4 p-5 transition-shadow hover:shadow-md">
              <span className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary">
                <c.icon className="size-6" />
              </span>
              <div>
                <p className="text-2xl font-bold">
                  {counts[c.key] ?? "—"}
                </p>
                <p className="text-sm text-muted-foreground">{c.label}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
