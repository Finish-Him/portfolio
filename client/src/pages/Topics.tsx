import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Plus, Minus, Divide, PieChart, CircleDot, Percent, Scale,
  ArrowRight, BookOpen, Loader2, MessageCircle
} from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, any> = {
  Plus, Minus, Divide, PieChart, CircleDot, Percent, Scale,
};

const COLOR_MAP: Record<string, string> = {
  "#6B2FA0": "from-purple-500 to-purple-700",
  "#2B5EA7": "from-blue-500 to-blue-700",
  "#9B6BC6": "from-purple-400 to-purple-600",
  "#D4A843": "from-amber-500 to-amber-700",
};

const TOPIC_IMAGES: Record<string, string> = {
  adicao: "https://d2xsxph8kpxj0f.cloudfront.net/310519663548238703/KFrFYg84PBb8CrQscNDMJb/topic_adicao-7jh5H3DVanbBE9y6dRvCGT.webp",
  subtracao: "https://d2xsxph8kpxj0f.cloudfront.net/310519663548238703/KFrFYg84PBb8CrQscNDMJb/topic_subtracao-JM2UNifLTw2aSHV63pRToC.webp",
  divisao: "https://d2xsxph8kpxj0f.cloudfront.net/310519663548238703/KFrFYg84PBb8CrQscNDMJb/topic_divisao-nrdv5ycuCqXkeqfdcpmW3Y.webp",
  fracao: "https://d2xsxph8kpxj0f.cloudfront.net/310519663548238703/KFrFYg84PBb8CrQscNDMJb/topic_fracao-noKpfSrfGqVXpFfZghDhXe.webp",
  conjuntos: "https://d2xsxph8kpxj0f.cloudfront.net/310519663548238703/KFrFYg84PBb8CrQscNDMJb/topic_conjuntos-67qqNAbdVe6a9nTLoVfokr.webp",
  porcentagem: "https://d2xsxph8kpxj0f.cloudfront.net/310519663548238703/KFrFYg84PBb8CrQscNDMJb/topic_porcentagem-VqUmqa6wYhdy9PXVqycVs2.webp",
  "regra-de-3": "https://d2xsxph8kpxj0f.cloudfront.net/310519663548238703/KFrFYg84PBb8CrQscNDMJb/topic_regra_de_3-nPy3mCpThWb8rjP5KgKzcg.webp",
};

export default function Topics() {
  const topicsQuery = trpc.topics.list.useQuery();

  if (topicsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-msc-purple" />
      </div>
    );
  }

  const topicsList = topicsQuery.data || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-msc-purple/10 border border-msc-purple/20">
          <BookOpen className="h-4 w-4 text-msc-purple" />
          <span className="text-sm font-medium text-msc-purple">7 Tópicos Disponíveis</span>
        </div>
        <h1 className="text-3xl font-display font-bold">
          Tópicos de <span className="text-msc-gradient">Matemática</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Escolha um tópico para começar a aprender. Cada tópico tem explicações detalhadas e exercícios práticos.
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topicsList.map((topic, i) => {
          const IconComponent = ICON_MAP[topic.icon || "BookOpen"] || BookOpen;
          const gradient = COLOR_MAP[topic.color || ""] || "from-purple-500 to-purple-700";
          const topicImage = TOPIC_IMAGES[topic.slug];

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <div className="group relative overflow-hidden rounded-2xl border bg-card hover:shadow-xl transition-all duration-300">
                {/* Topic Image */}
                {topicImage && (
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={topicImage}
                      alt={topic.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-mono text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                        #{topic.order}
                      </span>
                    </div>
                  </div>
                )}

                {/* Top gradient bar (fallback when no image) */}
                {!topicImage && <div className={`h-2 bg-gradient-to-r ${gradient}`} />}

                <div className="p-6 space-y-4">
                  {/* Icon + Name */}
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shrink-0`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg">{topic.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        {topic.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`/arquimedes/topicos/${topic.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full gap-2">
                        <BookOpen className="h-4 w-4" />
                        Aprender
                      </Button>
                    </Link>
                    <Link href={`/arquimedes/chat?topic=${topic.slug}`}>
                      <Button className="bg-msc-gradient text-white gap-2">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
