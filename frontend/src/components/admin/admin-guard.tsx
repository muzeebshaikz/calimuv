"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getMe, tokenStore } from "@/lib/api";
import type { Admin } from "@/lib/types";

// Client-side auth gate. Verifies the stored JWT with the backend (`/auth/me`)
// and redirects to the login page if it's missing or invalid.
// (Security is still enforced server-side on every write; this just controls UI.)
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    if (!tokenStore.get()) {
      router.replace("/admin/login");
      return;
    }
    getMe()
      .then((me) => {
        if (active) {
          setAdmin(me);
          setChecking(false);
        }
      })
      .catch(() => {
        tokenStore.clear();
        router.replace("/admin/login");
      });
    return () => {
      active = false;
    };
  }, [router]);

  if (checking || !admin) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}
