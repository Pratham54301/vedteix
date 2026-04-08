'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioCategories, portfolioProjects } from "@/lib/data";
import type { Portfolio } from "@/lib/types";
import { slugify } from "@/lib/slugs";

const PROJECTS_PER_PAGE = 9;

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadPortfolios = async () => {
      try {
        const response = await fetch("/api/portfolios");
        const payload = await response.json().catch(() => []);
        if (response.ok && !cancelled) {
          setPortfolios(payload);
        }
      } catch {}
    };

    void loadPortfolios();

    return () => {
      cancelled = true;
    };
  }, []);

  const studies = useMemo(() => {
    if (portfolios.length > 0) {
      return portfolios.map((portfolio) => ({
        key: portfolio._id,
        slug: slugify(portfolio.title),
        title: portfolio.title,
        category: portfolio.category,
        description: portfolio.description,
        imageUrl: portfolio.imageUrl || "/portfolio/High-Performance E-commerce Storefront.png",
      }));
    }

    return portfolioProjects.map((project, index) => ({
      key: String(index),
      slug: slugify(project.title),
      title: project.title,
      category: project.category,
      description: "Live case-study content will appear here once projects are managed from the admin panel.",
      imageUrl: project.image,
    }));
  }, [portfolios]);

  const categories = useMemo(() => {
    if (portfolios.length > 0) {
      return ["All", ...Array.from(new Set(portfolios.map((portfolio) => portfolio.category)))];
    }

    return portfolioCategories;
  }, [portfolios]);

  const filteredStudies = useMemo(() => {
    if (activeCategory === "All") {
      return studies;
    }

    return studies.filter((study) => study.category === activeCategory);
  }, [activeCategory, studies]);

  useEffect(() => {
    setVisibleCount(PROJECTS_PER_PAGE);
  }, [activeCategory]);

  return (
    <div className="bg-background">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Our Work</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the real-world impact of our digital solutions.
              </p>
            </div>
          </div>

          <div className="my-12 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudies.slice(0, visibleCount).map((study) => (
              <Card key={study.key} className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20">
                <Link href={`/case-studies/${study.slug}`} className="flex h-full flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img src={study.imageUrl} alt={study.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <Badge variant="outline" className="mb-2 w-fit border-primary text-primary">
                      {study.category}
                    </Badge>
                    <h3 className="mb-2 text-xl font-bold">{study.title}</h3>
                    <p className="mb-4 flex-grow text-sm text-muted-foreground line-clamp-3">
                      {study.description}
                    </p>
                    <div className="mt-auto flex items-center font-semibold text-primary">
                      Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {visibleCount < filteredStudies.length && (
            <div className="mt-16 text-center">
              <Button onClick={() => setVisibleCount((count) => count + PROJECTS_PER_PAGE)} size="lg">
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
