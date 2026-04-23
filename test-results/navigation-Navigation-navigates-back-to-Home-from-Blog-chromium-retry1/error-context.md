# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation >> navigates back to Home from Blog
- Location: e2e/navigation.spec.ts:62:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('nav') to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Notifications alt+T"
  - generic [ref=e3]:
    - generic [ref=e5]:
      - link "MSc Academy" [ref=e6] [cursor=pointer]:
        - /url: /
        - button "MSc Academy" [ref=e7]:
          - img [ref=e8]
          - generic [ref=e10]: MSc Academy
      - generic [ref=e11]:
        - img [ref=e12]
        - generic [ref=e16]: Blog
    - generic [ref=e21]:
      - generic [ref=e22]:
        - img [ref=e23]
        - text: AI Engineering in Practice — Technical articles by Moises Costa
      - heading "Blog on AI Engineering" [level=1] [ref=e25]
      - paragraph [ref=e26]: Technical articles on LangChain, LangGraph, RAG, prompt engineering, FastAPI and production AI agent architecture. Content based on real-world experience.
      - generic [ref=e27]:
        - img [ref=e28]
        - textbox "Search articles..." [ref=e31]
    - generic [ref=e33]:
      - generic [ref=e36]: Featured
      - 'link "Agentes de IA Featured Orquestração Agêntica com LangGraph: Do Zero ao Deploy Como construir pipelines de agentes multi-step com estado persistente usando LangGraph, LangSmith e FastAPI. Um guia prático com código real de produção. LangGraph LangChain Python FastAPI Agents December 09, 2025 12 min read Read article" [ref=e38] [cursor=pointer]':
        - /url: /blog/orquestracao-agentica-langgraph
        - generic [ref=e41]:
          - generic [ref=e42]:
            - generic [ref=e43]:
              - generic [ref=e45]: Agentes de IA
              - generic [ref=e46]: Featured
            - 'heading "Orquestração Agêntica com LangGraph: Do Zero ao Deploy" [level=2] [ref=e47]'
            - paragraph [ref=e48]: Como construir pipelines de agentes multi-step com estado persistente usando LangGraph, LangSmith e FastAPI. Um guia prático com código real de produção.
            - generic [ref=e49]:
              - generic [ref=e50]:
                - img [ref=e51]
                - text: LangGraph
              - generic [ref=e54]:
                - img [ref=e55]
                - text: LangChain
              - generic [ref=e58]:
                - img [ref=e59]
                - text: Python
              - generic [ref=e62]:
                - img [ref=e63]
                - text: FastAPI
              - generic [ref=e66]:
                - img [ref=e67]
                - text: Agents
            - generic [ref=e70]:
              - generic [ref=e71]:
                - img [ref=e72]
                - text: December 09, 2025
              - generic [ref=e74]:
                - img [ref=e75]
                - text: 12 min read
          - generic [ref=e79]:
            - generic [ref=e80]: Read article
            - img [ref=e81]
    - generic [ref=e85]:
      - img [ref=e86]
      - button "All" [ref=e88] [cursor=pointer]
      - button "Agentes de IA" [ref=e89] [cursor=pointer]
      - button "RAG & Vector DBs" [ref=e90] [cursor=pointer]
      - button "Prompt Engineering" [ref=e91] [cursor=pointer]
      - button "Full Stack AI" [ref=e92] [cursor=pointer]
      - button "Case Studies" [ref=e93] [cursor=pointer]
      - generic [ref=e94]: 6 articles
    - generic [ref=e97]:
      - 'link "Agentes de IA Orquestração Agêntica com LangGraph: Do Zero ao Deploy Como construir pipelines de agentes multi-step com estado persistente usando LangGraph, LangSmith e FastAPI. Um guia prático com código real de produção. LangGraph LangChain Python December 09, 2025 12 min" [ref=e99] [cursor=pointer]':
        - /url: /blog/orquestracao-agentica-langgraph
        - generic [ref=e100]:
          - generic [ref=e103]: Agentes de IA
          - 'heading "Orquestração Agêntica com LangGraph: Do Zero ao Deploy" [level=3] [ref=e104]'
          - paragraph [ref=e105]: Como construir pipelines de agentes multi-step com estado persistente usando LangGraph, LangSmith e FastAPI. Um guia prático com código real de produção.
          - generic [ref=e106]:
            - generic [ref=e107]:
              - img [ref=e108]
              - text: LangGraph
            - generic [ref=e111]:
              - img [ref=e112]
              - text: LangChain
            - generic [ref=e115]:
              - img [ref=e116]
              - text: Python
          - generic [ref=e119]:
            - generic [ref=e120]:
              - img [ref=e121]
              - text: December 09, 2025
            - generic [ref=e123]:
              - img [ref=e124]
              - text: 12 min
      - 'link "RAG & Vector DBs RAG em Produção: Arquitetura, Chunking e Avaliação Guia completo para implementar Retrieval-Augmented Generation com PGvector, Supabase e avaliação com LangSmith. Aprenda os erros que cometi e como evitá-los. RAG PGvector Supabase December 19, 2025 18 min" [ref=e128] [cursor=pointer]':
        - /url: /blog/rag-em-producao-arquitetura-chunking-avaliacao
        - generic [ref=e129]:
          - generic [ref=e132]: RAG & Vector DBs
          - 'heading "RAG em Produção: Arquitetura, Chunking e Avaliação" [level=3] [ref=e133]'
          - paragraph [ref=e134]: Guia completo para implementar Retrieval-Augmented Generation com PGvector, Supabase e avaliação com LangSmith. Aprenda os erros que cometi e como evitá-los.
          - generic [ref=e135]:
            - generic [ref=e136]:
              - img [ref=e137]
              - text: RAG
            - generic [ref=e140]:
              - img [ref=e141]
              - text: PGvector
            - generic [ref=e144]:
              - img [ref=e145]
              - text: Supabase
          - generic [ref=e148]:
            - generic [ref=e149]:
              - img [ref=e150]
              - text: December 19, 2025
            - generic [ref=e152]:
              - img [ref=e153]
              - text: 18 min
      - 'link "Prompt Engineering System Prompts e Role Prompts: Engenharia de Prompts Avançada Técnicas avançadas de prompt engineering para Claude, GPT-4 e modelos open-source. Padrões, anti-padrões e benchmarks com dados reais de produção. Prompt Engineering Claude OpenAI January 04, 2026 10 min" [ref=e157] [cursor=pointer]':
        - /url: /blog/prompt-engineering-avancado-claude-gpt4
        - generic [ref=e158]:
          - generic [ref=e161]: Prompt Engineering
          - 'heading "System Prompts e Role Prompts: Engenharia de Prompts Avançada" [level=3] [ref=e162]'
          - paragraph [ref=e163]: Técnicas avançadas de prompt engineering para Claude, GPT-4 e modelos open-source. Padrões, anti-padrões e benchmarks com dados reais de produção.
          - generic [ref=e164]:
            - generic [ref=e165]:
              - img [ref=e166]
              - text: Prompt Engineering
            - generic [ref=e169]:
              - img [ref=e170]
              - text: Claude
            - generic [ref=e173]:
              - img [ref=e174]
              - text: OpenAI
          - generic [ref=e177]:
            - generic [ref=e178]:
              - img [ref=e179]
              - text: January 04, 2026
            - generic [ref=e181]:
              - img [ref=e182]
              - text: 10 min
      - 'link "Agentes de IA MCP (Model Context Protocol): O Futuro da Integração de Agentes Como o MCP está mudando a forma como agentes de IA se conectam a ferramentas externas e sistemas legados. Implementação prática com Python e TypeScript. MCP Agents Integration January 14, 2026 8 min" [ref=e186] [cursor=pointer]':
        - /url: /blog/mcp-model-context-protocol-futuro-agentes
        - generic [ref=e187]:
          - generic [ref=e190]: Agentes de IA
          - 'heading "MCP (Model Context Protocol): O Futuro da Integração de Agentes" [level=3] [ref=e191]'
          - paragraph [ref=e192]: Como o MCP está mudando a forma como agentes de IA se conectam a ferramentas externas e sistemas legados. Implementação prática com Python e TypeScript.
          - generic [ref=e193]:
            - generic [ref=e194]:
              - img [ref=e195]
              - text: MCP
            - generic [ref=e198]:
              - img [ref=e199]
              - text: Agents
            - generic [ref=e202]:
              - img [ref=e203]
              - text: Integration
          - generic [ref=e206]:
            - generic [ref=e207]:
              - img [ref=e208]
              - text: January 14, 2026
            - generic [ref=e210]:
              - img [ref=e211]
              - text: 8 min
      - 'link "Full Stack AI Full Stack AI: React + FastAPI + LangChain em Produção Arquitetura completa de uma aplicação de IA com streaming SSE, autenticação, banco vetorial e deploy. O que aprendi construindo a MSc Academy. React FastAPI LangChain January 24, 2026 20 min" [ref=e215] [cursor=pointer]':
        - /url: /blog/full-stack-ai-react-fastapi-langchain-producao
        - generic [ref=e216]:
          - generic [ref=e219]: Full Stack AI
          - 'heading "Full Stack AI: React + FastAPI + LangChain em Produção" [level=3] [ref=e220]'
          - paragraph [ref=e221]: Arquitetura completa de uma aplicação de IA com streaming SSE, autenticação, banco vetorial e deploy. O que aprendi construindo a MSc Academy.
          - generic [ref=e222]:
            - generic [ref=e223]:
              - img [ref=e224]
              - text: React
            - generic [ref=e227]:
              - img [ref=e228]
              - text: FastAPI
            - generic [ref=e231]:
              - img [ref=e232]
              - text: LangChain
          - generic [ref=e235]:
            - generic [ref=e236]:
              - img [ref=e237]
              - text: January 24, 2026
            - generic [ref=e239]:
              - img [ref=e240]
              - text: 20 min
      - 'link "Case Studies Detran-RJ: Como Modernizamos o Backend com GenAI Case real: implementação de pipelines de IA em um órgão público, desafios únicos de compliance, LGPD, legado e os resultados que alcançamos. Case Study GenAI FastAPI February 09, 2026 15 min" [ref=e244] [cursor=pointer]':
        - /url: /blog/detran-rj-modernizacao-backend-genai
        - generic [ref=e245]:
          - generic [ref=e248]: Case Studies
          - 'heading "Detran-RJ: Como Modernizamos o Backend com GenAI" [level=3] [ref=e249]'
          - paragraph [ref=e250]: "Case real: implementação de pipelines de IA em um órgão público, desafios únicos de compliance, LGPD, legado e os resultados que alcançamos."
          - generic [ref=e251]:
            - generic [ref=e252]:
              - img [ref=e253]
              - text: Case Study
            - generic [ref=e256]:
              - img [ref=e257]
              - text: GenAI
            - generic [ref=e260]:
              - img [ref=e261]
              - text: FastAPI
          - generic [ref=e264]:
            - generic [ref=e265]:
              - img [ref=e266]
              - text: February 09, 2026
            - generic [ref=e268]:
              - img [ref=e269]
              - text: 15 min
    - generic [ref=e274]:
      - heading "Want more AI Engineering content?" [level=3] [ref=e275]
      - paragraph [ref=e276]: Follow on LinkedIn for new article notifications, open-source projects and production AI insights.
      - generic [ref=e277]:
        - link "Follow on LinkedIn" [ref=e278] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/moises-costa-rj/
          - button "Follow on LinkedIn" [ref=e279]:
            - img
            - text: Follow on LinkedIn
        - link "View GitHub" [ref=e280] [cursor=pointer]:
          - /url: https://github.com/Finish-Him
          - button "View GitHub" [ref=e281]:
            - img
            - text: View GitHub
        - link "Portfolio" [ref=e282] [cursor=pointer]:
          - /url: /
          - button "Portfolio" [ref=e283]:
            - img
            - text: Portfolio
