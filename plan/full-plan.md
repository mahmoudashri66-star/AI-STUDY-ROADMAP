# 🌍 The Whole Journey (Full Plan)

This is the **complete map** — every phase and every week — so the plan is fully "set"
up front and any Kiro session can continue it. You don't study *from* this file; you
study from the **[daily cards](../daily/)**. This is the big picture behind them.

- **Pace:** ~4 hrs/day (2h learn + 2h practice), ~6 days/week.
- **Timeline:** ~52 weeks is a **target, not a deadline.** Depth beats speed.
- **Rule:** each phase ends with a "can I actually DO this?" checkpoint before moving on.

---

## The 7 phases at a glance

| Phase | Weeks | Title | You end able to… |
|---|---|---|---|
| 0 | 1 | Understand AI + your tools | Explain AI/ML/LLM/agents and what Kiro/GitHub/z.ai actually do |
| 1 | 2–9 | Learn to code (Python) | Read errors and write real Python from a blank file |
| 2 | 10–17 | How Machine Learning works | Explain & demo how a model "learns"; train one yourself |
| 3 | 18–27 | Deep Learning & how LLMs work | Explain tokens/embeddings/attention; build a tiny GPT |
| 4 | 28–35 | Build LLM apps (APIs, prompting, RAG) | Make API calls; build a "chat with my docs" app |
| 5 | 36–43 | AI Agents (and understand Kiro!) | Build an agent from scratch; explain why agents decide what they do |
| 6 | 44–52+ | Ship products + think like an architect | Deploy a real AI product; design systems and pick the right tools |

**Tools track runs throughout** — see [`tools.md`](./tools.md). Roughly one "tool day"
per week, going deeper as your coding grows:
GitHub & Kiro & z.ai early → Supabase & databases mid → Cloudflare & deployment later.

---

## Phase 0 — Understand AI + Your Tools · **Week 1**

**Goal:** turn the fog into a map. Understand the whole AI landscape *and* demystify the
tools you already use.

- What AI / ML / Deep Learning / LLMs / agents are and how they nest.
- What an LLM actually does (tokens, prompts, context window, next-word prediction).
- **Your tools, explained:** what GitHub really is, what Kiro (an AI agent) really is,
  what z.ai / models / APIs really are.
- Set up your learning environment (Google Colab, a learning-journal repo).

**Checkpoint:** you can explain, in your own words, AI vs ML vs LLM vs agent, and say
what Kiro, GitHub, and z.ai each actually do behind the scenes.

*(Fully built as daily cards: [`daily/week-01.md`](../daily/week-01.md).)*

---

## Phase 1 — Learn to Code: Python · **Weeks 2–9**

**Goal:** remove your single biggest ceiling. Learn to program from zero, by hand.

- **Wk 2:** variables, types, printing, running code. *(built)*
- **Wk 3:** functions, and reading errors/tracebacks (your gap). *(built)*
- **Wk 4:** lists, dictionaries, when to use which.
- **Wk 5:** loops and conditionals in depth; combining them.
- **Wk 6:** files & data (text, CSV, JSON); real inputs/outputs.
- **Wk 7:** using libraries (`pip`, imports, reading docs); a little OOP.
- **Wk 8:** debugging practice + Git deeper (branches, why version control matters).
- **Wk 9:** capstone — a small useful command-line tool in one of your domains.

**Checkpoint:** given a traceback from *your own* code, you find and fix the bug
unaided; you write a program with functions + a loop + file I/O from a blank file.

---

## Phase 2 — How Machine Learning Works · **Weeks 10–17**

**Goal:** understand the mechanism under *all* modern AI: how a machine learns from data.

- **Wk 10:** what ML is; data as tables (pandas); supervised learning.
- **Wk 11:** linear regression + the idea of "loss" (how wrong we are).
- **Wk 12:** gradient descent (roll downhill to reduce error) — with 3Blue1Brown.
- **Wk 13:** train/test split; overfitting vs. generalization.
- **Wk 14:** classification + logistic regression.
- **Wk 15:** evaluation metrics; why "99% accuracy" can still be a bad model.
- **Wk 16:** unsupervised learning (clustering); features.
- **Wk 17:** capstone — a small honest ML project on real data + a "what it learned /
  limits" writeup.

**Checkpoint:** you can explain (predict → loss → adjust → repeat), demonstrate
overfitting in code, and train a scikit-learn model with proper metrics yourself.

