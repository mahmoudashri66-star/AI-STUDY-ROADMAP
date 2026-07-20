# Phase 6 — Shipping Products & Systems Design (Builder → Architect)

> **Duration:** ~8 weeks+ · **Prerequisite:** Phase 5 · **Weekly load:** ~24 hrs

## Purpose & Design Rationale

You can now build. This final core phase makes you someone who can **ship** — take a
build from "runs on my laptop" to "a real product other people can use" — and, just as
importantly, teaches you to **think like an architect**: to reason about tradeoffs,
choose the right tool for a problem, and design systems rather than scripts.

This is where your two long-term identities converge. You explicitly said you want to
be **both a builder and an architect.** You can't be a credible architect without
having built (you'd be designing on fantasy), and you can't scale as a builder without
architectural judgment (you'd drown in complexity). Phase 6 fuses them: you ship one
real product *and* you develop the lens to evaluate any AI system.

## Prerequisites

- Phase 5 complete: you can build LLM apps and agents and understand them.

## Concepts to Master

### The Builder half — shipping
- **Deployment**: getting an app online (e.g., Streamlit Community Cloud, Hugging Face
  Spaces, or a simple cloud host). What "runs in production" means.
- **APIs you build**: exposing your own functionality (intro to FastAPI).
- **Environment & secrets management**: keeping API keys safe; `.env`, never commit secrets.
- **Basic UX for AI apps**: streaming responses, handling latency, error states.
- **Cost & latency**: measuring and controlling token spend and response time.
- **Evaluation & monitoring**: how you *know* your AI product is working over time.
- **Safety & guardrails**: input validation, abuse/misuse handling, responsible use.

### The Architect half — systems thinking
- **Problem → solution mapping**: when do you need an LLM at all? RAG vs. fine-tune vs.
  prompt? Agent vs. simple pipeline? Big model vs. small/local?
- **Tradeoff reasoning**: cost vs. quality vs. latency vs. control vs. privacy.
- **Component design**: how retrieval, models, tools, memory, and UI fit together.
- **Build vs. buy**: when to use an API/service vs. build it yourself.
- **Adapting as AI evolves**: how to evaluate a *new* tool/model against your needs
  (the durable meta-skill your whole mission is about).

## Weekly Objectives

| Week | Focus | Build (night block) |
|---|---|---|
| 1 | Deployment basics; secrets/env management | Deploy a Phase 4/5 app publicly (Streamlit/HF Spaces) |
| 2 | Building your own API (FastAPI intro) | Wrap one of your tools as a small API endpoint |
| 3 | Cost, latency, streaming, error handling | Add streaming + spend tracking + graceful errors to your app |
| 4 | Evaluation & monitoring for LLM apps | Build a small eval set; measure your app's quality objectively |
| 5 | Safety, guardrails, responsible use | Add input validation and misuse handling; document limitations |
| 6 | **Architect lens**: problem→solution mapping & tradeoffs | Write design docs for 3 hypothetical AI systems (no code) |
| 7 | Build-vs-buy; evaluating new tools/models | Compare 2 approaches to one problem; recommend one, justify it |
| 8+ | **Flagship capstone** | See below |

## Flagship Capstone (Weeks 8+)

Design, build, deploy, and document **one end-to-end AI product** that solves a real
problem in a domain you care about — combining everything: an LLM or agent core, RAG or
tools as needed, a real UI, deployed publicly, with cost/eval/safety considered.

Two deliverables, equally weighted:
1. **The product** — live, public, usable, in its own polished GitHub repo.
2. **The architecture doc** — a professional design writeup: the problem, why AI fits,
   the components and why you chose them, the tradeoffs you weighed, cost/latency/eval,
   failure modes, and what you'd do next. *This document is proof you think like an
   architect, not just a builder.*

This capstone is the centerpiece of your portfolio.

## Resources

- **IBM AI Engineering / Applied AI** and **Generative AI engineering** professional
  certificates on Coursera Plus — for deployment, MLOps intro, and production patterns.
  *(pick the current, highest-rated one)*
- DeepLearning.AI short courses on **evaluating/deploying LLM apps** (free).
- **FastAPI** official docs (free) — clear and beginner-friendly.
- **Streamlit** / **Hugging Face Spaces** docs (free) — fastest path to a live app.
- **The Twelve-Factor App** (free) — timeless principles for production software.
- Selected engineering blogs (Anthropic, OpenAI, and reputable practitioners) for
  current best practices — read critically, verify against docs.

> External resource descriptions are paraphrased. Content was rephrased for compliance
> with licensing restrictions.

## Exit Checkpoint (the core arc is complete when ALL are true)

- [ ] You have a **live, public, deployed** AI product anyone can use.
- [ ] You can manage secrets, track cost, and handle latency/errors in an app.
- [ ] You can measure your app's quality with an evaluation set.
- [ ] You can write an architecture/design doc that reasons about tradeoffs and
      justifies tool choices.
- [ ] Given a new problem, you can decide whether/what kind of AI it needs — and given
      a new tool/model, you can evaluate it against your needs.

## Where You Are Now

You began as a fluent *operator* of AI tools who didn't understand them. You are now
someone who understands AI from tokens to transformers to agents, **builds** real
products, and can **architect** solutions and adapt as the field changes. AI has become
an extension of how you think and work — exactly the mission.

From here, choose a **specialization path** (see the main [`README.md`](../README.md),
Section 8) and go deep. Learning never stops; now you have the foundations to make all
future learning fast.
