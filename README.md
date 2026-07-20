# AI Mastery Roadmap — From Operator to Builder to Architect

> A personal, learning-first blueprint for deeply understanding AI, building with it,
> and making it a permanent extension of how I think and work.

This repository is my long-term AI education, designed as a professional technical
specification: clear requirements, phased implementation, dependencies, and
measurable outcomes for every stage. It is meant to be **lived in and evolved**, not
read once. Track progress in [`PROGRESS.md`](./PROGRESS.md).

---

## 1. Mission

**Learn AI deeply enough that it becomes a core component of my thinking and my work
for the rest of my life.**

Not "get better at prompting." Not "make quick money." The goal is genuine
understanding: to know *what is happening behind the scenes*, to **build** systems
rather than only operate tools someone else built, to **design** AI solutions and
pick the right tool for the right problem, and to **keep adapting** as the field
changes — because the specifics will change, but the foundations will not.

Income is a **welcome byproduct** of becoming genuinely skilled. It is intentionally
*not* the optimization target. If we optimize for skill, income eventually follows.
If we optimize for quick income, skill stalls — and so does the income.

---

## 2. Learner Profile (the honest starting point)

This roadmap is calibrated to a specific person. Being accurate here is what makes it
work.

| Dimension | Reality |
|---|---|
| **AI usage** | ~1 year. Fluent *operator* of ChatGPT, Gemini, Claude. Uses AI coding agents (Kiro), Git/GitHub, persistent multi-month projects. Already past the "chatbot user" stage. |
| **Coding ability** | **True beginner.** Cannot yet read a traceback, has never written a program from a blank file, has never made an API call directly. Everything so far has been agent-directed. |
| **The core gap** | Operates powerful tools without understanding the principles beneath them. Wants to close that gap permanently. |
| **Time budget** | ~4 focused hours/day: **2 hours morning + 2 hours night.** Consistent. ~24–28 hrs/week. |
| **Learning style** | Mix of theory-first and build-first. **Motivation is killed by dry theory with no output AND by building things not understood.** |
| **Long-term identity** | Wants to become **both a builder** (can ship AI apps/agents) **and an architect** (can design and orchestrate AI systems). |
| **Existing domains** | Trading, investing, real estate, marketing, social media, content, cooking, nutrition, fitness, business, productivity — used as *sources of practice projects*, not as the goal. |
| **Resources owned** | **Coursera Plus** (annual). Maximize this before paying for anything else. |

---

## 3. Design Rationale (why this roadmap is shaped the way it is)

Five design decisions drive everything below:

1. **Learning leads; money is a byproduct.** No phase is bent toward short-term
   revenue. Where income opportunities appear naturally, they are noted as optional
   side-effects, never as prerequisites to advance.

2. **Coding is non-negotiable and comes early.** "Understand what the agent is doing"
   and "build AI systems" are *impossible* without the ability to read and write code.
   So Python is Pillar 1, not an optional side quest. The early weeks will be slow and
   humbling on purpose.

3. **Tight concept→build loops everywhere.** Because both pure theory and black-box
   building kill motivation, every concept is paired with a *small, fully understood*
   build. Morning = learn the idea. Night = build the smallest thing that proves you
   understand it. Never watch 5 hours of lectures. Never copy code you can't explain.

4. **Foundations before frameworks.** We build a tiny neural net *by hand* before
   touching PyTorch; call an LLM API *raw* before touching LangChain; write an agent
   loop *from scratch* before using an agent framework. Frameworks make sense only
   once you know what they're hiding.

5. **Personalization through projects.** Every phase's capstone applies to one of the
   learner's real domains (e.g., a trading-notes assistant, an English-teaching
   content engine). This keeps motivation high and builds a real portfolio as a
   byproduct.

---

## 4. The Daily Rhythm (the operating system of this plan)

Roadmaps die in the gap between "hours available" and "hours used well." This is the
default structure for the 4-hour day. Adjust the *content*, keep the *shape*.

| Block | Time | Purpose | Rule |
|---|---|---|---|
| **Morning (2h)** | Fresh brain | **Acquire** — new concepts, course videos, reading, notes. | Harder/newer material goes here. Take written notes in your own words. |
| **Night (2h)** | Consolidate | **Apply** — code, build, break, fix, and explain. | Build the smallest thing that uses the morning's concept. If it works, explain *why* out loud. |

