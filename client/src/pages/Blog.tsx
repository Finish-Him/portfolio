import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, BookOpen, Clock, Tag, Rss, Sparkles,
  ArrowRight, Calendar, Search, ChevronDown, ChevronUp,
  ExternalLink, Bot
} from "lucide-react";
import { BLOG_POSTS, getAllCategories } from "@/data/blogPosts";

const POSTS_PER_PAGE = 6;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = useMemo(() => ["All", ...getAllCategories()], []);

  const filteredPosts = useMemo(() => {
    setCurrentPage(1);
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const featuredPost = BLOG_POSTS.find((p) => p.featured);

  return (
    <div className="min-h-screen bg-[#060d1b] text-white">
      {/* ── SEO: Page-level meta via document title ─────────────────────── */}
      {/* Note: full meta/OG/JSON-LD is injected in BlogPost per-article */}

      {/* ── Sticky Header ───────────────────────────────────────────────── */}
      <header className="border-b border-slate-800/60 bg-[#060d1b]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <Link href="/">
            <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
              <ArrowLeft className="h-4 w-4" />
              Home
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <Rss className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-bold text-white">Blog</span>
          </div>
          <Link href="/agents">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-medium hover:bg-blue-600/30 transition-colors">
              <Bot className="h-3.5 w-3.5" />
              Try Agents
            </button>
          </Link>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-transparent to-purple-600/8" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/4 rounded-full blur-[100px]" />
        <div className="container relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              AI Engineering in Practice · Moises Costa
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold mb-3 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AI Engineering
              </span>{" "}
              <span className="text-white">Blog</span>
            </h1>
            <p className="text-base text-slate-400 mb-7 leading-relaxed">
              Technical articles on LangGraph, RAG, prompt engineering, MCP and production AI systems — based on real-world experience.
            </p>

            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 transition-all text-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Post ───────────────────────────────────────────────── */}
      {featuredPost && !searchQuery && selectedCategory === "All" && currentPage === 1 && (
        <section className="pb-10">
          <div className="container max-w-5xl">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Featured</p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="group rounded-2xl border border-blue-500/20 bg-[#0c1629]/70 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-900/15 transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="grid lg:grid-cols-5">
                    {/* Cover image */}
                    {featuredPost.coverImage && (
                      <div className="lg:col-span-2 h-52 lg:h-auto overflow-hidden">
                        <img
                          src={featuredPost.coverImage}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    {/* Content */}
                    <div className={`p-7 flex flex-col justify-center ${featuredPost.coverImage ? "lg:col-span-3" : "lg:col-span-5"}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`h-1 w-10 rounded-full bg-gradient-to-r ${featuredPost.gradient}`} />
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{featuredPost.category}</span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 text-xs font-bold border border-blue-500/25">Featured</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white mb-2 leading-snug group-hover:text-blue-100 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(featuredPost.publishedAt)}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featuredPost.readTime} read</span>
                      </div>
                      <div className="mt-4 flex items-center gap-1.5 text-blue-400 text-sm font-semibold group-hover:gap-3 transition-all">
                        Read article <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Filters (collapsible submenu) ───────────────────────────────── */}
      <section className="pb-8">
        <div className="container max-w-5xl">
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-2"
          >
            {filtersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            <span className="font-medium">Filter by category</span>
            {selectedCategory !== "All" && (
              <span className="px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-xs border border-blue-500/30">
                {selectedCategory}
              </span>
            )}
            <span className="ml-auto text-xs text-slate-600">{filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}</span>
          </button>

          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-2 pb-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                          : "bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-white border border-slate-700/40"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  {selectedCategory !== "All" && (
                    <button
                      onClick={() => { setSelectedCategory("All"); setCurrentPage(1); }}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Posts Grid ──────────────────────────────────────────────────── */}
      <section className="pb-16">
        <div className="container max-w-5xl">
          <AnimatePresence mode="wait">
            {paginatedPosts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <BookOpen className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 mb-4">No articles found{searchQuery ? ` for "${searchQuery}"` : ""}.</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setCurrentPage(1); }}
                  className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`page-${currentPage}-${selectedCategory}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {paginatedPosts.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <article className="group rounded-xl border border-slate-800/60 bg-[#0c1629]/60 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col h-full overflow-hidden">
                        {/* Cover image */}
                        {post.coverImage ? (
                          <div className="h-40 overflow-hidden">
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className={`h-2 bg-gradient-to-r ${post.gradient}`} />
                        )}

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400 text-xs border border-slate-700/40">
                              {post.category}
                            </span>
                            {post.featured && (
                              <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-xs border border-blue-500/25">
                                Featured
                              </span>
                            )}
                          </div>

                          <h3 className="font-display font-bold text-white text-sm mb-2 leading-snug group-hover:text-blue-100 transition-colors flex-1 line-clamp-3">
                            {post.title}
                          </h3>

                          <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          {/* Tags (max 3) */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-white/4 text-slate-500 text-xs border border-slate-700/30 font-mono">
                                <Tag className="h-2 w-2" />
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between text-xs text-slate-600 mt-auto">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Pagination ──────────────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/40 text-slate-400 text-sm hover:bg-slate-700/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    page === currentPage
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "bg-slate-800/60 border border-slate-700/40 text-slate-400 hover:bg-slate-700/60 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/40 text-slate-400 text-sm hover:bg-slate-700/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA → /agents ───────────────────────────────────────────────── */}
      <section className="pb-20">
        <div className="container max-w-5xl">
          <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-cyan-900/10 p-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
              <Bot className="h-3.5 w-3.5" />
              Live AI Agents
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
              See the concepts in action
            </h2>
            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
              Interact with Arquimedes, Atlas, Artemis and the Detran-RJ agent — all built with the techniques described in this blog.
            </p>
            <Link href="/agents">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-900/30">
                <Bot className="h-4 w-4" />
                Try Live Agents
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
