import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Database, BarChart3, FileText, Zap, Clock, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  { icon: Package, title: "Controle de Ativos", desc: "Gestão completa do patrimônio da DTIC: hardware, software, licenças e equipamentos.", color: "from-emerald-500 to-teal-500" },
  { icon: Database, title: "Banco de Dados Vetorial", desc: "PGvector + Supabase para busca semântica inteligente no inventário patrimonial.", color: "from-blue-500 to-cyan-500" },
  { icon: BarChart3, title: "Relatórios Automatizados", desc: "Dashboards e relatórios gerados automaticamente com LangGraph e análise de dados.", color: "from-purple-500 to-violet-500" },
  { icon: FileText, title: "Documentação Inteligente", desc: "Atlas gera documentação técnica e relatórios de conformidade automaticamente.", color: "from-amber-500 to-orange-500" },
];

export default function Atlas() {
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
            <Package className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-bold text-white">Atlas</span>
          </div>
          <div className="w-24" />
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-transparent to-teal-600/10" />
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                <Clock className="h-4 w-4" />
                Em Desenvolvimento — Patrimônio DTIC Detran-RJ
              </div>

              {/* Detran logo */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                  <div className="p-2 bg-white rounded-xl">
                    <img src="/manus-storage/detran-logo-horizontal_bf146ebc.png" alt="Detran RJ" className="h-8 w-auto" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-slate-400 font-medium">Projeto Interno</div>
                    <div className="text-sm font-bold text-white">DTIC — Detran-RJ</div>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                  Atlas
                </span>
                <br />
                <span className="text-white text-3xl sm:text-4xl">Gestão de Patrimônio</span>
                <br />
                <span className="text-white text-3xl sm:text-4xl">com IA</span>
              </h1>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">
                Agente de IA para gestão inteligente do patrimônio da DTIC do Detran-RJ. Controle de ativos, rastreamento, relatórios automatizados e busca semântica no inventário.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {["LangGraph", "FastAPI", "PostgreSQL", "Supabase", "PGvector", "React"].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 text-xs font-mono border border-emerald-500/20">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Button disabled className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 gap-2 opacity-60 cursor-not-allowed">
                  <Package className="h-4 w-4" />
                  Demo em Breve
                </Button>
                <Link href="/arquimedes/chat">
                  <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 gap-2">
                    Testar Arquimedes
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-t border-slate-800/40">
        <div className="container">
          <h2 className="text-2xl font-display font-extrabold text-white mb-10 text-center">Funcionalidades Planejadas</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="rounded-2xl border border-slate-800/60 bg-[#0c1629]/60 p-6 h-full hover:border-emerald-500/20 transition-all">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center shadow-lg mb-4`}>
                    <feat.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Context */}
          <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 text-center mb-12">
            <Building2 className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
            <h3 className="font-display font-bold text-white mb-2">Projeto Estratégico DTIC</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              O Atlas é um projeto interno desenvolvido para a Diretoria de Tecnologia da Informação e Comunicação (DTIC) do Detran-RJ, com o objetivo de modernizar a gestão patrimonial usando IA generativa e busca semântica.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/">
              <Button variant="outline" className="border-slate-700/60 text-slate-400 hover:text-white gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar para Home
              </Button>
            </Link>
            <Link href="/arquimedes/chat">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0 gap-2">
                Testar Arquimedes ao Vivo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/artemis">
              <Button variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 gap-2">
                Ver Artemis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
