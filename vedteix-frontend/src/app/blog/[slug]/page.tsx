'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts as fallbackPosts } from "@/lib/data";
import type { BlogPost } from "@/lib/types";
import { slugify } from "@/lib/slugs";

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
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
          throw new Error("Failed to load article");
        }

        if (!cancelled) {
          setPosts(payload);
          setError(null);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load article");
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

  const article = useMemo(() => {
    if (posts.length > 0) {
      return posts.find((post) => (post.slug || slugify(post.title)) === slug);
    }

    return fallbackPosts.find((post) => post.slug === slug);
  }, [posts, slug]);

  return (
    <article className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
      <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      {loading && <p className="text-sm text-muted-foreground">Loading article...</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {!loading && !error && !article && (
        <p className="text-sm text-muted-foreground">
          Article not found.
        </p>
      )}

      {article && (
        <>
          <Badge variant="outline" className="border-primary text-primary">
            {"author" in article ? article.author : article.category}
          </Badge>
          <h1 className="mb-4 mt-4 text-4xl font-bold tracking-tight md:text-5xl">{article.title}</h1>
          <p className="mb-8 text-sm text-muted-foreground">
            {"createdAt" in article && article.createdAt
              ? new Date(article.createdAt).toLocaleDateString()
              : "Latest insight"}
          </p>

          <div className="relative mb-12 aspect-[2/1] w-full overflow-hidden rounded-lg">
            <Image
              src={article.imageUrl || "/portfolio/High-Performance E-commerce Storefront.png"}
              fill
              alt={article.title}
              className="object-cover"
            />
          </div>

          <div className="prose prose-neutral max-w-none">
            {"content" in article ? (
              article.content.split("\n").filter(Boolean).map((paragraph, index) => (
                <p key={index} className="mb-6 text-lg leading-relaxed text-foreground/90">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-lg leading-relaxed text-foreground/90">{article.description}</p>
            )}
          </div>
        </>
      )}
    </article>
  );
}
