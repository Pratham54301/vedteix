"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Plus, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type {
  BlogPost,
  ContactMessage,
  DashboardStats,
  Job,
  NewsletterSubscription,
  Portfolio,
  Service,
  SiteSettings,
  Technology,
  Testimonial,
} from "@/lib/types";
import { serviceIconOptions } from "@/lib/service-icons";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type EditorKind =
  | "job"
  | "portfolio"
  | "service"
  | "blog"
  | "testimonial"
  | "technology"
  | null;

const emptyJob = {
  title: "",
  company: "VEDTEIX TECHNOLOGY",
  location: "",
  type: "Full-time",
  experience: "",
  applyUrl: "",
  applyEmail: "",
  description: "",
  skills: "",
  techStack: "",
  featured: false,
};

const emptyPortfolio = {
  title: "",
  category: "",
  description: "",
  imageUrl: "",
  liveUrl: "",
  githubUrl: "",
  techStack: "",
  featured: false,
};

const emptyService = {
  title: "",
  description: "",
  iconName: "Code",
  imageUrl: "",
  featured: false,
  sortOrder: "0",
};

const emptyBlog = { title: "", author: "Admin", imageUrl: "", content: "" };
const emptyTestimonial = { name: "", designation: "", imageUrl: "", message: "" };
const emptyTechnology = { name: "", website: "", logoUrl: "" };

const emptySettings: SiteSettings = {
  companyName: "VEDTEIX TECHNOLOGY",
  companyTagline: "Innovating Future-Ready Digital Solutions.",
  heroTitle: "Empowering Future-Ready Digital Solutions",
  heroSubtitle:
    "We architect and engineer high-impact digital products, delivering secure, scalable, and intelligent solutions that propel businesses into the future.",
  officeName: "Headquarters",
  contactEmail: "hello@vedteix.com",
  contactPhone: "+91 77779 67668",
  address: "Bopal Ghuma Road, Sanidhya, Ahmedabad, Gujarat 380058",
  socialLinks: {},
  stats: { projectsCompleted: 100, happyClients: 50 },
};

function fmt(date?: string) {
  if (!date) return "N/A";
  try {
    return format(new Date(date), "dd MMM yyyy");
  } catch {
    return "N/A";
  }
}

