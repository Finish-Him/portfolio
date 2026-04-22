import type { Express, Request, Response } from "express";
import { ENV } from "./_core/env";
import { addChatMessage, getSessionMessages, createChatSession } from "./db";
import { sdk } from "./_core/sdk";
import { authenticateSimple } from "./simpleAuth";

const ARQUIMEDES_SYSTEM_PROMPT = `Você é o Arquimedes, o professor de matemática virtual da MSc Academy. Você é um personagem inspirado no grande matemático grego Arquimedes de Siracusa, mas com uma personalidade moderna, divertida e acolhedora.

PERSONALIDADE:
- Você é paciente, entusiasmado e encorajador
- Usa linguagem simples e acessível para todas as idades
- Adora usar analogias do dia a dia para explicar conceitos
- Celebra cada conquista do aluno com entusiasmo
- Quando o aluno erra, você encoraja e explica de forma diferente

ESTILO DE ENSINO:
- Sempre explique passo a passo, nunca pule etapas
- Use exemplos visuais e contextualizados (pizzas para frações, dinheiro para porcentagem, etc.)
- Quando possível, mostre a conta de forma visual usando formatação markdown
- Use emojis com moderação para tornar a explicação mais lúdica
- Adapte a complexidade da linguagem à pergunta do aluno

TÓPICOS QUE VOCÊ DOMINA:
1. Adição - somar números, propriedades da adição
2. Subtração - subtrair números, relação com adição
3. Divisão - dividir números, divisão exata e com resto
4. Fração - conceito, operações, simplificação, equivalência
5. Conjuntos - união, interseção, diferença, pertinência
6. Porcentagem - cálculo, conversão, aplicações práticas
7. Regra de 3 - simples e composta, proporções

FORMATAÇÃO:
- Use **negrito** para termos importantes
- Use blocos de código para mostrar contas passo a passo
- Use tabelas markdown quando ajudar a organizar informações
- Use LaTeX inline ($...$) para fórmulas matemáticas quando necessário
- Estruture respostas longas com subtítulos

REGRAS:
- Sempre responda em português brasileiro
- Nunca diga que não sabe algo dentro dos seus tópicos
- Se a pergunta for fora do escopo, redirecione educadamente para matemática
- Mantenha respostas concisas mas completas (máximo 500 palavras por resposta)
- Sempre termine com uma pergunta ou sugestão para manter o aluno engajado`;

export function registerStreamingRoute(app: Express) {
  app.post("/api/chat/stream", async (req: Request, res: Response) => {
    const { sessionId, content } = req.body;

    if (!content) {
      res.status(400).json({ error: "Missing content" });
      return;
    }

    // Authenticate user via session cookie (try simple auth first, then SDK)
    let user;
    try {
      // Try simple auth first
      const simpleUser = await authenticateSimple(req);
      if (simpleUser) {
        user = simpleUser;
      } else {
        // Fallback to SDK auth
        user = await sdk.authenticateRequest(req);
      }
    } catch {
      // Allow demo mode without auth - use a default guest user
      user = { id: 0 } as any;
    }
    const userId = user.id;

    // Set SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();

    try {
      // Create session if needed
      let currentSessionId = sessionId;
      if (!currentSessionId) {
        currentSessionId = await createChatSession({
          userId: userId,
          title: content.substring(0, 100),
          topicSlug: null,
        });
        // Send session ID to client
        res.write(`data: ${JSON.stringify({ type: "session", sessionId: currentSessionId })}\n\n`);
      }

      // Save user message
      await addChatMessage({
        sessionId: currentSessionId,
        role: "user",
        content,
      });

      // Get conversation history
      const history = await getSessionMessages(currentSessionId);
      const messages = [
        { role: "system" as const, content: ARQUIMEDES_SYSTEM_PROMPT },
        ...history
          .filter(m => m.role !== "system")
          .slice(-20) // Keep last 20 messages for context
          .map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
      ];

      // Call LLM with streaming
      const apiUrl = ENV.forgeApiUrl
        ? `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions`
        : "https://forge.manus.im/v1/chat/completions";

      const llmResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${ENV.forgeApiKey}`,
        },
        body: JSON.stringify({
          model: "gemini-2.5-flash",
          messages,
          max_tokens: 4096,
          stream: true,
        }),
      });

      if (!llmResponse.ok || !llmResponse.body) {
        res.write(`data: ${JSON.stringify({ type: "error", message: "LLM unavailable" })}\n\n`);
        res.write("data: [DONE]\n\n");
        res.end();
        return;
      }

      let fullContent = "";
      const reader = llmResponse.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              fullContent += delta;
              res.write(`data: ${JSON.stringify({ type: "token", content: delta })}\n\n`);
            }
          } catch {
            // Skip malformed JSON
          }
        }
      }

      // Save complete assistant message
      if (fullContent) {
        await addChatMessage({
          sessionId: currentSessionId,
          role: "assistant",
          content: fullContent,
        });
      }

      res.write(`data: ${JSON.stringify({ type: "done", fullContent })}\n\n`);
      res.write("data: [DONE]\n\n");
    } catch (error) {
      console.error("Streaming error:", error);
      res.write(`data: ${JSON.stringify({ type: "error", message: "Internal error" })}\n\n`);
      res.write("data: [DONE]\n\n");
    } finally {
      res.end();
    }
  });
}
