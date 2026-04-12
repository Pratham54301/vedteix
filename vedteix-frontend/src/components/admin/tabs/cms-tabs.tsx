"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import type { ContactMessage, NewsletterSubscription } from "@/lib/types";
import type { Job } from "@/lib/types";

export function ContactsPanel() {
  const { toast } = useToast();
  const [rows, setRows] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/contacts", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Contacts",
        description: e instanceof Error ? e.message : "Error",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function remove(id: string) {
    if (!confirm("Delete contact?")) return;
    const res = await fetch(`/api/contacts/${id}`, { method: "DELETE", credentials: "include" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast({ variant: "destructive", title: "Delete failed", description: data.error });
      return;
    }
    void load();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact submissions</CardTitle>
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
                <TableHead>Subject</TableHead>
                <TableHead>Message</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((c) => (
                <TableRow key={c._id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.subject}</TableCell>
                  <TableCell className="max-w-xs truncate">{c.message}</TableCell>
                  <TableCell>
                    <Button type="button" size="sm" variant="destructive" onClick={() => void remove(c._id)}>
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
  );
}

export function NewslettersPanel() {
  const { toast } = useToast();
  const [rows, setRows] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/newsletters", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Newsletters",
        description: e instanceof Error ? e.message : "Error",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function remove(id: string) {
    if (!confirm("Remove subscription?")) return;
    const res = await fetch(`/api/newsletters/${id}`, { method: "DELETE", credentials: "include" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast({ variant: "destructive", title: "Delete failed", description: data.error });
      return;
    }
    void load();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter subscribers</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((n) => (
                <TableRow key={n._id}>
                  <TableCell>{n.email}</TableCell>
                  <TableCell>{n.createdAt ? new Date(n.createdAt).toLocaleString() : "—"}</TableCell>
                  <TableCell>
                    <Button type="button" size="sm" variant="destructive" onClick={() => void remove(n._id)}>
                      Remove
                    </Button>
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

export function GeneralSiteSettingsPanel() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
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
    })();
  }, [toast]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    const res = await fetch("/api/site-settings", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyTagline: settings.companyTagline,
        heroTitle: settings.heroTitle,
        heroSubtitle: settings.heroSubtitle,
        officeName: settings.officeName,
        stats: settings.stats,
        socialLinks: settings.socialLinks,
      }),
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
    return <p className="text-muted-foreground">Loading…</p>;
  }

  const stats = (settings.stats as { projectsCompleted?: number; happyClients?: number }) || {};
  const social = (settings.socialLinks as Record<string, string>) || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site content & social</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={save}>
          <div className="space-y-2">
            <Label>Company tagline</Label>
            <Input
              value={String(settings.companyTagline || "")}
              onChange={(e) => setSettings({ ...settings, companyTagline: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Hero title</Label>
            <Input
              value={String(settings.heroTitle || "")}
              onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Hero subtitle</Label>
            <Textarea
              value={String(settings.heroSubtitle || "")}
              onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Office name</Label>
            <Input
              value={String(settings.officeName || "")}
              onChange={(e) => setSettings({ ...settings, officeName: e.target.value })}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Projects completed (stat)</Label>
              <Input
                type="number"
                value={stats.projectsCompleted ?? 0}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...stats, projectsCompleted: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Happy clients (stat)</Label>
              <Input
                type="number"
                value={stats.happyClients ?? 0}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...stats, happyClients: Number(e.target.value) },
                  })
                }
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {["linkedin", "twitter", "facebook", "instagram", "youtube"].map((key) => (
              <div key={key} className="space-y-2">
                <Label className="capitalize">{key}</Label>
                <Input
                  value={social[key] || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...social, [key]: e.target.value },
                    })
                  }
                />
              </div>
            ))}
          </div>
          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function JobsPanel() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "Full-time",
    description: "",
  });

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Jobs",
        description: e instanceof Error ? e.message : "Error",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/jobs", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        skills: [],
        techStack: [],
        featured: false,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast({ variant: "destructive", title: "Create failed", description: data.error });
      return;
    }
    toast({ title: "Job created" });
    setForm({ title: "", location: "", type: "Full-time", description: "" });
    void load();
  }

  async function remove(id: string) {
    if (!confirm("Delete job?")) return;
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE", credentials: "include" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast({ variant: "destructive", title: "Delete failed", description: data.error });
      return;
    }
    void load();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New job</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={create}>
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
            <Input
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              required
            />
            <Input
              placeholder="Type (e.g. Full-time)"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              required
            />
            <Textarea
              className="md:col-span-2"
              placeholder="Description (min 10 chars)"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              required
            />
            <Button type="submit">Create job</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>All jobs</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((j) => (
                  <TableRow key={j._id}>
                    <TableCell>{j.title}</TableCell>
                    <TableCell>{j.location}</TableCell>
                    <TableCell>{j.type}</TableCell>
                    <TableCell>
                      <Button type="button" size="sm" variant="destructive" onClick={() => void remove(j._id)}>
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
