# 📌 PROJECT STATUS — Checkpoint (READ THIS FIRST to resume)

> **Last updated:** 21 July 2026 (session 3).
> This is the single source of truth for resuming. It captures where things stand, how
> everything works, the key decisions (and *why*), and how to continue — for both the
> **learning plan** and the **Study Buddy automation**.

---

## 🟢 One-glance status

- **Learning position:** **Day 1** of 252 (`automation/state.json` → `currentDay: 1`,
  `streak: 0`). The learner (Mahmoud, Egypt 🇪🇬) is studying Day 1. Nothing `/done` yet.
- **Curriculum content:** ✅ **100% COMPLETE** — all **252 daily cards**
  (`daily/day-001.md … day-252.md`), 6 phases, free-first. Nothing left to generate.
- **Study Buddy Telegram bot:** ✅ **BUILT, DEPLOYED, TESTED, LIVE** — v2 (daily loop +
  backlog + controls + `/index`). Real-world 7 AM auto-delivery confirmed working.
- **In short: the whole system is DONE.** The only thing left is the learner doing it,
  plus optional support (turn backlog items into bonus lessons, minor polish).

---

## 🤖 Study Buddy bot — facts (NO secret values here)

| Thing | Value |
|---|---|
| Telegram bot | **@MahmoudStudyBuddy_bot** |
| Worker URL | **https://study-buddy.macalempire.workers.dev** |
| Cloudflare subdomain | `macalempire` |
| Timezone | Africa/Cairo (Egypt), DST-safe **in code** (uses `Intl`) |
| Daily card time | **07:00** Cairo (configurable via `/settime`) |
| Reminder time | **20:30** Cairo |
| Cron trigger (v2) | **`0,30 * * * *`** (fires every :00/:30 UTC; code checks Cairo time). If `/settime` to a non-default hour doesn't fire, verify this cron is set in the dashboard. |
| Telegram webhook | set → Worker URL, with secret header ✅ |

