import { useMemo, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft, Clock, Tag, Calendar, Rss,
  ArrowRight, BookOpen, ExternalLink, Bot, Share2
} from "lucide-react";
import { getPostBySlug, BLOG_POSTS } from "@/data/blogPosts";
import { Streamdown } from "streamdown";

const SITE_URL = "https://mscinterview.org";
const SITE_NAME = "MSc Academy — Moises Costa";

interface BlogPostProps {
  slug: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatDateISO(iso: string): string {
  return new Date(iso).toISOString();
}

/** Inject SEO meta tags into <head> for the current article */
function useSEOMeta(post: ReturnType<typeof getPostBySlug>) {
  useEffect(() => {
    if (!post) return;

    const canonical = post.canonicalUrl ?? `${SITE_URL}/blog/${post.slug}`;
    const description = post.seoDescription ?? post.excerpt;
    const keywords = post.seoKeywords?.join(", ") ?? post.tags.join(", ");
    const image = post.coverImage ?? `${SITE_URL}/og-default.png`;
    const author = post.author ?? "Moises Costa";

    // Title
    document.title = `${post.title} | ${SITE_NAME}`;

    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // Standard meta
    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("author", author);
    setMeta("robots", "index, follow");

    // Canonical
    setLink("canonical", canonical);

    // Open Graph
    setMeta("og:type", "article", true);
    setMeta("og:title", post.title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonical, true);
    setMeta("og:image", image, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("article:published_time", formatDateISO(post.publishedAt), true);
    setMeta("article:author", author, true);
    setMeta("article:section", post.category, true);
    post.tags.forEach((tag) => setMeta("article:tag", tag, true));

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", post.title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
    setMeta("twitter:creator", "@moises_costa_ai");

    // JSON-LD structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: description,
      image: image,
      datePublished: formatDateISO(post.publishedAt),
      dateModified: formatDateISO(post.publishedAt),
      author: {
        "@type": "Person",
        name: author,
        url: `${SITE_URL}`,
        sameAs: [
          "https://www.linkedin.com/in/moises-costa-rj/",
          "https://github.com/Finish-Him",
        ],
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      keywords: keywords,
      articleSection: post.category,
    };

    let ldScript = document.querySelector('script[data-blog-ld]') as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement("script");
      ldScript.setAttribute("type", "application/ld+json");
      ldScript.setAttribute("data-blog-ld", "true");
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify(jsonLd);

    return () => {
      // Restore default title on unmount
      document.title = SITE_NAME;
    };
  }, [post]);
}

export default function BlogPost({ slug }: BlogPostProps) {
  const post = useMemo(() => getPostBySlug(slug), [slug]);

  // Related posts (same category or featured, excluding current)
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    const bySlug = post.relatedSlugs
      ? BLOG_POSTS.filter((p) => post.relatedSlugs!.includes(p.slug))
      : [];
    if (bySlug.length >= 2) return bySlug.slice(0, 3);
    return BLOG_POSTS.filter(
      (p) => p.slug !== slug && (p.category === post.category || p.featured)
    ).slice(0, 3);
  }, [post, slug]);

  // Inject SEO meta tags
  useSEOMeta(post);