```

# Test source

```ts
  1  | /**
  2  |  * E2E Tests — Navigation
  3  |  * Tests routing between pages: Blog, Agents, and back to Home.
  4  |  */
  5  | import { test, expect } from "@playwright/test";
  6  | 
  7  | test.describe("Navigation", () => {
  8  |   test("navigates to Blog page", async ({ page }) => {
  9  |     await page.goto("/");
  10 |     await page.waitForSelector("nav", { timeout: 10000 });
  11 | 
  12 |     // Click Blog link in navbar
  13 |     const blogLink = page.locator("a[href='/blog'], nav a:has-text('Blog')");
  14 |     await blogLink.first().click();
  15 | 
  16 |     await page.waitForURL("**/blog", { timeout: 10000 });
  17 |     expect(page.url()).toContain("/blog");
  18 |   });
  19 | 
  20 |   test("Blog page renders article list", async ({ page }) => {
  21 |     await page.goto("/blog");
  22 |     await page.waitForSelector("h1, h2", { timeout: 10000 });
  23 | 
  24 |     // Should have at least one article card
  25 |     const articles = page.locator("article, [data-testid='blog-card'], .blog-card");
  26 |     // If no data-testid, check for heading with article content
  27 |     const heading = page.locator("h1, h2").first();
  28 |     await expect(heading).toBeVisible();
  29 |   });
  30 | 
  31 |   test("navigates to Agents page", async ({ page }) => {
  32 |     await page.goto("/");
  33 |     await page.waitForSelector("nav", { timeout: 10000 });
  34 | 
  35 |     // Navigate directly to /agents
  36 |     await page.goto("/agents");
  37 |     await page.waitForSelector("h1, h2, [class*='agent']", { timeout: 10000 });
  38 |     expect(page.url()).toContain("/agents");
  39 |   });
  40 | 
  41 |   test("Agents page shows Arquimedes tab", async ({ page }) => {
  42 |     await page.goto("/agents");
  43 |     await page.waitForSelector("text=Arquimedes", { timeout: 10000 });
  44 |     const arquimedes = page.locator("text=Arquimedes").first();
  45 |     await expect(arquimedes).toBeVisible();
  46 |   });
  47 | 
  48 |   test("Agents page shows Atlas tab", async ({ page }) => {
  49 |     await page.goto("/agents");
  50 |     await page.waitForSelector("text=Atlas", { timeout: 10000 });
  51 |     const atlas = page.locator("text=Atlas").first();
  52 |     await expect(atlas).toBeVisible();
  53 |   });
  54 | 
  55 |   test("Agents page shows Artemis tab", async ({ page }) => {
  56 |     await page.goto("/agents");
  57 |     await page.waitForSelector("text=Artemis", { timeout: 10000 });
  58 |     const artemis = page.locator("text=Artemis").first();
  59 |     await expect(artemis).toBeVisible();
  60 |   });
  61 | 
  62 |   test("navigates back to Home from Blog", async ({ page }) => {
  63 |     await page.goto("/blog");
> 64 |     await page.waitForSelector("nav", { timeout: 10000 });
     |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
  65 | 
  66 |     // Click logo or home link
  67 |     const homeLink = page.locator("a[href='/'], nav a:has-text('MSc')").first();
  68 |     if (await homeLink.count() > 0) {
  69 |       await homeLink.click();
  70 |       await page.waitForURL("**/", { timeout: 10000 });
  71 |       expect(page.url()).toMatch(/\/$/);
  72 |     } else {
  73 |       await page.goto("/");
  74 |       expect(page.url()).toMatch(/\/$/);
  75 |     }
  76 |   });
  77 | 
  78 |   test("404 page or redirect for unknown route", async ({ page }) => {
  79 |     await page.goto("/this-route-does-not-exist-xyz");
  80 |     // Should either show 404 or redirect to home
  81 |     const status = await page.evaluate(() => document.readyState);
  82 |     expect(status).toBe("complete");
  83 |   });
  84 | });
  85 | 
```