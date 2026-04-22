import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("Topics Router", () => {
  it("lists all topics", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const topics = await caller.topics.list();
    expect(Array.isArray(topics)).toBe(true);
    expect(topics.length).toBeGreaterThanOrEqual(7);
    // Check structure
    if (topics.length > 0) {
      expect(topics[0]).toHaveProperty("slug");
      expect(topics[0]).toHaveProperty("name");
      expect(topics[0]).toHaveProperty("description");
      expect(topics[0]).toHaveProperty("order");
    }
  });

  it("gets a topic by slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const topic = await caller.topics.getBySlug({ slug: "adicao" });
    expect(topic).toBeDefined();
    expect(topic?.name).toBe("Adição");
    expect(topic?.slug).toBe("adicao");
  });

  it("returns undefined for non-existent slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const topic = await caller.topics.getBySlug({ slug: "nonexistent" });
    expect(topic).toBeUndefined();
  });
});

describe("Exercises Router", () => {
  it("lists exercises by topic", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const exercises = await caller.exercises.listByTopic({ topicId: 1 });
    expect(Array.isArray(exercises)).toBe(true);
    expect(exercises.length).toBeGreaterThan(0);
    // Check structure
    expect(exercises[0]).toHaveProperty("question");
    expect(exercises[0]).toHaveProperty("correctAnswer");
  });

  it("gets an exercise by id", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const exercise = await caller.exercises.getById({ id: 1 });
    expect(exercise).toBeDefined();
    expect(exercise?.question).toBeDefined();
  });

  it("checks correct answer", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    // Exercise 1: 5+3=8, answer is B
    const result = await caller.exercises.checkAnswer({
      exerciseId: 1,
      answer: "B",
    });
    expect(result.correct).toBe(true);
  });

  it("checks incorrect answer", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.exercises.checkAnswer({
      exerciseId: 1,
      answer: "A",
    });
    expect(result.correct).toBe(false);
    expect(result.correctAnswer).toBe("B");
  });
});

describe("Auth Router", () => {
  it("returns null for unauthenticated user", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const me = await caller.auth.me();
    expect(me).toBeNull();
  });

  it("returns user for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const me = await caller.auth.me();
    expect(me).toBeDefined();
    expect(me?.name).toBe("Test User");
  });
});

describe("Progress Router", () => {
  it("returns progress for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const progress = await caller.progress.get();
    expect(Array.isArray(progress)).toBe(true);
  });
});

describe("Simple Auth Login", () => {
  it("rejects invalid credentials", async () => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "wrong", password: "wrong" }),
    });
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it("accepts valid credentials for admin", async () => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "admin" }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.user.name).toBe("Admin");
  });

  it("accepts valid credentials for Moises", async () => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "Moises", password: "admin" }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.user.name).toBe("Moises Costa");
  });
});

describe("Streaming Endpoint", () => {
  it("returns 400 for missing message", async () => {
    const res = await fetch("http://localhost:3000/api/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
  });
});
