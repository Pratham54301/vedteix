"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

type Row = { _id: string; title?: string; name?: string };

function useJsonList(path: string, title: string) {
  const { toast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch(path);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      toast({
        variant: "destructive",
        title,
        description: e instanceof Error ? e.message : "Error",
      });
    } finally {
      setLoading(false);
    }
  }, [path, title, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function remove(deletePath: string) {
    const res = await fetch(deletePath, { method: "DELETE", credentials: "include" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast({ variant: "destructive", title: "Delete failed", description: data.error });
      return;
    }
    void load();
  }

  return { rows, loading, load, remove };
}

export function PortfoliosPanel() {
  const { toast } = useToast();
  const { rows, loading, load, remove } = useJsonList("/api/portfolios", "Portfolios");
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    liveUrl: "",
    githubUrl: "",
    techStack: "",
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const coverPreview = useMemo(
    () => (coverFile ? URL.createObjectURL(coverFile) : null),
    [coverFile]
  );
  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title.trim());
    fd.append("category", form.category.trim());
    fd.append("description", form.description.trim());
    fd.append("liveUrl", form.liveUrl.trim());
    fd.append("githubUrl", form.githubUrl.trim());
    fd.append("featured", "false");
    fd.append("techStack", form.techStack.trim());
    if (coverFile) {
      fd.append("image", coverFile);
    }
    const res = await fetch("/api/portfolios", {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast({ variant: "destructive", title: "Create failed", description: data.error });
      return;
    }
    toast({ title: "Created" });
    setForm({
      title: "",
      category: "",
      description: "",
      liveUrl: "",
      githubUrl: "",
      techStack: "",
    });
    setCoverFile(null);
    void load();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3 md:grid-cols-2" onSubmit={create}>
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            <Textarea className="md:col-span-2" placeholder="Description (10+ chars)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            <div className="md:col-span-2 space-y-2">
              <p className="text-sm font-medium">Cover image (optional)</p>
              {coverPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverPreview} alt="" className="h-24 max-w-xs rounded-md border object-cover" />
              ) : null}
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <Input placeholder="Live URL" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
            <Input placeholder="GitHub URL" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
            <Input className="md:col-span-2" placeholder="Tech stack (comma-separated)" value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} />
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Portfolios</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r._id}>
                    <TableCell>{r.title || r._id}</TableCell>
                    <TableCell>
                      <Button type="button" size="sm" variant="destructive" onClick={() => void remove(`/api/portfolios/${r._id}`)}>
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

export function ServicesPanel() {
  const { toast } = useToast();
  const { rows, loading, load, remove } = useJsonList("/api/services", "Services");
  const [form, setForm] = useState({
    title: "",
    description: "",
    iconName: "Code",
    sortOrder: "0",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imagePreview = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : null),
    [imageFile]
  );
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title.trim());
    fd.append("description", form.description.trim());
    fd.append("iconName", form.iconName.trim() || "Code");
    fd.append("sortOrder", String(Number(form.sortOrder) || 0));
    fd.append("featured", "false");
    if (imageFile) {
      fd.append("image", imageFile);
    }
    const res = await fetch("/api/services", {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast({ variant: "destructive", title: "Create failed", description: data.error });
      return;
    }
    toast({ title: "Created" });
    setForm({ title: "", description: "", iconName: "Code", sortOrder: "0" });
    setImageFile(null);
    void load();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New service</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3 md:grid-cols-2" onSubmit={create}>
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <Input placeholder="Icon name" value={form.iconName} onChange={(e) => setForm({ ...form, iconName: e.target.value })} />
            <Textarea className="md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            <div className="md:col-span-2 space-y-2">
              <p className="text-sm font-medium">Service image (optional)</p>
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imagePreview} alt="" className="h-20 max-w-xs rounded-md border object-contain" />
              ) : null}
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <Input placeholder="Sort order" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r._id}>
                    <TableCell>{r.title || r._id}</TableCell>
                    <TableCell>
                      <Button type="button" size="sm" variant="destructive" onClick={() => void remove(`/api/services/${r._id}`)}>
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