**Weekly shape:** 5–6 study days, 1 review/rest day. On the review day: no new
material — re-read notes, re-run past builds without looking, write a 5-line summary
of the week in `PROGRESS.md`.

**The non-negotiable habit:** every single thing you build goes into a Git repo with
a real commit message. You already know Git — now use it as a learning journal.

---

## 5. Phase Overview (the 12-month arc)

Durations assume ~24 hrs/week. They are *targets, not deadlines*. Understanding beats
schedule — if a phase needs more time, take it.

| Phase | Title | Focus | Duration | Prerequisite |
|---|---|---|---|---|
| **[0](./phases/00-orientation.md)** | Orientation & Mental Models | Build a correct map of the whole field; set up tools; kill vocabulary confusion. | ~2 weeks | None |
| **[1](./phases/01-python-foundations.md)** | Python Foundations | Learn to program from zero. Read tracebacks. Write scripts by hand. | ~8 weeks | Phase 0 |
| **[2](./phases/02-machine-learning.md)** | How Machine Learning Works | The real mechanics: data, models, training, loss, evaluation. Just-enough math. | ~8 weeks | Phase 1 |
| **[3](./phases/03-deep-learning-and-llms.md)** | Deep Learning & How LLMs Work | Neural nets, embeddings, tokens, attention, transformers. Understand ChatGPT from the inside. | ~10 weeks | Phase 2 |
| **[4](./phases/04-llm-apps-apis-rag.md)** | Building with LLMs: APIs, Prompting, RAG | Your first API calls, systematic prompting, embeddings, vector DBs, RAG apps. | ~8 weeks | Phase 3 |
| **[5](./phases/05-ai-agents.md)** | AI Agents — Understand & Build | The agent loop from scratch, tool use, memory, frameworks. Finally understand *why Kiro decides what it decides*. | ~8 weeks | Phase 4 |
| **[6](./phases/06-shipping-and-architecture.md)** | Shipping Products & Systems Design | Deploy real apps, evaluation, cost/latency/safety, and the architect's lens. Builder → Architect. | ~8 weeks+ | Phase 5 |

**Total core arc: ~52 weeks.** Then continuous specialization (Section 8).

```
Phase 0  ──►  Phase 1  ──►  Phase 2  ──►  Phase 3  ──►  Phase 4  ──►  Phase 5  ──►  Phase 6
Mental map    Python        ML           DL & LLMs     LLM apps      Agents        Ship + Architect
(2w)          (8w)          (8w)         (10w)         (8w)          (8w)          (8w+)
   │            │             │             │             │             │             │
   └─ correct   └─ can code   └─ know how   └─ know how   └─ build      └─ build      └─ ship real
      vocabulary   by hand       models learn   LLMs work    LLM apps      agents        products;
                                                                                          think in systems
```

---

## 6. Global Resource Library

Curated for **quality over popularity**. Coursera Plus is the spine (already paid
for); external resources appear only where they are clearly superior. Full
phase-specific lists live inside each phase file.

