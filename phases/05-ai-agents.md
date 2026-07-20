# Phase 5 — AI Agents: Understand & Build

> **Duration:** ~8 weeks · **Prerequisite:** Phase 4 · **Weekly load:** ~24 hrs

## Purpose & Design Rationale

This phase closes the loop on the original itch that started your whole journey:
**"I can use AI agents like Kiro, but I don't understand why they make the decisions
they make."** By the end, you will — because you'll have built one from scratch.

The defining design choice: **build the raw agent loop by hand before touching any
agent framework.** An agent is, at its core, a startlingly simple idea — an LLM in a
loop that can call tools, observe results, and decide the next step. Frameworks
(LangGraph, CrewAI, the OpenAI/Anthropic agent SDKs) wrap this in convenience, but if
you learn them first you'll mistake the wrapper for the thing. You write the loop
yourself first; then frameworks become "oh, this just automates what I already built."

This is the phase where you become a genuine **builder** of the tools you used to only
operate.

## Prerequisites

- Phase 4 complete: you can call an LLM API, get structured output, and you've seen
  function/tool calling.

## Concepts to Master

- **What an agent actually is**: the reason–act loop (often called ReAct): think →
  choose tool → act → observe → repeat until done.
- **Tools/function calling**: how an LLM is given "abilities" (search, code, API calls).
- **Memory**: short-term (context) vs. long-term (stored/retrieved) — and why your old
  chat interfaces "forgot," while agents + storage don't.
- **Planning & decomposition**: how agents break goals into steps.
- **Multi-agent systems**: specialized agents cooperating; orchestration.
- **Control, guardrails & failure modes**: loops, runaway costs, hallucinated tool use.
- **Why Kiro behaves as it does**: mapping everything above onto the coding agent you
  already use daily.
- Frameworks (introduced later): **LangGraph**, **CrewAI**, provider agent SDKs — what
  each abstracts.

## Weekly Objectives

| Week | Focus | Build (night block) |
|---|---|---|
| 1 | The agent loop concept; ReAct pattern | Diagram the loop; trace (on paper) how an agent would solve a 3-step task |
| 2 | **Build a raw agent loop** (no framework) | An LLM + a single tool (e.g., a calculator) in a hand-written loop |
| 3 | Multiple tools + tool selection | Add 2–3 tools (web search, file read); watch it choose |
| 4 | Memory (short + long term) | Give your agent persistent memory via the vector DB from Phase 4 |
| 5 | Planning & multi-step tasks | Have the agent decompose and execute a multi-step goal |
| 6 | Frameworks: LangGraph / CrewAI | Rebuild your agent in a framework; compare to your raw version |
| 7 | Multi-agent + guardrails | Two cooperating agents; add limits (max steps, cost caps) |
| 8 | Capstone + "why Kiro decides" writeup | See below |

## Capstone Project (Weeks 7–8)

Build a **useful domain agent** — something that autonomously accomplishes a real
multi-step task in one of your areas. Examples:
- A **research agent** that, given a real-estate or trading question, searches,
  gathers, and produces a structured briefing.
- A **content agent** that drafts, critiques its own draft, and revises (reflection).

Requirements:
- At least 3 tools and a memory component.
- Guardrails: a max-step limit and a cost/again-loop safeguard.
- A companion doc, `why-agents-decide.md`, mapping your agent's loop onto **how Kiro
  works** — explicitly answering your original question about why coding agents make
  the choices they do.

Public GitHub repo, README, and a short demo recording.

## Resources

- **AI Agents and Agentic AI in Python** — Dr. Jules White / Vanderbilt (Coursera Plus).
  *(primary spine — beginner, hands-on agent building)*
- **Agentic AI** — Andrew Ng / DeepLearning.AI, and related short courses (free).
  *(current best-practice agent patterns)*
- **LangGraph** and **CrewAI** docs (free) — introduced in Week 6, not before.
- Provider **agent/tool-use docs** (OpenAI, Anthropic) (free).
- Reflect on **Kiro** itself as a live case study of a production agent.

> External resource descriptions are paraphrased. Content was rephrased for compliance
> with licensing restrictions.

## Exit Checkpoint (you may advance when ALL are true)

- [ ] You built an agent loop **from scratch** (no framework) that uses tools.
- [ ] You can explain the reason–act loop and how tool selection, memory, and planning work.
- [ ] You rebuilt an agent in a framework and can explain what the framework abstracts.
- [ ] You can explain, concretely, why a coding agent like Kiro makes the decisions it
      makes (your `why-agents-decide.md`).
- [ ] Your capstone agent completes a real multi-step task with guardrails, public on GitHub.

## Common Pitfalls

- **Framework-first (again).** The raw loop is the entire lesson. Build it by hand first.
- **No guardrails.** Agents can loop forever and burn money/tokens. Always cap steps and spend.
- **Over-engineering.** A 2-tool agent you understand beats a 10-tool agent you don't.
