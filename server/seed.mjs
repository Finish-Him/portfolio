import { drizzle } from "drizzle-orm/mysql2";
import { topics, exercises } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const topicsData = [
  { slug: "adicao", name: "Adição", description: "Aprenda a somar números de forma divertida! Da soma simples à adição com múltiplos algarismos.", icon: "Plus", color: "#6B2FA0", order: 1 },
  { slug: "subtracao", name: "Subtração", description: "Domine a arte de subtrair! Entenda a relação entre subtração e adição.", icon: "Minus", color: "#2B5EA7", order: 2 },
  { slug: "divisao", name: "Divisão", description: "Descubra como dividir e repartir! Divisão exata, com resto e muito mais.", icon: "Divide", color: "#9B6BC6", order: 3 },
  { slug: "fracao", name: "Fração", description: "Frações não são bichos de sete cabeças! Aprenda com pizzas, bolos e muito mais.", icon: "PieChart", color: "#D4A843", order: 4 },
  { slug: "conjuntos", name: "Conjuntos", description: "Explore o mundo dos conjuntos! União, interseção e muito mais de forma visual.", icon: "CircleDot", color: "#6B2FA0", order: 5 },
  { slug: "porcentagem", name: "Porcentagem", description: "Porcentagem no dia a dia! Descontos, juros e cálculos práticos.", icon: "Percent", color: "#2B5EA7", order: 6 },
  { slug: "regra-de-3", name: "Regra de 3", description: "A ferramenta mais poderosa da matemática básica! Resolva problemas do cotidiano.", icon: "Scale", color: "#9B6BC6", order: 7 },
];

