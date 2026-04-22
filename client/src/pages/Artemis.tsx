import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Scale, BookMarked, Brain, Zap, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  { icon: Scale, title: "Simulados OAB", desc: "Questões oficiais das últimas edições com gabarito comentado e explicações detalhadas.", color: "from-amber-500 to-orange-500" },
  { icon: Brain, title: "Explicações por IA", desc: "Artemis explica cada questão de forma contextualizada, com referências legais e jurisprudência.", color: "from-purple-500 to-violet-500" },
  { icon: BookMarked, title: "Banco de Questões RAG", desc: "Base vetorial com milhares de questões indexadas para recuperação semântica precisa.", color: "from-blue-500 to-cyan-500" },
  { icon: Zap, title: "Streaming em Tempo Real", desc: "Respostas palavra por palavra com voz da Artemis narrando as explicações jurídicas.", color: "from-emerald-500 to-teal-500" },
];

const AREAS = ["Direito Constitucional", "Direito Civil", "Direito Penal", "Direito Processual Civil", "Direito Processual Penal", "Direito Administrativo", "Direito Tributário", "Direito do Trabalho", "Direito Empresarial", "Ética Profissional"];

export default function Artemis() {
  return (
    <div className="min-h-screen bg-[#0d0a1a] text-white">
      {/* Header */}
      <div className="border-b border-slate-800/60 bg-[#0d0a1a]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">MSc Academy</span>
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-bold text-white">Artemis</span>
          </div>
          <div className="w-24" />
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-purple-600/10" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
                <Clock className="h-4 w-4" />
                Em Desenvolvimento — Lançamento em breve
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                  Artemis
                </span>
                <br />
                <span className="text-white text-3xl sm:text-4xl">Sua Agente para</span>
                <br />
                <span className="text-white text-3xl sm:text-4xl">a Prova da OAB</span>
              </h1>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Agente de IA especializado em preparação para a OAB. Simulados, questões comentadas, explicações contextualizadas e voz da Artemis para uma experiência de estudo imersiva.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["RAG", "LangChain", "PGvector", "React", "FastAPI", "TTS"].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 text-xs font-mono border border-amber-500/20">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Button disabled className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0 gap-2 opacity-60 cursor-not-allowed">
                  <Scale className="h-4 w-4" />
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

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-purple-500/20 rounded-3xl blur-2xl scale-110" />
                <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-amber-900/20">
                  <img
                    src="/manus-storage/ArtemisPrincipal_e1733188.png"
                    alt="Artemis — Agente OAB"
                    className="w-72 h-auto object-cover"
                  />
                </div>
                {/* Badge */}
                <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-[#0d0a1a] border border-amber-500/30 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-400">OAB Prep</span>
                  </div>
                </div>
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
                <div className="rounded-2xl border border-slate-800/60 bg-[#130f22]/60 p-6 h-full hover:border-amber-500/20 transition-all">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center shadow-lg mb-4`}>
                    <feat.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Areas */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-display font-bold text-white mb-6 text-center">Áreas de Direito Cobertas</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {AREAS.map((area) => (
                <span key={area} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 text-sm border border-amber-500/20">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 flex flex-wrap justify-center gap-3">
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
            <Link href="/atlas">
              <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 gap-2">
                Ver Atlas
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
