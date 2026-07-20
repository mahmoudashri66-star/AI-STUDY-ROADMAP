# 🛠️ Implementation Plan — Study Buddy Automation

**Status:** Draft for review · Execute only after the learner approves.

The build is split into **6 phases**. We do them **in order**, and each phase has an
**acceptance gate** — we don't move on until it's met. The MVP (Phases 1–2) gets you a
working daily loop fast; later phases add polish. Every setup step will be walked through
**click-by-click, with plain-English explanation** (requirement N5).

Legend: 🧑‍🏫 = mentor guides you live · 🤖 = Kiro builds it · ✅ = acceptance gate.

---

## Phase 1 — Accounts & foundations
*Goal: everything needed to build exists, and content is bot-ready.*

1. 🧑‍🏫 **Create the Telegram bot** via @BotFather → get `TELEGRAM_BOT_TOKEN`.
2. 🧑‍🏫 **Get your chat ID** (send `/start`; we read it once) → `TELEGRAM_CHAT_ID`.
3. 🧑‍🏫 **Create a free Cloudflare account**; install/prepare Wrangler (or use dashboard).
4. 🧑‍🏫 **Create a GitHub fine-grained token** (this repo only, Contents read/write) →
   `GITHUB_TOKEN`.
5. 🤖 **Restructure content:** convert existing `daily/week-01..03.md` into per-day files
   `daily/day-001.md … day-018.md` with frontmatter (per design §3); add a human index.
6. 🤖 **Create `automation/state.json`** initialized to Day 1 (per design §4).
7. 🤖 **Scaffold the Worker project** (`automation/worker/`): config, empty handlers,
   `.gitignore`, and a README on how to run/deploy.

✅ **Gate:** all tokens exist and are stored as Cloudflare secrets; content is in per-day
files; `state.json` exists; empty Worker deploys successfully (responds to a health check).

---

## Phase 2 — MVP core loop (the part that matters most)
*Goal: morning card arrives, `/done` updates GitHub + streak.*

1. 🤖 **GitHub helper**: read a file, write a file with SHA + retry on conflict.
2. 🤖 **Telegram helper**: send a message to the authorized chat.
3. 🤖 **Morning send** (`scheduled`): Cairo-time check → read `state` + today's card →
   send → mark `lastMorningSentDate` → commit.
4. 🤖 **Webhook handler** with security (secret header + chat-ID allow-list).
5. 🤖 **`/done`**: streak logic + tick `PROGRESS.md` + update `state` + commit + advance +
   reply with tomorrow preview (idempotent).
6. 🧑‍🏫 **Register the Telegram webhook** to the Worker URL (with secret).
7. 🧑‍🏫 **End-to-end test**: trigger a send; reply `/done`; confirm GitHub updates.

✅ **Gate:** for a simulated 3 days, the morning card sends once/day and `/done` correctly
updates progress, streak, and commits — with no duplicates.

---

## Phase 3 — Reminders & commands
*Goal: the day is fully interactive and forgiving.*

1. 🤖 **Evening reminder** (`scheduled`): send only if today not done.
2. 🤖 **DST-safe scheduling** finalized (dual cron + `Intl` Cairo check per design §6).
3. 🤖 **`/today`**, **`/status`**, **`/note <text>`**, **`/skip`** handlers.
4. 🧑‍🏫 **Test** each command and the reminder timing.

✅ **Gate:** all commands behave per requirements; reminder fires only when unfinished;
times are correct in Cairo local time.

---

## Phase 4 — Smart extras
*Goal: motivation and self-maintenance.*

1. 🤖 **Weekly summary** (Sunday 20:30 Cairo).
2. 🤖 **Milestone celebrations** (week/phase boundaries).
3. 🤖 **Buffer-low alert** (within 7 days of last generated content).

✅ **Gate:** a Sunday summary sends; completing a week triggers a celebration; buffer
alert fires at the threshold.

---

## Phase 5 — Full-year content generation *(parallel workstream)*
*Goal: all ~312 daily cards exist, quality preserved.*

1. 🤖 Generate content **phase by phase** (Phase 0–1 done in Phase 1 above → then ML →
   DL/LLMs → LLM apps → agents → shipping), each batch:
   - follows the standard card template,
   - uses only links from `plan/best-resources.md`,
   - is reviewed before the next batch.
2. 🤖 Update `state.totalDaysGenerated` as batches land.
3. 🧑‍🏫 Spot-review a sample of each batch together.

✅ **Gate:** content always stays ≥ several weeks ahead of `currentDay`; by completion,
all ~312 day files exist and pass a link/template check.

> This runs alongside Phases 2–4 so you can start studying immediately while content
> keeps filling in ahead of you.

---

## Phase 6 — Hardening & documentation
*Goal: reliable, secure, and fully understood.*

1. 🤖 Add retries, clear error messages, and event logging.
2. 🧑‍🏫 **Security review**: confirm no secrets in repo; token scopes minimal.
3. 🤖 **Plain-English docs**: a short "how each part works" walkthrough in
   `automation/README.md`, tied to your tools learning (Cloudflare, GitHub, APIs).
4. 🧑‍🏫 **You explain it back to me** — the real test that it's not a black box.

✅ **Gate:** you can describe, in your own words, what the Worker, webhook, cron, and
GitHub writes each do — and the system has run reliably for 7 real days.

---

## Sequencing summary

```
Phase 1 (setup) ─► Phase 2 (MVP loop) ─► Phase 3 (reminders/commands) ─► Phase 4 (extras) ─► Phase 6 (hardening)
                        │
                        └────────── Phase 5 (content) runs in parallel ──────────┘
```

**You can start studying the moment Phase 2 works** — the automation grows around your
daily habit, not the other way around.

---

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| DST drift (Egypt) | `Intl`/`Africa/Cairo` runtime check, dual cron (design §6) |
| Secret leakage | Cloudflare secrets, fine-grained token, `.gitignore`, review |
| GitHub write conflicts | SHA-based writes + retry loop |
| Content quality at scale | Phase batches + template + locked links + review |
| Getting stuck on setup | Every account step is mentor-guided, click by click |
| Losing motivation | Streak, reminders, weekly summary, celebrations |

---

## What I need from you to start executing
Just **"go"**. We begin with Phase 1, step 1: creating your Telegram bot together. I'll
give you the exact taps, wait for you, and we move one small step at a time. 🚀
