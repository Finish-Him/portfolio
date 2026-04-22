import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Clock, Tag, Rss, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const COMING_SOON_POSTS = [
  {
    title: "Orquestração Agêntica com LangGraph: Do Zero ao Deploy",
    desc: "Como construir pipelines de agentes multi-step com estado persistente usando LangGraph, LangSmith e FastAPI.",
    tags: ["LangGraph", "LangChain", "Python", "FastAPI"],
    readTime: "12 min",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "RAG em Produção: Arquitetura, Chunking e Avaliação",
    desc: "Guia completo para implementar Retrieval-Augmented Generation com PGvector, Supabase e avaliação com LangSmith.",
    tags: ["RAG", "PGvector", "Supabase", "LLM"],
    readTime: "18 min",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    title: "System Prompts e Role Prompts: Engenharia de Prompts Avançada",
    desc: "Técnicas avançadas de prompt engineering para Claude, GPT-4 e modelos open-source. Padrões, anti-padrões e benchmarks.",
    tags: ["Prompt Engineering", "Claude", "OpenAI", "Anthropic"],
    readTime: "10 min",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "MCP (Model Context Protocol): O Futuro da Integração de Agentes",
    desc: "Como o MCP está mudando a forma como agentes de IA se conectam a ferramentas externas e sistemas legados.",
    tags: ["MCP", "Agents", "Integration", "LLM"],
    readTime: "8 min",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Full Stack AI: React + FastAPI + LangChain em Produção",
    desc: "Arquitetura completa de uma aplicação de IA com streaming SSE, autenticação, banco vetorial e deploy.",
    tags: ["React", "FastAPI", "LangChain", "Full Stack"],
    readTime: "20 min",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    title: "Detran-RJ: Como Modernizamos o Backend com GenAI",
    desc: "Case real: implementação de pipelines de IA em um órgão público, desafios, aprendizados e resultados.",
    tags: ["Case Study", "GenAI", "FastAPI", "Detran"],
    readTime: "15 min",
    gradient: "from-blue-600 to-indigo-600",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#060d1b] text-white">
      {/* Header */}
      <div className="border-b border-slate-800/60 bg-[#060d1b]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">MSc Academy</span>
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <Rss className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-bold text-white">Blog</span>
          </div>
          <div className="w-24" />
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Em breve — Blog técnico sobre AI Engineering
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AI Engineering
              </span>
              <br />
              <span className="text-white">na Prática</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Artigos técnicos sobre LangChain, LangGraph, RAG, prompt engineering, FastAPI e arquitetura de agentes de IA em produção.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["LangChain", "LangGraph", "RAG", "FastAPI", "Python", "Prompt Engineering", "MCP", "Supabase"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 text-xs font-mono border border-slate-700/40">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Posts */}
      <section className="pb-24">
        <div className="container">
          <div className="flex items-center gap-3 mb-10">
            <BookOpen className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-display font-bold text-white">Próximos Artigos</h2>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">Em breve</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMING_SOON_POSTS.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="group rounded-2xl border border-slate-800/60 bg-[#0c1629]/60 backdrop-blur-sm p-6 h-full hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden cursor-default">
                  {/* Coming soon overlay */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-400 text-xs font-medium border border-slate-600/40">
                      Em breve
                    </span>
                  </div>

                  {/* Gradient bar */}
                  <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${post.gradient} mb-5`} />

                  <h3 className="font-display font-bold text-white text-base mb-3 leading-snug pr-16">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">
                    {post.desc}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 text-slate-400 text-xs border border-slate-700/40">
                          <Tag className="h-2.5 w-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
              <p className="text-slate-300 text-sm max-w-md">
                Quer ser notificado quando os artigos forem publicados? Conecte-se no LinkedIn.
              </p>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/moises-costa-rj/" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0 gap-2">
                    Seguir no LinkedIn
                  </Button>
                </a>
                <Link href="/">
                  <Button variant="outline" className="border-slate-700/60 text-slate-400 hover:text-white gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
