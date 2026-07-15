"use client";

import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { admin } from "@/lib/api";
import type { FieldConfig, ResourceConfig } from "@/lib/admin-resources";

type Item = Record<string, unknown> & { id: number };
type FormState = Record<string, unknown>;

function toFormState(config: ResourceConfig, item?: Item): FormState {
  const state: FormState = {};
  for (const f of config.fields) {
    const v = item?.[f.name];
    switch (f.type) {
      case "stringlist":
        state[f.name] = Array.isArray(v) ? v.join("\n") : "";
        break;
      case "json":
        state[f.name] = v ? JSON.stringify(v, null, 2) : "";
        break;
      case "boolean":
        state[f.name] = item ? Boolean(v) : f.name === "is_active";
        break;
      case "number":
        state[f.name] = v == null ? "" : String(v);
        break;
      default:
        state[f.name] = v == null ? "" : String(v);
    }
  }
  return state;
}

function toPayload(config: ResourceConfig, form: FormState) {
  const payload: Record<string, unknown> = {};
  for (const f of config.fields) {
    const raw = form[f.name];
    switch (f.type) {
      case "number": {
        // Omit empty numbers so backend defaults (e.g. display_order=0) apply
        // instead of sending null to a non-optional field (422).
        if (raw !== "" && raw != null) payload[f.name] = Number(raw);
        break;
      }
      case "boolean":
        payload[f.name] = Boolean(raw);
        break;
      case "stringlist": {
        const list = String(raw)
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
        if (list.length) payload[f.name] = list;
        break;
      }
      case "json": {
        if (String(raw).trim()) payload[f.name] = JSON.parse(String(raw));
        break;
      }
      default:
        // Omit empty strings so non-optional defaults (e.g. currency=INR) apply.
        if (raw !== "" && raw != null) payload[f.name] = raw;
    }
  }
  return payload;
}

export function ResourceManager({ config }: { config: ResourceConfig }) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [form, setForm] = useState<FormState>({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await admin.list<Item>(config.key);
      setItems(data);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [config.key]);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(toFormState(config));
    setOpen(true);
  }

  function openEdit(item: Item) {
    setEditing(item);
    setForm(toFormState(config, item));
    setOpen(true);
  }

  async function save() {
    setSaving(true);
    try {
      const payload = toPayload(config, form);
      if (editing) {
        await admin.update(config.key, editing.id, payload);
        toast.success(`${config.singular} updated`);
      } else {
        await admin.create(config.key, payload);
        toast.success(`${config.singular} created`);
      }
      setOpen(false);
      await load();
    } catch (err) {
      toast.error((err as Error).message || "Save failed (check JSON fields)");
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: Item) {
    if (!confirm(`Delete this ${config.singular.toLowerCase()}?`)) return;
    try {
      await admin.remove(config.key, item.id);
      toast.success(`${config.singular} deleted`);
      await load();
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  const columnFields = config.fields.filter(
    (f) => f.column && f.name !== config.titleField
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{config.title}</h1>
          <p className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" /> Add {config.singular}
        </Button>
      </div>

      {loading ? (
        <div className="grid place-items-center py-20">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
          No {config.title.toLowerCase()} yet. Click “Add {config.singular}”.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{config.singular}</TableHead>
                {columnFields.map((f) => (
                  <TableHead key={f.name}>{f.label}</TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {String(item[config.titleField] ?? "—")}
                  </TableCell>
                  {columnFields.map((f) => (
                    <TableCell key={f.name} className="max-w-40 truncate text-muted-foreground">
                      {f.type === "boolean" ? (
                        <Badge variant={item[f.name] ? "default" : "secondary"}>
                          {item[f.name] ? "Yes" : "No"}
                        </Badge>
                      ) : (
                        String(item[f.name] ?? "—")
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => openEdit(item)} aria-label="Edit">
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => remove(item)} aria-label="Delete">
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editing ? `Edit ${config.singular}` : `Add ${config.singular}`}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {config.fields.map((f) => (
              <FieldInput
                key={f.name}
                field={f}
                value={form[f.name]}
                onChange={(v) => setForm((prev) => ({ ...prev, [f.name]: v }))}
              />
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 className="size-4 animate-spin" />}
              {editing ? "Save changes" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const id = `field-${field.name}`;

  if (field.type === "boolean") {
    return (
      <div className="flex items-center justify-between rounded-lg border p-3">
        <Label htmlFor={id}>{field.label}</Label>
        <Switch id={id} checked={Boolean(value)} onCheckedChange={onChange} />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {field.label}
        {field.required && <span className="text-destructive"> *</span>}
      </Label>

      {field.type === "textarea" || field.type === "stringlist" || field.type === "json" ? (
        <Textarea
          id={id}
          rows={field.type === "textarea" ? 4 : 3}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={field.type === "json" ? "font-mono text-xs" : ""}
        />
      ) : field.type === "select" ? (
        <Select value={String(value ?? "")} onValueChange={onChange}>
          <SelectTrigger id={id}>
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((o) => (
              <SelectItem key={o} value={o} className="capitalize">
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={id}
          type={field.type === "number" ? "number" : "text"}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      )}

      {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
    </div>
  );
}