  const handleShare = () => {
    const url = `${SITE_URL}/blog/${slug}`;
    if (navigator.share) {
      navigator.share({ title: post?.title, url });
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#060d1b] text-white flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-slate-700 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-white mb-2">Article not found</h1>
          <p className="text-slate-400 mb-6">The article you are looking for does not exist or has been removed.</p>
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060d1b] text-white">
      {/* ── Sticky Header ───────────────────────────────────────────────── */}
      <header className="border-b border-slate-800/60 bg-[#060d1b]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <Link href="/blog">
            <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
              <ArrowLeft className="h-4 w-4" />
              Blog
            </button>
          </Link>
          <div className="flex items-center gap-2 min-w-0">
            <Rss className="h-4 w-4 text-blue-400 shrink-0" />
            <span className="text-xs font-medium text-slate-300 truncate max-w-[180px] sm:max-w-xs">{post.title}</span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/40 text-slate-400 text-xs hover:text-white hover:bg-slate-700/60 transition-colors"
            title="Share article"
          >
            <Share2 className="h-3.5 w-3.5" />
            Share
          </button>
        </div>
      </header>

      {/* ── Cover Image ─────────────────────────────────────────────────── */}
      {post.coverImage && (
        <div className="w-full h-56 sm:h-72 lg:h-80 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      )}

      {/* ── Article Header ──────────────────────────────────────────────── */}
      <section className="py-10 relative overflow-hidden">
        {!post.coverImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-transparent to-purple-600/8" />
        )}
        <div className="container relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-5" aria-label="Breadcrumb">
              <Link href="/"><span className="hover:text-slate-300 transition-colors cursor-pointer">Home</span></Link>
              <span>/</span>
              <Link href="/blog"><span className="hover:text-slate-300 transition-colors cursor-pointer">Blog</span></Link>
              <span>/</span>
              <span className="text-slate-400 truncate">{post.category}</span>
            </nav>

            {/* Category + badge */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${post.gradient}`} />
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{post.category}</span>
              {post.featured && (
                <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 text-xs font-bold border border-blue-500/25">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-base text-slate-400 mb-6 leading-relaxed">{post.excerpt}</p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
              {post.author && (
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">M</div>
                  {post.author}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} read
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/4 text-slate-400 text-xs border border-slate-700/40 font-mono">
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article Content ─────────────────────────────────────────────── */}
      <section className="pb-12">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="prose prose-invert prose-blue max-w-none
              prose-headings:font-display prose-headings:font-bold
              prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
              prose-code:text-cyan-300 prose-code:bg-slate-800/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-slate-900/80 prose-pre:border prose-pre:border-slate-700/50 prose-pre:rounded-xl
              prose-blockquote:border-l-blue-500 prose-blockquote:text-slate-400
              prose-strong:text-white
              prose-li:text-slate-300"
          >
            <Streamdown>{post.content}</Streamdown>
          </motion.div>
        </div>
      </section>

      {/* ── External Links ──────────────────────────────────────────────── */}
      {post.externalLinks && post.externalLinks.length > 0 && (
        <section className="pb-10">
          <div className="container max-w-3xl">
            <div className="rounded-xl border border-slate-700/40 bg-slate-800/30 p-5">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-400" />
                References & Resources
              </h3>
              <ul className="space-y-2">
                {post.externalLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel={link.rel ?? "noopener noreferrer"}
                      className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group"
                    >
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA → /agents ───────────────────────────────────────────────── */}
      <section className="pb-12">
        <div className="container max-w-3xl">
          <div className="rounded-2xl border border-blue-500/25 bg-gradient-to-br from-blue-900/25 to-cyan-900/10 p-7 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-3">
              <Bot className="h-3.5 w-3.5" />
              Live AI Agents
            </div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-white mb-2">
              See the concepts in action
            </h2>
            <p className="text-slate-400 text-sm mb-5 max-w-sm mx-auto">
              Interact with Arquimedes, Atlas, Artemis and the Detran-RJ agent — built with the exact techniques described in this article.
            </p>
            <Link href="/agents">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-900/30">
                <Bot className="h-4 w-4" />
                Try Live Agents
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related Posts ───────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="pb-20">
          <div className="container max-w-3xl">
            <h2 className="text-base font-bold text-white mb-5">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`}>
                  <article className="group rounded-xl border border-slate-800/60 bg-[#0c1629]/60 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden">
                    {related.coverImage && (
                      <div className="h-28 overflow-hidden">
                        <img
                          src={related.coverImage}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <span className="text-xs text-blue-400 font-medium">{related.category}</span>
                      <h3 className="text-sm font-bold text-white mt-1 leading-snug line-clamp-2 group-hover:text-blue-100 transition-colors">
                        {related.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        {related.readTime}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
