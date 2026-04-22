import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  GraduationCap, Loader2, CheckCircle2, XCircle, ArrowRight,
  ArrowLeft, Lightbulb, RotateCcw, Trophy, Sparkles
} from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function Exercises({ topicSlug }: { topicSlug?: string }) {
  const { isAuthenticated } = useAuth();
  const topicsQuery = trpc.topics.list.useQuery();
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>("facil");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [result, setResult] = useState<{ correct: boolean; explanation: string | null; correctAnswer: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Resolve topicSlug to topicId
  const resolvedTopicId = useMemo(() => {
    if (selectedTopic) return selectedTopic;
    if (topicSlug && topicsQuery.data) {
      const found = topicsQuery.data.find(t => t.slug === topicSlug);
      return found?.id ?? null;
    }
    return null;
  }, [selectedTopic, topicSlug, topicsQuery.data]);

  const exercisesQuery = trpc.exercises.listByTopic.useQuery(
    { topicId: resolvedTopicId!, level: selectedLevel },
    { enabled: !!resolvedTopicId }
  );

  const checkAnswer = trpc.exercises.checkAnswer.useMutation();

  const exercises = exercisesQuery.data || [];
  const currentExercise = exercises[currentIndex];

  const handleSelectTopic = (topicId: number) => {
    setSelectedTopic(topicId);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setResult(null);
    setShowHint(false);
    setScore({ correct: 0, total: 0 });
  };

  const handleCheckAnswer = async () => {
    if (!selectedAnswer || !currentExercise || !isAuthenticated) return;

    try {
      const res = await checkAnswer.mutateAsync({
        exerciseId: currentExercise.id,
        answer: selectedAnswer,
      });
      setResult(res);
      setScore(prev => ({
        correct: prev.correct + (res.correct ? 1 : 0),
        total: prev.total + 1,
      }));
    } catch {
      toast.error("Erro ao verificar resposta");
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setResult(null);
      setShowHint(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setResult(null);
    setShowHint(false);
    setScore({ correct: 0, total: 0 });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <GraduationCap className="h-16 w-16 text-msc-purple opacity-50" />
        <h2 className="text-2xl font-display font-bold">Faça login para praticar</h2>
        <a href={getLoginUrl()}>
          <Button size="lg" className="bg-msc-gradient text-white">Entrar</Button>
        </a>
      </div>
    );
  }

  // Topic selection
  if (!resolvedTopicId) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-display font-bold">
            <span className="text-msc-gradient">Exercícios</span>
          </h1>
          <p className="text-muted-foreground">Escolha um tópico para praticar</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {topicsQuery.data?.map(topic => (
            <button
              key={topic.id}
              onClick={() => handleSelectTopic(topic.id)}
              className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all text-left"
            >
              <h3 className="font-display font-semibold text-lg">{topic.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">Clique para praticar</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (exercisesQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-msc-purple" />
      </div>
    );
  }

  // Completed all exercises
  if (currentIndex >= exercises.length && exercises.length > 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
        <Trophy className="h-16 w-16 text-msc-gold" />
        <h2 className="text-2xl font-display font-bold">Parabéns!</h2>
        <p className="text-muted-foreground">
          Você completou {score.correct} de {score.total} exercícios corretamente!
        </p>
        <div className="flex gap-3">
          <Button onClick={handleRestart} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Refazer
          </Button>
          <Button onClick={() => { setSelectedTopic(null); handleRestart(); }} className="bg-msc-gradient text-white gap-2">
            Outro Tópico
          </Button>
        </div>
      </div>
    );
  }

  if (!currentExercise) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground mb-4">Nenhum exercício disponível para este nível.</p>
        <Button onClick={() => setSelectedTopic(null)} variant="outline">Escolher outro tópico</Button>
      </div>
    );
  }

  const options: string[] = currentExercise.options ? (typeof currentExercise.options === 'string' ? JSON.parse(currentExercise.options) : currentExercise.options as string[]) : [];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => { setSelectedTopic(null); handleRestart(); }} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Tópicos
        </Button>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} / {exercises.length}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>{score.correct}</span>
          </div>
        </div>
      </div>

      {/* Level selector */}
      <div className="flex gap-2">
        {["facil", "medio", "dificil"].map(level => (
          <Button
            key={level}
            variant={selectedLevel === level ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSelectedLevel(level);
              setCurrentIndex(0);
              setSelectedAnswer(null);
              setResult(null);
            }}
            className={selectedLevel === level ? "bg-msc-gradient text-white" : ""}
          >
            {level === "facil" ? "Fácil" : level === "medio" ? "Médio" : "Difícil"}
          </Button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-msc-gradient h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentExercise.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card rounded-xl border p-6 space-y-6"
        >
          <h2 className="font-display font-semibold text-lg">{currentExercise.question}</h2>

          {/* Options */}
          <div className="space-y-3">
            {options.map((option, i) => {
              const letter = option.charAt(0);
              const isSelected = selectedAnswer === letter;
              const isCorrectAnswer = result && letter === result.correctAnswer;
              const isWrongSelected = result && isSelected && !result.correct;

              return (
                <button
                  key={i}
                  onClick={() => !result && setSelectedAnswer(letter)}
                  disabled={!!result}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isCorrectAnswer
                      ? "border-green-500 bg-green-500/10"
                      : isWrongSelected
                      ? "border-red-500 bg-red-500/10"
                      : isSelected
                      ? "border-msc-purple bg-msc-purple/10"
                      : "hover:border-msc-purple/50 hover:bg-muted/50"
                  }`}
                >
                  <span className="text-sm">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Hint */}
          {currentExercise.hint && !result && (
            <div>
              {showHint ? (
                <div className="bg-msc-gold/10 border border-msc-gold/20 rounded-lg p-3 flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-msc-gold shrink-0 mt-0.5" />
                  <p className="text-sm">{currentExercise.hint}</p>
                </div>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setShowHint(true)} className="gap-2 text-msc-gold">
                  <Lightbulb className="h-4 w-4" />
                  Ver dica
                </Button>
              )}
            </div>
          )}

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-lg p-4 ${
                result.correct ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {result.correct ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="font-semibold text-green-600 dark:text-green-400">Correto!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="font-semibold text-red-600 dark:text-red-400">Incorreto</span>
                  </>
                )}
              </div>
              {result.explanation && (
                <p className="text-sm text-muted-foreground">{result.explanation}</p>
              )}
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            {!result ? (
              <Button
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer || checkAnswer.isPending}
                className="bg-msc-gradient text-white gap-2"
              >
                {checkAnswer.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                Verificar
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-msc-gradient text-white gap-2">
                {currentIndex < exercises.length - 1 ? (
                  <>Próximo <ArrowRight className="h-4 w-4" /></>
                ) : (
                  <>Ver Resultado <Trophy className="h-4 w-4" /></>
                )}
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
