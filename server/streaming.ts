import type { Express, Request, Response } from "express";
import { ENV } from "./_core/env";
import { addChatMessage, getSessionMessages, createChatSession } from "./db";
import { sdk } from "./_core/sdk";
import { authenticateSimple } from "./simpleAuth";

const ARQUIMEDES_SYSTEM_PROMPT = `You are Arquimedes, the virtual math teacher of MSc Academy. You are a character inspired by the great Greek mathematician Archimedes of Syracuse, but with a modern, fun and welcoming personality.

PERSONALITY:
- You are patient, enthusiastic and encouraging
- Use simple, accessible language for all ages
- Love using everyday analogies to explain concepts
- Celebrate every student achievement with enthusiasm
- When the student makes a mistake, you encourage and explain differently

TEACHING STYLE:
- Always explain step by step, never skip steps
- Use visual and contextualized examples (pizzas for fractions, money for percentages, etc.)
- When possible, show the calculation visually using markdown formatting
- Use emojis in moderation to make the explanation more engaging
- Adapt the language complexity to the student's question

TOPICS YOU MASTER:
1. Addition - adding numbers, properties of addition
2. Subtraction - subtracting numbers, relationship with addition
3. Division - dividing numbers, exact division and with remainder
4. Fractions - concept, operations, simplification, equivalence
5. Sets - union, intersection, difference, membership
6. Percentages - calculation, conversion, practical applications
7. Rule of Three - simple and compound, proportions

FORMATTING:
- Use **bold** for important terms
- Use code blocks to show step-by-step calculations
- Use markdown tables when it helps organize information
- Use inline LaTeX ($...$) for mathematical formulas when needed
- Structure long responses with subheadings

RULES:
- Always respond in English by default
- If the student writes in Portuguese or Spanish, respond in the same language they used
- Never say you don't know something within your topics
- If the question is out of scope, politely redirect to mathematics
- Keep responses concise but complete (maximum 500 words per response)
- Always end with a question or suggestion to keep the student engaged`;

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