const exercisesData = [
  // Adição
  { topicId: 1, level: "facil", question: "Quanto é 5 + 3?", options: JSON.stringify(["A) 7", "B) 8", "C) 9", "D) 6"]), correctAnswer: "B", explanation: "5 + 3 = 8. Imagine que você tem 5 maçãs e ganha mais 3. No total, você terá 8 maçãs!", hint: "Conte nos dedos: 5... 6, 7, 8!" },
  { topicId: 1, level: "facil", question: "Quanto é 12 + 7?", options: JSON.stringify(["A) 18", "B) 20", "C) 19", "D) 17"]), correctAnswer: "C", explanation: "12 + 7 = 19. Pense assim: 12 + 8 = 20, então 12 + 7 = 19 (um a menos).", hint: "Decomponha: 12 + 7 = 12 + 8 - 1" },
  { topicId: 1, level: "medio", question: "Quanto é 156 + 278?", options: JSON.stringify(["A) 434", "B) 424", "C) 444", "D) 414"]), correctAnswer: "A", explanation: "156 + 278 = 434. Some coluna por coluna: 6+8=14 (escreve 4, vai 1), 5+7+1=13 (escreve 3, vai 1), 1+2+1=4.", hint: "Some da direita para a esquerda, levando o 'vai um'." },
  { topicId: 1, level: "dificil", question: "Maria tinha R$ 1.250,00. Recebeu R$ 875,50 de salário e R$ 320,00 de bônus. Quanto ela tem agora?", options: JSON.stringify(["A) R$ 2.445,50", "B) R$ 2.345,50", "C) R$ 2.545,50", "D) R$ 2.455,50"]), correctAnswer: "A", explanation: "1.250 + 875,50 + 320 = 2.445,50. Some os valores: 1250 + 875,50 = 2125,50; depois 2125,50 + 320 = 2445,50.", hint: "Some os valores um de cada vez." },

  // Subtração
  { topicId: 2, level: "facil", question: "Quanto é 9 - 4?", options: JSON.stringify(["A) 4", "B) 6", "C) 5", "D) 3"]), correctAnswer: "C", explanation: "9 - 4 = 5. Se você tem 9 balas e come 4, sobram 5!", hint: "Conte para trás a partir de 9: 8, 7, 6, 5." },
  { topicId: 2, level: "facil", question: "Quanto é 15 - 8?", options: JSON.stringify(["A) 6", "B) 7", "C) 8", "D) 9"]), correctAnswer: "B", explanation: "15 - 8 = 7. Pense: 8 + ? = 15. A resposta é 7!", hint: "Pense: quanto falta do 8 para chegar ao 15?" },
  { topicId: 2, level: "medio", question: "Quanto é 503 - 267?", options: JSON.stringify(["A) 246", "B) 236", "C) 226", "D) 256"]), correctAnswer: "B", explanation: "503 - 267 = 236. Faça empréstimo: 3-7 não dá, empresta do 0 (que empresta do 5).", hint: "Use o método de empréstimo coluna por coluna." },
  { topicId: 2, level: "dificil", question: "Um avião está a 10.500 metros de altitude. Desce 3.750 metros. A que altitude está agora?", options: JSON.stringify(["A) 6.750 m", "B) 7.750 m", "C) 6.250 m", "D) 7.250 m"]), correctAnswer: "A", explanation: "10.500 - 3.750 = 6.750 metros. Subtraia: 10500 - 3750 = 6750.", hint: "Subtraia a descida da altitude total." },

  // Divisão
  { topicId: 3, level: "facil", question: "Quanto é 20 ÷ 4?", options: JSON.stringify(["A) 4", "B) 5", "C) 6", "D) 3"]), correctAnswer: "B", explanation: "20 ÷ 4 = 5. Se você dividir 20 balas entre 4 amigos, cada um recebe 5!", hint: "Pense: 4 × ? = 20" },
  { topicId: 3, level: "facil", question: "Quanto é 18 ÷ 3?", options: JSON.stringify(["A) 5", "B) 7", "C) 6", "D) 8"]), correctAnswer: "C", explanation: "18 ÷ 3 = 6. Três grupos de 6 formam 18!", hint: "3 × 6 = 18" },
  { topicId: 3, level: "medio", question: "Quanto é 144 ÷ 12?", options: JSON.stringify(["A) 11", "B) 13", "C) 12", "D) 14"]), correctAnswer: "C", explanation: "144 ÷ 12 = 12. Curiosidade: 12 × 12 = 144, isso é 12 ao quadrado!", hint: "12 × 12 = ?" },
  { topicId: 3, level: "dificil", question: "Uma escola tem 1.260 alunos divididos igualmente em 35 turmas. Quantos alunos por turma?", options: JSON.stringify(["A) 34", "B) 36", "C) 38", "D) 32"]), correctAnswer: "B", explanation: "1.260 ÷ 35 = 36 alunos por turma.", hint: "Divida 1260 por 35." },

  // Fração
  { topicId: 4, level: "facil", question: "Qual fração representa metade de uma pizza?", options: JSON.stringify(["A) 1/3", "B) 1/4", "C) 1/2", "D) 2/3"]), correctAnswer: "C", explanation: "1/2 (um meio) representa metade! Se dividir a pizza em 2 partes iguais, cada parte é 1/2.", hint: "Metade = dividir em 2 partes iguais." },
  { topicId: 4, level: "facil", question: "Quanto é 1/4 + 1/4?", options: JSON.stringify(["A) 1/2", "B) 2/8", "C) 1/4", "D) 1/8"]), correctAnswer: "A", explanation: "1/4 + 1/4 = 2/4 = 1/2. Como os denominadores são iguais, basta somar os numeradores: 1+1=2. E 2/4 simplifica para 1/2!", hint: "Denominadores iguais: some os numeradores." },
  { topicId: 4, level: "medio", question: "Quanto é 2/3 + 1/6?", options: JSON.stringify(["A) 3/6", "B) 5/6", "C) 3/9", "D) 1/2"]), correctAnswer: "B", explanation: "2/3 + 1/6: primeiro iguale os denominadores. 2/3 = 4/6. Então 4/6 + 1/6 = 5/6.", hint: "Encontre o MMC de 3 e 6." },
  { topicId: 4, level: "dificil", question: "João comeu 3/8 de um bolo e Maria comeu 1/4. Que fração do bolo sobrou?", options: JSON.stringify(["A) 3/8", "B) 5/8", "C) 1/2", "D) 1/4"]), correctAnswer: "A", explanation: "1/4 = 2/8. Total comido: 3/8 + 2/8 = 5/8. Sobrou: 8/8 - 5/8 = 3/8 do bolo.", hint: "Converta 1/4 para oitavos e subtraia do total." },

  // Conjuntos
  { topicId: 5, level: "facil", question: "Se A = {1, 2, 3} e B = {3, 4, 5}, qual é A ∩ B (interseção)?", options: JSON.stringify(["A) {1, 2, 3, 4, 5}", "B) {3}", "C) {1, 2}", "D) {4, 5}"]), correctAnswer: "B", explanation: "A interseção contém os elementos que estão em AMBOS os conjuntos. Apenas o 3 está em A e em B!", hint: "Interseção = elementos em comum." },
  { topicId: 5, level: "facil", question: "Se A = {1, 2, 3} e B = {3, 4, 5}, qual é A ∪ B (união)?", options: JSON.stringify(["A) {1, 2, 3, 4, 5}", "B) {3}", "C) {1, 2, 4, 5}", "D) {1, 2, 3}"]), correctAnswer: "A", explanation: "A união junta TODOS os elementos dos dois conjuntos (sem repetir): {1, 2, 3, 4, 5}.", hint: "União = todos os elementos juntos." },
  { topicId: 5, level: "medio", question: "Em uma turma, 20 alunos gostam de futebol, 15 de vôlei e 8 gostam de ambos. Quantos gostam de pelo menos um esporte?", options: JSON.stringify(["A) 35", "B) 27", "C) 43", "D) 23"]), correctAnswer: "B", explanation: "Pela fórmula: |A ∪ B| = |A| + |B| - |A ∩ B| = 20 + 15 - 8 = 27 alunos.", hint: "Use: Total = Futebol + Vôlei - Ambos" },

  // Porcentagem
  { topicId: 6, level: "facil", question: "Quanto é 10% de 200?", options: JSON.stringify(["A) 10", "B) 20", "C) 30", "D) 15"]), correctAnswer: "B", explanation: "10% de 200 = 200 × 10/100 = 200 × 0,1 = 20. Dica rápida: 10% é só dividir por 10!", hint: "10% = dividir por 10." },
  { topicId: 6, level: "facil", question: "Quanto é 50% de 80?", options: JSON.stringify(["A) 30", "B) 40", "C) 50", "D) 45"]), correctAnswer: "B", explanation: "50% de 80 = metade de 80 = 40. 50% sempre é a metade!", hint: "50% = metade." },
  { topicId: 6, level: "medio", question: "Um produto custa R$ 150,00 e tem 20% de desconto. Qual o preço final?", options: JSON.stringify(["A) R$ 120,00", "B) R$ 130,00", "C) R$ 110,00", "D) R$ 125,00"]), correctAnswer: "A", explanation: "20% de 150 = 30. Preço final: 150 - 30 = R$ 120,00.", hint: "Calcule 20% de 150 e subtraia." },
  { topicId: 6, level: "dificil", question: "Um investimento rendeu 15% em um ano. Se o valor inicial era R$ 2.000,00, qual o valor final?", options: JSON.stringify(["A) R$ 2.200,00", "B) R$ 2.300,00", "C) R$ 2.150,00", "D) R$ 2.350,00"]), correctAnswer: "B", explanation: "15% de 2000 = 300. Valor final: 2000 + 300 = R$ 2.300,00.", hint: "Calcule 15% de 2000 e some ao valor inicial." },

  // Regra de 3
  { topicId: 7, level: "facil", question: "Se 2 canetas custam R$ 6,00, quanto custam 5 canetas?", options: JSON.stringify(["A) R$ 12,00", "B) R$ 15,00", "C) R$ 18,00", "D) R$ 10,00"]), correctAnswer: "B", explanation: "2 canetas → R$ 6,00 | 5 canetas → x. x = (5 × 6) / 2 = 30/2 = R$ 15,00.", hint: "Monte a proporção: 2/5 = 6/x" },
  { topicId: 7, level: "medio", question: "Se 3 pedreiros constroem um muro em 12 dias, em quantos dias 6 pedreiros constroem o mesmo muro?", options: JSON.stringify(["A) 24 dias", "B) 8 dias", "C) 6 dias", "D) 4 dias"]), correctAnswer: "C", explanation: "Regra de 3 INVERSA (mais pedreiros = menos dias): 3 × 12 = 6 × x → x = 36/6 = 6 dias.", hint: "Mais pedreiros = menos tempo. É inversamente proporcional!" },
  { topicId: 7, level: "dificil", question: "Um carro percorre 240 km com 20 litros de gasolina. Quantos litros precisa para percorrer 600 km?", options: JSON.stringify(["A) 40 litros", "B) 45 litros", "C) 50 litros", "D) 55 litros"]), correctAnswer: "C", explanation: "240 km → 20 L | 600 km → x. x = (600 × 20) / 240 = 12000/240 = 50 litros.", hint: "Monte: 240/600 = 20/x" },
];

async function seed() {
  console.log("Seeding topics...");
  for (const t of topicsData) {
    try {
      await db.insert(topics).values(t);
      console.log(`  ✓ ${t.name}`);
    } catch (e) {
      console.log(`  - ${t.name} (already exists or error)`);
    }
  }

  console.log("\nSeeding exercises...");
  for (const e of exercisesData) {
    try {
      await db.insert(exercises).values(e);
      console.log(`  ✓ Topic ${e.topicId} - ${e.level}`);
    } catch (err) {
      console.log(`  - Topic ${e.topicId} - ${e.level} (error)`);
    }
  }

  console.log("\nSeed complete!");
  process.exit(0);
}

seed().catch(console.error);
