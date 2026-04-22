import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import {
  BarChart3, Loader2, Trophy, Flame, Target, Star,
  CheckCircle2, BookOpen
} from "lucide-react";
import { Link } from "wouter";

export default function Progress() {
  const { user, isAuthenticated } = useAuth();
  const progressQuery = trpc.progress.get.useQuery(undefined, { enabled: isAuthenticated });
  const topicsQuery = trpc.topics.list.useQuery();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <BarChart3 className="h-16 w-16 text-msc-purple opacity-50" />
        <h2 className="text-2xl font-display font-bold">Faça login para ver seu progresso</h2>
        <a href={getLoginUrl()}>
          <Button size="lg" className="bg-msc-gradient text-white">Entrar</Button>
        </a>
      </div>
    );
  }

  if (progressQuery.isLoading || topicsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-msc-purple" />
      </div>
    );
  }

  const progressData = progressQuery.data || [];
  const topics = topicsQuery.data || [];

  const totalExercises = progressData.reduce((sum, p) => sum + p.exercisesCompleted, 0);
  const totalCorrect = progressData.reduce((sum, p) => sum + p.exercisesCorrect, 0);
  const bestStreak = Math.max(0, ...progressData.map(p => p.bestStreak));
  const accuracy = totalExercises > 0 ? Math.round((totalCorrect / totalExercises) * 100) : 0;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-display font-bold">
          Meu <span className="text-msc-gradient">Progresso</span>
        </h1>
        <p className="text-muted-foreground">
          Acompanhe sua evolução na matemática, {user?.name?.split(" ")[0] || "Aluno"}!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border p-5 text-center">
          <div className="w-12 h-12 rounded-full bg-msc-purple/10 flex items-center justify-center mx-auto mb-3">
            <Target className="h-6 w-6 text-msc-purple" />
          </div>
          <p className="text-2xl font-display font-bold">{totalExercises}</p>
          <p className="text-sm text-muted-foreground">Exercícios feitos</p>
        </div>

        <div className="bg-card rounded-xl border p-5 text-center">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-2xl font-display font-bold">{totalCorrect}</p>
          <p className="text-sm text-muted-foreground">Acertos</p>
        </div>

        <div className="bg-card rounded-xl border p-5 text-center">
          <div className="w-12 h-12 rounded-full bg-msc-gold/10 flex items-center justify-center mx-auto mb-3">
            <Star className="h-6 w-6 text-msc-gold" />
          </div>
          <p className="text-2xl font-display font-bold">{accuracy}%</p>
          <p className="text-sm text-muted-foreground">Precisão</p>
        </div>

        <div className="bg-card rounded-xl border p-5 text-center">
          <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-3">
            <Flame className="h-6 w-6 text-orange-500" />
          </div>
          <p className="text-2xl font-display font-bold">{bestStreak}</p>
          <p className="text-sm text-muted-foreground">Melhor sequência</p>
        </div>
      </div>

      {/* Per-topic progress */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="font-display font-semibold text-lg">Progresso por Tópico</h2>
        </div>
        <div className="divide-y">
          {topics.map(topic => {
            const progress = progressData.find(p => p.topicId === topic.id);
            const completed = progress?.exercisesCompleted || 0;
            const correct = progress?.exercisesCorrect || 0;
            const topicAccuracy = completed > 0 ? Math.round((correct / completed) * 100) : 0;

            return (
              <div key={topic.id} className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-msc-gradient flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-sm">{topic.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {completed > 0 ? `${topicAccuracy}% de acerto` : "Não iniciado"}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-msc-gradient h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(topicAccuracy, 100)}%` }}
                    />
                  </div>
                  <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                    <span>{completed} exercícios</span>
                    <span>{correct} acertos</span>
                    {progress?.currentStreak ? (
                      <span className="flex items-center gap-1">
                        <Flame className="h-3 w-3 text-orange-500" />
                        {progress.currentStreak} seguidos
                      </span>
                    ) : null}
                  </div>
                </div>
                <Link href={`/exercicios/${topic.slug}`}>
                  <Button variant="outline" size="sm">Praticar</Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty state */}
      {totalExercises === 0 && (
        <div className="text-center py-8">
          <Trophy className="h-12 w-12 text-msc-gold mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground mb-4">
            Você ainda não fez nenhum exercício. Comece agora!
          </p>
          <Link href="/exercicios">
            <Button className="bg-msc-gradient text-white gap-2">
              Começar Exercícios
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
