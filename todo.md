# MSc Academy - Arquimedes Math Agent TODO

## Fase 1: Setup e Infraestrutura
- [x] Upload assets (logo MSc, avatar Arquimedes) via manus-upload-file
- [x] Configurar paleta de cores MSc no index.css (roxo, azul royal, índigo, lavanda, dourado)
- [x] Configurar tipografia (Google Fonts) e tema escuro MSc
- [x] Criar schema do banco de dados (topics, exercises, chat_sessions, chat_messages, user_progress)
- [x] Executar migrações SQL

## Fase 2: Backend
- [x] Endpoint SSE para chat com streaming LLM token-a-token (/api/chat/stream)
- [x] System prompt do Arquimedes (personalidade, didática, contexto matemático)
- [x] Router tRPC para tópicos matemáticos (listar, detalhar)
- [x] Router tRPC para exercícios (listar por tópico/nível, verificar resposta, gerar via LLM)
- [x] Router tRPC para progresso do aluno (salvar, consultar)
- [x] Router tRPC para TTS (converter texto em áudio via Forge API)
- [x] Router tRPC para geração de imagens ilustrativas
- [x] Seed de exercícios pré-gerados por tópico e nível
- [x] Autenticação no endpoint SSE via cookie de sessão (segurança)
- [x] Notificações ao dono sobre marcos de progresso (10 exercícios, 5-streak)

## Fase 3: Frontend
- [x] Layout principal com navegação (topbar) e tema MSc
- [x] Página Home/Landing com apresentação da plataforma e CTA
- [x] Página de Chat com streaming SSE token-a-token
- [x] Indicador de digitação do Arquimedes durante streaming
- [x] Renderização de markdown nas respostas do chat (Streamdown)
- [x] Página de Tópicos (cards dos 7 tópicos com ícones)
- [x] Página de Exercícios por tópico com feedback imediato
- [x] Painel de Progresso do aluno (estatísticas, conquistas)
- [x] Design responsivo mobile/desktop
- [x] Modo escuro com tema MSc
- [x] Transições suaves e micro-interações (Framer Motion)
- [x] Player de áudio TTS com controles (play/pause/replay) no chat
- [x] Avatar Arquimedes com estados visuais (idle, thinking, speaking, celebrating)

## Fase 4: Assets Visuais
- [x] Gerar imagens ilustrativas para cada tópico matemático (7 imagens)
- [x] Integrar imagens nos cards de tópicos

## Fase 5: Testes e Deploy
- [x] Testes vitest para routers principais (11 testes passando)
- [ ] Checkpoint e deploy no Manus
- [ ] Repositório no GitHub
- [ ] Space no Hugging Face
