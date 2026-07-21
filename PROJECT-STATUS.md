# 📌 PROJECT STATUS — Checkpoint (resume here)

> **Last updated:** 21 July 2026 (end of session 2).
> **Read this first** to resume the project in any new session. It captures exactly
> where we are, what's built, and what's next — for both the **learning plan** and the
> **Study Buddy automation**.

---

## 🟢 Where we are right now (one glance)

- **Learning:** on **Week 1 · Day 1** (the map of AI). The learner is studying Day 1
  now using the **free** resource (see access note below). Not yet marked `/done`
  (`streak: 0`, `currentDay: 1`).
- **Automation (Study Buddy Telegram bot):** ✅ **BUILT, DEPLOYED, TESTED — LIVE.**
  ☀️ **The 7:00 AM auto-delivery fired successfully on 2026-07-21** — real-world timer
  test PASSED. The full daily loop works end to end.
- **Content:** Week 1 (`day-001..006`) is now **free-first** after the Coursera Plus
  gap in Egypt (see access note at the bottom of this file).

---

## 🤖 Study Buddy automation — status

### Build status
- ✅ **Phase 1 — Foundations:** Telegram bot created, Cloudflare account, GitHub token,
  Worker scaffolded & deployed, health check passing.
- ✅ **Phase 2 — MVP (working):** `/today`, `/status`, `/done` (streak + auto-log to
  GitHub), `/note`, `/skip`, morning delivery (07:00 Cairo), evening reminder (20:30
  Cairo). GitHub read/write via Contents API. DST-safe Cairo time. **All tested & passing.**
- 🔜 **Phase 4 — Polish (remaining):** Sunday weekly summary, low-buffer alert.
  (Milestone "week complete 🎉" message is already in `/done`.)
- 🔜 **Phase 5 — Content generation (remaining, the main job):** see Content status below.
- 🔜 **Phase 6 — Hardening (remaining):** GitHub write-conflict retry loop; the learner
  explaining the system back in their own words (the "no black box" check).

### Key facts (safe to store — NO secret values here)
| Thing | Value |
|---|---|
| Telegram bot | **@MahmoudStudyBuddy_bot** |
| Worker URL | **https://study-buddy.macalempire.workers.dev** |
| Cloudflare subdomain | `macalempire` |
| Timezone | Africa/Cairo (Egypt), DST-aware in code |
| Daily card time | **07:00** Cairo |
| Reminder time | **20:30** Cairo |
| Cron triggers set (UTC) | `0 4 * * *`, `0 5 * * *`, `30 17 * * *`, `30 18 * * *` |
| Telegram webhook | set → Worker URL, with secret header ✅ |

### Secrets (stored in **Cloudflare** dashboard — values are NOT and must NEVER be in this repo)
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `TELEGRAM_WEBHOOK_SECRET`, `GITHUB_TOKEN`
- Non-secret vars (in `wrangler.toml` / dashboard): `GITHUB_REPO`, `GITHUB_BRANCH=main`,
  `TIMEZONE=Africa/Cairo`

### How it was deployed (important for updates)
- Deployed via the **Cloudflare browser dashboard** (single-file paste of
  `automation/worker/src/index.js`), **not** the Wrangler CLI (the learner works in the
  browser, no local terminal).
- **To update the bot's code:** edit `automation/worker/src/index.js` → push to `main` →
  the learner **re-pastes it into the Cloudflare dashboard editor → Deploy**.
  *(Future enhancement: connect Cloudflare Git auto-deploy so pushes deploy automatically.)*
- **To change content or state:** just push to `main` — the Worker reads `daily/day-XXX.md`
  and `automation/state.json` live from GitHub, so changes take effect immediately.

---

## 📚 Content status

- ✅ **Bot-ready per-day cards:** `daily/day-001.md` … `daily/day-102.md`
  (**Weeks 1–17: Phase 0 + ALL Phase 1 + ALL Phase 2, complete**). All **free-first**.
  Buffer ≈ **17 weeks (~4 months)** ahead.
  - Phase 2 (Wk10–17): pandas/data → regression & loss → gradient descent (by hand) →
    train/test & overfitting → classification & logistic regression → decision trees →
    confusion matrix/precision/recall/F1 → clustering & feature engineering →
    full ML capstone project.
- ⬜ **Not yet generated:** Weeks 18–52 (Phases 3–6).
  Next batch: **Week 18** — start of **Phase 3: Deep Learning & How LLMs Actually Work**
  (neural networks → build by hand → PyTorch → embeddings → tokens → attention/
  transformers → build a tiny GPT). Free-first: 3Blue1Brown, **Karpathy Zero-to-Hero**,
  Jay Alammar's Illustrated Transformer, Hugging Face LLM course.
