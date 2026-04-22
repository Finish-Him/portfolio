import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "wouter";
import {
  MessageCircle, BookOpen, GraduationCap, BarChart3,
  Plus, Minus, Divide, PieChart, CircleDot, Percent, Scale,
  ArrowRight, Sparkles, Sun, Moon, Zap, Brain, Star
} from "lucide-react";
import { motion } from "framer-motion";

const TOPICS = [
  { slug: "adicao", name: "Adição", icon: Plus, color: "from-purple-500 to-purple-700" },
  { slug: "subtracao", name: "Subtração", icon: Minus, color: "from-blue-500 to-blue-700" },
  { slug: "divisao", name: "Divisão", icon: Divide, color: "from-purple-400 to-purple-600" },
  { slug: "fracao", name: "Fração", icon: PieChart, color: "from-amber-500 to-amber-700" },
  { slug: "conjuntos", name: "Conjuntos", icon: CircleDot, color: "from-purple-500 to-purple-700" },
  { slug: "porcentagem", name: "Porcentagem", icon: Percent, color: "from-blue-500 to-blue-700" },
  { slug: "regra-de-3", name: "Regra de 3", icon: Scale, color: "from-purple-400 to-purple-600" },
];

const FEATURES = [
  { icon: MessageCircle, title: "Chat Inteligente", desc: "Converse com o Arquimedes e tire suas dúvidas em tempo real" },
  { icon: Zap, title: "Respostas Rápidas", desc: "Streaming em tempo real para uma experiência fluida" },
  { icon: Brain, title: "Explicações Visuais", desc: "Aprenda com exemplos do dia a dia e ilustrações" },
  { icon: Star, title: "Exercícios Práticos", desc: "Pratique com exercícios de diferentes níveis" },
];

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Nav */}
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
              <Link href="/chat">
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-msc-purple/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-msc-blue/10 blur-3xl" />
        </div>

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-msc-purple/10 border border-msc-purple/20">
                <Sparkles className="h-4 w-4 text-msc-purple" />
                <span className="text-sm font-medium text-msc-purple">Powered by AI</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight">
                Aprenda Matemática com o{" "}
                <span className="text-msc-gradient">Arquimedes</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg">
                Seu professor virtual de matemática que explica de forma simples, visual e divertida.
                Para todas as idades, do básico ao avançado.
              </p>

              <div className="flex flex-wrap gap-3">
                {isAuthenticated ? (
                  <Link href="/chat">
                    <Button size="lg" className="bg-msc-gradient text-white gap-2 text-base px-8">
                      Conversar com Arquimedes
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <a href={getLoginUrl()}>
                    <Button size="lg" className="bg-msc-gradient text-white gap-2 text-base px-8">
                      Começar Agora
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </a>
                )}
                <Link href="/topicos">
                  <Button size="lg" variant="outline" className="gap-2 text-base">
                    <BookOpen className="h-5 w-5" />
                    Ver Tópicos
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Avatar */}
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
                  alt="Arquimedes - Professor Virtual"
                  className="relative w-80 lg:w-96 rounded-3xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              Por que aprender com o <span className="text-msc-gradient">Arquimedes</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Uma experiência de aprendizado única, combinando inteligência artificial com didática de qualidade.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-msc-gradient flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              Tópicos <span className="text-msc-gradient">Disponíveis</span>
            </h2>
            <p className="text-muted-foreground">
              Domine os fundamentos da matemática com explicações claras e exercícios práticos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {TOPICS.map((topic, i) => (
              <motion.div
                key={topic.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link href={`/topicos/${topic.slug}`}>
                  <div className="group relative overflow-hidden rounded-xl border bg-card p-6 hover:shadow-lg transition-all cursor-pointer">
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${topic.color} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`} />
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${topic.color} flex items-center justify-center mb-3`}>
                      <topic.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-display font-semibold">{topic.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Clique para explorar</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl bg-msc-gradient p-8 sm:p-12 text-white text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJIMjR2LTJoMTJ6TTM2IDI0djJIMjR2LTJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Pronto para começar?
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                O Arquimedes está esperando para te ajudar a dominar a matemática.
                Comece agora mesmo, é gratuito!
              </p>
              {isAuthenticated ? (
                <Link href="/chat">
                  <Button size="lg" variant="secondary" className="gap-2 text-base font-semibold">
                    <MessageCircle className="h-5 w-5" />
                    Iniciar Conversa
                  </Button>
                </Link>
              ) : (
                <a href={getLoginUrl()}>
                  <Button size="lg" variant="secondary" className="gap-2 text-base font-semibold">
                    Criar Conta Gratuita
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/manus-storage/msc_academy_logo_7381d7e9.png" alt="MSc Academy" className="h-8 w-auto" />
            <span className="text-sm text-muted-foreground">MSc Academy &copy; {new Date().getFullYear()}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Plataforma educacional de matemática com inteligência artificial
          </p>
        </div>
      </footer>
    </div>
  );
}
