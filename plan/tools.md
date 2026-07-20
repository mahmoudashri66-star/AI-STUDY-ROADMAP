# 🧰 My Tools, Explained Deeply

These are the tools you already use (because Kiro pushed you into them) but don't fully
understand yet. This file demystifies each one: **what it is, what it's actually doing,
why it exists, and where you learn it hands-on** in the plan.

You'll meet these gradually — a "tool day" ~once a week. Early ones (Kiro, GitHub,
z.ai) you understand *now*; later ones (Supabase, Cloudflare) click once you can code a
little. **All of them get real, hands-on depth — nothing skimmed.**

> If a link ever looks broken, search the exact resource name — sites move pages.

---

## 🟣 Kiro — your AI coding agent
**What it is:** an *agentic IDE* — an AI that reads your codebase, writes code, runs
commands, and manages projects through conversation. Not just a chatbot: it acts in a
loop (think → do → check).

**What it's actually doing behind the scenes:** taking your goal, breaking it into
steps, choosing "tools" (edit file, run command, search), doing one, looking at the
result, and deciding the next step — until the goal is met. That loop is exactly what
you'll *build yourself* in **Phase 5**, which is when Kiro will finally make full sense.

**Learn it:**
- First understanding: **Week 1, Day 4**.
- Docs: [Kiro Get Started](https://kiro.dev/docs/) · [Kiro Web](https://kiro.dev/docs/web/) · [Working with the agent](https://kiro.dev/docs/web/using-the-agent/)
- Full "aha": **Phase 5** (build an agent from scratch, then map it onto Kiro).

---

## ⚫ GitHub + Git — version control & project memory
**What it is:** **Git** is a system that saves snapshots ("commits") of your project so
you can go back in time, branch off to try things, and never lose work. **GitHub** is
the website that hosts those projects online and makes them shareable.

**What it's actually doing:** every commit is a saved checkpoint of all your files.
Branches are parallel copies you can experiment on. This is the "persistent project
memory" you loved — it's Git doing it, not magic.

**Learn it:**
- First understanding + hands-on: **Week 1, Day 3**; deeper (branches): **Week 8**.
- Interactive (best): [Learn Git Branching](https://learngitbranching.js.org/) — visual, gamified.
- Docs: [GitHub Get Started](https://docs.github.com/en/get-started)
- You'll use it **every single day** (one commit per day).

---

## 🔵 z.ai (GLM models) — an AI model provider & API
**What it is:** z.ai is the platform for **GLM** models (a family of LLMs, like GPT or
Claude are families). It offers a chat interface *and* an **API** + a coding plan that
plugs into coding tools.

**What it's actually doing:** when you use it, you send text (a prompt) to a model
running on their servers; it predicts and returns text. The **API** is just doing that
same thing from your *code* instead of a chat box — which you'll do yourself in Phase 4.

**Learn it:**
- First understanding (models & APIs): **Week 1, Day 5**.
- Hands-on API calls: **Phase 4, Week 28**.
- Docs: [z.ai](https://z.ai) · [Developer quick start](https://docs.z.ai/guides/overview/quick-start)

---

## 🟢 Supabase — a database + backend (so your app can remember things)
**What it is:** a ready-made **backend**: a real database (PostgreSQL), plus user
login/auth, file storage, and auto-generated APIs — without you building a server.

**What it's actually doing:** storing your app's data in tables (rows & columns) and
letting your code read/write it securely. When a Kiro project "saved users" or "stored
data," this (or something like it) was doing the work.

**Why it clicks later:** databases make sense once you can code and once you're building
apps that need to *remember* things. In this plan it's introduced with **vector search
for RAG in Phase 4 (Week 33)** and used through Phase 6.

**Learn it:**
- Concept intro: a tool day in Phase 1/2. Hands-on: **Phase 4, Week 33+**.
- Docs: [Supabase Docs](https://supabase.com/docs) · gentle start: [Supabase Quickstart](https://supabase.com/docs/guides/getting-started)

---

## 🟠 Cloudflare — putting your app on the internet (hosting, DNS, edge)
**What it is:** a company that helps your website/app be **fast, safe, and online**:
hosting (Cloudflare Pages), serverless code (Workers), domain/DNS management, CDN, and
security.

**What it's actually doing:** when you "deploy," Cloudflare serves your files to
visitors from servers around the world, points your domain name to the right place, and
shields it from attacks. It's the "make it live for other people" layer.

**Why it clicks later:** deployment only makes sense once you *have* an app to deploy.
Introduced deeply in **Phase 6, Week 44** (shipping).

**Learn it:**
- Concept intro: a tool day in Phase 4. Hands-on deploy: **Phase 6, Week 44**.
- Docs: [Cloudflare Developers](https://developers.cloudflare.com/) · [Cloudflare Pages](https://developers.cloudflare.com/pages/)

---

## 🧩 The rest of the stack (the tools Kiro also had you use)

You mentioned there are more tools you met through Kiro projects. Here are the common
ones — each gets its own tool day when the plan reaches the phase where it matters.
**Tell Kiro which of these you've seen and it'll add a dedicated deep-dive.**

| Tool / concept | What it is (one line) | Where it fits |
|---|---|---|
| **Terminal / CLI** | Typing commands to control your computer/projects | Phase 1 (early) |
| **VS Code** | The code editor Kiro is built on | Phase 1 (early) |
| **Node.js & npm** | Runs JavaScript outside the browser + installs packages | Phase 4/6 |
| **Environment variables / `.env`** | Where you hide secrets like API keys | Phase 4 |
| **API keys** | Your password to use a model/service from code | Phase 4 |
| **React / Next.js** | Popular tools for building web app front-ends | Phase 6 (optional) |
| **Tailwind CSS** | A fast way to style web pages | Phase 6 (optional) |
| **Vercel / Netlify** | Other easy hosting options (alt to Cloudflare) | Phase 6 |
| **Streamlit / Gradio** | Dead-simple way to give your AI a web UI (Python) | Phase 4 |
| **FastAPI** | Build your own API in Python | Phase 6 |
| **SQL** | The language for talking to databases (Supabase) | Phase 4 |
| **MCP (Model Context Protocol)** | How agents like Kiro plug into external tools | Phase 5 |
| **Domains / DNS** | Your app's human-readable web address | Phase 6 |

---

### How tools are woven into the daily plan
- **~1 tool day per week**, matched to your current level.
- Every tool: first a plain "what & why," then hands-on when you can actually use it.
- You already *use* many of these — the plan turns "I click it and it works" into
  "I know exactly what it's doing and why."