### Primary spine — Coursera Plus
- **AI Python for Beginners** — Andrew Ng / DeepLearning.AI. Built specifically for
  non-coders, teaches Python *with* an AI assistant beside you. Ideal Phase 1 anchor.
  ([course page](https://www.coursera.org/learn/ai-python-for-beginners))
- **Machine Learning Specialization** — Andrew Ng / DeepLearning.AI & Stanford. The
  canonical, beginner-friendly ML foundation. Phase 2 anchor.
  ([specialization](https://www.coursera.org/specializations/machine-learning-introduction))
- **Deep Learning Specialization** — Andrew Ng / DeepLearning.AI. The standard deep
  learning foundation. Phase 3 anchor.
  ([specialization](https://www.coursera.org/specializations/deep-learning))
- **Generative AI for Everyone** — Andrew Ng. Excellent conceptual framing for Phase 0.
  ([course](https://www.coursera.org/learn/generative-ai-for-everyone))
- **AI Agents and Agentic AI in Python** — Dr. Jules White / Vanderbilt. Beginner,
  hands-on agent building. Phase 5 anchor.
  ([specialization](https://www.coursera.org/specializations/ai-agents-python))

### External — used only when clearly superior (mostly free)
- **Neural Networks: Zero to Hero** — Andrej Karpathy (YouTube). Builds a GPT from
  scratch, line by line. The single best "behind the scenes" resource in existence.
  Phase 3.
- **3Blue1Brown — Neural Networks & Transformers series** (YouTube). Unmatched visual
  intuition for the math. Phases 2–3.
- **The Illustrated Transformer** — Jay Alammar (blog). The clearest written
  explanation of attention/transformers. Phase 3.
- **Hugging Face LLM Course** (free). Hands-on transformers and the modern LLM stack.
  Phases 3–4.
- **Practical Deep Learning for Coders** — fast.ai (free). Top-down, build-first deep
  learning. Optional complement to Phase 3.
- **Python for Everybody** — Dr. Chuck / U. Michigan (free on YouTube, also Coursera).
  Backup/complement for Phase 1 if you want a second explanation.
- **DeepLearning.AI short courses** (many free): *Building Systems with the ChatGPT
  API*, prompt engineering, RAG, and agentic courses. Phases 4–5.

> **Attribution note:** external descriptions above are paraphrased summaries.
> Content was rephrased for compliance with licensing restrictions.

---

## 7. Success Metrics & Checkpoints

You are not "done with a phase" when you finish the videos. You are done when you pass
its **exit checkpoint** — a thing you can *do without help*. Each phase file defines
its own checkpoint. The global markers:

- **After Phase 1:** You can read a Python traceback, find the bug, and fix it — from
  code *you* wrote — without asking an AI to do it for you.
- **After Phase 2:** You can explain, in plain language, how a model "learns" from
  data, and train a simple model on a dataset yourself.
- **After Phase 3:** You can explain what a token, an embedding, and attention are,
  and why an LLM predicts the next word — and you've built a tiny neural net by hand.
- **After Phase 4:** You have built and run an LLM app that answers questions over
  *your own* documents (RAG), calling the API yourself.
- **After Phase 5:** You have built an agent from scratch (the raw loop) *and* with a
  framework, and can explain why an agent chooses a given tool/step.
- **After Phase 6:** You have shipped one end-to-end AI product, deployed and public
  on GitHub, and can reason about its cost, latency, evaluation, and failure modes.

**The meta-metric:** could you *teach* this week's concept to someone else in 5
minutes? If not, you learned to recognize it, not to understand it. Go back.

---

## 8. Long-Term Specialization Paths (after the core arc)

The core arc makes you dangerous across the board. Then you go deep on one of these
(they overlap; pick by what you enjoyed most):

- **AI Application / Agent Engineer** — build and ship production agents and LLM apps.
  (Deepens Phases 4–6.)
- **Applied AI in a Vertical** — combine AI with a domain you already know (fintech /
  trading, proptech / real estate, edtech / English). Highest leverage given your
  existing expertise.
- **AI Systems Architect / Strategist** — design multi-component AI systems, choose
  tools, evaluate tradeoffs, direct teams and tools. (Builder skills + systems
  thinking.)
- **ML/Deep Learning Depth** — go further into model training, fine-tuning, and
  research literacy. (Deepens Phases 2–3.)

---

## 9. Common Mistakes to Avoid (read this monthly)

1. **Tutorial hell** — watching endless courses without building. Cure: the night
   block is *always* for building, never for more videos.
2. **Black-box copying** — pasting code you can't explain. Cure: if you can't explain
   a line, you don't get to keep it. Rewrite it until you can.
3. **Framework-first** — reaching for LangChain/PyTorch before understanding the raw
   thing underneath. Cure: build the primitive by hand first (see Design Rule 4).
4. **Skipping the boring Python weeks** — they feel slow, but they're the foundation
   of everything after. Cure: trust the sequence.
5. **Optimizing for money mid-learning** — chasing a gig that derails the arc. Cure:
   note the opportunity, finish the phase, revisit later.
6. **No spaced repetition** — moving on and forgetting. Cure: the weekly review day
   and re-running old builds from memory.
7. **Perfectionism** — polishing one project forever. Cure: ship it, commit it, move
   on. Portfolio > perfection.

---

## 10. How to Use This Repo

1. Read this README fully, then read [`phases/00-orientation.md`](./phases/00-orientation.md).
2. Work one phase at a time, top to bottom. Don't skip ahead.
3. Log every study session and checkpoint in [`PROGRESS.md`](./PROGRESS.md).
4. Commit your practice code (in separate project repos) with real messages.
5. Revisit Section 9 (common mistakes) on the first of every month.
6. This is a living document — as you learn and as AI evolves, we revise it together.

---

*This roadmap is a starting specification, not scripture. We will refine phases,
swap resources, and adjust pacing based on how the learning actually goes.*