---

## Phase 3 — Deep Learning & How LLMs Actually Work · **Weeks 18–27**

**Goal:** the "what's behind ChatGPT/Claude" phase. Make LLMs stop being magic.

- **Wk 18:** neural networks — neurons, layers, weights, activations.
- **Wk 19–20:** build a tiny neural net *by hand* (Karpathy micrograd); forward pass.
- **Wk 21:** backpropagation (how it learns), deeply.
- **Wk 22:** PyTorch basics — re-do your by-hand net in the real tool.
- **Wk 23:** training deep nets in practice.
- **Wk 24:** embeddings — turning meaning into numbers.
- **Wk 25:** tokens & tokenization — what the model actually reads.
- **Wk 26:** attention & the transformer (Illustrated Transformer + 3Blue1Brown).
- **Wk 27:** capstone — build a tiny GPT with Karpathy + write `how-llms-work.md` in
  your own words.

**Checkpoint:** you can explain tokens, embeddings, attention, and next-token
prediction, and you built a tiny neural net by hand + a tiny GPT that runs.

---

## Phase 4 — Build LLM Apps: APIs, Prompting, RAG · **Weeks 28–35**

**Goal:** go from "understands AI" to "builds with AI." Make your first real API calls.

- **Wk 28:** what an API is; your **first raw API call** in Python (incl. z.ai / OpenAI).
- **Wk 29:** parameters (temperature, tokens), system vs user roles.
- **Wk 30:** prompt engineering, systematically (and *why* it works).
- **Wk 31:** structured output (JSON) + intro to tool/function calling.
- **Wk 32:** embeddings for search; similarity.
- **Wk 33:** vector databases + chunking; **Supabase** (as a real database) enters here.
- **Wk 34:** RAG end-to-end — "chat with my own documents."
- **Wk 35:** capstone — a RAG app over your own notes with a simple UI (Streamlit/Gradio).

**Checkpoint:** you make a raw API call and explain every part; you build a working RAG
app over your own documents.

---

## Phase 5 — AI Agents (and Finally Understand Kiro) · **Weeks 36–43**

**Goal:** close the original itch — understand *why* agents like Kiro decide what they do.

- **Wk 36:** what an agent really is — the think → act → observe loop.
- **Wk 37:** build a raw agent loop **from scratch** (no framework) with one tool.
- **Wk 38:** multiple tools + how the agent chooses.
- **Wk 39:** memory (short-term vs long-term) — why old chats "forgot" and agents don't.
- **Wk 40:** planning & multi-step tasks.
- **Wk 41:** agent frameworks (LangGraph / CrewAI) — what they automate.
- **Wk 42:** multi-agent + guardrails (step limits, cost caps).
- **Wk 43:** capstone — a useful domain agent + `why-agents-decide.md` mapping it onto Kiro.

**Checkpoint:** you built an agent from scratch and can explain, concretely, why a
coding agent like Kiro makes the decisions it makes.

---

## Phase 6 — Ship Products + Think Like an Architect · **Weeks 44–52+**

**Goal:** turn builds into real, deployed products; develop the architect's judgment.

- **Wk 44:** deployment basics; secrets/env vars; **Cloudflare** (hosting/DNS/edge) deep-dive.
- **Wk 45:** build your own API (FastAPI intro).
- **Wk 46:** cost, latency, streaming, error handling.
- **Wk 47:** evaluation & monitoring — how you *know* your AI app is good.
- **Wk 48:** safety, guardrails, responsible use.
- **Wk 49:** architect lens — problem→solution mapping; RAG vs fine-tune vs agent.
- **Wk 50:** tradeoffs (cost/quality/latency/privacy); build-vs-buy; evaluating new tools.
- **Wk 51–52+:** flagship capstone — design, build, deploy & document one real AI product.

**Checkpoint:** you have a live, public AI product, and can write an architecture doc
that justifies your tool choices and reasons about tradeoffs.

---

## After the core arc — go deep (specialization)

Pick one based on what you enjoyed most:
- **AI App / Agent Engineer** — ship production agents & LLM apps.
- **Applied AI in your domains** — trading, real estate, content, fitness + AI.
- **AI Systems Architect / Strategist** — design and direct AI systems.
- **ML / Deep Learning depth** — fine-tuning, training, research literacy.

Recognized **certificates & diplomas** to stack along the way are in
[`best-resources.md`](./best-resources.md).
