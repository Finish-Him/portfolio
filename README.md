<div align="center">

<!-- Logo + Banner -->
<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663548238703/KFrFYg84PBb8CrQscNDMJb/msc_academy_logo_7381d7e9.png" alt="MSc Academy Logo" width="180" />

<h1>
  <img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=700&size=32&pause=1000&color=6B2FA0&center=true&vCenter=true&width=600&lines=MSc+Academy+%E2%80%94+Arquimedes;AI+Math+Tutor+Platform;Learn+Math+Visually+%F0%9F%A7%AE" alt="Typing SVG" />
</h1>

<!-- Badges -->
<p>
  <img src="https://img.shields.io/badge/Status-Live%20%F0%9F%9F%A2-brightgreen?style=for-the-badge&labelColor=1a1a2e" alt="Status" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=1a1a2e" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1a1a2e" alt="TypeScript" />
  <img src="https://img.shields.io/badge/tRPC-11-398CCB?style=for-the-badge&logo=trpc&logoColor=white&labelColor=1a1a2e" alt="tRPC" />
</p>
<p>
  <img src="https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=1a1a2e" alt="Node.js" />
  <img src="https://img.shields.io/badge/MySQL-TiDB-4479A1?style=for-the-badge&logo=mysql&logoColor=white&labelColor=1a1a2e" alt="MySQL" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=1a1a2e" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white&labelColor=1a1a2e" alt="Framer Motion" />
</p>
<p>
  <img src="https://img.shields.io/badge/LLM-Gemini_2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white&labelColor=1a1a2e" alt="LLM" />
  <img src="https://img.shields.io/badge/TTS-ElevenLabs-FF6B35?style=for-the-badge&labelColor=1a1a2e" alt="TTS" />
  <img src="https://img.shields.io/badge/Streaming-SSE_Token--by--Token-9B6BC6?style=for-the-badge&labelColor=1a1a2e" alt="Streaming" />
</p>

<br/>

> **Arquimedes** is an AI-powered math tutor with a unique personality, visual explanations, real-time voice synthesis, and an immersive learning experience for all ages.

<br/>