- 🗺️ The **full year skeleton** is defined in [`plan/full-plan.md`](./plan/full-plan.md).
- `automation/state.json`: `currentDay: 1`, `streak: 0`, `totalDaysGenerated: 6`.

> **Content format:** each day file has frontmatter (`day`, `week`, `phase`, `title`) then
> the card body. The bot sends the body. Links come from
> [`plan/best-resources.md`](./plan/best-resources.md). Keep the buffer several weeks
> ahead of `currentDay`, and bump `totalDaysGenerated` as batches land.

---

## ⏭️ What's next (prioritized for tomorrow / next session)

1. **☀️ Verify the 7:00 AM Cairo message** arrives automatically tomorrow — the first
   real-world test of the timers. If it doesn't, check the cron triggers in the Cloudflare
   dashboard and the Worker logs.
2. **Check in on Day 1** — ask the learner how studying Day 1 went; encourage `/done`.
3. **Generate content (main job):** convert `week-02.md`/`week-03.md` → `day-007..018`,
   then generate Phases 2–6 daily cards in **quality batches**, always keeping the buffer
   weeks ahead. Update `state.totalDaysGenerated` each batch.
4. **Polish (Phase 4):** Sunday weekly summary + low-buffer alert.
5. **Hardening (Phase 6):** write-conflict retry; learner explains the system back.

---

## 🔁 How to resume in a NEW session (instructions)

**Tell the agent:** *"Read `PROJECT-STATUS.md` and `AGENT-GUIDE.md`, check
`automation/state.json` for my current day and streak, and let's continue."*

The agent should then:
1. Read this file + `AGENT-GUIDE.md` (learner profile, rules).
2. Read `automation/state.json` for the live current day/streak.
3. Ask how Day 1 (or the latest day) went, and continue from "What's next" above.

---

## ⚙️ Critical workflow notes (do not forget)

- **Commit directly to `main`.** No branches/PRs for day-to-day (personal repo). `main`
  is the single source of truth. The default branch is `main`.
- **⚠️ PULL before you PUSH.** The live Worker commits to this repo on its own (progress,
  logs, morning-sent flags). Always `git pull` (or the pull tool) before pushing local
  changes, or the push will be rejected.
- **🔒 NEVER commit secret values** (bot token, chat id, webhook secret, GitHub token).
  They live only in Cloudflare. This repo is public.
- Old branches `roadmap/ai-mastery` and `roadmap/ai-mastery-v1` are merged/obsolete —
  ignore or delete them.

---

## 🗂️ Repo map (current)

```
README.md            → simple front door
START-HERE.md        → daily pointer
PROGRESS.md          → streak / checklist / logs (bot appends here)
PROJECT-STATUS.md    → THIS FILE — the resume checkpoint
AGENT-GUIDE.md       → how any session continues (learner profile + rules)
plan/
  full-plan.md       → the complete 52-week journey skeleton
  tools.md           → deep tool catalog (Kiro, GitHub, z.ai, Supabase, Cloudflare…)
  best-resources.md  → best courses / certificates with links
  daily-template.md  → template for new day cards
daily/
  day-001.md … 006   → bot-ready Week 1 cards (Phase 0)
  week-01/02/03.md   → human-readable weekly cards (02 & 03 need converting to day files)
automation/
  README.md          → what the automation is
  state.json         → LIVE state (current day, streak) — bot reads/writes this
  spec/              → requirements.md, design.md, implementation-plan.md
  worker/
    src/index.js     → the Worker code (the brain)
    wrangler.toml    → config + cron triggers
    README.md        → setup/deploy guide + build progress
```


---

## ⚠️ Access note (added after Day 1) — Coursera Plus in Egypt

Discovered that **Coursera Plus does not cover all courses in Egypt.** *Generative AI
for Everyone* showed **$31** (certificate) with **no Audit option**, only slow Financial
Aid — despite an active Plus subscription.

**Actions taken:**
- Updated `daily/day-001.md`, `day-002.md`, `day-006.md` to **free-first** resources
  (Google's free "Introduction to Generative AI" + 3Blue1Brown + auditable "AI For Everyone").
- Added a free-access policy + reliable free sources to `plan/best-resources.md`.

**Still TODO (important):**
- **Verify whether `AI Python for Beginners` (Phase 1 anchor) is Plus-covered/auditable
  for the learner in Egypt.** If not, switch Phase 1 to a free backbone (freeCodeCamp
  Python + py4e.com) before generating those day cards.
- Continue **free-first** when generating all future daily content; Coursera only where
  genuinely included/auditable or where a certificate matters.