export function BlogsPanel() {
  const { toast } = useToast();
  const { rows, loading, load, remove } = useJsonList("/api/blogs", "Blogs");
  const [form, setForm] = useState({ title: "", content: "", author: "Admin" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imagePreview = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : null),
    [imageFile]
  );
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title.trim());
    fd.append("content", form.content.trim());
    fd.append("author", form.author.trim() || "Admin");
    if (imageFile) {
      fd.append("image", imageFile);
    }
    const res = await fetch("/api/blogs", {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast({ variant: "destructive", title: "Create failed", description: data.error });
      return;
    }
    toast({ title: "Created" });
    setForm({ title: "", content: "", author: "Admin" });
    setImageFile(null);
    void load();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3" onSubmit={create}>
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <Input placeholder="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            <div className="space-y-2">
              <p className="text-sm font-medium">Featured image (optional)</p>
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imagePreview} alt="" className="h-24 max-w-xs rounded-md border object-cover" />
              ) : null}
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <Textarea placeholder="Content (40+ chars)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={6} />
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Blogs</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r._id}>
                    <TableCell>{r.title || r._id}</TableCell>
                    <TableCell>
                      <Button type="button" size="sm" variant="destructive" onClick={() => void remove(`/api/blogs/${r._id}`)}>
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

export function TestimonialsPanel() {
  const { toast } = useToast();
  const { rows, loading, load, remove } = useJsonList("/api/testimonials", "Testimonials");
  const [form, setForm] = useState({ name: "", designation: "", message: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imagePreview = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : null),
    [imageFile]
  );
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("designation", form.designation.trim());
    fd.append("message", form.message.trim());
    if (imageFile) {
      fd.append("image", imageFile);
    }
    const res = await fetch("/api/testimonials", {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast({ variant: "destructive", title: "Create failed", description: data.error });
      return;
    }
    toast({ title: "Created" });
    setForm({ name: "", designation: "", message: "" });
    setImageFile(null);
    void load();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New testimonial</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3" onSubmit={create}>
            <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input placeholder="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} required />
            <div className="space-y-2">
              <p className="text-sm font-medium">Photo (optional)</p>
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imagePreview} alt="" className="h-20 w-20 rounded-full border object-cover" />
              ) : null}
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <Textarea placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r._id}>
                    <TableCell>{r.name || r._id}</TableCell>
                    <TableCell>
                      <Button type="button" size="sm" variant="destructive" onClick={() => void remove(`/api/testimonials/${r._id}`)}>
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

export function TechnologiesPanel() {
  const { toast } = useToast();
  const { rows, loading, load, remove } = useJsonList("/api/technologies", "Technologies");
  const [form, setForm] = useState({ name: "", website: "" });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const logoPreview = useMemo(
    () => (logoFile ? URL.createObjectURL(logoFile) : null),
    [logoFile]
  );
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!logoFile) {
      toast({ variant: "destructive", title: "Logo required", description: "Upload a logo image." });
      return;
    }
    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("website", form.website.trim());
    fd.append("logoUrl", "");
    fd.append("logo", logoFile);
    const res = await fetch("/api/technologies", {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast({ variant: "destructive", title: "Create failed", description: data.error });
      return;
    }
    toast({ title: "Created" });
    setForm({ name: "", website: "" });
    setLogoFile(null);
    void load();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New technology</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3" onSubmit={create}>
            <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <div className="space-y-2">
              <p className="text-sm font-medium">Logo image (required)</p>
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoPreview} alt="" className="h-16 w-16 rounded-md border object-contain p-1" />
              ) : null}
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
                required
              />
            </div>
            <Input placeholder="Website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Technologies</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r._id}>
                    <TableCell>{r.name || r._id}</TableCell>
                    <TableCell>
                      <Button type="button" size="sm" variant="destructive" onClick={() => void remove(`/api/technologies/${r._id}`)}>
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
