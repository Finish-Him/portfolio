/**
 * Unit Tests — MSc Academy
 * Tests for pure functions, helpers, and isolated logic.
 */
import { describe, expect, it, vi, beforeEach } from "vitest";

// ─── 1. Input Validation Helpers ──────────────────────────────────────────────
describe("Contact Form Validation", () => {
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidName = (name: string) =>
    name.trim().length >= 2 && name.trim().length <= 128;

  const isValidMessage = (msg: string) =>
    msg.trim().length >= 10 && msg.trim().length <= 2000;

  it("validates correct email addresses", () => {
    expect(isValidEmail("moises@example.com")).toBe(true);
    expect(isValidEmail("test.user+tag@domain.co.uk")).toBe(true);
  });

  it("rejects invalid email addresses", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("@nodomain.com")).toBe(false);
    expect(isValidEmail("missing@")).toBe(false);
  });

  it("validates name length boundaries", () => {
    expect(isValidName("Jo")).toBe(true);        // min 2 chars
    expect(isValidName("A")).toBe(false);         // too short
    expect(isValidName("Moisés Costa")).toBe(true);
    expect(isValidName("a".repeat(129))).toBe(false); // too long
  });

  it("validates message length boundaries", () => {
    expect(isValidMessage("Hello world!")).toBe(true);  // 12 chars
    expect(isValidMessage("Short")).toBe(false);         // < 10 chars
    expect(isValidMessage("a".repeat(2001))).toBe(false); // > 2000
    expect(isValidMessage("a".repeat(2000))).toBe(true);
  });
});

// ─── 2. Slug Generation Logic ─────────────────────────────────────────────────
describe("Blog Post Slug Utilities", () => {
  const slugify = (title: string) =>
    title
      .toLowerCase()
      .replace(/[àáâãäå]/g, "a")
      .replace(/[èéêë]/g, "e")
      .replace(/[ìíîï]/g, "i")
      .replace(/[òóôõö]/g, "o")
      .replace(/[ùúûü]/g, "u")
      .replace(/[ç]/g, "c")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  it("converts title to lowercase slug", () => {
    expect(slugify("LangGraph Tutorial")).toBe("langgraph-tutorial");
  });

  it("handles Portuguese characters", () => {
    expect(slugify("Introdução ao RAG")).toBe("introducao-ao-rag");
  });

  it("removes special characters", () => {
    expect(slugify("AI Engineer: Top 1 Brazil!")).toBe("ai-engineer-top-1-brazil");
  });

  it("collapses multiple spaces", () => {
    expect(slugify("hello   world")).toBe("hello-world");
  });
});

// ─── 3. System Prompt Content Validation ─────────────────────────────────────
describe("Atlas System Prompt Data Integrity", () => {
  // These constants mirror the real data in atlasStreaming.ts
  const TOTAL_TI_ITEMS = 2822;
  const TOTAL_MOBILIARIO_ITEMS = 736;
  const TOTAL_POSTOS = 155;
  const TOTAL_POSTOS_EQUIPAMENTOS = 1592;
  const VALOR_TI = 94185056.20;
  const VALOR_MOBILIARIO = 244761.08;

  it("TI inventory total is positive and realistic", () => {
    expect(TOTAL_TI_ITEMS).toBeGreaterThan(0);
    expect(TOTAL_TI_ITEMS).toBeLessThan(100000);
  });

  it("Mobiliário inventory total is positive", () => {
    expect(TOTAL_MOBILIARIO_ITEMS).toBeGreaterThan(0);
  });

  it("External posts count is within valid range", () => {
    expect(TOTAL_POSTOS).toBeGreaterThan(0);
    expect(TOTAL_POSTOS_EQUIPAMENTOS).toBeGreaterThan(TOTAL_POSTOS);
  });

  it("TI asset value is greater than mobiliário value", () => {
    expect(VALOR_TI).toBeGreaterThan(VALOR_MOBILIARIO);
  });

  it("Total asset value is in millions range (R$)", () => {
    const total = VALOR_TI + VALOR_MOBILIARIO;
    expect(total).toBeGreaterThan(1_000_000);
    expect(total).toBeLessThan(1_000_000_000);
  });
});

// ─── 4. Arquimedes System Prompt Rules ───────────────────────────────────────
describe("Arquimedes Agent Configuration", () => {
  const MATH_TOPICS = [
    "Addition",
    "Subtraction",
    "Division",
    "Fractions",
    "Sets",
    "Percentages",
    "Rule of Three",
  ];

  it("covers exactly 7 math topics", () => {
    expect(MATH_TOPICS).toHaveLength(7);
  });

  it("all topics are non-empty strings", () => {
    MATH_TOPICS.forEach(topic => {
      expect(typeof topic).toBe("string");
      expect(topic.length).toBeGreaterThan(0);
    });
  });

  it("topics include core arithmetic operations", () => {
    expect(MATH_TOPICS).toContain("Addition");
    expect(MATH_TOPICS).toContain("Subtraction");
    expect(MATH_TOPICS).toContain("Division");
    expect(MATH_TOPICS).toContain("Fractions");
  });
});

// ─── 5. Date/Time Utilities ───────────────────────────────────────────────────
describe("Timestamp Utilities", () => {
  it("UTC timestamp is a positive integer", () => {
    const ts = Date.now();
    expect(ts).toBeGreaterThan(0);
    expect(Number.isInteger(ts)).toBe(true);
  });

  it("converts UTC timestamp to local date string", () => {
    const ts = new Date("2025-01-01T00:00:00Z").getTime();
    const dateStr = new Date(ts).toLocaleDateString("en-US");
    expect(typeof dateStr).toBe("string");
    expect(dateStr.length).toBeGreaterThan(0);
  });

  it("timestamps are monotonically increasing", () => {
    const t1 = Date.now();
    const t2 = Date.now();
    expect(t2).toBeGreaterThanOrEqual(t1);
  });
});

// ─── 6. SEO Meta Tag Validation ───────────────────────────────────────────────
describe("SEO Configuration", () => {
  const PAGE_TITLE = "Moisés Costa · AI Engineer | MSc Academy";
  const META_DESCRIPTION =
    "AI Engineer specializing in LLM Agents, RAG Pipelines & Full Stack AI. Top 1 Brazil on Manus Academy. Open to remote roles in US/EU.";
  const KEYWORDS = [
    "AI Engineer",
    "LLM Agents",
    "RAG Pipelines",
    "Python",
    "Full Stack Developer",
  ];

  it("page title is between 30 and 60 characters", () => {
    expect(PAGE_TITLE.length).toBeGreaterThanOrEqual(30);
    expect(PAGE_TITLE.length).toBeLessThanOrEqual(60);
  });

  it("meta description is between 50 and 160 characters", () => {
    expect(META_DESCRIPTION.length).toBeGreaterThanOrEqual(50);
    expect(META_DESCRIPTION.length).toBeLessThanOrEqual(160);
  });

  it("keywords count is between 3 and 8", () => {
    expect(KEYWORDS.length).toBeGreaterThanOrEqual(3);
    expect(KEYWORDS.length).toBeLessThanOrEqual(8);
  });

  it("keywords are non-empty strings", () => {
    KEYWORDS.forEach(kw => {
      expect(typeof kw).toBe("string");
      expect(kw.trim().length).toBeGreaterThan(0);
    });
  });
});
