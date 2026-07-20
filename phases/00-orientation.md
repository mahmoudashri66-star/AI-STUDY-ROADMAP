# Phase 0 — Orientation & Mental Models

> **Duration:** ~2 weeks · **Prerequisite:** none · **Weekly load:** ~24 hrs

## Purpose & Design Rationale

Before learning *anything* technical, you build a correct **map of the whole
territory**. The reason you currently "operate tools without understanding them" is
that the vocabulary is a fog — AI, ML, DL, LLM, model, agent, token, parameter,
training, inference all blur together. This phase turns that fog into a labelled map,
so every later phase has a place to hang new knowledge.

You will *not* learn to code yet. You will end this phase able to explain, in plain
English, what each major piece of the AI landscape is and how they nest inside each
other.

## Requirements (what you need in place)

- A computer, a browser, and your Coursera Plus login.
- A GitHub account (you have this) and a fresh repo for practice notes.
- A note-taking system (a Markdown file in a repo is perfect — dogfood Git).

## Concepts to Master

- The nesting: **AI ⊃ Machine Learning ⊃ Deep Learning ⊃ (today's) LLMs**.
- What "a model" actually is (a function with learned parameters), at an intuitive level.
- **Training vs. inference** — learning the parameters vs. using them.
- **Tokens, prompts, context window** — what the model actually reads and writes.
- What "generative AI" means and why next-word prediction produces coherent text.
- What an **AI agent** is at a high level (a model in a loop that can use tools) — you
  won't build one yet, but you name it now.
- The tool landscape: models (GPT/Claude/Gemini), APIs, notebooks, agents (like Kiro).
- **How to learn this field**: the concept→build loop, spaced repetition, learning in public.

## Weekly Objectives

### Week 1 — The Map
- Complete **Generative AI for Everyone** (Andrew Ng, Coursera). Take notes in your own words.
- After each lesson, write a one-paragraph "explain it to a friend" summary.
- Deliverable: a `glossary.md` in your notes repo defining ~25 core terms *in your own words*.

### Week 2 — The Tools & The Method
- Watch a short, high-quality "how LLMs work" overview for intuition (3Blue1Brown's
  "But what is a neural network?" and its LLM/transformer intro videos — for *feel*,
  not mastery; you'll return to these in Phase 3).
- Install and set up your environment for the road ahead:
  - Create a free **Google account** for **Google Colab** (browser-based Python — no
    install pain for now).
  - Confirm you can open a Colab notebook, type `print("hello")`, and run it.
  - Create a GitHub repo named `ai-learning-journal` for notes + tiny experiments.
- Deliverable: a `mental-model.md` — one page, in your own words, showing how AI, ML,
  DL, LLMs, and agents nest and relate. Diagrams encouraged (even hand-drawn photos).

## Hands-On (light, on purpose)

- Run your first three lines of Python in Colab (just to demystify the tool).
- Write your glossary and mental-model docs; commit each with a real message.
- Ask Claude/ChatGPT to *quiz* you on your glossary — but you answer first, then check.

## Resources

- **Generative AI for Everyone** — Andrew Ng, Coursera Plus. *(primary)*
- **3Blue1Brown** — Neural Networks series intro videos, YouTube (free). *(intuition)*
- Optional: skim the intro of the **Hugging Face LLM Course** (free) for landscape.

> External resources summarized/paraphrased. Content was rephrased for compliance with
> licensing restrictions.

## Exit Checkpoint (you may advance when ALL are true)

- [ ] You can explain, unprompted, how AI/ML/DL/LLM/agent nest inside each other.
- [ ] You can define token, prompt, context window, training, inference, parameter,
      and model — in your own words.
- [ ] You can open Colab, write and run a 3-line Python snippet, and commit a file to GitHub.
- [ ] `glossary.md` and `mental-model.md` exist and are committed.

## Common Pitfalls

- Trying to *deeply* understand transformers now. Don't — this phase is the map, not
  the territory. Depth comes in Phase 3.
- Skipping the writing. The act of writing definitions in your own words *is* the learning.
