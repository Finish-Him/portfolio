import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "wouter";
import {
  MessageCircle, BookOpen, GraduationCap, BarChart3,
  ArrowRight, Sparkles, Sun, Moon, Lock, ExternalLink,
  Plus, Minus, Divide, PieChart, Percent, Scale, CircleDot,
  Globe, Atom, FlaskConical, Landmark
} from "lucide-react";
import { motion } from "framer-motion";

// ─── Agents Registry ───────────────────────────────────────────────────────
const AGENTS = [
  {
    id: "arquimedes",
    name: "Arquimedes",
    tagline: "Professor de Matemática",
    description:
      "Aprenda adição, subtração, divisão, frações, conjuntos, porcentagem e regra de 3 de forma visual, lúdica e contextualizada para todas as idades.",
    avatar: "/manus-storage/Arquimedes_f63227f7.webp",
    href: "/arquimedes/chat",
    topics: ["Adição", "Subtração", "Divisão", "Fração", "Conjuntos", "Porcentagem", "Regra de 3"],
    color: "from-msc-purple to-msc-indigo",
    badge: "Disponível",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
    available: true,
    icon: Plus,
  },
  {
    id: "atlas",
    name: "Atlas",
    tagline: "Professor de Geografia",
    description:
      "Explore o mundo com o Atlas! Aprenda sobre continentes, países, capitais, relevo, clima e muito mais de forma interativa e visual.",
    avatar: null,
    href: "#",
    topics: ["Continentes", "Países", "Capitais", "Relevo", "Clima", "Cartografia"],
    color: "from-blue-600 to-cyan-600",
    badge: "Em breve",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    available: false,
    icon: Globe,
  },
  {
    id: "newton",
    name: "Newton",
    tagline: "Professor de Física",
    description:
      "Descubra as leis que regem o universo com Newton. Mecânica, óptica, termodinâmica e eletromagnetismo explicados de forma simples.",
    avatar: null,
    href: "#",
    topics: ["Mecânica", "Óptica", "Termodinâmica", "Eletromagnetismo"],
    color: "from-amber-600 to-orange-600",
    badge: "Em breve",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    available: false,
    icon: Atom,
  },
  {
    id: "curie",
    name: "Curie",
    tagline: "Professora de Química",
    description:
      "Mergulhe no mundo dos elementos com Curie. Tabela periódica, reações químicas, ligações e muito mais de forma acessível.",
    avatar: null,
    href: "#",
    topics: ["Tabela Periódica", "Reações", "Ligações", "Soluções"],
    color: "from-emerald-600 to-teal-600",
    badge: "Em breve",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    available: false,
    icon: FlaskConical,
  },
];

