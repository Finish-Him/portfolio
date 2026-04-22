import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { UserPlus, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Register() {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const utils = trpc.useUtils();

  const passwordStrength = password.length === 0 ? 0 : password.length < 4 ? 1 : password.length < 8 ? 2 : 3;
  const strengthLabel = ["", "Fraca", "Média", "Forte"];
  const strengthColor = ["", "text-red-400", "text-amber-400", "text-emerald-400"];
  const strengthBg = ["", "bg-red-500", "bg-amber-500", "bg-emerald-500"];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 4) {
      setError("A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar conta.");
        return;
      }

      setSuccess(true);
      await utils.auth.me.invalidate();
      setTimeout(() => navigate("/arquimedes/chat"), 2000);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a1628] p-4">
      {/* Background grid */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-[#111827]/90 border-[#1e3a5f]/50 backdrop-blur-xl shadow-2xl shadow-blue-900/20">
          <CardHeader className="text-center pb-2">
            <img
              src="/manus-storage/msc_academy_logo_7381d7e9.png"
              alt="MSc Academy"
              className="w-16 h-16 mx-auto mb-4 rounded-xl"
            />
            <h1 className="text-2xl font-bold text-white font-display">
              Criar Conta
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Junte-se à MSc Academy e aprenda com Arquimedes
            </p>
          </CardHeader>

          <CardContent>
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Conta criada com sucesso!</h3>
                <p className="text-sm text-slate-400">Redirecionando para o Arquimedes...</p>
                <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              </motion.div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">Nome completo</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="bg-[#0d1f3c]/50 border-[#1e3a5f] text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                    autoFocus
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-300">Usuário</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Escolha um nome de usuário"
                    className="bg-[#0d1f3c]/50 border-[#1e3a5f] text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Crie uma senha"
                      className="bg-[#0d1f3c]/50 border-[#1e3a5f] text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {password.length > 0 && (
                    <div className="space-y-1">
                      <div className="flex gap-1 h-1">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={`flex-1 rounded-full transition-all ${passwordStrength >= level ? strengthBg[passwordStrength] : "bg-slate-700"}`}
                          />
                        ))}
                      </div>
                      <p className={`text-xs ${strengthColor[passwordStrength]}`}>
                        Força da senha: {strengthLabel[passwordStrength]}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-300">Confirmar senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita a senha"
                    className={`bg-[#0d1f3c]/50 border-[#1e3a5f] text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 ${confirmPassword && confirmPassword !== password ? "border-red-500/50" : confirmPassword && confirmPassword === password ? "border-emerald-500/50" : ""}`}
                    required
                  />
                  {confirmPassword && confirmPassword === password && (
                    <p className="text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Senhas coincidem
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-2.5 mt-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Criando conta...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Criar Conta
                    </span>
                  )}
                </Button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-[#1e3a5f]/50 space-y-3">
              <p className="text-xs text-slate-500 text-center">
                Já tem uma conta?
              </p>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="w-full border-[#1e3a5f] text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/50 text-sm gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Fazer Login
                </Button>
              </Link>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/arquimedes/chat")}
                  className="flex-1 border-[#1e3a5f] text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/50 text-xs"
                >
                  Demo sem login
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="flex-1 border-[#1e3a5f] text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/50 text-xs"
                >
                  Ver Portfólio
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
