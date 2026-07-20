# 📋 Requirements — Study Buddy Automation

**Status:** Draft for review · **Owner:** the learner (Egypt 🇪🇬) · **Mentor/agent:** Kiro

This document defines *what* the system must do and *how we'll know it works*. It uses
**EARS** phrasing (Easy Approach to Requirements Syntax): each acceptance criterion says
"WHEN/IF <trigger>, THE SYSTEM SHALL <behavior>." That makes every requirement testable.

---

## 1. Purpose & scope

**Purpose:** automate the daily study loop so the learner builds an unbreakable habit —
receive today's lesson on Telegram, mark it done with one command, and have progress and
streak tracked automatically in GitHub.

**In scope:** daily delivery, completion tracking, streak, reminders, simple commands,
weekly summary, milestone messages, and generating the full year of daily content.

**Out of scope (for now):** multi-user support, a web dashboard, payments, mobile app,
and AI-generated content at delivery time (content is pre-written and reviewed).

---

## 2. Actors

- **Learner** — the single authorized user (identified by their Telegram chat ID).
- **System** — the Cloudflare Worker (the automation brain).
- **Telegram** — messaging channel.
- **GitHub repo** — content + progress store (single source of truth).

---

## 3. Functional requirements

### R1 — Daily content delivery
The learner receives today's study card automatically each morning.

- WHEN it is **07:00 in Africa/Cairo local time**, THE SYSTEM SHALL send the learner a
  Telegram message containing the current day's card (day number, phase, goal, study
  links, and the practice task).
- IF the current day's content file cannot be found, THE SYSTEM SHALL send a clear
  fallback message telling the learner content needs to be generated, and SHALL NOT
  advance the current day.
- THE SYSTEM SHALL send the morning message **at most once per calendar day**.

### R2 — Mark day complete (`/done`)
The learner completes a day with one command.

- WHEN the learner sends **`/done`**, THE SYSTEM SHALL mark the current day complete,
  tick its entry in `PROGRESS.md`, record the completion date, and commit the change to
  GitHub.
- WHEN a day is completed AND the previous completion was the day before (Cairo time),
  THE SYSTEM SHALL increment the streak by 1.
- WHEN a day is completed AND more than one day has passed since the last completion,
  THE SYSTEM SHALL reset the streak to 1.
- WHEN a day is completed, THE SYSTEM SHALL advance the current day to the next day and
  reply with a confirmation plus a one-line preview of tomorrow.
- IF the learner sends `/done` again on a day already marked complete, THE SYSTEM SHALL
  reply that today is already done and SHALL NOT double-count or advance again
  (idempotent).

### R3 — Evening reminder
A gentle nudge if the day isn't done.

- WHEN it is **20:30 Africa/Cairo local time** AND the current day is not yet marked
  complete, THE SYSTEM SHALL send a reminder message.
- IF the current day is already complete, THE SYSTEM SHALL NOT send a reminder.

### R4 — Resend today (`/today`)
- WHEN the learner sends **`/today`**, THE SYSTEM SHALL resend the current day's full card.

### R5 — Status (`/status`)
- WHEN the learner sends **`/status`**, THE SYSTEM SHALL reply with the current day
  number, phase name, current streak, longest streak, and total days completed.

### R6 — Reflection note (`/note`)
- WHEN the learner sends **`/note <text>`**, THE SYSTEM SHALL append the text (with date
  and day number) to the daily log in `PROGRESS.md` and commit it.
- IF `/note` is sent with no text, THE SYSTEM SHALL ask the learner to include a note.

### R7 — Rest day (`/skip`)
- WHEN the learner sends **`/skip`**, THE SYSTEM SHALL record a rest day, protect the
  streak (neither increment nor reset), and keep the current day unchanged so the same
  card is delivered next time.

### R8 — Weekly summary
- WHEN it is **Sunday 20:30 Africa/Cairo**, THE SYSTEM SHALL send a summary of the week:
  days completed, current streak, and an encouraging note.

### R9 — Milestone celebrations
- WHEN a completion finishes a week or a phase, THE SYSTEM SHALL send a celebratory
  message naming the milestone reached.

### R10 — Content buffer monitoring
- WHEN the current day comes within **7 days** of the last generated content, THE SYSTEM
  SHALL notify the learner that more content should be generated.

### R11 — Full-year content
- THE SYSTEM SHALL provide daily cards for the entire ~52-week plan (all ~312 days),
  each following the standard card template and using only links from
  `plan/best-resources.md` (no invented links).
- Content SHALL be generated in reviewable phase batches to preserve quality, always
  staying ahead of the learner's current day.

---

## 4. Non-functional requirements

### N1 — Cost
- THE SYSTEM SHALL operate entirely within the free tiers of Telegram, Cloudflare
  Workers, and GitHub (target cost: $0/month).

### N2 — Timezone & daylight saving (Egypt)
- THE SYSTEM SHALL deliver messages at the correct Cairo local time year-round,
  correctly handling Egypt's daylight-saving changes (UTC+2 in winter, UTC+3 in summer).

### N3 — Security
- THE SYSTEM SHALL store all secrets (Telegram bot token, GitHub token, webhook secret)
  outside of source code, in Cloudflare secret storage.
- THE SYSTEM SHALL only act on messages from the authorized learner's chat ID.
- WHEN an incoming webhook request lacks the correct secret token, THE SYSTEM SHALL
  reject it.
- The GitHub token SHALL be a fine-grained token limited to this single repository with
  only contents read/write permission.

### N4 — Reliability & data integrity
- THE SYSTEM SHALL keep `state.json` and `PROGRESS.md` as the single source of truth in
  GitHub; there SHALL be no second, conflicting store.
- WHEN a GitHub write conflict occurs (file changed since read), THE SYSTEM SHALL re-read
  and retry so no update is lost.
- IF a scheduled send is missed (e.g., outage), THE SYSTEM SHALL still allow `/done` and
  `/status` to work correctly from the stored state.

### N5 — Understandability ("no black box")
- Every component SHALL be documented in plain English, and the learner SHALL be walked
  through what each part does and why during setup. No step is "just trust it."

### N6 — Maintainability
- The Worker code SHALL be small, commented, and organized so each command/handler is
  easy to find and change.

---

## 5. Assumptions

- The learner has (or will create) a Telegram account, a GitHub account (already has),
  and will create a free Cloudflare account.
- The learner studies roughly one card per day, ~4 hours/day, ~6 days/week.
- Content lives in the same GitHub repo as this spec.

## 6. Success criteria (definition of done for the whole system)

1. For 7 consecutive days, the morning card arrives at 7:00 AM Cairo time.
2. `/done` reliably updates `PROGRESS.md` + streak + commits, and is idempotent.
3. The evening reminder fires only when the day isn't done.
4. All commands (`/today`, `/status`, `/note`, `/skip`) behave per their requirements.
5. The learner can explain, in their own words, what each part of the system does.
6. Content exists ahead of the learner at all times.
