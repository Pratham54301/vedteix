'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { blogPosts as fallbackPosts } from "@/lib/data";
import type { BlogPost } from "@/lib/types";
import { slugify } from "@/lib/slugs";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      try {
        const response = await fetch("/api/blogs");
        const payload = await response.json().catch(() => []);
        if (!response.ok) {
          throw new Error("Failed to load blog articles");
        }

        if (!cancelled) {
          setPosts(payload);
          setError(null);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load blog articles");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  const displayedPosts = useMemo(() => {
    if (posts.length > 0) {
      return posts.map((post) => ({
        key: post._id,
        title: post.title,
        description: post.content.slice(0, 150).trim() + (post.content.length > 150 ? "..." : ""),
        imageUrl: post.imageUrl || "/portfolio/High-Performance E-commerce Storefront.png",
        category: post.author || "Insight",
        slug: post.slug || slugify(post.title),
      }));
    }

    return fallbackPosts.map((post) => ({
      key: post.slug,
      title: post.title,
      description: post.description,
      imageUrl: post.imageUrl,
      category: post.category,
      slug: post.slug,
    }));
  }, [posts]);

  return (
    <div className="bg-background">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">From the Blog</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Insights, trends, and thoughts from the VEDTEIX team.
              </p>
              {loading && <p className="text-sm text-muted-foreground">Loading articles...</p>}
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayedPosts.map((post) => (
              <Card key={post.key} id={post.slug} className="group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20">
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      fill
                      alt={post.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-2 border-primary text-primary">
                      {post.category}
                    </Badge>
                    <h3 className="mb-2 text-xl font-bold line-clamp-2">{post.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{post.description}</p>
                    <div className="flex items-center font-semibold text-primary">
                      Read More <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
