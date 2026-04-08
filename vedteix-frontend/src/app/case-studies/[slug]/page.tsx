'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { portfolioProjects } from "@/lib/data";
import type { Portfolio } from "@/lib/types";
import { slugify } from "@/lib/slugs";

export default function CaseStudyPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPortfolios = async () => {
      try {
        const response = await fetch("/api/portfolios");
        const payload = await response.json().catch(() => []);
        if (!response.ok) {
          throw new Error("Failed to load case study");
        }

        if (!cancelled) {
          setPortfolios(payload);
          setError(null);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load case study");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadPortfolios();

    return () => {
      cancelled = true;
    };
  }, []);

  const study = useMemo(() => {
    if (portfolios.length > 0) {
      return portfolios.find((portfolio) => slugify(portfolio.title) === slug);
    }

    const fallback = portfolioProjects.find((project) => slugify(project.title) === slug);
    if (!fallback) {
      return null;
    }

    return {
      _id: fallback.title,
      title: fallback.title,
      category: fallback.category,
      description: "This case study is using fallback portfolio data until admin-managed projects are added.",
      imageUrl: fallback.image,
      techStack: [],
      featured: false,
    } satisfies Partial<Portfolio> & { title: string; category: string; description: string; imageUrl: string };
  }, [portfolios, slug]);

  return (
    <article className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
      <Link href="/case-studies" className="mb-8 inline-flex items-center gap-2 text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Case Studies
      </Link>

      {loading && <p className="text-sm text-muted-foreground">Loading case study...</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {!loading && !error && !study && (
        <p className="text-sm text-muted-foreground">
          Case study not found.
        </p>
      )}

      {study && (
        <>
          <Badge variant="outline" className="border-primary text-primary">
            {study.category}
          </Badge>
          <h1 className="mb-4 mt-4 text-4xl font-bold tracking-tight md:text-5xl">{study.title}</h1>
          <p className="mb-8 text-xl text-muted-foreground">{study.description}</p>

          <div className="mb-12 aspect-[2/1] w-full overflow-hidden rounded-lg">
            <img src={study.imageUrl || "/portfolio/High-Performance E-commerce Storefront.png"} alt={study.title} className="h-full w-full object-cover" />
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              This project now pulls from the same portfolio source used by the homepage,
              portfolio page, and admin panel. Updating the project in admin instantly
              refreshes this case-study experience as well.
            </p>
            {study.techStack && study.techStack.length > 0 && (
              <div>
                <h2 className="mb-3 text-2xl font-semibold text-primary">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {study.techStack.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <p>
              Use the admin panel to enrich each project with stronger descriptions, links,
              and visual assets for a more detailed case-study narrative.
            </p>
          </div>
        </>
      )}
    </article>
  );
}
