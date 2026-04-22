import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import ArquimedesAvatar from "@/components/ArquimedesAvatar";
import AudioPlayer from "@/components/AudioPlayer";
import {
  Send, Loader2, Volume2, VolumeX, Plus
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  audioUrl?: string | null;
};

type AvatarState = "idle" | "thinking" | "speaking" | "celebrating";

const SUGGESTED_PROMPTS = [
  "Me explica o que é fração de um jeito simples",
  "Como faço uma regra de 3?",
  "Quanto é 25% de 200?",
  "Me ajuda com divisão com resto",
  "O que são conjuntos na matemática?",
  "Como somar frações com denominadores diferentes?",
];

export default function Chat({ sessionId: initialSessionId }: { sessionId?: string }) {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [sessionId, setSessionId] = useState<number | null>(
    initialSessionId ? parseInt(initialSessionId) : null
  );
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [ttsLoading, setTtsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const ttsMutation = trpc.tts.synthesize.useMutation();
  const sessionsQuery = trpc.chat.listSessions.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const messagesQuery = trpc.chat.getMessages.useQuery(
    { sessionId: sessionId! },
    { enabled: !!sessionId }
  );

  useEffect(() => {
    if (messagesQuery.data) {
      setMessages(
        messagesQuery.data
          .filter((m) => m.role !== "system")
          .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }))
      );
    }
  }, [messagesQuery.data]);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
      if (viewport) {
        requestAnimationFrame(() => {
          viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
        });
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, isLoading, scrollToBottom]);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading || !user) return;

    const userMsg: ChatMessage = { role: "user", content: content.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");
    setAvatarState("thinking");

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          content: content.trim(),
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("Stream failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";
      let buffer = "";
      let firstToken = true;

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

            if (parsed.type === "session") {
              setSessionId(parsed.sessionId);
            } else if (parsed.type === "token") {
              if (firstToken) {
                setAvatarState("speaking");
                firstToken = false;
              }
              fullContent += parsed.content;
              setStreamingContent(fullContent);
            } else if (parsed.type === "done") {
              fullContent = parsed.fullContent || fullContent;
            } else if (parsed.type === "error") {
              toast.error(parsed.message || "Erro na resposta");
            }
          } catch {
            // Skip malformed JSON
          }
        }
      }

      if (fullContent) {
        let audioUrl: string | null = null;

        // TTS if enabled
        if (ttsEnabled) {
          setTtsLoading(true);
          try {
            const ttsResult = await ttsMutation.mutateAsync({
              text: fullContent.substring(0, 500),
            });
            audioUrl = ttsResult.audioUrl;
          } catch {
            // TTS failed silently
          } finally {
            setTtsLoading(false);
          }
        }

        setMessages((prev) => [...prev, { role: "assistant", content: fullContent, audioUrl }]);
        setStreamingContent("");
        setAvatarState("idle");
      }

      sessionsQuery.refetch();
    } catch (error: any) {
      if (error.name !== "AbortError") {
        toast.error("Erro ao enviar mensagem. Tente novamente.");
        setMessages((prev) => prev.slice(0, -1));
      }
      setAvatarState("idle");
    } finally {
      setIsLoading(false);
      setStreamingContent("");
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const startNewChat = () => {
    if (abortRef.current) abortRef.current.abort();
    setSessionId(null);
    setMessages([]);
    setInput("");
    setStreamingContent("");
    setAvatarState("idle");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <ArquimedesAvatar state="idle" size="lg" />
        <h2 className="text-2xl font-display font-bold">Faça login para conversar com o Arquimedes</h2>
        <p className="text-muted-foreground max-w-md">
          Entre na sua conta para começar a aprender matemática de forma interativa e divertida.
        </p>
        <a href={getLoginUrl()}>
          <Button size="lg" className="bg-msc-gradient text-white">Entrar</Button>
        </a>
      </div>
    );
  }

  return (
    <div className="flex gap-4 h-[calc(100vh-8rem)]">
      {/* Sidebar - Chat History */}
      <div className="hidden lg:flex flex-col w-64 shrink-0 border rounded-xl bg-card">
        <div className="p-4 border-b">
          <Button onClick={startNewChat} className="w-full bg-msc-gradient text-white gap-2">
            <Plus className="h-4 w-4" />
            Nova Conversa
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {sessionsQuery.data?.map((session) => (
              <div
                key={session.id}
                onClick={() => {
                  setSessionId(session.id);
                  setMessages([]);
                  setStreamingContent("");
                }}
                className={`px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors truncate ${
                  sessionId === session.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {session.title || "Conversa sem título"}
              </div>
            ))}
            {(!sessionsQuery.data || sessionsQuery.data.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma conversa ainda
              </p>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col border rounded-xl bg-card overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-card">
          <div className="flex items-center gap-3">
            <ArquimedesAvatar state={avatarState} size="sm" />
            <div>
              <h3 className="font-display font-semibold text-sm">Arquimedes</h3>
              <p className="text-xs text-muted-foreground">
                {avatarState === "thinking" ? "Pensando..." :
                 avatarState === "speaking" ? "Respondendo..." :
                 "Professor de Matemática"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setTtsEnabled(!ttsEnabled)}
              title={ttsEnabled ? "Desativar voz" : "Ativar voz do Arquimedes"}
            >
              {ttsEnabled ? <Volume2 className="h-4 w-4 text-msc-purple" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={startNewChat}
              className="lg:hidden gap-1"
            >
              <Plus className="h-4 w-4" />
              Nova
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-hidden">
          {messages.length === 0 && !streamingContent ? (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-6">
              <ArquimedesAvatar state="idle" size="lg" />
              <div className="text-center space-y-2">
                <h3 className="font-display font-bold text-xl">
                  Olá{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! Eu sou o Arquimedes
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Seu professor virtual de matemática. Me pergunte qualquer coisa sobre
                  adição, subtração, divisão, frações, conjuntos, porcentagem ou regra de 3!
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-xl border bg-card text-sm hover:bg-muted transition-colors disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-4 p-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <ArquimedesAvatar state="idle" size="sm" className="mt-1" />
                    )}
                    <div className={`max-w-[80%] ${msg.role === "user" ? "" : ""}`}>
                      <div
                        className={`px-4 py-3 ${
                          msg.role === "user"
                            ? "chat-bubble-user"
                            : "chat-bubble-bot"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <Streamdown>{msg.content}</Streamdown>
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        )}
                      </div>
                      {/* Audio player for assistant messages */}
                      {msg.role === "assistant" && msg.audioUrl && (
                        <div className="mt-1 ml-1">
                          <AudioPlayer audioUrl={msg.audioUrl} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Streaming message */}
                {streamingContent && (
                  <div className="flex gap-3 justify-start">
                    <ArquimedesAvatar state="speaking" size="sm" className="mt-1" />
                    <div className="chat-bubble-bot px-4 py-3 max-w-[80%]">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <Streamdown>{streamingContent}</Streamdown>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading indicator */}
                {isLoading && !streamingContent && (
                  <div className="flex gap-3">
                    <ArquimedesAvatar state="thinking" size="sm" className="mt-1" />
                    <div className="chat-bubble-bot px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-msc-purple typing-dot" />
                        <div className="w-2 h-2 rounded-full bg-msc-purple typing-dot" />
                        <div className="w-2 h-2 rounded-full bg-msc-purple typing-dot" />
                      </div>
                    </div>
                  </div>
                )}

                {/* TTS loading indicator */}
                {ttsLoading && (
                  <div className="flex items-center gap-2 ml-11 text-xs text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Gerando áudio...
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t p-4 bg-background/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex gap-2 items-end"
          >
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte algo ao Arquimedes..."
              className="flex-1 max-h-32 resize-none min-h-[44px]"
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="shrink-0 h-11 w-11 bg-msc-gradient text-white"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