// ─── Stats ──────────────────────────────────────────────────────────────────
const STATS = [
  { value: "7", label: "Tópicos de Matemática" },
  { value: "26+", label: "Exercícios disponíveis" },
  { value: "4", label: "Agentes planejados" },
  { value: "∞", label: "Possibilidades de aprendizado" },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/manus-storage/msc_academy_logo_7381d7e9.png" alt="MSc Academy" className="h-10 w-auto" />
            <span className="font-display font-bold text-lg text-msc-gradient hidden sm:block">MSc Academy</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            {isAuthenticated ? (
              <Link href="/arquimedes/chat">
                <Button className="bg-msc-gradient text-white gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Ir para o Chat
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button className="bg-msc-gradient text-white">Entrar</Button>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-msc-purple/8 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-msc-blue/8 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-msc-indigo/5 blur-3xl" />
        </div>

        <div className="container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-msc-purple/10 border border-msc-purple/20">
              <Sparkles className="h-4 w-4 text-msc-purple" />
              <span className="text-sm font-medium text-msc-purple">Plataforma Educacional com IA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight">
              Aprenda com os{" "}
              <span className="text-msc-gradient">Melhores Professores</span>{" "}
              Virtuais
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              A MSc Academy reúne agentes de IA especializados em diferentes disciplinas.
              Cada agente tem uma personalidade única, explica de forma visual e lúdica,
              e se adapta a todas as idades.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {isAuthenticated ? (
                <Link href="/arquimedes/chat">
                  <Button size="lg" className="bg-msc-gradient text-white gap-2 text-base px-8">
                    Conversar com Arquimedes
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <a href={getLoginUrl()}>
                  <Button size="lg" className="bg-msc-gradient text-white gap-2 text-base px-8">
                    Começar Agora — É Grátis
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </a>
              )}
              <Link href="/arquimedes/topicos">
                <Button size="lg" variant="outline" className="gap-2 text-base">
                  <BookOpen className="h-5 w-5" />
                  Ver Tópicos
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <section className="py-12 border-y bg-muted/20">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl sm:text-4xl font-display font-bold text-msc-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agents Grid ────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Nossos <span className="text-msc-gradient">Agentes</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Cada agente é um especialista em sua área, com personalidade própria e metodologia
              adaptada para tornar o aprendizado mais eficaz e divertido.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {AGENTS.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className={`relative group rounded-2xl border bg-card overflow-hidden transition-all duration-300 ${
                  agent.available
                    ? "hover:shadow-xl hover:shadow-msc-purple/10 hover:-translate-y-1 cursor-pointer"
                    : "opacity-70"
                }`}>
                  {/* Top gradient bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${agent.color}`} />

                  <div className="p-6 sm:p-8">
                    <div className="flex items-start gap-5">
                      {/* Avatar or placeholder */}
                      <div className="shrink-0">
                        {agent.avatar ? (
                          <div className="relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} rounded-2xl blur-lg opacity-30`} />
                            <img
                              src={agent.avatar}
                              alt={agent.name}
                              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-lg"
                            />
                          </div>
                        ) : (
                          <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-lg`}>
                            <agent.icon className="h-10 w-10 text-white/80" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-xl font-display font-bold">{agent.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${agent.badgeColor}`}>
                            {agent.badge}
                          </span>
                        </div>
                        <p className="text-sm text-msc-lavender font-medium mb-3">{agent.tagline}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {agent.description}
                        </p>

                        {/* Topics pills */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {agent.topics.map((topic) => (
                            <span
                              key={topic}
                              className="px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        {agent.available ? (
                          <div className="flex gap-2 flex-wrap">
                            <Link href={agent.href}>
                              <Button className="bg-msc-gradient text-white gap-2">
                                <MessageCircle className="h-4 w-4" />
                                Conversar
                              </Button>
                            </Link>
                            <Link href={`/${agent.id}/topicos`}>
                              <Button variant="outline" className="gap-2">
                                <BookOpen className="h-4 w-4" />
                                Tópicos
                              </Button>
                            </Link>
                            <Link href={`/${agent.id}/exercicios`}>
                              <Button variant="outline" className="gap-2">
                                <GraduationCap className="h-4 w-4" />
                                Exercícios
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <Button disabled variant="outline" className="gap-2 opacity-60">
                            <Lock className="h-4 w-4" />
                            Em desenvolvimento
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Arquimedes Spotlight ────────────────────────────────────────── */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-msc-purple/10 border border-msc-purple/20">
                <Sparkles className="h-4 w-4 text-msc-purple" />
                <span className="text-sm font-medium text-msc-purple">Agente em destaque</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold">
                Conheça o <span className="text-msc-gradient">Arquimedes</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Inspirado no grande matemático grego, o Arquimedes é paciente, entusiasmado
                e usa exemplos do dia a dia para tornar a matemática acessível a todos.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MessageCircle, label: "Chat com streaming", desc: "Respostas palavra por palavra" },
                  { icon: BookOpen, label: "7 tópicos", desc: "Do básico ao avançado" },
                  { icon: GraduationCap, label: "Exercícios", desc: "Com feedback imediato" },
                  { icon: BarChart3, label: "Progresso", desc: "Acompanhe sua evolução" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-card border">
                    <div className="w-8 h-8 rounded-lg bg-msc-gradient flex items-center justify-center shrink-0">
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                {isAuthenticated ? (
                  <Link href="/arquimedes/chat">
                    <Button className="bg-msc-gradient text-white gap-2">
                      Conversar com Arquimedes
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <a href={getLoginUrl()}>
                    <Button className="bg-msc-gradient text-white gap-2">
                      Começar Agora
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-msc-gradient rounded-3xl blur-2xl opacity-20 scale-110" />
                <img
                  src="/manus-storage/Arquimedes_f63227f7.webp"
                  alt="Arquimedes - Professor Virtual de Matemática"
                  className="relative w-72 lg:w-80 rounded-3xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t py-10">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/manus-storage/msc_academy_logo_7381d7e9.png" alt="MSc Academy" className="h-9 w-auto" />
              <div>
                <div className="font-display font-bold text-sm text-msc-gradient">MSc Academy</div>
                <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Todos os direitos reservados</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a
                href="https://github.com/Finish-Him/Arquimedes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                GitHub
              </a>
              <span>·</span>
              <span>Plataforma educacional com IA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
