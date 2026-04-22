import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  MessageCircle, BookOpen, GraduationCap, BarChart3,
  Sun, Moon, LogOut, Menu, X, Home, ChevronLeft
} from "lucide-react";
import { useState } from "react";

type Agent = "arquimedes";

const AGENT_NAV: Record<Agent, { href: string; label: string; icon: React.ElementType }[]> = {
  arquimedes: [
    { href: "/arquimedes/chat", label: "Chat", icon: MessageCircle },
    { href: "/arquimedes/topicos", label: "Tópicos", icon: BookOpen },
    { href: "/arquimedes/exercicios", label: "Exercícios", icon: GraduationCap },
    { href: "/arquimedes/progresso", label: "Progresso", icon: BarChart3 },
  ],
};

const AGENT_LABELS: Record<Agent, string> = {
  arquimedes: "Arquimedes · Matemática",
};

type AppLayoutProps = {
  children: React.ReactNode;
  agent?: Agent;
};

export default function AppLayout({ children, agent = "arquimedes" }: AppLayoutProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = AGENT_NAV[agent];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo + breadcrumb */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 no-underline group">
              <img
                src="/manus-storage/msc_academy_logo_7381d7e9.png"
                alt="MSc Academy"
                className="h-9 w-auto"
              />
              <span className="hidden sm:block font-display font-bold text-base text-msc-gradient">
                MSc Academy
              </span>
            </Link>
            <span className="hidden sm:flex items-center gap-1 text-muted-foreground text-sm">
              <ChevronLeft className="h-3.5 w-3.5 rotate-180" />
              <span className="font-medium text-foreground">{AGENT_LABELS[agent]}</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.href || location.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`gap-2 ${isActive ? "bg-msc-gradient text-white" : ""}`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground truncate max-w-[120px]">{user?.name || "Aluno"}</span>
                <Button variant="ghost" size="icon" onClick={() => logout()} className="h-9 w-9">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <a href={getLoginUrl()}>
                <Button size="sm" className="bg-msc-gradient text-white">Entrar</Button>
              </a>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-card p-4 space-y-1">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted">
                <Home className="h-5 w-5" />
                <span className="font-medium">Início (Portfólio)</span>
              </div>
            </Link>
            {navItems.map((item) => {
              const isActive = location === item.href || location.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}>
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
            {isAuthenticated && (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted cursor-pointer text-destructive"
                onClick={() => { logout(); setMobileMenuOpen(false); }}
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sair</span>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="container py-6">
        {children}
      </main>
    </div>
  );
}
