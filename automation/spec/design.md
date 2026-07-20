# 🏗️ Design — Study Buddy Automation

**Status:** Draft for review

This explains *how* the system works, in enough detail to build it — and in plain enough
language that the learner understands every piece (per requirement **N5, "no black
box"**). Read alongside [requirements.md](./requirements.md).

---

## 1. Architecture overview

```
                        ┌──────────────────────────────────────────┐
                        │            Cloudflare Worker               │
                        │            ("the brain")                   │
   ⏰ Cron triggers ───►│  • morning send   • evening reminder       │
   (timers, UTC)        │  • weekly summary                          │
                        │                                            │
   📱 Telegram  ───────►│  • webhook handler: /done /today /status   │
   (your replies)       │    /note /skip                             │
                        └───────────────┬───────────────┬───────────┘
                                        │               │
                          reads content │               │ reads/writes progress
                          & state       ▼               ▼
                        ┌──────────────────────────────────────────┐
                        │              GitHub repo                   │
                        │  daily/day-001.md … day-312.md  (content)  │
                        │  automation/state.json          (state)    │
                        │  PROGRESS.md                    (human log) │
                        └──────────────────────────────────────────┘
                                        ▲
                                        │ sends messages / receives commands
                                        ▼
                                   📱  You, in Telegram
```

**One program, two ways it wakes up:**
1. **On a timer** (Cloudflare Cron Triggers) → sends morning card, evening reminder,
   weekly summary.
2. **On your message** (Telegram webhook → Worker HTTP handler) → handles commands.

Both paths read/write the **GitHub repo**, which is the single source of truth.

---

## 2. Components

### 2.1 Telegram Bot
- Created via **@BotFather** (free). Gives us a **bot token**.
- The learner sends `/start` once so we can capture their **chat ID** (the authorized user).
- We register a **webhook** so Telegram forwards messages to our Worker URL, secured with
  a secret token header.

### 2.2 Cloudflare Worker ("the brain")
- A small JavaScript program running serverless on Cloudflare's edge (free tier).
- **Two entry points:**
  - `scheduled(event)` — runs on cron triggers (timers).
  - `fetch(request)` — runs when Telegram calls our webhook.
- Holds no data itself; it reads/writes the GitHub repo via the GitHub API.
- Secrets provided via Cloudflare **environment secrets**: `TELEGRAM_BOT_TOKEN`,
  `TELEGRAM_CHAT_ID`, `TELEGRAM_WEBHOOK_SECRET`, `GITHUB_TOKEN`, `GITHUB_REPO`.

### 2.3 GitHub repo (single source of truth)
- **Content:** one file per day, `daily/day-001.md` … `day-312.md`, each with a small
  frontmatter header (see §3).
- **State:** `automation/state.json` — the machine-readable memory (see §4).
- **Human log:** `PROGRESS.md` — the readable checklist/journal (already exists).
- The Worker uses the **GitHub Contents API** to read files and commit updates.

> **Why per-day files?** The current `daily/week-01.md` files bundle 6 days each — great
> for humans, awkward for a bot. Splitting into `day-XXX.md` lets the Worker fetch
> exactly today's card by number. We'll keep a human-friendly index too.

---

## 3. Content format (per-day file)

Each `daily/day-XXX.md` starts with frontmatter the Worker can parse, then the card:

```markdown
---
day: 8
week: 2
phase: "1 — Learn to Code"
title: "Variables & printing"
links:
  - "AI Python for Beginners | https://www.coursera.org/learn/ai-python-for-beginners"
---

🎯 **Today:** store information in variables and show it with `print()`.

☀️ **Morning (~2h) — Learn** …
🌙 **Night (~2h) — Practice** …
✅ **Checklist** …
```

- The Worker sends the body as the Telegram message (Telegram supports Markdown).
- Links in frontmatter give a clean "today's links" block; all links come from
  `plan/best-resources.md`.

---

## 4. State model — `automation/state.json`

```json
{
  "currentDay": 1,
  "totalDaysGenerated": 18,
  "streak": 0,
  "longestStreak": 0,
  "lastCompletedDate": null,
  "lastActionDate": null,
  "totalDaysCompleted": 0,
  "restDays": 0,
  "timezone": "Africa/Cairo",
  "morningHour": 7,
  "reminderHour": 20,
  "reminderMinute": 30,
  "lastMorningSentDate": null,
  "lastReminderSentDate": null
}
```

- `currentDay` — which day-file to deliver next.
- `lastCompletedDate` / `lastMorningSentDate` — stored as **Cairo-local `YYYY-MM-DD`** so
  "once per day" and streak logic are unambiguous.
- Streak fields track the 🔥 count and record.
- `totalDaysGenerated` powers the buffer alert (R10).

**Why JSON, not parse PROGRESS.md?** Machines shouldn't parse prose. `state.json` is the
reliable source; `PROGRESS.md` is the human mirror the Worker also updates.

---

## 5. Key flows

### 5.1 Morning send (cron)
1. Cron fires (see §6 for timing). Worker computes current Cairo local time.
2. If Cairo hour == `morningHour` AND `lastMorningSentDate` != today:
   - Read `state.json` → `currentDay`.
   - Read `daily/day-<currentDay>.md`.
   - Send the card to `TELEGRAM_CHAT_ID` via Telegram `sendMessage`.
   - Set `lastMorningSentDate = today`; commit `state.json`.
3. If content file missing → send fallback (R1), do not advance.

### 5.2 `/done` (webhook)
1. Verify secret header + chat ID (else reject).
2. Read `state.json`.
3. If `lastCompletedDate == today` → reply "already done", stop (idempotent).
4. Compute streak:
   - `lastCompletedDate == yesterday` → `streak += 1`
   - else → `streak = 1`
   - update `longestStreak`.
5. Update `PROGRESS.md`: tick the current day's checkbox; add a dated log line.
6. Update `state.json`: `lastCompletedDate = today`, `totalDaysCompleted += 1`,
   `currentDay += 1`.
7. Commit both files (one commit).
8. Reply: confirmation + streak + one-line preview of the new current day.
9. If milestone reached (week/phase boundary) → append celebration (R9).
10. If buffer low → append heads-up (R10).

### 5.3 Evening reminder (cron)
- At Cairo `reminderHour:reminderMinute`, if `lastCompletedDate != today` and
  `lastReminderSentDate != today` → send reminder; set `lastReminderSentDate`.

### 5.4 Other commands
- `/today` → read + resend `day-<currentDay>.md`.
- `/status` → format fields from `state.json`.
- `/note <text>` → append to `PROGRESS.md` log; commit.
- `/skip` → set `lastActionDate`, increment `restDays`, leave streak & `currentDay`
  untouched; reply confirmation.

---

## 6. Timezone & daylight saving (Egypt) — done right

Cloudflare cron triggers fire in **UTC**. Egypt is **UTC+2 in winter, UTC+3 in summer**
(DST from the last Friday of April to the last Thursday of October). A hardcoded UTC time
would drift by an hour twice a year. ❌

**Solution:** don't hardcode the offset — let the runtime do timezone math.
- Register cron triggers at **both** candidate UTC times (e.g., `04:00` and `05:00` UTC
  for a 7:00 AM Cairo target, covering summer and winter).
- Inside the Worker, compute the actual Cairo local hour with the built-in
  `Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: 'numeric', hour12:
  false })`, and only send when the local hour matches `morningHour`.
- The `Intl`/`Africa/Cairo` timezone database handles DST automatically. ✅

The same technique gives the correct "today" date string (Cairo local) for all
once-per-day and streak logic.

---

## 7. Security design (N3)

- **Webhook verification:** Telegram sends our secret in the
  `X-Telegram-Bot-Api-Secret-Token` header; the Worker rejects any request without it.
- **User allow-list:** ignore any update whose chat ID ≠ `TELEGRAM_CHAT_ID`.
- **Secrets:** all tokens live in Cloudflare secret env vars — never committed to Git.
- **GitHub token:** a **fine-grained PAT**, scoped to *only this repo*, permission
  *Contents: read & write* (nothing else).
- **`.gitignore`** and code review to ensure no secret ever lands in the repo.

---

## 8. Reliability & error handling (N4)

- **Idempotency:** once-per-day guards (`lastMorningSentDate`, `lastCompletedDate`)
  prevent duplicates.
- **Write conflicts:** GitHub Contents API requires the file's current `sha`. On a `409`
  (file changed since read), the Worker re-reads and retries (small retry loop).
- **Missing content:** graceful fallback message (R1).
- **Outage tolerance:** because state lives in GitHub, a missed cron doesn't corrupt
  anything; `/done` and `/status` still work from stored state.
- **Logging:** Worker logs key events (viewable in Cloudflare dashboard / `wrangler
  tail`) for debugging.

---

## 9. Cost

| Service | Free tier | Our usage | Cost |
|---|---|---|---|
| Telegram Bot API | Unlimited | A few messages/day | $0 |
| Cloudflare Workers | 100k requests/day; cron included | ~dozens/day | $0 |
| GitHub API | Generous for a personal token | A few commits/day | $0 |

**Total: $0/month.** 🎉

---

## 10. Technology choices & rationale

- **Cloudflare Worker over a traditional server:** always-on, free, no server to
  maintain, and it's a tool the learner wants to understand.
- **Cloudflare over GitHub Actions for replies:** Actions can't cleanly receive instant
  webhook replies (they'd need polling). A Worker handles both timers and instant
  messages elegantly.
- **State in Git over a database:** transparent, versioned, free, and reinforces the
  learner's GitHub understanding. (Supabase could replace `state.json` later as a
  learning exercise in Phase 4 — noted, not required.)
- **Pre-written content over live AI generation:** guarantees quality and correct links;
  avoids hallucinated resources for a beginner.

---

## 11. Open questions (none blocking)

- Bot name/persona (cosmetic — default "Study Buddy"; the learner can rename).
- Whether to later migrate `state.json` → Supabase as a hands-on tools lesson (optional,
  post-Phase-4).
