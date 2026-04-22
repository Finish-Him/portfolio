import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, MessageCircle, GraduationCap, Loader2, BookOpen,
  Plus, Minus, Divide, PieChart, CircleDot, Percent, Scale
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Plus, Minus, Divide, PieChart, CircleDot, Percent, Scale,
};

const TOPIC_CONTENT: Record<string, { intro: string; keyPoints: string[]; examples: string[] }> = {
  adicao: {
    intro: "A adição é uma das quatro operações fundamentais da matemática. Ela representa a ação de juntar, combinar ou acrescentar quantidades.",
    keyPoints: ["Propriedade comutativa: a + b = b + a", "Propriedade associativa: (a + b) + c = a + (b + c)", "Elemento neutro: a + 0 = a", "Soma com vai-um (reagrupamento)"],
    examples: ["5 + 3 = 8 (cinco maçãs mais três maçãs)", "27 + 15 = 42 (soma com reagrupamento)", "156 + 278 = 434 (soma de três algarismos)"],
  },
  subtracao: {
    intro: "A subtração é a operação inversa da adição. Ela representa a ação de tirar, retirar ou comparar quantidades.",
    keyPoints: ["NÃO é comutativa: a - b ≠ b - a", "Relação com adição: se a - b = c, então c + b = a", "Empréstimo (reagrupamento)", "Subtração como diferença entre valores"],
    examples: ["9 - 4 = 5 (tirar 4 de 9)", "503 - 267 = 236 (com empréstimo)", "1000 - 375 = 625"],
  },
  divisao: {
    intro: "A divisão é a operação de repartir uma quantidade em partes iguais. É a operação inversa da multiplicação.",
    keyPoints: ["Dividendo ÷ Divisor = Quociente", "Divisão exata: resto = 0", "Divisão com resto: D = d × q + r", "Não se pode dividir por zero"],
    examples: ["20 ÷ 4 = 5 (repartir 20 em 4 grupos)", "17 ÷ 3 = 5 com resto 2", "144 ÷ 12 = 12"],
  },
  fracao: {
    intro: "Fração representa uma parte de um todo. É composta por numerador (parte) e denominador (total de partes).",
    keyPoints: ["Numerador / Denominador", "Frações equivalentes: 1/2 = 2/4 = 3/6", "MMC para somar frações diferentes", "Simplificação pelo MDC"],
    examples: ["1/2 de uma pizza = metade", "2/3 + 1/6 = 4/6 + 1/6 = 5/6", "3/4 × 2/5 = 6/20 = 3/10"],
  },
  conjuntos: {
    intro: "Conjuntos são coleções de elementos bem definidos. A teoria dos conjuntos é a base de toda a matemática moderna.",
    keyPoints: ["Pertinência: ∈ (pertence) e ∉ (não pertence)", "União: A ∪ B (todos os elementos)", "Interseção: A ∩ B (elementos em comum)", "Diferença: A - B (elementos só de A)"],
    examples: ["A = {1,2,3}, B = {3,4,5}: A ∩ B = {3}", "A ∪ B = {1,2,3,4,5}", "|A ∪ B| = |A| + |B| - |A ∩ B|"],
  },
  porcentagem: {
    intro: "Porcentagem é uma fração com denominador 100. Representa uma proporção em relação a cem partes.",
    keyPoints: ["x% = x/100", "10% = dividir por 10", "50% = metade", "Desconto: preço × (1 - %)", "Aumento: preço × (1 + %)"],
    examples: ["10% de 200 = 20", "25% de 80 = 20", "Desconto de 15% em R$100 = R$85"],
  },
  "regra-de-3": {
    intro: "A regra de 3 é um método para encontrar um valor desconhecido quando temos uma proporção entre grandezas.",
    keyPoints: ["Regra de 3 simples: diretamente proporcional", "Regra de 3 inversa: inversamente proporcional", "Monte a proporção e faça multiplicação cruzada", "Identifique se é direta ou inversa"],
    examples: ["2 canetas → R$6, 5 canetas → R$15", "3 pedreiros em 12 dias = 6 pedreiros em 6 dias", "240km com 20L = 600km com 50L"],
  },
};

export default function TopicDetail({ slug }: { slug: string }) {
  const topicQuery = trpc.topics.getBySlug.useQuery({ slug });
  const topic = topicQuery.data;
  const content = TOPIC_CONTENT[slug];

  if (topicQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-msc-purple" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-display font-bold mb-4">Tópico não encontrado</h2>
        <Link href="/topicos">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar aos Tópicos
          </Button>
        </Link>
      </div>
    );
  }

  const IconComponent = ICON_MAP[topic.icon || "BookOpen"] || BookOpen;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <Link href="/topicos">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 rounded-2xl bg-msc-gradient flex items-center justify-center shadow-lg shrink-0">
          <IconComponent className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold">{topic.name}</h1>
          <p className="text-muted-foreground mt-1">{topic.description}</p>
        </div>
      </div>

      {/* Content */}
      {content && (
        <div className="space-y-6">
          {/* Introduction */}
          <div className="bg-card rounded-xl border p-6">
            <h2 className="font-display font-semibold text-lg mb-3 text-msc-gradient">O que é?</h2>
            <p className="text-foreground leading-relaxed">{content.intro}</p>
          </div>

          {/* Key Points */}
          <div className="bg-card rounded-xl border p-6">
            <h2 className="font-display font-semibold text-lg mb-3 text-msc-gradient">Pontos-chave</h2>
            <ul className="space-y-2">
              {content.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-msc-purple/10 text-msc-purple flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Examples */}
          <div className="bg-card rounded-xl border p-6">
            <h2 className="font-display font-semibold text-lg mb-3 text-msc-gradient">Exemplos</h2>
            <div className="space-y-3">
              {content.examples.map((example, i) => (
                <div key={i} className="bg-muted/50 rounded-lg px-4 py-3 font-mono text-sm">
                  {example}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Link href={`/chat?topic=${slug}`}>
          <Button size="lg" className="bg-msc-gradient text-white gap-2">
            <MessageCircle className="h-5 w-5" />
            Perguntar ao Arquimedes
          </Button>
        </Link>
        <Link href={`/exercicios/${slug}`}>
          <Button size="lg" variant="outline" className="gap-2">
            <GraduationCap className="h-5 w-5" />
            Fazer Exercícios
          </Button>
        </Link>
      </div>
    </div>
  );
}
