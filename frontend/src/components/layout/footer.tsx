import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/icons/social";
import { navLinks, site } from "@/lib/site";

export function Footer() {
  const year = 2026; // NOTE: static to keep the layout a Server Component; update as needed

  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" aria-label={`${site.name} home`}>
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {site.description}
          </p>
          <p className="mt-3 text-sm font-medium text-primary">
            {site.venue}
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {navLinks.slice(1, 7).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More */}
        <div>
          <h3 className="text-sm font-semibold">More</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {navLinks.slice(7).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/join" className="hover:text-primary">
                Join Now
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-primary" />
              <a href={`mailto:${site.contact.email}`} className="hover:text-primary">
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-primary" />
              <a href={`tel:${site.contact.phone}`} className="hover:text-primary">
                {site.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="size-4 shrink-0 text-primary" />
              <span>{site.contact.address}</span>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href={site.socials.instagram} aria-label="Instagram" className="text-muted-foreground hover:text-primary" target="_blank" rel="noreferrer">
              <InstagramIcon className="size-5" />
            </a>
            <a href={site.socials.youtube} aria-label="YouTube" className="text-muted-foreground hover:text-primary" target="_blank" rel="noreferrer">
              <YoutubeIcon className="size-5" />
            </a>
            <a href={site.socials.facebook} aria-label="Facebook" className="text-muted-foreground hover:text-primary" target="_blank" rel="noreferrer">
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 py-6 text-center text-sm text-muted-foreground">
        © {year} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
