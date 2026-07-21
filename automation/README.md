# 🤖 Study Buddy — Your Daily AI Learning Automation

> A friendly Telegram bot that sends you today's study card every morning, lets you
> reply **`/done`** when you finish, and automatically updates your GitHub progress and
> streak — so the habit runs itself.

This folder holds the **plan (spec)** for that system. We wrote it *before* building so
there are no mistakes. Nothing here is a black box — this README explains, in plain
English, exactly what we're building and how every piece works. 🧠

- 📋 **[Requirements](./spec/requirements.md)** — what it must do (and how we'll know it works)
- 🏗️ **[Design](./spec/design.md)** — how it works under the hood
- 🛠️ **[Implementation Plan](./spec/implementation-plan.md)** — the step-by-step build order

---

## 🌅 What a normal day looks like (the whole point)

1. **7:00 AM (Cairo time)** → 📩 Telegram pings you with today's card: your goal, the
   links to study, and the one practice task.
2. You study (morning) and practice (night) — same simple routine as always.
3. When you finish, you reply **`/done`** in Telegram. ✅
4. Instantly, the system:
   - ticks today off in your `PROGRESS.md`,
   - bumps your 🔥 **streak**,
   - saves it all to GitHub (a real commit),
   - and lines up tomorrow's card.
5. **8:30 PM** → if you *haven't* sent `/done`, you get a gentle reminder. ⏰

That's it. Open Telegram → learn → `/done` → done. The plan literally nudges you and
tracks itself.

---

## 💬 Commands you'll have

| You type | What happens |
|---|---|
| `/done` | Marks today complete, updates streak + GitHub, sends tomorrow's preview |
| `/today` | Resends today's card (in case you lost it) |
| `/status` | Shows your current day, phase, streak, and total days done |
| `/note <your text>` | Saves a reflection to your daily log |
| `/skip` | Takes a guilt-free rest day — your streak is protected 🛡️ |

Plus automatic extras: a **weekly summary** every Sunday 📊, **milestone celebrations**
🎉, and a heads-up when it's time to generate more content.

---

## 🧩 How it works, in plain English (no black box)

Three free tools work together — the *same tools you're learning*:

```
  ⏰ Cloudflare Worker  ──sends──►  📱 Telegram  ──you reply /done──►  ⏰ Cloudflare Worker
         │                                                                   │
         │  reads today's lesson & saves your progress                       │
         ▼                                                                    ▼
                          🗂️  Your GitHub repo (the single source of truth)
```

- **Cloudflare Worker** = the "brain." A tiny always-on program in the cloud. On a timer
  it sends your morning message; when you reply, it wakes up and updates things. *(This
  is Cloudflare — one of the tools you wanted to understand. You'll set it up yourself,
  guided.)*
- **Telegram Bot** = the "messenger." A bot you create (free) that talks to you.
- **GitHub** = the "memory." Your repo already holds the lessons; the bot reads today's
  lesson from it and writes your progress back to it. Nothing is stored anywhere secret —
  it's all in your repo, in plain files you can read.
- **`state.json`** = a tiny file that remembers which day you're on and your streak.

Every one of these gets explained again, step by step, when we build it — so by the end
you'll understand *why* each part exists, not just *that* it works.

---

## 🆓 Cost

**$0.** Everything runs comfortably inside the free tiers of Telegram, Cloudflare
Workers, and GitHub. (Details in the [Design](./spec/design.md#cost).)

---

## 📖 Mini-glossary (words you'll meet)

- **Bot** — a program that sends/receives messages automatically.
- **Webhook** — how Telegram instantly tells our Worker "the user sent a message."
- **Cron / scheduled trigger** — a timer that runs code at set times (like 7:00 AM).
- **API** — the way two programs talk to each other (our Worker ↔ Telegram ↔ GitHub).
- **Token / secret** — a private password that lets our Worker use Telegram and GitHub
  safely. Stored hidden, never in the code.
- **Serverless** — code that runs in the cloud without you managing a server (Cloudflare
  Worker).

---

## ▶️ Status

**This is the plan, awaiting your approval.** Once you say "go," we follow the
[Implementation Plan](./spec/implementation-plan.md) — starting by creating your Telegram
bot and Cloudflare account together, click by click.


---

## 🆕 v2 — Backlog & Control commands

Beyond the daily loop, Study Buddy now lets you steer your learning from Telegram:

| You type | What happens |
|---|---|
| `/learn <topic>` | Captures something you want to learn into your **backlog** (doesn't disrupt the plan) |
| `/backlog` | Lists your saved topics |
| `/drop <n>` | Removes backlog item number `n` |
| `/pause` / `/resume` | Vacation mode — stop / restart daily cards (streak stays safe) |
| `/settime <hour>` | Set your morning card time (0–23, Cairo) |
| `/help` or `/menu` | Show the full command list anytime |

**How backlog → lessons works:** you capture freely with `/learn`; your mentor (Kiro)
turns backlog items into high-quality **bonus lessons** at the right time (respecting
prerequisites), so your main sequence and quality are never disrupted.


### 🗺️ `/index` — see your whole curriculum

- `/index` → the 7-phase map (day ranges + one-liners) and **where you are now**.
- `/index <0–6>` → drill into a phase to see its weeks.

(The phase/week structure is fixed, so `/index` is instant and always works.)
