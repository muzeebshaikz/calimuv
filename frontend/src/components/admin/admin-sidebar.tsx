"use client";

import {
  Dumbbell,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Users,
  Dumbbell as ProgramIcon,
  Tag,
  Star,
  HelpCircle,
  UserCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/api";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/trainers", label: "Trainers", icon: Users },
  { href: "/admin/programs", label: "Programs", icon: ProgramIcon },
  { href: "/admin/pricing", label: "Pricing", icon: Tag },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/founder", label: "Founder", icon: UserCircle },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/admin/login");
  }

  return (
    <aside className="flex h-dvh w-60 shrink-0 flex-col border-r bg-muted/20">
      <div className="flex h-16 items-center gap-2 border-b px-5 font-bold">
        <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Dumbbell className="size-4" />
        </span>
        {site.name}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {links.map((l) => {
          const active =
            l.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <l.icon className="size-4" />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t p-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ExternalLink className="size-4" /> View site
        </a>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground"
          onClick={handleLogout}
        >
          <LogOut className="size-4" /> Log out
        </Button>
      </div>
    </aside>
  );
}
