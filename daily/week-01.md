# 📅 Week 1 — Understand AI + Your Tools

**The goal this week:** stop feeling like you're using magic. By Sunday you'll be able
to explain what AI/LLMs are *and* what Kiro, GitHub, and z.ai actually do behind the
scenes. Almost no coding yet — this week is about *understanding your world*.

> How to use: open today's day, do the morning ▶️ then the night 🛠️, tick the boxes,
> write one line in [`../PROGRESS.md`](../PROGRESS.md). Then close the laptop. 🎉

---

## Week 1 · Day 1 — The map of AI

🎯 **Today:** get the big picture — what "AI" really means and how ML, deep learning,
LLMs, and agents fit inside it.

⏱️ **Morning (~2h) — Learn**
- ▶️ Start **Generative AI for Everyone** (Andrew Ng) — [open](https://www.coursera.org/learn/generative-ai-for-everyone) — watch Week 1 ("Introduction to Generative AI").
- 📝 In a notes file, answer in your own words: *What is AI? What is generative AI?*

🛠️ **Night (~2h) — Practice**
- Create a GitHub repo called **`ai-learning-journal`** (you know how — do it fresh).
- Add a file `glossary.md`. Write your own definitions for: **AI, machine learning,
  deep learning, LLM, agent.** (Guess first, then check against the course.)
- Commit it with the message: `Day 1: my AI glossary`.

✅ **Checklist**
- [ ] Watched Gen AI for Everyone, Week 1
- [ ] Wrote what AI / generative AI mean in my own words
- [ ] Created `ai-learning-journal` repo with `glossary.md`
- [ ] Committed to GitHub
- [ ] Can explain "AI vs ML vs LLM" to a friend

📝 **Log:** one line in [`../PROGRESS.md`](../PROGRESS.md).

➡️ **Next:** what an LLM actually is (tokens, prompts, context).

---

## Week 1 · Day 2 — What an LLM actually is

🎯 **Today:** understand how ChatGPT/Claude/GLM actually produce text — tokens,
prompts, context window, next-word prediction.

⏱️ **Morning (~2h) — Learn**
- ▶️ Continue **Generative AI for Everyone** — the lessons on *how LLMs work / what they
  can and can't do*. [open](https://www.coursera.org/learn/generative-ai-for-everyone)
- ▶️ Optional 15-min intuition boost: 3Blue1Brown channel — the "what is a large language
  model / transformer" intro. [@3blue1brown](https://www.youtube.com/@3blue1brown)
- 📝 Note the meaning of: **token, prompt, context window, hallucination.**

🛠️ **Night (~2h) — Practice**
- Open ChatGPT (or z.ai). Give it a task, then re-ask it in 3 different ways and note
  how the output changes. Add `prompt-experiments.md` to your journal with what you saw.
- Add the 4 new words to your `glossary.md`. Commit: `Day 2: LLM basics + prompt tests`.

✅ **Checklist**
- [ ] Learned how an LLM predicts the next word
- [ ] Defined token, prompt, context window, hallucination
- [ ] Ran 3 prompt experiments and wrote what changed
- [ ] Committed to GitHub
- [ ] Can explain "why an LLM sometimes makes things up"

📝 **Log:** one line in `../PROGRESS.md`.

➡️ **Next:** 🧰 Tool day — what Git & GitHub *really* are.

---

## Week 1 · Day 3 — 🧰 Tool day: GitHub & Git

🎯 **Today:** finally understand the tool you use constantly — what Git and GitHub are
actually doing (commits = time travel, branches = parallel copies).

⏱️ **Morning (~2h) — Learn**
- ▶️ Read the "Kiro & GitHub" section of [`../plan/tools.md`](../plan/tools.md).
- ▶️ Play **Learn Git Branching** — the "Introduction Sequence" — [open](https://learngitbranching.js.org/). It's visual and gamified; do the first few levels.
- 📝 Note in your own words: *what is a commit? a branch? why does version control matter?*

🛠️ **Night (~2h) — Practice**
- In your `ai-learning-journal` repo: make a **new branch**, add a note, commit, then
  merge it back (Learn Git Branching shows you how; try it for real on GitHub).
- Write `git-notes.md`: explain commit, branch, merge like you'd teach a friend.
- Commit: `Day 3: understanding git`.

✅ **Checklist**
- [ ] Finished the Learn Git Branching intro levels
- [ ] Made a branch, committed, merged for real
- [ ] Wrote `git-notes.md` in my own words
- [ ] Committed to GitHub
- [ ] Can explain what a commit and a branch are

📝 **Log:** one line in `../PROGRESS.md`.

➡️ **Next:** 🧰 Tool day — what Kiro (your AI agent) really is.

---

## Week 1 · Day 4 — 🧰 Tool day: Kiro & AI coding agents

🎯 **Today:** understand what Kiro actually is — an AI *agent* that works in a loop —
and why it makes the moves it makes (the beginning of a big "aha" you'll complete in Phase 5).

⏱️ **Morning (~2h) — Learn**
- ▶️ Read the "Kiro" section of [`../plan/tools.md`](../plan/tools.md).
- ▶️ Skim the Kiro docs: [Get Started](https://kiro.dev/docs/) and [Working with the agent](https://kiro.dev/docs/web/using-the-agent/).
- 📝 Note the loop in your words: **think → choose a tool → act → look at result → repeat.**

🛠️ **Night (~2h) — Practice**
- Open one of your past Kiro projects (or start a tiny new task). This time, **watch
  what it does step by step** and write it down: what did it read, decide, and run?
- Add `how-kiro-works.md` to your journal describing the loop you observed.
- Commit: `Day 4: how Kiro thinks`.

✅ **Checklist**
- [ ] Read the Kiro tools section + docs
- [ ] Watched Kiro work and wrote down its steps
- [ ] Wrote `how-kiro-works.md`
- [ ] Committed to GitHub
- [ ] Can explain "Kiro is an LLM in a loop that uses tools"

📝 **Log:** one line in `../PROGRESS.md`.

➡️ **Next:** 🧰 Tool day — z.ai, models, and what an "API" is.

---

## Week 1 · Day 5 — 🧰 Tool day: z.ai, models & APIs

🎯 **Today:** understand what z.ai/GLM are (a model provider, like GPT or Claude) and
what an **API** is — the thing that lets code talk to a model.

⏱️ **Morning (~2h) — Learn**
- ▶️ Read the "z.ai" section of [`../plan/tools.md`](../plan/tools.md).
- ▶️ Skim [z.ai](https://z.ai) and the [developer quick start](https://docs.z.ai/guides/overview/quick-start) — just to see what a model API looks like (you'll use it for real in Phase 4).
- 📝 Note in your words: *what is a model? what is an API? what is an API key?*

🛠️ **Night (~2h) — Practice**
- Give the **same prompt** to 2–3 different models you have access to (ChatGPT, Claude,
  z.ai/GLM, Gemini). Note the differences in a file `model-comparison.md`.
- Add "model", "API", "API key" to your `glossary.md`. Commit: `Day 5: models & APIs`.

✅ **Checklist**
- [ ] Understood model vs. provider vs. API
- [ ] Compared the same prompt across 2–3 models
- [ ] Updated glossary with model/API/API key
- [ ] Committed to GitHub
- [ ] Can explain "an API lets my code use a model"

📝 **Log:** one line in `../PROGRESS.md`.

➡️ **Next:** review the week + set up your Python playground.

---

## Week 1 · Day 6 — Review + set up your Python playground

🎯 **Today:** lock in Week 1 and get your coding environment ready for next week.

⏱️ **Morning (~2h) — Learn / Review**
- Re-read your own `glossary.md` and notes. Fix anything that's now clearer.
- Finish any remaining **Generative AI for Everyone** Week 1 lessons for the certificate progress.

🛠️ **Night (~2h) — Practice**
- Open **Google Colab** — [colab.research.google.com](https://colab.research.google.com).
  Create a new notebook, type `print("Hello, my AI journey")`, and run it. 🎉
- Save the notebook to GitHub (Colab can save straight to your repo).
- Write a 5-line summary of Week 1 in `../PROGRESS.md`. Commit: `Week 1 complete`.

✅ **Checklist**
- [ ] Reviewed and improved my glossary/notes
- [ ] Ran my first Python line in Colab
- [ ] Saved the notebook to GitHub
- [ ] Wrote my Week 1 summary
- [ ] I can explain AI, LLMs, Kiro, GitHub, and z.ai in my own words

📝 **Log:** "Week 1 done ✅" + one thing that clicked.

➡️ **Next week:** you start actually coding — Python from zero. → [`week-02.md`](./week-02.md)

---

🎉 **End of Week 1.** You now understand the world you've been working in. That's a real
milestone — most "AI users" never get here.
