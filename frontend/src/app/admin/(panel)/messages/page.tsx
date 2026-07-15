"use client";

import { Check, Loader2, Mail, MailOpen, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authFetch, admin } from "@/lib/api";
import type { ContactMessage } from "@/lib/types";

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setMessages(await admin.list<ContactMessage>("contact"));
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function markRead(id: number) {
    try {
      await authFetch(`/contact/${id}/read`, { method: "PUT" });
      await load();
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  async function remove(id: number) {
    if (!confirm("Delete this message?")) return;
    try {
      await admin.remove("contact", id);
      toast.success("Message deleted");
      await load();
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Messages</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Submissions from the contact and join forms.
      </p>

      {loading ? (
        <div className="grid place-items-center py-20">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : messages.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed py-16 text-center text-muted-foreground">
          No messages yet.
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {messages.map((m) => (
            <Card key={m.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{m.name}</span>
                    {!m.is_read ? (
                      <Badge><Mail className="mr-1 size-3" /> New</Badge>
                    ) : (
                      <Badge variant="secondary"><MailOpen className="mr-1 size-3" /> Read</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {m.email}
                    {m.phone ? ` · ${m.phone}` : ""}
                  </p>
                  {m.subject && <p className="mt-2 text-sm font-medium">{m.subject}</p>}
                  <p className="mt-1 whitespace-pre-wrap text-sm">{m.message}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(m.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  {!m.is_read && (
                    <Button variant="ghost" size="icon-sm" onClick={() => markRead(m.id)} aria-label="Mark read">
                      <Check className="size-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon-sm" onClick={() => remove(m.id)} aria-label="Delete">
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
