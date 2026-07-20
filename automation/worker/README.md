# ⚙️ Study Buddy Worker — Setup & Deploy

This is the code for the automation "brain" (a Cloudflare Worker). This README is your
click-by-click setup guide. **You won't run any of this until we've created your
accounts together** — your mentor (Kiro) walks you through each step in chat.

> Everything here is free and explained in plain English. Nothing is a black box.

---

## 📦 What's in this folder

| File | What it is |
|---|---|
| `src/index.js` | The Worker code — the brain (heavily commented) |
| `wrangler.toml` | Config: the timers and non-secret settings |
| `package.json` | Lists the one tool we need (`wrangler`) |
| `.dev.vars.example` | A template showing which secrets are needed |
| `.gitignore` | Makes sure secrets are never committed |

---

## 🔑 The 4 secrets it needs (we'll gather these during setup)

1. **`TELEGRAM_BOT_TOKEN`** — from @BotFather when you create your bot.
2. **`TELEGRAM_CHAT_ID`** — your personal Telegram id (we'll find it together).
3. **`TELEGRAM_WEBHOOK_SECRET`** — a random password you invent (protects the bot).
4. **`GITHUB_TOKEN`** — a fine-grained token limited to this repo (Contents: read & write).

---

## 🚀 Setup steps (do these with your mentor, in order)

### 1. Install the tool
```bash
cd automation/worker
npm install
```

### 2. Log in to Cloudflare
```bash
npx wrangler login
```
(Opens your browser to approve — one click.)

### 3. Add your secrets (each asks you to paste the value, then hides it)
```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler secret put TELEGRAM_WEBHOOK_SECRET
npx wrangler secret put GITHUB_TOKEN
```

### 4. Deploy the Worker
```bash
npx wrangler deploy
```
Wrangler prints your Worker URL, e.g. `https://study-buddy.<your-name>.workers.dev`.
Open it in a browser — you should see **"Study Buddy is running ✅"**.

### 5. Connect Telegram to your Worker (register the webhook)
Replace the two placeholders and run once:
```bash
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://study-buddy.<your-name>.workers.dev&secret_token=<YOUR_WEBHOOK_SECRET>"
```
Now message your bot on Telegram — try `/status`. It should reply. 🎉

---

## 🧪 Local testing (optional)
```bash
cp .dev.vars.example .dev.vars   # then fill in real values (this file is git-ignored)
npx wrangler dev
```

---

## ✅ Deployed via the Cloudflare dashboard (browser)

This bot is **live**, deployed through the Cloudflare **browser dashboard** (single-file
paste of `src/index.js`), not the Wrangler CLI. The CLI steps above still work if you
ever set up a local dev environment. **To update the code:** push `src/index.js` to
`main`, then re-paste it into the dashboard editor and click **Deploy**. Secrets and the
4 cron triggers are configured in the dashboard.

## 🗺️ Build progress

- [x] **Phase 1:** scaffold — plumbing, security, commands reply, health check, timers ✅
- [x] **Phase 2:** MVP — morning card + `/done` (streak + GitHub updates) ✅ **tested**
- [x] **Phase 3 (early):** evening reminder + `/today` `/status` `/note` `/skip` ✅
- [ ] **Phase 4:** weekly (Sunday) summary + low-buffer alert  *(week-complete message done)*
- [ ] **Phase 5:** generate all daily content (Weeks 2–52) as `day-XXX.md` files
- [ ] **Phase 6:** write-conflict retry + plain-English walkthrough (learner explains it back)

See the full plan in [`../spec/implementation-plan.md`](../spec/implementation-plan.md)
and the live checkpoint in [`../../PROJECT-STATUS.md`](../../PROJECT-STATUS.md).
