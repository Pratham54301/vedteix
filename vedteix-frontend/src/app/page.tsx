

'use client';
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  ChevronRight, HeartHandshake, Milestone, Quote, MapPin, Mail, Phone
} from "lucide-react";
import {
  portfolioProjects,
  testimonials as fallbackTestimonials,
  blogPosts as fallbackBlogPosts,
  services as fallbackServices,
  technologies as fallbackTechnologies,
  whyChooseUs,
  officeLocations,
} from "@/lib/data";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ContactForm } from "@/components/contact-form";
import { Badge } from "@/components/ui/badge";
import { serviceIconMap } from "@/lib/service-icons";
import type { BlogPost, Portfolio, Service, SiteSettings, Technology, Testimonial } from "@/lib/types";
import { slugify } from "@/lib/slugs";
import { useTranslation } from "react-i18next";

const WHY_SLUGS = ["expertTeam", "innovative", "clientCentric", "proven"] as const;

const IconComponent = ({ name, className }: { name: string; className: string }) => {
  const Icon = serviceIconMap[name] || serviceIconMap.Code;
  if (!Icon) return null;
  return <Icon className={className} />;
};

const technologyColorByName = new Map(
  fallbackTechnologies.map((technology) => [
    technology.name.toLowerCase().replace(/[^a-z0-9]+/g, ""),
    technology.color,
  ])
);

