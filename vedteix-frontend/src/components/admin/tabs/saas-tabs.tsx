"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { AdminImageField } from "@/components/admin/admin-image-field";

type Lead = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: string;
  notes?: string;
  createdAt?: string;
};

export function LeadsPanel() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const q = filter === "all" ? "" : `?status=${filter}`;
      const res = await fetch(`/api/leads${q}`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load leads");
      setLeads(Array.isArray(data) ? data : []);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Leads",
        description: e instanceof Error ? e.message : "Error",
      });
    } finally {
      setLoading(false);
    }
  }, [filter, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function updateLead(id: string, body: { status?: string; notes?: string }) {
    const res = await fetch(`/api/leads/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast({ variant: "destructive", title: "Update failed", description: data.error });
      return;
    }
    toast({ title: "Lead updated" });
    void load();
  }

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
        <CardTitle>Leads</CardTitle>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead._id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <Select
                      value={lead.status}
                      onValueChange={(v) => void updateLead(lead._id, { status: v })}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <NotesCell
                      initial={lead.notes || ""}
                      onSave={(notes) => void updateLead(lead._id, { notes })}
                    />
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

function NotesCell({ initial, onSave }: { initial: string; onSave: (v: string) => void }) {
  const [val, setVal] = useState(initial);
  return (
    <div className="flex flex-col gap-1">
      <Textarea value={val} onChange={(e) => setVal(e.target.value)} rows={2} className="text-xs" />
      <Button type="button" size="sm" variant="secondary" onClick={() => onSave(val)}>
        Save notes
      </Button>
    </div>
  );
}

type Appointment = {
  _id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  meetingLink: string;
  createdAt?: string;
};

export function AppointmentsPanel() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/appointments", { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed");
        setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Appointments",
          description: e instanceof Error ? e.message : "Error",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Meeting</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((a) => (
                <TableRow key={a._id}>
                  <TableCell>{a.name}</TableCell>
                  <TableCell>{a.email}</TableCell>
                  <TableCell>{a.date}</TableCell>
                  <TableCell>{a.time}</TableCell>
                  <TableCell>
                    <a href={a.meetingLink} className="text-primary underline" target="_blank" rel="noreferrer">
                      Link
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

type ChatRow = {
  _id: string;
  visitor: { name?: string; email?: string; requirement?: string };
  status: string;
  messages: { role: string; content: string }[];
  updatedAt?: string;
};

type ChatLogRow = {
  _id: string;
  userMessage: string;
  aiResponse: string;
  name?: string;
  email?: string;
  language?: string;
  createdAt?: string;
};

function truncateCell(text: string, max = 120) {
  const t = text?.replace(/\s+/g, " ").trim() || "";
  return t.length <= max ? t : `${t.slice(0, max)}…`;
}

export function ChatsPanel() {
  const { toast } = useToast();
  const [rows, setRows] = useState<ChatRow[]>([]);
  const [logRows, setLogRows] = useState<ChatLogRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [res, logRes] = await Promise.all([
          fetch("/api/chats", { credentials: "include" }),
          fetch("/api/chats/logs", { credentials: "include" }),
        ]);
        const data = await res.json().catch(() => ({}));
        const logData = await logRes.json().catch(() => []);

        if (!cancelled && logRes.ok && Array.isArray(logData)) {
          setLogRows(logData);
        } else if (!cancelled) {
          setLogRows([]);
        }

        if (!res.ok) {
          throw new Error(data.error || "Failed");
        }
        if (!cancelled) {
          setRows(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Chats",
          description: e instanceof Error ? e.message : "Error",
        });
        if (!cancelled) {
          setRows([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [toast]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chat history</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            rows.map((c) => (
              <div key={c._id} className="rounded-lg border p-4">
                <div className="mb-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span>
                    <strong className="text-foreground">{c.visitor?.name || "—"}</strong>
                  </span>
                  <span>{c.visitor?.email || ""}</span>
                  <span>Status: {c.status}</span>
                </div>
                {c.visitor?.requirement ? (
                  <p className="mb-2 text-sm">
                    <span className="font-medium">Requirement:</span> {c.visitor.requirement}
                  </p>
                ) : null}
                <div className="max-h-48 space-y-1 overflow-y-auto rounded-md bg-muted/40 p-2 text-sm">
                  {c.messages?.map((m, i) => (
                    <div key={i} className={m.role === "user" ? "text-foreground" : "text-muted-foreground"}>
                      <span className="font-semibold">{m.role}:</span> {m.content}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Message log (Gemini turns)</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {logRows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No logged exchanges yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Lang</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>AI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logRows.map((r) => (
                  <TableRow key={r._id}>
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {r.createdAt ? new Date(r.createdAt).toLocaleString() : "—"}
                    </TableCell>
                    <TableCell>{r.language || "—"}</TableCell>
                    <TableCell>{r.name || "—"}</TableCell>
                    <TableCell className="max-w-[140px] truncate text-xs">{r.email || "—"}</TableCell>
                    <TableCell className="max-w-[200px] text-xs">{truncateCell(r.userMessage, 160)}</TableCell>
                    <TableCell className="max-w-[240px] text-xs">{truncateCell(r.aiResponse, 200)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

type Invoice = {
  _id: string;
  invoiceNumber: string;
  clientName: string;
  service: string;
  amount: number;
  status: string;
  date: string;
};

export function InvoicesPanel() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    clientName: "",
    service: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    status: "unpaid",
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/invoices", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Invoices",
        description: e instanceof Error ? e.message : "Error",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function createInvoice(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/invoices", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        amount: Number(form.amount),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast({ variant: "destructive", title: "Create failed", description: data.error });
      return;
    }
    toast({ title: "Invoice created" });
    setForm({
      clientName: "",
      service: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      status: "unpaid",
    });
    void load();
  }

  async function patchInvoice(id: string, body: Partial<Invoice>) {
    const res = await fetch(`/api/invoices/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast({ variant: "destructive", title: "Update failed", description: data.error });
      return;
    }
    toast({ title: "Updated" });
    void load();
  }

  async function removeInvoice(id: string) {
    if (!confirm("Delete this invoice?")) return;
    const res = await fetch(`/api/invoices/${id}`, { method: "DELETE", credentials: "include" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast({ variant: "destructive", title: "Delete failed", description: data.error });
      return;
    }
    toast({ title: "Deleted" });
    void load();
  }

  async function downloadPdf(id: string, invoiceNumber: string) {
    try {
      const res = await fetch(`/api/invoices/${id}/pdf`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Download failed (${res.status})`);
      }
      const blob = await res.blob();
      const dispo = res.headers.get("content-disposition");
      let filename = `${invoiceNumber || id}.pdf`;
      const m = dispo?.match(/filename\*?=(?:UTF-8'')?["']?([^"';]+)/i);
      if (m?.[1]) {
        try {
          filename = decodeURIComponent(m[1].replace(/['"]/g, ""));
        } catch {
          filename = m[1].replace(/['"]/g, "");
        }
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast({ title: "PDF downloaded" });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "PDF failed",
        description: e instanceof Error ? e.message : "Could not download PDF",
      });
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={createInvoice}>
            <div className="space-y-2">
              <Label>Client name</Label>
              <Input
                value={form.clientName}
                onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Service</Label>
              <Input
                value={form.service}
                onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                min={0}
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All invoices</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>PDF</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((inv) => (
                  <TableRow key={inv._id}>
                    <TableCell>{inv.invoiceNumber}</TableCell>
                    <TableCell>{inv.clientName}</TableCell>
                    <TableCell>{inv.service}</TableCell>
                    <TableCell>{inv.amount}</TableCell>
                    <TableCell>
                      <Select
                        value={inv.status}
                        onValueChange={(v) => void patchInvoice(inv._id, { status: v })}
                      >
                        <SelectTrigger className="w-[110px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unpaid">Unpaid</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => void downloadPdf(inv._id, inv.invoiceNumber)}
                      >
                        PDF
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => void removeInvoice(inv._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

type SiteSettings = Record<string, unknown>;

export function InvoiceBrandingPanel() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/site-settings");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setSettings(data);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Settings",
        description: e instanceof Error ? e.message : "Error",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    const res = await fetch("/api/site-settings", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast({ variant: "destructive", title: "Save failed", description: data.error });
      return;
    }
    toast({ title: "Saved" });
    setSettings(data);
  }

  if (loading || !settings) {
    return <p className="text-muted-foreground">Loading branding…</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice branding & business details</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={save}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Company name</Label>
              <Input
                value={String(settings.companyName || "")}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={String(settings.contactPhone || "")}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={String(settings.contactEmail || "")}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input
                value={String(settings.websiteUrl || "")}
                onChange={(e) => setSettings({ ...settings, websiteUrl: e.target.value })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Address</Label>
              <Textarea
                value={String(settings.address || "")}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>GST (optional)</Label>
              <Input
                value={String(settings.gstNumber || "")}
                onChange={(e) => setSettings({ ...settings, gstNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <AdminImageField
                label="Invoice logo"
                optional
                value={String(settings.invoiceLogoUrl || "")}
                onChange={(url) => setSettings((s) => (s ? { ...s, invoiceLogoUrl: url } : s))}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <AdminImageField
                label="Authorized signature image"
                optional
                value={String(settings.signatureUrl || "")}
                onChange={(url) => setSettings((s) => (s ? { ...s, signatureUrl: url } : s))}
              />
            </div>
          </div>
          <Button type="submit">Save branding</Button>
        </form>
      </CardContent>
    </Card>
  );
}
