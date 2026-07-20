# Phase 4 — Building with LLMs: APIs, Prompting, and RAG

> **Duration:** ~8 weeks · **Prerequisite:** Phase 3 · **Weekly load:** ~24 hrs

## Purpose & Design Rationale

You now understand how LLMs work *inside*. This phase is where you start **building
real things on top of them** — and where you finally make the API call you've never
made. This is the transition from "understands AI" to "builds with AI."

The order is deliberate: **raw API call first, framework later.** You'll hit the
OpenAI/Anthropic API directly with your own Python code so you understand exactly what
a "call to a model" is — a request with a prompt, some parameters, and a response.
Only then do we add prompting technique, embeddings, vector databases, and finally
**RAG (Retrieval-Augmented Generation)** — the technique behind almost every "chat with
your documents" product, and the thing that solves the very problem that started your
journey (context and memory across sessions).

Your capstone here answers a question you personally care about: how do I make an AI
that actually knows *my* information?

## Prerequisites

- Phase 3 complete: you understand tokens, embeddings, and how LLMs generate text.
- Comfortable writing Python scripts and functions.

## Budget note

API usage costs a little money (typically cents per experiment). Set a hard spending
cap in the provider dashboard. If budget is $0, most of this phase can be done with
free-tier / local models via **Ollama** (run small models on your machine) and free
embedding models — noted below. Learning is not blocked by budget.

## Concepts to Master

- **What an API is**: keys, requests, responses, parameters (temperature, max tokens),
  rate limits — the real mechanics.
- **Prompt engineering, systematically**: roles (system/user), few-shot examples,
  structured output, decomposition, and *why* each works given what you learned in Phase 3.
- **Context windows in practice**: why long context costs more and can degrade.
- **Embeddings for retrieval**: turning documents into vectors to find relevant chunks.
- **Vector databases**: what they are and why they exist (e.g., Chroma, FAISS).
- **RAG**: chunking → embedding → retrieval → augmented prompt → answer.
- **Structured output & function/tool calling** (a bridge to Phase 5 agents).
- **Evaluation & hallucination**: how to tell if your LLM app is actually good.
- Frameworks (introduced late): **LangChain / LlamaIndex** — what they automate.

## Weekly Objectives

| Week | Focus | Build (night block) |
|---|---|---|
| 1 | APIs: keys, your **first raw API call** in Python | A script that sends a prompt and prints the model's response |
| 2 | Parameters (temperature, tokens); system vs. user roles | A small tool with a configurable "personality" via system prompt |
| 3 | Prompt engineering systematically | Build a prompt library; A/B test prompts on a task and log results |
| 4 | Structured output (JSON) + basic tool/function calling | Make the model return clean JSON your code then uses |
| 5 | Embeddings & similarity | Embed a set of your notes; find the most similar note to a query |
| 6 | Vector DBs + chunking | Load documents into Chroma/FAISS; retrieve relevant chunks |
| 7 | **RAG end-to-end** | Wire retrieval + prompt + model into a working Q&A over your docs |
| 8 | Frameworks + evaluation + capstone polish | Rebuild part of your RAG with LangChain; evaluate answer quality |

## Capstone Project (Weeks 7–8)

Build a **"chat with my knowledge" RAG app** over a corpus from your own life/domain —
for example your trading notes, real-estate research, or English-teaching materials.

Requirements:
- You call the model API yourself (not just through a UI).
- Documents are chunked, embedded, and stored in a vector DB.
- Queries retrieve relevant chunks and the model answers grounded in them.
- A simple UI via **Streamlit** or **Gradio** (both beginner-friendly Python).
- A short writeup on where it hallucinates and how you'd improve retrieval.

This is your first genuinely useful AI product. It goes in its own public GitHub repo.

## Resources

- **Building Systems with the ChatGPT API** — DeepLearning.AI short course (free).
  *(API + prompting mechanics)*
- DeepLearning.AI short courses on **prompt engineering** and **RAG / vector databases**
  (free) — pick the current ones. *(hands-on)*
- **Hugging Face LLM Course** (free) — embeddings and the modern stack.
- Official **OpenAI** and **Anthropic** API docs (free) — read them directly; you can now.
- **LangChain** / **LlamaIndex** docs (free) — introduced in Week 8, not before.
- Free/local option: **Ollama** (free) to run small models locally with no API cost.

> External resource descriptions are paraphrased. Content was rephrased for compliance
> with licensing restrictions.

## Exit Checkpoint (you may advance when ALL are true)

- [ ] You can make a raw LLM API call from your own Python code and explain every part
      of the request and response.
- [ ] You can explain and demonstrate the full RAG pipeline (chunk → embed → retrieve →
      augment → answer).
- [ ] Your RAG app answers questions over *your own* documents and runs behind a simple UI.
- [ ] You can describe, from experience, at least three prompt-engineering techniques
      and *why* they work.
- [ ] The capstone is public on GitHub with an honest limitations writeup.

## Common Pitfalls

- **Framework-first.** Using LangChain before a raw API call hides what a "call" is.
  Raw first (Design Rule 4).
- **Prompt-and-pray.** Not measuring whether changes help. Log and compare.
- **Ignoring hallucination.** A confident wrong answer is the core risk of these apps —
  learn to detect and reduce it.
