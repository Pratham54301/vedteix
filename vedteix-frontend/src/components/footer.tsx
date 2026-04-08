"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ContactForm } from "./contact-form";
import { officeLocations, services as fallbackServices } from "@/lib/data";
import type { Service, SiteSettings } from "@/lib/types";

const fallbackSettings: SiteSettings = {
  companyName: "VEDTEIX TECHNOLOGY",
  companyTagline: "Innovating Future-Ready Digital Solutions.",
  heroTitle: "Empowering Future-Ready Digital Solutions",
  heroSubtitle:
    "We architect and engineer high-impact digital products, delivering secure, scalable, and intelligent solutions that propel businesses into the future.",
  officeName: officeLocations[0]?.name || "Headquarters",
  contactEmail: officeLocations[0]?.email || "prathams54301@gmail.com",
  contactPhone: officeLocations[0]?.phone || "7777967668",
  address: officeLocations[0]?.address || "Ahmedabad, Gujarat",
  socialLinks: {},
  stats: {
    projectsCompleted: 100,
    happyClients: 50,
  },
};

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
];

const socialIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
};

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings);
  const [serviceItems, setServiceItems] = useState<Service[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [footerError, setFooterError] = useState<string | null>(null);
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadFooterData = async () => {
      try {
        const [settingsResponse, servicesResponse] = await Promise.all([
          fetch("/api/site-settings"),
          fetch("/api/services"),
        ]);

        if (settingsResponse.ok) {
          const settingsPayload = await settingsResponse.json();
          if (!cancelled) {
            setSettings(settingsPayload);
          }
        }

        if (servicesResponse.ok) {
          const servicesPayload = await servicesResponse.json();
          if (!cancelled) {
            setServiceItems(servicesPayload);
          }
        }
      } catch {
        if (!cancelled) {
          setFooterError("Some footer details are temporarily unavailable.");
        }
      }
    };

    void loadFooterData();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleServices = useMemo(() => {
    if (serviceItems.length > 0) {
      return serviceItems.slice(0, 6);
    }

    return fallbackServices.slice(0, 6).map((service, index) => ({
      _id: String(index),
      title: service.title,
      description: service.description,
      iconName: service.iconName,
      featured: false,
      sortOrder: index,
    }));
  }, [serviceItems]);

  const socialLinks = Object.entries(settings.socialLinks || {}).filter(
    ([, value]) => Boolean(value)
  );

  async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newsletterEmail.trim()) {
      return;
    }

    setNewsletterLoading(true);
    setNewsletterMessage(null);
    try {
      const response = await fetch("/api/newsletters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Subscription failed");
      }

      setNewsletterEmail("");
      setNewsletterMessage("Thanks for subscribing.");
    } catch (error) {
      setNewsletterMessage(error instanceof Error ? error.message : "Subscription failed");
    } finally {
      setNewsletterLoading(false);
    }
  }

  return (
    <Dialog>
      <footer className="border-t border-border/40 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-4 lg:col-span-2">
              <Link href="/" className="flex items-center gap-3">
                <Logo className="h-10 w-10" />
                <span className="text-xl font-bold">{settings.companyName}</span>
              </Link>
              <p className="max-w-xs text-sm text-muted-foreground">
                {settings.companyTagline}
              </p>

              <div className="space-y-4 pt-4">
                <h3 className="text-base font-semibold text-foreground">Newsletter</h3>
                <form className="flex max-w-sm flex-col gap-2 sm:flex-row" onSubmit={handleNewsletterSubmit}>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="border-border bg-background/50"
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                  />
                  <Button type="submit" disabled={newsletterLoading}>
                    {newsletterLoading ? "Joining..." : "Subscribe"}
                  </Button>
                </form>
                {newsletterMessage && (
                  <p className="text-sm text-muted-foreground">{newsletterMessage}</p>
                )}
                {footerError && (
                  <p className="text-sm text-destructive">{footerError}</p>
                )}
              </div>

              {socialLinks.length > 0 && (
                <div className="pt-4">
                  <h3 className="mb-4 text-base font-semibold text-foreground">Follow Us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map(([name, href]) => {
                      const Icon = socialIcons[name as keyof typeof socialIcons];
                      if (!Icon || !href) {
                        return null;
                      }

                      return (
                        <Link
                          key={name}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={name}
                          className="text-muted-foreground transition-colors hover:text-primary"
                        >
                          <Icon className="h-5 w-5" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-4 text-base font-semibold text-foreground">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <DialogTrigger asChild>
                    <button className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      Open Contact Form
                    </button>
                  </DialogTrigger>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-base font-semibold text-foreground">Services</h3>
              <ul className="space-y-3">
                {visibleServices.map((service) => (
                  <li key={service._id}>
                    <Link
                      href="/services"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-base font-semibold text-foreground">Contact Info</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground/90">{settings.officeName}</h4>
                  <address className="space-y-1 text-sm not-italic text-muted-foreground">
                    <p>{settings.address}</p>
                    <p>
                      <a href={`mailto:${settings.contactEmail}`} className="transition-colors hover:text-primary">
                        {settings.contactEmail}
                      </a>
                    </p>
                    <p>{settings.contactPhone}</p>
                  </address>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 text-center md:flex-row md:text-left">
            <p className="text-sm text-muted-foreground">
              © 2026 {settings.companyName}. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <ContactForm />
      </DialogContent>
    </Dialog>
  );
}
