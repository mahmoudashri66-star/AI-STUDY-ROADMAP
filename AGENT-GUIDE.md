# 🤖 AGENT GUIDE — How to Continue This Learning Plan

> **This file is for any AI agent / Kiro session** helping the learner. Read it fully
> before doing anything. It exists so that *any new session* can continue the plan
> seamlessly, exactly as designed.
>
> 📌 **ALSO READ [`PROJECT-STATUS.md`](./PROJECT-STATUS.md) FIRST** — it's the live
> checkpoint of exactly where we are (learning position + the Study Buddy automation
> that is now built and running).

---

## 1. Who the learner is (do not lose this)

- **~1 year using AI tools** (ChatGPT, Gemini, Claude) as an advanced *operator*. Uses
  AI coding agents (Kiro), GitHub, and has built multi-month AI-assisted projects.
- **True beginner at coding.** Cannot yet read a traceback, has not written a program
  from a blank file, has not made a raw API call. Treat all code concepts from zero.
- **Mission = deep, lifelong understanding of AI.** Wants to become BOTH a *builder*
  (ships AI apps/agents) AND an *architect* (designs AI systems). **Income is a
  secondary byproduct, NOT the goal — never optimize the plan for quick money.**
- **Big motivation:** genuinely understanding the tools they already use but don't
  fully get — **Kiro, GitHub, z.ai, Supabase, Cloudflare, and the rest of the stack.**
  Tools are a first-class part of this plan, taught deeply.
- **Time:** ~4 focused hours/day (2 morning = learn, 2 night = practice), ~6 days/week.
- **Motivation killers:** (a) dry theory with no output, and (b) building things they
  don't understand. So **every concept must pair with a small, fully-understood build.**

## 2. The prime directives

1. **Keep it SIMPLE.** The learner asked explicitly for a "open → click → learn →
   practice → close → next day" experience. Daily cards must be short, concrete, and
   link directly to material. No walls of dense theory in the daily cards.
2. **Depth is not sacrificed — it's sequenced.** The simplicity is the *interface*.
   The full depth lives across the whole plan ([`plan/full-plan.md`](./plan/full-plan.md)).
   Never drop topics to make it shorter; spread them across more days instead.
3. **Foundations before frameworks.** Build the raw thing by hand before the tool that
   automates it (e.g., raw Python before libraries; raw API call before LangChain; a
   hand-written agent loop before agent frameworks).
4. **Every day ends with a GitHub commit.** Reinforce the tools-as-you-learn principle.

## 3. How the repo is organized

```
README.md            → simple front door
START-HERE.md        → the daily pointer
PROGRESS.md          → streak, checklist, logs (the bot appends here)
PROJECT-STATUS.md    → LIVE checkpoint — read this to resume
AGENT-GUIDE.md       → this file
plan/
  full-plan.md       → the COMPLETE journey: every phase + week-by-week map
  tools.md           → deep tool catalog (Kiro, GitHub, z.ai, Supabase, Cloudflare…)
  best-resources.md  → best courses / certificates / diplomas with links
  daily-template.md  → template for new day cards
learning-backlog.md  → /learn captures land here → turn into bonus lessons
daily/
  day-001.md … day-252.md → the FULL curriculum, BOT-READY (what the Telegram bot sends)
  week-01/02/03.md        → early human cards (superseded by day files — ignore)
automation/          → the Study Buddy Telegram bot (BUILT & LIVE — see PROJECT-STATUS.md)
  state.json         → live current day + streak + paused + times (bot reads/writes)
  worker/src/index.js → the Worker code (the brain), v2
```

> **Content is COMPLETE (day-001 … day-252).** There is nothing left to generate.
> The bot delivers `daily/day-XXX.md` files (3-digit day number, with frontmatter).

## 4. Your job when the learner returns

1. **Read [`PROJECT-STATUS.md`](./PROJECT-STATUS.md)** and **`automation/state.json`**
   (and `learning-backlog.md`) to find the live day/streak + any captured topics.
2. **Support the current day:** walk them through it (learn → practice → checklist),
   answer concept questions, encourage `/done`.
3. **Turn backlog items into bonus lessons:** if `learning-backlog.md` has `/learn`
   items, write **Kiro-quality bonus cards** for them (use the template + free-first
   links), delivered as extras that do NOT disturb the day-001..252 sequence; then
   remove the item from the backlog. (Content generation for the main plan is DONE.)
4. **Commit directly to `main`.** ⚠️ **PULL before you PUSH** — the live Worker commits
   to this repo on its own, so a stale local copy will be rejected. Never commit secrets.
   Run `node --check` on the Worker before asking the learner to re-paste it.

## 5. Rules for writing NEW day cards (critical for consistency)

- Use the template in [`plan/daily-template.md`](./plan/daily-template.md) exactly.
- One card = one day = ~4 hours (2h learn + 2h practice). If a topic needs more, split
  it across multiple days rather than cramming.
- **Always include real, clickable links** to the specific video/reading/doc. Prefer
  resources already listed in [`plan/best-resources.md`](./plan/best-resources.md).
  If a link may have moved, tell the learner to search the exact resource name.
- Weave a **tool day** in roughly once per week (understand a tool from
  [`plan/tools.md`](./plan/tools.md) hands-on).
- The Practice must be **doable and self-contained**, and produce something committable.
- Keep language plain and encouraging. Short sentences. No jargon without a one-line
  definition.

## 6. What NOT to do

- ❌ Don't dump the whole plan into daily cards (causes overwhelm — this already
  happened once and was corrected).
- ❌ Don't skip the coding/tools depth to save time.
- ❌ Don't reorder into a "make money fast" track.
- ❌ Don't invent fake URLs. Use verified links or name the resource to search.