export function AdminConsole() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";
  const { toast } = useToast();

  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterSubscription[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(emptySettings);
  const [jobForm, setJobForm] = useState(emptyJob);
  const [portfolioForm, setPortfolioForm] = useState(emptyPortfolio);
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [blogForm, setBlogForm] = useState(emptyBlog);
  const [testimonialForm, setTestimonialForm] = useState(emptyTestimonial);
  const [technologyForm, setTechnologyForm] = useState(emptyTechnology);
  const [editor, setEditor] = useState<{ kind: EditorKind; id: string | null }>({
    kind: null,
    id: null,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchJson<T>(url: string) {
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Request failed");
    return data as T;
  }

  async function loadAll() {
    setRefreshing(true);
    try {
      const [
        dashboardData,
        jobsData,
        portfoliosData,
        servicesData,
        blogsData,
        testimonialsData,
        technologiesData,
        contactsData,
        newslettersData,
        settingsData,
      ] = await Promise.all([
        fetchJson<DashboardStats>("/api/dashboard"),
        fetchJson<Job[]>("/api/jobs"),
        fetchJson<Portfolio[]>("/api/portfolios"),
        fetchJson<Service[]>("/api/services"),
        fetchJson<BlogPost[]>("/api/blogs"),
        fetchJson<Testimonial[]>("/api/testimonials"),
        fetchJson<Technology[]>("/api/technologies"),
        fetchJson<ContactMessage[]>("/api/contacts"),
        fetchJson<NewsletterSubscription[]>("/api/newsletters"),
        fetchJson<SiteSettings>("/api/site-settings"),
      ]);

      setDashboard(dashboardData);
      setJobs(jobsData);
      setPortfolios(portfoliosData);
      setServices(servicesData);
      setBlogs(blogsData);
      setTestimonials(testimonialsData);
      setTechnologies(technologiesData);
      setContacts(contactsData);
      setNewsletters(newslettersData);
      setSettings(settingsData);
      setError(null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load admin data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    void loadAll();
  }, []);

  const statCards = useMemo(
    () => [
      ["Jobs", dashboard?.totalJobs ?? jobs.length],
      ["Portfolios", dashboard?.totalPortfolios ?? portfolios.length],
      ["Services", dashboard?.totalServices ?? services.length],
      ["Blogs", blogs.length],
      ["Testimonials", testimonials.length],
      ["Technologies", technologies.length],
      ["Contacts", dashboard?.totalContacts ?? contacts.length],
      ["Subscribers", dashboard?.totalSubscriptions ?? newsletters.length],
    ],
    [blogs.length, contacts.length, dashboard, jobs.length, newsletters.length, portfolios.length, services.length, technologies.length, testimonials.length]
  );

  function resetEditor() {
    setEditor({ kind: null, id: null });
    setJobForm(emptyJob);
    setPortfolioForm(emptyPortfolio);
    setServiceForm(emptyService);
    setBlogForm(emptyBlog);
    setTestimonialForm(emptyTestimonial);
    setTechnologyForm(emptyTechnology);
  }

  function startEdit(kind: EditorKind, item?: Job | Portfolio | Service | BlogPost | Testimonial | Technology) {
    setEditor({ kind, id: item?._id || null });

    if (kind === "job") {
      const job = item as Job | undefined;
      setJobForm(
        job
          ? {
              title: job.title,
              company: job.company,
              location: job.location,
              type: job.type,
              experience: job.experience,
              applyUrl: job.applyUrl || "",
              applyEmail: job.applyEmail || "",
              description: job.description,
              skills: job.skills.join(", "),
              techStack: job.techStack.join(", "),
              featured: job.featured,
            }
          : emptyJob
      );
    }

    if (kind === "portfolio") {
      const portfolio = item as Portfolio | undefined;
      setPortfolioForm(
        portfolio
          ? {
              title: portfolio.title,
              category: portfolio.category,
              description: portfolio.description,
              imageUrl: portfolio.imageUrl || "",
              liveUrl: portfolio.liveUrl || "",
              githubUrl: portfolio.githubUrl || "",
              techStack: portfolio.techStack.join(", "),
              featured: portfolio.featured,
            }
          : emptyPortfolio
      );
    }

    if (kind === "service") {
      const service = item as Service | undefined;
      setServiceForm(
        service
          ? {
              title: service.title,
              description: service.description,
              iconName: service.iconName,
              imageUrl: service.imageUrl || "",
              featured: service.featured,
              sortOrder: String(service.sortOrder ?? 0),
            }
          : emptyService
      );
    }

    if (kind === "blog") {
      const blog = item as BlogPost | undefined;
      setBlogForm(
        blog
          ? {
              title: blog.title,
              author: blog.author,
              imageUrl: blog.imageUrl || "",
              content: blog.content,
            }
          : emptyBlog
      );
    }

    if (kind === "testimonial") {
      const testimonial = item as Testimonial | undefined;
      setTestimonialForm(
        testimonial
          ? {
              name: testimonial.name,
              designation: testimonial.designation,
              imageUrl: testimonial.imageUrl || "",
              message: testimonial.message,
            }
          : emptyTestimonial
      );
    }

    if (kind === "technology") {
      const technology = item as Technology | undefined;
      setTechnologyForm(
        technology
          ? {
              name: technology.name,
              website: technology.website || "",
              logoUrl: technology.logoUrl || "",
            }
          : emptyTechnology
      );
    }
  }

  async function saveResource(event: FormEvent) {
    event.preventDefault();
    if (!editor.kind) return;

    setSaving(true);
    try {
      const current = {
        job: { base: "/api/jobs", payload: jobForm },
        portfolio: { base: "/api/portfolios", payload: portfolioForm },
        service: { base: "/api/services", payload: serviceForm },
        blog: { base: "/api/blogs", payload: blogForm },
        testimonial: { base: "/api/testimonials", payload: testimonialForm },
        technology: { base: "/api/technologies", payload: technologyForm },
      }[editor.kind];

      const response = await fetch(
        editor.id ? `${current.base}/${editor.id}` : current.base,
        {
          method: editor.id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(current.payload),
        }
      );

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Save failed");

      resetEditor();
      toast({
        title: "Saved successfully",
        description: "Changes are now synced to the frontend.",
      });
      await loadAll();
    } catch (saveError) {
      toast({
        variant: "destructive",
        title: "Save failed",
        description: saveError instanceof Error ? saveError.message : "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function saveSettings(event: FormEvent) {
    event.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Save failed");

      setSettings(data);
      toast({
        title: "Settings updated",
        description: "Website content was refreshed from the database.",
      });
      await loadAll();
    } catch (saveError) {
      toast({
        variant: "destructive",
        title: "Settings save failed",
        description: saveError instanceof Error ? saveError.message : "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function removeResource(
    kind:
      | "job"
      | "portfolio"
      | "service"
      | "blog"
      | "testimonial"
      | "technology"
      | "contact"
      | "newsletter",
    id: string,
    label: string
  ) {
    if (!window.confirm(`Delete ${label}?`)) return;

    const base = {
      job: "/api/jobs",
      portfolio: "/api/portfolios",
      service: "/api/services",
      blog: "/api/blogs",
      testimonial: "/api/testimonials",
      technology: "/api/technologies",
      contact: "/api/contacts",
      newsletter: "/api/newsletters",
    }[kind];

    try {
      const response = await fetch(`${base}/${id}`, { method: "DELETE" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Delete failed");

      toast({ title: "Deleted", description: `${label} was removed.` });
      await loadAll();
    } catch (deleteError) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: deleteError instanceof Error ? deleteError.message : "Please try again.",
      });
    }
  }

  function renderEditor() {
    if (!editor.kind) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {editor.id ? "Edit" : "Add"} {editor.kind}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={saveResource}>
            {editor.kind === "job" && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="Title" value={jobForm.title} onChange={(event) => setJobForm({ ...jobForm, title: event.target.value })} />
                  <Input placeholder="Company" value={jobForm.company} onChange={(event) => setJobForm({ ...jobForm, company: event.target.value })} />
                  <Input placeholder="Location" value={jobForm.location} onChange={(event) => setJobForm({ ...jobForm, location: event.target.value })} />
                  <Input placeholder="Type" value={jobForm.type} onChange={(event) => setJobForm({ ...jobForm, type: event.target.value })} />
                  <Input placeholder="Experience" value={jobForm.experience} onChange={(event) => setJobForm({ ...jobForm, experience: event.target.value })} />
                  <Input placeholder="Apply email" value={jobForm.applyEmail} onChange={(event) => setJobForm({ ...jobForm, applyEmail: event.target.value })} />
                  <Input placeholder="Apply URL" className="md:col-span-2" value={jobForm.applyUrl} onChange={(event) => setJobForm({ ...jobForm, applyUrl: event.target.value })} />
                  <Input placeholder="Skills (comma separated)" className="md:col-span-2" value={jobForm.skills} onChange={(event) => setJobForm({ ...jobForm, skills: event.target.value })} />
                  <Input placeholder="Tech stack (comma separated)" className="md:col-span-2" value={jobForm.techStack} onChange={(event) => setJobForm({ ...jobForm, techStack: event.target.value })} />
                </div>
                <Textarea placeholder="Description" className="min-h-[140px]" value={jobForm.description} onChange={(event) => setJobForm({ ...jobForm, description: event.target.value })} />
                <div className="flex items-center gap-3">
                  <Switch checked={jobForm.featured} onCheckedChange={(value) => setJobForm({ ...jobForm, featured: value })} />
                  <span>Feature this job</span>
                </div>
              </>
            )}

            {editor.kind === "portfolio" && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="Title" value={portfolioForm.title} onChange={(event) => setPortfolioForm({ ...portfolioForm, title: event.target.value })} />
                  <Input placeholder="Category" value={portfolioForm.category} onChange={(event) => setPortfolioForm({ ...portfolioForm, category: event.target.value })} />
                  <Input placeholder="Image URL" className="md:col-span-2" value={portfolioForm.imageUrl} onChange={(event) => setPortfolioForm({ ...portfolioForm, imageUrl: event.target.value })} />
                  <Input placeholder="Live URL" value={portfolioForm.liveUrl} onChange={(event) => setPortfolioForm({ ...portfolioForm, liveUrl: event.target.value })} />
                  <Input placeholder="GitHub URL" value={portfolioForm.githubUrl} onChange={(event) => setPortfolioForm({ ...portfolioForm, githubUrl: event.target.value })} />
                  <Input placeholder="Tech stack (comma separated)" className="md:col-span-2" value={portfolioForm.techStack} onChange={(event) => setPortfolioForm({ ...portfolioForm, techStack: event.target.value })} />
                </div>
                <Textarea placeholder="Description" className="min-h-[140px]" value={portfolioForm.description} onChange={(event) => setPortfolioForm({ ...portfolioForm, description: event.target.value })} />
                <div className="flex items-center gap-3">
                  <Switch checked={portfolioForm.featured} onCheckedChange={(value) => setPortfolioForm({ ...portfolioForm, featured: value })} />
                  <span>Feature this portfolio</span>
                </div>
              </>
            )}

            {editor.kind === "service" && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="Title" value={serviceForm.title} onChange={(event) => setServiceForm({ ...serviceForm, title: event.target.value })} />
                  <Input list="service-icons" placeholder="Icon name" value={serviceForm.iconName} onChange={(event) => setServiceForm({ ...serviceForm, iconName: event.target.value })} />
                  <Input placeholder="Image URL" className="md:col-span-2" value={serviceForm.imageUrl} onChange={(event) => setServiceForm({ ...serviceForm, imageUrl: event.target.value })} />
                  <Input placeholder="Sort order" value={serviceForm.sortOrder} onChange={(event) => setServiceForm({ ...serviceForm, sortOrder: event.target.value })} />
                </div>
                <datalist id="service-icons">
                  {serviceIconOptions.map((icon) => (
                    <option key={icon} value={icon} />
                  ))}
                </datalist>
                <Textarea placeholder="Description" className="min-h-[140px]" value={serviceForm.description} onChange={(event) => setServiceForm({ ...serviceForm, description: event.target.value })} />
                <div className="flex items-center gap-3">
                  <Switch checked={serviceForm.featured} onCheckedChange={(value) => setServiceForm({ ...serviceForm, featured: value })} />
                  <span>Feature this service</span>
                </div>
              </>
            )}

            {editor.kind === "blog" && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="Title" value={blogForm.title} onChange={(event) => setBlogForm({ ...blogForm, title: event.target.value })} />
                  <Input placeholder="Author" value={blogForm.author} onChange={(event) => setBlogForm({ ...blogForm, author: event.target.value })} />
                  <Input placeholder="Image URL" className="md:col-span-2" value={blogForm.imageUrl} onChange={(event) => setBlogForm({ ...blogForm, imageUrl: event.target.value })} />
                </div>
                <Textarea placeholder="Content" className="min-h-[220px]" value={blogForm.content} onChange={(event) => setBlogForm({ ...blogForm, content: event.target.value })} />
              </>
            )}

            {editor.kind === "testimonial" && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="Name" value={testimonialForm.name} onChange={(event) => setTestimonialForm({ ...testimonialForm, name: event.target.value })} />
                  <Input placeholder="Designation" value={testimonialForm.designation} onChange={(event) => setTestimonialForm({ ...testimonialForm, designation: event.target.value })} />
                  <Input placeholder="Image URL" className="md:col-span-2" value={testimonialForm.imageUrl} onChange={(event) => setTestimonialForm({ ...testimonialForm, imageUrl: event.target.value })} />
                </div>
                <Textarea placeholder="Message" className="min-h-[160px]" value={testimonialForm.message} onChange={(event) => setTestimonialForm({ ...testimonialForm, message: event.target.value })} />
              </>
            )}

            {editor.kind === "technology" && (
              <div className="grid gap-4 md:grid-cols-2">
                <Input placeholder="Name" value={technologyForm.name} onChange={(event) => setTechnologyForm({ ...technologyForm, name: event.target.value })} />
                <Input placeholder="Website URL" value={technologyForm.website} onChange={(event) => setTechnologyForm({ ...technologyForm, website: event.target.value })} />
                <Input placeholder="Logo URL" className="md:col-span-2" value={technologyForm.logoUrl} onChange={(event) => setTechnologyForm({ ...technologyForm, logoUrl: event.target.value })} />
              </div>
            )}

            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button type="button" variant="outline" onClick={resetEditor}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return <div className="py-12 text-muted-foreground">Loading admin workspace...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Control Center</h1>
          <p className="text-muted-foreground">Manage the database-backed content powering the site.</p>
        </div>
        <Button variant="outline" onClick={() => void loadAll()} disabled={refreshing}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {error && <Alert variant="destructive">{error}</Alert>}

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {statCards.map(([label, value]) => (
              <Card key={label}>
                <CardHeader className="pb-2">
                  <CardDescription>{label}</CardDescription>
                  <CardTitle className="text-3xl">{value}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dashboard?.latestContacts.map((contact) => (
                  <div key={contact._id} className="rounded-lg border p-4">
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {contact.email} • {fmt(contact.createdAt)}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{contact.subject}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dashboard?.latestJobs.map((job) => (
                  <div key={job._id} className="rounded-lg border p-4">
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.location} • {job.type}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {(activeTab === "jobs" ||
        activeTab === "portfolios" ||
        activeTab === "services" ||
        activeTab === "blogs" ||
        activeTab === "testimonials" ||
        activeTab === "technologies") &&
        renderEditor()}

      {activeTab === "jobs" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Jobs</CardTitle>
              <CardDescription>Career listings shown on the frontend.</CardDescription>
            </div>
            <Button onClick={() => startEdit("job")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Job
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job._id}>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.type}</TableCell>
                    <TableCell>{job.featured ? "Yes" : "No"}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit("job", job)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => void removeResource("job", job._id, job.title)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "portfolios" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Portfolios</CardTitle>
              <CardDescription>Projects visible on portfolio and case-study sections.</CardDescription>
            </div>
            <Button onClick={() => startEdit("portfolio")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Portfolio
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolios.map((portfolio) => (
                  <TableRow key={portfolio._id}>
                    <TableCell>{portfolio.title}</TableCell>
                    <TableCell>{portfolio.category}</TableCell>
                    <TableCell>{portfolio.featured ? "Yes" : "No"}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit("portfolio", portfolio)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => void removeResource("portfolio", portfolio._id, portfolio.title)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "services" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Services</CardTitle>
              <CardDescription>Service cards used across the website.</CardDescription>
            </div>
            <Button onClick={() => startEdit("service")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service._id}>
                    <TableCell>{service.title}</TableCell>
                    <TableCell>{service.iconName}</TableCell>
                    <TableCell>{service.sortOrder}</TableCell>
                    <TableCell>{service.featured ? "Yes" : "No"}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit("service", service)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => void removeResource("service", service._id, service.title)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "blogs" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Blogs</CardTitle>
              <CardDescription>Editorial content shown on the home page and blog pages.</CardDescription>
            </div>
            <Button onClick={() => startEdit("blog")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Blog
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell>{blog.slug || "Pending"}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit("blog", blog)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => void removeResource("blog", blog._id, blog.title)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "testimonials" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Testimonials</CardTitle>
              <CardDescription>Client quotes used across the website.</CardDescription>
            </div>
            <Button onClick={() => startEdit("testimonial")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial._id}>
                    <TableCell>{testimonial.name}</TableCell>
                    <TableCell>{testimonial.designation}</TableCell>
                    <TableCell>{fmt(testimonial.createdAt)}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit("testimonial", testimonial)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => void removeResource("testimonial", testimonial._id, testimonial.name)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "technologies" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Technologies</CardTitle>
              <CardDescription>Stack logos and outbound technology links.</CardDescription>
            </div>
            <Button onClick={() => startEdit("technology")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Technology
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {technologies.map((technology) => (
                  <TableRow key={technology._id}>
                    <TableCell>{technology.name}</TableCell>
                    <TableCell className="max-w-[240px] truncate">{technology.website || "N/A"}</TableCell>
                    <TableCell>{fmt(technology.createdAt)}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit("technology", technology)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => void removeResource("technology", technology._id, technology.name)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "contacts" && (
        <Card>
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
            <CardDescription>Inbound messages from the contact forms.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.subject}</TableCell>
                    <TableCell>{fmt(contact.createdAt)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="destructive" onClick={() => void removeResource("contact", contact._id, contact.subject)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "newsletters" && (
        <Card>
          <CardHeader>
            <CardTitle>Newsletter Subscribers</CardTitle>
            <CardDescription>Email list collected from the footer.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsletters.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{fmt(item.createdAt)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="destructive" onClick={() => void removeResource("newsletter", item._id, item.email)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "settings" && (
        <Card>
          <CardHeader>
            <CardTitle>Website Settings</CardTitle>
            <CardDescription>Hero content, contact info, and social links.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={saveSettings}>
              <Input placeholder="Company name" value={settings.companyName} onChange={(event) => setSettings({ ...settings, companyName: event.target.value })} />
              <Input placeholder="Tagline" value={settings.companyTagline} onChange={(event) => setSettings({ ...settings, companyTagline: event.target.value })} />
              <Input className="md:col-span-2" placeholder="Hero title" value={settings.heroTitle} onChange={(event) => setSettings({ ...settings, heroTitle: event.target.value })} />
              <Textarea className="min-h-[100px] md:col-span-2" placeholder="Hero subtitle" value={settings.heroSubtitle} onChange={(event) => setSettings({ ...settings, heroSubtitle: event.target.value })} />
              <Input placeholder="Office name" value={settings.officeName} onChange={(event) => setSettings({ ...settings, officeName: event.target.value })} />
              <Input placeholder="Contact email" value={settings.contactEmail} onChange={(event) => setSettings({ ...settings, contactEmail: event.target.value })} />
              <Input placeholder="Contact phone" value={settings.contactPhone} onChange={(event) => setSettings({ ...settings, contactPhone: event.target.value })} />
              <Input className="md:col-span-2" placeholder="Address" value={settings.address} onChange={(event) => setSettings({ ...settings, address: event.target.value })} />
              <Input placeholder="Projects completed" type="number" value={settings.stats.projectsCompleted} onChange={(event) => setSettings({ ...settings, stats: { ...settings.stats, projectsCompleted: Number(event.target.value) || 0 } })} />
              <Input placeholder="Happy clients" type="number" value={settings.stats.happyClients} onChange={(event) => setSettings({ ...settings, stats: { ...settings.stats, happyClients: Number(event.target.value) || 0 } })} />
              <Input placeholder="LinkedIn URL" value={settings.socialLinks.linkedin || ""} onChange={(event) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, linkedin: event.target.value } })} />
              <Input placeholder="Instagram URL" value={settings.socialLinks.instagram || ""} onChange={(event) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, instagram: event.target.value } })} />
              <Input placeholder="Facebook URL" value={settings.socialLinks.facebook || ""} onChange={(event) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, facebook: event.target.value } })} />
              <Input placeholder="Twitter URL" value={settings.socialLinks.twitter || ""} onChange={(event) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, twitter: event.target.value } })} />
              <Input className="md:col-span-2" placeholder="YouTube URL" value={settings.socialLinks.youtube || ""} onChange={(event) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, youtube: event.target.value } })} />
              <div className="md:col-span-2">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