const technologyOriginalLogoByName = new Map<string, string>([
  ["html5", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"],
  ["css3", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"],
  ["javascript", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"],
  ["typescript", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"],
  ["react", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"],
  ["nextjs", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"],
  ["nodejs", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"],
  ["expressjs", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"],
  ["python", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"],
  ["angular", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg"],
  ["vuejs", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"],
  ["nuxtjs", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg"],
  ["flutter", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"],
  ["sass", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg"],
  ["redux", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"],
  ["graphql", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"],
  ["webpack", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg"],
  ["vite", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"],
  ["tailwindcss", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"],
  ["bootstrap", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"],
  ["firebase", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"],
  ["docker", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"],
  ["github", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"],
  ["figma", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"],
  ["postgresql", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"],
  ["mysql", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"],
  ["mongodb", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"],
]);

function normalizeTechnologyName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function getTechnologyBrandColor(name: string) {
  return technologyColorByName.get(normalizeTechnologyName(name)) || "#94A3B8";
}

function isSimpleIconSvg(logoUrl: string) {
  return /simple-icons/i.test(logoUrl) && /\.svg(?:[?#].*)?$/i.test(logoUrl);
}

function buildColoredSimpleIconUrl(logoUrl: string, brandColor: string) {
  const match = logoUrl.match(/\/icons\/([a-z0-9]+)\.svg/i);
  if (!match) {
    return logoUrl;
  }

  return `https://cdn.simpleicons.org/${match[1]}/${brandColor.replace("#", "")}`;
}

function resolveTechnologyLogoUrl(name: string, logoUrl: string, brandColor: string) {
  const normalizedName = normalizeTechnologyName(name);

  if (logoUrl && !isSimpleIconSvg(logoUrl)) {
    return logoUrl;
  }

  const mappedLogo = technologyOriginalLogoByName.get(normalizedName);
  if (mappedLogo) {
    return mappedLogo;
  }

  if (logoUrl && isSimpleIconSvg(logoUrl)) {
    return buildColoredSimpleIconUrl(logoUrl, brandColor);
  }

  return logoUrl;
}

function TechnologyLogo({
  name,
  logoUrl,
  brandColor,
}: {
  name: string;
  logoUrl: string;
  brandColor: string;
}) {
  if (!logoUrl) {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {name.slice(0, 2)}
        </span>
      </div>
    );
  }

  const displayLogoUrl = resolveTechnologyLogoUrl(name, logoUrl, brandColor);

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm dark:border-slate-800">
      <img
        src={displayLogoUrl}
        alt={name}
        className="h-full w-full object-contain"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const [serviceItems, setServiceItems] = React.useState<Service[]>([]);
  const [portfolioItems, setPortfolioItems] = React.useState<Portfolio[]>([]);
  const [testimonialItems, setTestimonialItems] = React.useState<Testimonial[]>([]);
  const [technologyItems, setTechnologyItems] = React.useState<Technology[]>([]);
  const [blogItems, setBlogItems] = React.useState<BlogPost[]>([]);
  const [siteSettings, setSiteSettings] = React.useState<SiteSettings | null>(null);
  const [contentError, setContentError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    const loadDynamicContent = async () => {
      try {
        const [
          servicesResponse,
          portfoliosResponse,
          settingsResponse,
          testimonialsResponse,
          technologiesResponse,
          blogsResponse,
        ] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/portfolios"),
          fetch("/api/site-settings"),
          fetch("/api/testimonials"),
          fetch("/api/technologies"),
          fetch("/api/blogs"),
        ]);

        if (servicesResponse.ok) {
          const payload = await servicesResponse.json();
          if (!cancelled) setServiceItems(payload);
        }

        if (portfoliosResponse.ok) {
          const payload = await portfoliosResponse.json();
          if (!cancelled) setPortfolioItems(payload);
        }

        if (settingsResponse.ok) {
          const payload = await settingsResponse.json();
          if (!cancelled) setSiteSettings(payload);
        }

        if (testimonialsResponse.ok) {
          const payload = await testimonialsResponse.json();
          if (!cancelled) setTestimonialItems(payload);
        }

        if (technologiesResponse.ok) {
          const payload = await technologiesResponse.json();
          if (!cancelled) setTechnologyItems(payload);
        }

        if (blogsResponse.ok) {
          const payload = await blogsResponse.json();
          if (!cancelled) setBlogItems(payload);
        }

        if (!cancelled) {
          setContentError(null);
        }
      } catch {
        if (!cancelled) {
          setContentError(t("home.contentError"));
        }
      }
    };

    void loadDynamicContent();

    return () => {
      cancelled = true;
    };
  }, [t]);

  const serviceCards = serviceItems.length > 0
    ? serviceItems
    : fallbackServices.slice(0, 6).map((service, index) => ({
        _id: String(index),
        title: service.title,
        description: service.description,
        iconName: service.iconName,
        featured: false,
        sortOrder: index,
      }));

  const featuredProjects = portfolioItems.length > 0
    ? portfolioItems.slice(0, 9).map((project) => ({
        key: project._id,
        title: project.title,
        image: project.imageUrl || "/portfolio/High-Performance E-commerce Storefront.png",
        imageHint: project.category,
        category: project.category,
      }))
    : portfolioProjects.slice(0, 9).map((project) => ({
        key: project.title,
        ...project,
      }));

  const featuredTestimonials = testimonialItems.length > 0
    ? testimonialItems.slice(0, 6).map((testimonial) => ({
        key: testimonial._id,
        quote: testimonial.message,
        name: testimonial.name,
        title: testimonial.designation,
        avatar: testimonial.imageUrl || "https://placehold.co/100x100.png",
      }))
    : fallbackTestimonials.slice(0, 6).map((testimonial, index) => ({
        key: String(index),
        quote: testimonial.quote,
        name: testimonial.name,
        title: testimonial.title,
        avatar: testimonial.avatar,
      }));

  const featuredTechnologies = technologyItems.length > 0
    ? technologyItems.map((technology) => ({
        key: technology._id,
        name: technology.name,
        logoUrl: technology.logoUrl,
        website: technology.website || "#",
        brandColor: getTechnologyBrandColor(technology.name),
      }))
    : fallbackTechnologies.map((technology, index) => ({
        key: String(index),
        name: technology.name,
        logoUrl: technology.logoUrl,
        website: technology.websiteUrl,
        brandColor: technology.color,
      }));

  const featuredBlogs = blogItems.length > 0
    ? blogItems.slice(0, 6).map((post) => ({
        key: post._id,
        slug: post.slug || slugify(post.title),
        title: post.title,
        description: post.content.slice(0, 150).trim() + (post.content.length > 150 ? "..." : ""),
        category: post.author || "Insight",
        imageUrl: post.imageUrl || "/portfolio/High-Performance E-commerce Storefront.png",
      }))
    : fallbackBlogPosts.slice(0, 6).map((post) => ({
        key: post.slug,
        slug: post.slug,
        title: post.title,
        description: post.description,
        category: post.category,
        imageUrl: post.imageUrl,
      }));

  const offices = siteSettings
    ? [{
        name: siteSettings.officeName,
        address: siteSettings.address,
        email: siteSettings.contactEmail,
        phone: siteSettings.contactPhone,
      }]
    : officeLocations;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="relative w-full flex items-center justify-center text-center min-h-screen py-20">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: "url('/hero.avif')" }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-7xl/none animate-fade-in-down">
                {siteSettings?.heroTitle || t("home.heroFallbackTitle")}
              </h1>
              <p className="max-w-[600px] text-white/80 md:text-xl mx-auto animate-fade-in-up">
                {siteSettings?.heroSubtitle || t("home.heroFallbackSubtitle")}
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center animate-fade-in-up">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_hsl(var(--primary))] transition-all duration-300">
                  <Link href="/contact">
                    {t("home.ctaStart")}
                  </Link> 
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary text-white hover:bg-primary/10 hover:shadow-[0_0_15px_hsl(var(--primary))] transition-all duration-300">
                  <Link href="/portfolio">
                    {t("home.ctaPortfolio")}
                  </Link>
                </Button>
              </div>
              {contentError && (
                <p className="mx-auto max-w-[700px] text-sm text-white/70">
                  {contentError}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about-us" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-primary">{t("home.about.kicker")}</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("home.about.title")}</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("home.about.body")}
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="flex items-center gap-3">
                        <Milestone className="h-10 w-10 text-primary"/>
                        <div>
                            <p className="text-2xl font-bold">{siteSettings?.stats.projectsCompleted ?? 100}+</p>
                            <p className="text-sm text-muted-foreground">{t("home.about.projects")}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <HeartHandshake className="h-10 w-10 text-primary"/>
                        <div>
                            <p className="text-2xl font-bold">{siteSettings?.stats.happyClients ?? 50}+</p>
                            <p className="text-sm text-muted-foreground">{t("home.about.clients")}</p>
                        </div>
                    </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                 src="/about.jpg"
                  width="600"
                  height="450"
                  alt={t("home.about.imageAlt")}
                  data-ai-hint="team meeting"
                  className="mx-auto overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-semibold text-primary">{t("home.services.kicker")}</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("home.services.title")}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.services.desc")}
              </p>
            </div>
            <div className="mx-auto grid max-w-7xl items-start gap-8 mt-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {serviceCards.map((item) => (
                <Card key={item._id} className="bg-background/50 hover:bg-background/80 transition-colors duration-300 flex flex-col h-full">
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
                    <div className="bg-primary/10 p-3 rounded-md">
                        <IconComponent name={item.iconName} className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription className="text-sm">{t("home.services.cardHint")}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-primary">{t("home.why.kicker")}</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("home.why.title")}</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        {t("home.why.desc")}
                    </p>
                </div>
                <div className="mx-auto grid max-w-5xl gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4">
                    {whyChooseUs.map((reason, index) => {
                      const slug = WHY_SLUGS[index];
                      return (
                        <div key={slug} className="flex flex-col items-center text-center gap-4">
                            <IconComponent name={reason.iconName} className="h-10 w-10 text-primary" />
                            <h3 className="text-xl font-bold">{t(`home.why.items.${slug}.title`)}</h3>
                            <p className="text-sm text-muted-foreground">{t(`home.why.items.${slug}.desc`)}</p>
                        </div>
                      );
                    })}
                </div>
            </div>
        </section>

        {/* Technologies Section */}
        <section id="technologies" className="w-full py-12 md:py-24 lg:py-32 bg-secondary group">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-semibold text-primary">{t("home.tech.kicker")}</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("home.tech.title")}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.tech.desc")}
              </p>
            </div>
            <div className="w-full inline-flex flex-nowrap overflow-hidden mt-12 [mask-image:_linear_gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
              <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll group-hover:[animation-play-state:paused]">
                {featuredTechnologies.map((tech) => (
                  <li key={tech.key} className="flex-shrink-0">
                    <a href={tech.website} target="_blank" rel="noopener noreferrer" className="flex w-32 flex-col items-center justify-center gap-4 transition-transform hover:scale-105">
                      <TechnologyLogo name={tech.name} logoUrl={tech.logoUrl} brandColor={tech.brandColor} />
                      <span className="text-center text-sm font-medium text-foreground">{tech.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll group-hover:[animation-play-state:paused]" aria-hidden="true">
                {featuredTechnologies.map((tech) => (
                  <li key={`${tech.key}-clone`} className="flex-shrink-0">
                     <a href={tech.website} target="_blank" rel="noopener noreferrer" className="flex w-32 flex-col items-center justify-center gap-4 transition-transform hover:scale-105">
                      <TechnologyLogo name={tech.name} logoUrl={tech.logoUrl} brandColor={tech.brandColor} />
                      <span className="text-center text-sm font-medium text-foreground">{tech.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        
        {/* Portfolio Section */}
        <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-primary">{t("home.portfolio.kicker")}</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("home.portfolio.title")}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.portfolio.desc")}
              </p>
            </div>
            <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[autoplayPlugin.current]}
                onMouseEnter={autoplayPlugin.current.stop}
                onMouseLeave={autoplayPlugin.current.reset}
                className="w-full max-w-6xl mx-auto mt-12"
            >
                <CarouselContent>
                    {featuredProjects.map((project) => (
                      <CarouselItem key={project.key} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-2 h-full">
                          <Card className="overflow-hidden group transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2 h-full flex flex-col">
                            <div className="relative w-full h-48">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <CardHeader>
                              <CardTitle className="text-xl">{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <Badge variant="outline" className="text-primary border-primary w-fit">{project.category}</Badge>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link href="/portfolio">{t("home.portfolio.viewAll")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-semibold text-primary">{t("home.testimonials.kicker")}</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("home.testimonials.title")}</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        {t("home.testimonials.desc")}
                    </p>
                </div>
                <Carousel
                    opts={{ align: "start", loop: true }}
                    plugins={[autoplayPlugin.current]}
                    onMouseEnter={autoplayPlugin.current.stop}
                    onMouseLeave={autoplayPlugin.current.reset}
                    className="w-full max-w-4xl mx-auto mt-12"
                >
                    <CarouselContent>
                        {featuredTestimonials.map((testimonial) => (
                            <CarouselItem key={testimonial.key} className="md:basis-1/2 lg:basis-1/2">
                                <div className="p-1 h-full">
                                    <Card className="flex flex-col justify-between h-full bg-background">
                                        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                            <Quote className="w-8 h-8 text-primary" />
                                            <p className="text-muted-foreground italic text-base">&ldquo;{testimonial.quote}&rdquo;</p>
                                        </CardContent>
                                        <CardHeader className="flex flex-col items-center text-center p-6 pt-0">
                                            <Avatar>
                                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="mt-2">
                                                <p className="font-semibold">{testimonial.name}</p>
                                                <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>

        {/* Blog Preview Section */}
        <section id="blog" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-primary">{t("home.blog.kicker")}</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("home.blog.title")}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("home.blog.desc")}
              </p>
            </div>
            <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[autoplayPlugin.current]}
                onMouseEnter={autoplayPlugin.current.stop}
                onMouseLeave={autoplayPlugin.current.reset}
                className="w-full max-w-6xl mx-auto mt-12"
            >
              <CarouselContent>
                {featuredBlogs.map((post) => (
                  <CarouselItem key={post.key} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2 h-full">
                      <Card className="overflow-hidden group transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2 h-full flex flex-col">
                          <Link href={`/blog/${post.slug}`} className="block h-full flex flex-col">
                            <div className="relative w-full h-48">
                              <Image
                                  src={post.imageUrl}
                                  fill
                                  alt={post.title}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                              <CardContent className="p-6 flex-grow">
                                  <p className="text-sm text-primary font-semibold mb-2">{post.category}</p>
                                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                                  <p className="text-muted-foreground text-sm line-clamp-3">{post.description}</p>
                              </CardContent>
                              <div className="p-6 pt-0 mt-auto">
                                <div className="flex items-center text-primary font-semibold">
                                    {t("home.blog.readMore")} <ChevronRight className="ml-1 h-4 w-4" />
                                </div>
                              </div>
                          </Link>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="mt-12 text-center">
                <Button asChild size="lg">
                    <Link href="/blog">{t("home.blog.viewAll")}</Link>
                </Button>
            </div>
          </div>
        </section>

        {/* Careers Section */}
        <section id="careers" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-semibold text-primary">{t("home.careers.kicker")}</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("home.careers.title")}</h2>
              <p className="mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.careers.desc")}
              </p>
              <Button asChild size="lg">
                <Link href="/careers">{t("home.careers.viewOpenings")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-primary">{t("home.contact.kicker")}</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t("home.contact.title")}</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.contact.desc")}
              </p>
            </div>
            <div className="mx-auto w-full max-w-md space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full" suppressHydrationWarning={true}>
                    {t("home.contact.sendMessage")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{t("home.contact.dialogTitle")}</DialogTitle>
                    <DialogDescription>
                      {t("home.contact.dialogDesc")}
                    </DialogDescription>
                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="locations" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-semibold text-primary">{t("home.locations.kicker")}</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("home.locations.title")}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.locations.desc")}
              </p>
            </div>
            <div className="mx-auto grid max-w-lg gap-8 mt-12 sm:grid-cols-1">
              {offices.map((office, index) => (
                <Card key={index} className="bg-background text-left">
                  <CardHeader>
                    <CardTitle>{office.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                        <p className="text-muted-foreground">{office.address}</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <Mail className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-muted-foreground hover:text-primary transition-colors">{office.email}</a>
                    </div>
                    <div className="flex items-start gap-4">
                        <Phone className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                        <p className="text-muted-foreground">{office.phone}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-16">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.0783255043394!2d72.50838251444367!3d23.030513421541105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f8f3666eaf%3A0x7cbb11ad36e981ad!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1625592225195!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border:0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mx-auto w-full overflow-hidden rounded-xl">
              </iframe>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