**Secrets — stored ONLY in the Cloudflare dashboard, NEVER in this repo:**
`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `TELEGRAM_WEBHOOK_SECRET`, `GITHUB_TOKEN`.
Non-secret vars: `GITHUB_REPO`, `GITHUB_BRANCH=main`, `TIMEZONE=Africa/Cairo`.

### Bot commands (all live & tested)
- **Learning:** `/today` · `/done` · `/index` (curriculum map; `/index 0-6` drills into a phase) · `/status` · `/note <text>` · `/skip`
- **Backlog:** `/learn <topic>` (capture to `learning-backlog.md`) · `/backlog` · `/drop <n>`
- **Control:** `/pause` · `/resume` · `/settime <hour>`
- **Help:** `/help` · `/menu`

### How to update the bot (deployed via browser dashboard, NOT Wrangler CLI)
- **Change bot code:** edit `automation/worker/src/index.js` → push to `main` → learner
  **re-pastes it into the Cloudflare dashboard editor → Deploy**. (Run `node --check`
  on it first to catch syntax errors.)
- **Change content/state:** just push to `main` — the Worker reads `daily/day-XXX.md`,
  `automation/state.json`, `PROGRESS.md`, and `learning-backlog.md` **live from GitHub**,
  so changes take effect immediately (no redeploy needed).

---

## 📚 Curriculum content — ✅ COMPLETE (252 days)

All free-first (no paywalls). Each day file: frontmatter (`day`, `week`, `phase`,
`title`) + card body (goal → morning learn w/ links → night practice → checklist).

| Phase | Days | Weeks | Theme |
|---|---|---|---|
| 0 | 1–6 | 1 | Understand AI + your tools (Kiro, GitHub, z.ai) |
| 1 | 7–54 | 2–9 | Learn to code — Python |
| 2 | 55–102 | 10–17 | How machine learning works |
| 3 | 103–162 | 18–27 | Deep learning & how LLMs work (build a tiny GPT) |
| 4 | 163–192 | 28–32 | Building LLM apps — APIs, prompting, RAG |
| 5 | 193–222 | 33–37 | AI agents (+ decode how Kiro works) |
| 6 | 223–252 | 38–42 | Ship products + architecture (Milestone 7) |

7 milestones; each phase capstone is meant to land in a public repo (portfolio).

---

## ⏭️ What's next (ALL OPTIONAL — nothing is blocking)

1. **Support daily learning:** answer concept questions, help with the day's practice,
   celebrate streaks. (Primary ongoing job.)
2. **Backlog → bonus lessons:** when the learner has `/learn` items in
   `learning-backlog.md`, turn them into **Kiro-quality bonus lessons** (new
   `daily/bonus-XX.md` files or delivered directly). These must NOT disturb the main
   day-001..252 sequence. Then remove the item from the backlog.
3. **Optional bot polish (Phase 4/6 of the automation spec):** Sunday weekly-summary
   message, low-buffer alert (n/a now — content complete), GitHub write-conflict retry loop.
4. **After Day 252:** specialization paths — see `plan/full-plan.md` §"After the core arc".

---

## 🧠 Decisions log (the *why* — so no one re-litigates settled choices)

- **Mission = deep, lifelong learning of AI.** NOT a money hustle. Income is a welcome
  byproduct only. Never re-optimize the plan for quick cash.
- **Learner is a true beginner coder** (native-like English, Egypt). Wants to be BOTH a
  builder AND an architect. Motivation dies from dry theory AND black-box building → every
  card pairs a concept with a small, understood build.
- **Free-first content.** Coursera Plus does NOT cover all courses in Egypt (e.g.,
  *Generative AI for Everyone* showed $31, no audit). So every card uses a free primary
  resource. *AI Python for Beginners* is used via its **free DeepLearning.AI link** (not
  Coursera). Free backbone: Google Cloud Skills Boost, freeCodeCamp, py4e, Karpathy,
  3Blue1Brown, StatQuest, Hugging Face, fast.ai.
- **Build-now-understand-as-we-go** (not "black box now, rebuild later"): the bot was
  built WITH the learner and documented in plain English.
- **Backlog + bonus model** (chosen over true insertion/"playlist"): captured topics
  never disrupt the fixed day sequence.
- **Kiro-quality lessons** (chosen over live LLM-generation): keeps quality high and
  links accurate; no API key/cost in the bot.
- **Arabic study-material idea (session 3): CONSIDERED and DROPPED.** Generating a full
  Arabic course to replace platforms was judged a quality/authority downgrade + would hurt
  English-in-AI fluency (which the learner has). Decision: use on-demand "explain in
  Egyptian Arabic" via existing AI tools instead. Do NOT build an Arabic course.
- **Content generated compactly:** Phases map to the day ranges in the table above (some
  full-plan.md week numbers were compressed during generation — the day-XXX files are the
  source of truth, and `/index` reflects the real structure).

---

## 🔁 How to resume in a NEW session

**Learner says:** *"Read `PROJECT-STATUS.md` and `AGENT-GUIDE.md`, check
`automation/state.json` for my current day, and let's continue."*

Then the agent should:
1. Read this file + `AGENT-GUIDE.md` (full learner profile + rules).
2. **Pull latest** and read `automation/state.json` (live `currentDay`, `streak`,
   `paused`) and `learning-backlog.md` (any captured topics to turn into bonus lessons).
3. Ask how the current day went; help with the material; handle any backlog items.

---

## ⚙️ Critical workflow notes (do NOT forget)

- **Commit directly to `main`** (personal repo, single source of truth; default branch = `main`).
- **⚠️ ALWAYS PULL before you PUSH.** The live Worker commits to this repo on its own
  (progress, logs, backlog edits, pause/resume, settime). A stale local copy → push
  rejected. Use the pull tool first, every time.
- **🔒 NEVER commit secret values.** This repo is PUBLIC. Secrets live only in Cloudflare.
- **Verify bot code with `node --check`** before asking the learner to re-paste it.
- Old branches `roadmap/ai-mastery*` are obsolete — ignore.
- The empty local `phases/` folder is an untracked leftover (not in the repo) — ignore.

---

## 🗂️ Repo map

```
README.md            → simple front door
START-HERE.md        → daily pointer ("open your current day")
PROGRESS.md          → streak / checklist / logs (bot appends here on /done, /note)
PROJECT-STATUS.md    → THIS FILE — the resume checkpoint
AGENT-GUIDE.md       → learner profile + rules for any agent
learning-backlog.md  → /learn captures land here → turn into bonus lessons
plan/
  full-plan.md       → the full journey rationale/skeleton
  tools.md           → deep tool catalog (Kiro, GitHub, z.ai, Supabase, Cloudflare…)
  best-resources.md  → best courses/certs + free-first policy + Egypt access note
  daily-template.md  → template for writing new day/bonus cards
daily/
  day-001.md … day-252.md   → the FULL curriculum (bot-ready, free-first)
  week-01/02/03.md          → early human-readable weekly cards (superseded by day files)
automation/
  README.md          → plain-English overview + command reference
  state.json         → LIVE state (currentDay, streak, paused, times) — bot reads/writes
  spec/              → requirements.md, design.md, implementation-plan.md
  worker/
    src/index.js     → the Worker code ("the brain") — v2
    wrangler.toml    → config + cron ("0,30 * * * *")
    README.md        → setup/deploy guide + commands + re-deploy steps
```

---

## ✅ Session 3 summary (what changed since session 2)
- Generated the **entire remaining curriculum** (day-007 → day-252) — all 6 phases complete.
- Shipped **Study Buddy v2**: `/learn`, `/backlog`, `/drop`, `/pause`, `/resume`,
  `/settime`, `/help`+`/menu`; switched cron to `0,30 * * * *`; added `paused` to state.
- Added **`/index`** (curriculum map + per-phase drill-down).
- Considered and **dropped** the Arabic-course idea (see decisions log).
- All deployed & tested by the learner; everything committed & pushed to `main`.