[![Live Demo](https://img.shields.io/badge/%F0%9F%9A%80%20Live%20Demo-arquimath--kfrfyg84.manus.space-6B2FA0?style=for-the-badge)](https://arquimath-kfrfyg84.manus.space)
[![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-MSc--Academy-FFD21E?style=for-the-badge)](https://huggingface.co/spaces/Finish-Him/MSc-Academy)

</div>

---

## 🌐 English

### ✨ What is MSc Academy?

**MSc Academy** is an educational AI platform where each agent is a specialist in a different subject. The first and flagship agent is **Arquimedes** — a virtual math professor inspired by the ancient Greek mathematician, designed to make mathematics accessible, visual, and fun for learners of all ages.

### 🧮 Arquimedes — The Math Agent

Arquimedes covers **7 foundational math topics** with step-by-step visual explanations, real-world examples, and an encouraging personality:

| # | Topic | Description |
|---|-------|-------------|
| 1 | ➕ **Addition** | Joining numbers, properties, carrying over |
| 2 | ➖ **Subtraction** | Removing quantities, borrowing, inverse of addition |
| 3 | ➗ **Division** | Splitting into equal parts, remainder, long division |
| 4 | 🍕 **Fractions** | Parts of a whole, equivalent fractions, operations |
| 5 | 🔵 **Sets** | Union, intersection, difference, membership |
| 6 | 💰 **Percentage** | Discounts, interest, practical calculations |
| 7 | ⚖️ **Rule of Three** | Direct and inverse proportions |

### 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        MSc Academy                          │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React 19 + Tailwind 4 + Framer Motion)           │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌──────────┐  │
│  │   Home   │  │  /arqui  │  │  Topics   │  │Exercises │  │
│  │Portfolio │  │  medes   │  │  Detail   │  │Progress  │  │
│  └──────────┘  └──────────┘  └───────────┘  └──────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Backend (Express 4 + tRPC 11)                              │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────────┐  │
│  │  SSE Stream  │  │  tRPC API   │  │   Manus OAuth    │  │
│  │  /api/chat/  │  │  /api/trpc  │  │   /api/oauth     │  │
│  │  stream      │  │             │  │                  │  │
│  └──────────────┘  └─────────────┘  └──────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Database (MySQL / TiDB via Drizzle ORM)                    │
│  users · topics · exercises · chat_sessions                 │
│  chat_messages · user_progress                              │
├─────────────────────────────────────────────────────────────┤
│  AI Services                                                │
│  LLM: Gemini 2.5 Flash (streaming)  TTS: ElevenLabs        │
└─────────────────────────────────────────────────────────────┘
```

### 🚀 Key Features

**🤖 AI Chatbot with Streaming**
Real-time token-by-token streaming via Server-Sent Events (SSE). The Arquimedes persona responds word by word, giving the impression of a live conversation. Conversation history is persisted per session.

**🎙️ Voice Synthesis (TTS)**
Every response from Arquimedes can be narrated aloud using ElevenLabs TTS. The audio player supports play, pause, and replay, making the platform fully accessible.

**🎨 Visual Identity — MSc Academy Palette**

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| 🟣 | **MSc Purple** | `#6B2FA0` | Primary brand, CTAs, highlights |
| 🔵 | **Royal Blue** | `#2B5EA7` | Secondary, info, links |
| 🌑 | **Indigo** | `#2D1B4E` | Dark backgrounds, depth |
| 💜 | **Lavender** | `#9B6BC6` | Accents, tags, soft highlights |
| 🟡 | **Gold** | `#D4A843` | Achievements, stars, emphasis |

**📚 Exercises & Progress**
26+ pre-generated exercises across 3 difficulty levels (easy, medium, hard) with instant feedback, hints, and detailed explanations. Progress is tracked per topic with accuracy rates and streaks.

**📱 Responsive Design**
Fully responsive for mobile and desktop, with smooth animations, loading skeletons, and dark/light theme toggle respecting the MSc color palette.

### 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 19 + TypeScript 5.9 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Animations | Framer Motion 12 |
| API Layer | tRPC 11 + Express 4 |
| Database ORM | Drizzle ORM + MySQL/TiDB |
| LLM | Gemini 2.5 Flash (via Forge API) |
| Streaming | Server-Sent Events (SSE) |
| TTS | ElevenLabs API |
| Auth | Manus OAuth |
| Testing | Vitest (11 tests passing) |
| Deployment | Manus Platform |

### 📁 Project Structure

```
arquimedes-math-agent/
├── client/
│   └── src/
│       ├── pages/
│       │   ├── Home.tsx          # Agent portfolio (MSc Academy hub)
│       │   ├── Chat.tsx          # Arquimedes chat with streaming
│       │   ├── Topics.tsx        # 7 math topics grid
│       │   ├── TopicDetail.tsx   # Topic deep-dive page
│       │   ├── Exercises.tsx     # Practice exercises
│       │   └── Progress.tsx      # Learning progress dashboard
│       └── components/
│           ├── AppLayout.tsx     # Navbar with agent breadcrumb
│           ├── ArquimedesAvatar.tsx  # Animated avatar states
│           └── AudioPlayer.tsx   # TTS audio player
├── server/
│   ├── routers.ts               # tRPC procedures
│   ├── db.ts                    # Database query helpers
│   ├── streaming.ts             # SSE streaming endpoint
│   └── seed.mjs                 # Database seeder
├── drizzle/
│   └── schema.ts                # Database schema
└── README.md
```

### 🗺️ Roadmap

- [x] **Arquimedes** — Math Agent (7 topics)
- [ ] **Atlas** — Geography Agent *(coming soon)*
- [ ] **Newton** — Physics Agent *(coming soon)*
- [ ] **Curie** — Chemistry Agent *(coming soon)*
- [ ] Vector database for semantic search
- [ ] Manim animation integration
- [ ] Multiplayer study rooms

---

## 🇧🇷 Português

### ✨ O que é a MSc Academy?

A **MSc Academy** é uma plataforma educacional com inteligência artificial onde cada agente é especialista em uma disciplina diferente. O primeiro e principal agente é o **Arquimedes** — um professor virtual de matemática inspirado no grande matemático grego, criado para tornar a matemática acessível, visual e divertida para alunos de todas as idades.

### 🧮 Arquimedes — O Agente de Matemática

O Arquimedes cobre **7 tópicos fundamentais de matemática** com explicações visuais passo a passo, exemplos do cotidiano e uma personalidade encorajadora:

| # | Tópico | Descrição |
|---|--------|-----------|
| 1 | ➕ **Adição** | Somar números, propriedades, reagrupamento |
| 2 | ➖ **Subtração** | Subtrair quantidades, empréstimo, inversa da adição |
| 3 | ➗ **Divisão** | Dividir em partes iguais, resto, divisão longa |
| 4 | 🍕 **Fração** | Partes do todo, frações equivalentes, operações |
| 5 | 🔵 **Conjuntos** | União, interseção, diferença, pertinência |
| 6 | 💰 **Porcentagem** | Descontos, juros, cálculos práticos |
| 7 | ⚖️ **Regra de 3** | Proporções diretas e inversas |

### 🚀 Funcionalidades Principais

**🤖 Chatbot com Streaming Token a Token**
Respostas em tempo real via Server-Sent Events (SSE). O Arquimedes responde palavra por palavra, criando a sensação de uma conversa ao vivo. O histórico de conversas é salvo por sessão.

**🎙️ Síntese de Voz (TTS)**
Cada resposta do Arquimedes pode ser narrada em voz alta usando ElevenLabs TTS. O player de áudio suporta play, pause e replay, tornando a plataforma totalmente acessível.

**🎨 Identidade Visual — Paleta MSc Academy**

| Amostra | Nome | Hex | Uso |
|---------|------|-----|-----|
| 🟣 | **Roxo MSc** | `#6B2FA0` | Marca principal, CTAs, destaques |
| 🔵 | **Azul Royal** | `#2B5EA7` | Secundário, informações, links |
| 🌑 | **Índigo** | `#2D1B4E` | Fundos escuros, profundidade |
| 💜 | **Lavanda** | `#9B6BC6` | Acentos, tags, destaques suaves |
| 🟡 | **Dourado** | `#D4A843` | Conquistas, estrelas, ênfase |

**📚 Exercícios e Progresso**
26+ exercícios pré-gerados em 3 níveis de dificuldade (fácil, médio, difícil) com feedback imediato, dicas e explicações detalhadas. O progresso é rastreado por tópico com taxas de acerto e sequências.

**📱 Design Responsivo**
Totalmente responsivo para mobile e desktop, com animações suaves, skeletons de carregamento e alternância de tema claro/escuro respeitando a paleta MSc.

### 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                      MSc Academy                            │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React 19 + Tailwind 4 + Framer Motion)           │
│  ┌──────────┐  ┌────────────────┐  ┌────────────────────┐  │
│  │   Home   │  │  /arquimedes   │  │  Tópicos/Exerc.    │  │
│  │Portfólio │  │  Chat + Avatar │  │  Progresso         │  │
│  └──────────┘  └────────────────┘  └────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Backend (Express 4 + tRPC 11)                              │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────────┐  │
│  │  SSE Stream  │  │  tRPC API   │  │   Manus OAuth    │  │
│  └──────────────┘  └─────────────┘  └──────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Banco de Dados (MySQL / TiDB via Drizzle ORM)              │
│  users · topics · exercises · chat_sessions                 │
│  chat_messages · user_progress                              │
├─────────────────────────────────────────────────────────────┤
│  Serviços de IA                                             │
│  LLM: Gemini 2.5 Flash (streaming)  TTS: ElevenLabs        │
└─────────────────────────────────────────────────────────────┘
```

### 🗺️ Roadmap

- [x] **Arquimedes** — Agente de Matemática (7 tópicos)
- [ ] **Atlas** — Agente de Geografia *(em breve)*
- [ ] **Newton** — Agente de Física *(em breve)*
- [ ] **Curie** — Agente de Química *(em breve)*
- [ ] Banco de dados vetorial para busca semântica
- [ ] Integração com animações Manim
- [ ] Salas de estudo multiplayer

### 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Framework Frontend | React 19 + TypeScript 5.9 |
| Estilização | Tailwind CSS 4 + shadcn/ui |
| Animações | Framer Motion 12 |
| Camada de API | tRPC 11 + Express 4 |
| ORM do Banco | Drizzle ORM + MySQL/TiDB |
| LLM | Gemini 2.5 Flash (via Forge API) |
| Streaming | Server-Sent Events (SSE) |
| TTS | ElevenLabs API |
| Autenticação | Manus OAuth |
| Testes | Vitest (11 testes passando) |
| Deploy | Plataforma Manus |

---

<div align="center">

### 🌟 Links

[![Live Demo](https://img.shields.io/badge/%F0%9F%9A%80%20Demo%20ao%20Vivo-arquimath--kfrfyg84.manus.space-6B2FA0?style=for-the-badge)](https://arquimath-kfrfyg84.manus.space)
[![GitHub](https://img.shields.io/badge/GitHub-Finish--Him%2FArquimedes-181717?style=for-the-badge&logo=github)](https://github.com/Finish-Him/Arquimedes)
[![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-MSc--Academy-FFD21E?style=for-the-badge)](https://huggingface.co/spaces/Finish-Him/MSc-Academy)

<br/>

<sub>Built with ❤️ by MSc Academy · Powered by AI</sub>

<br/>

<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663548238703/KFrFYg84PBb8CrQscNDMJb/Arquimedes_f63227f7.webp" alt="Arquimedes" width="120" style="border-radius: 16px;" />

</div>
