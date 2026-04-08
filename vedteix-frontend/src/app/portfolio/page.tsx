'use client';

import { useEffect, useMemo, useState } from 'react';
import { portfolioCategories, portfolioProjects } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Portfolio } from '@/lib/types';

const PROJECTS_PER_PAGE = 9;

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPortfolios = async () => {
      try {
        const response = await fetch('/api/portfolios');
        const payload = await response.json().catch(() => []);
        if (!response.ok) {
          throw new Error('Failed to load portfolios');
        }

        if (!cancelled) {
          setPortfolios(payload);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load portfolios');
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

  const displayedPortfolios = useMemo(() => {
    if (portfolios.length > 0) {
      return portfolios.map((portfolio) => ({
        _id: portfolio._id,
        title: portfolio.title,
        category: portfolio.category,
        description: portfolio.description,
        imageUrl: portfolio.imageUrl || '/portfolio/High-Performance E-commerce Storefront.png',
      }));
    }

    return portfolioProjects.map((project, index) => ({
      _id: String(index),
      title: project.title,
      category: project.category,
      description: '',
      imageUrl: project.image,
    }));
  }, [portfolios]);

  const categories = useMemo(() => {
    if (portfolios.length > 0) {
      return ['All', ...Array.from(new Set(portfolios.map((portfolio) => portfolio.category)))];
    }

    return portfolioCategories;
  }, [portfolios]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return displayedPortfolios;
    }

    return displayedPortfolios.filter((project) => project.category === activeCategory);
  }, [activeCategory, displayedPortfolios]);

  return (
    <div className="bg-background">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Our Portfolio</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Projects shown here now come directly from the database and update through the admin panel.
              </p>
            </div>
          </div>

          {loading && <p className="mt-6 text-center text-sm text-muted-foreground">Loading portfolio data...</p>}
          {error && <p className="mt-6 text-center text-sm text-destructive">{error}</p>}

          <div className="my-12 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCount(PROJECTS_PER_PAGE);
                }}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.slice(0, visibleCount).map((project) => (
              <Card key={project._id} className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20">
                <div className="relative w-full aspect-[16/9] bg-muted">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex flex-grow flex-col p-6">
                  <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                  <Badge variant="outline" className="mb-3 w-fit border-primary text-primary">
                    {project.category}
                  </Badge>
                  {project.description && (
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {visibleCount < filteredProjects.length && (
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
