// ═══════════════════════════════════════════════════════════════════════════
//  STUDY BUDDY — Cloudflare Worker
//  Your daily AI-study companion on Telegram.
//
//  This one file is "the brain." It wakes up in two ways:
//    1) fetch()     -> when YOU send a message to the bot (Telegram calls us)
//    2) scheduled() -> on a timer (morning card, evening reminder)
//
//  It reads your lessons + progress from GitHub, and writes progress back.
//  Everything below is commented in plain English on purpose — no black box.
//
//  BUILD STATUS: Phase 1 scaffold. The plumbing + safety + commands are here
//  and WORK (the bot can reply). The GitHub read/write logic is stubbed with
//  clear TODOs and gets filled in during Phase 2 (the MVP loop).
// ═══════════════════════════════════════════════════════════════════════════

export default {
  // ── Entry point #1: a message arrived (or a health check) ──────────────────
  async fetch(request, env, ctx) {
    // A simple GET to the Worker URL = "are you alive?" health check.
    if (request.method === "GET") {
      return new Response("Study Buddy is running ✅", { status: 200 });
    }

    // Anything else should be Telegram calling our webhook (a POST).
    if (request.method === "POST") {
      // SECURITY 1: Telegram sends back our secret in this header.
      // If it's missing or wrong, it's not really Telegram — reject it.
      const secret = request.headers.get("x-telegram-bot-api-secret-token");
      if (secret !== env.TELEGRAM_WEBHOOK_SECRET) {
        return new Response("forbidden", { status: 403 });
      }

      const update = await request.json();
      // We only care about text messages for now.
      const message = update.message;
      if (message && message.text) {
        // SECURITY 2: only respond to YOU (the authorized chat id).
        if (String(message.chat.id) !== String(env.TELEGRAM_CHAT_ID)) {
          return new Response("ok"); // silently ignore strangers
        }
        // Handle the command in the background so we can reply to Telegram fast.
        ctx.waitUntil(handleCommand(message.text.trim(), env));
      }
      // Always tell Telegram "ok" so it doesn't retry.
      return new Response("ok", { status: 200 });
    }

    return new Response("method not allowed", { status: 405 });
  },

  // ── Entry point #2: a timer fired ──────────────────────────────────────────
  async scheduled(event, env, ctx) {
    ctx.waitUntil(handleSchedule(env));
  },
};

// ═══════════════════════════════════════════════════════════════════════════
//  COMMAND HANDLING  (what happens when you type /done, /today, etc.)
// ═══════════════════════════════════════════════════════════════════════════
async function handleCommand(text, env) {
  const command = text.split(/\s+/)[0].toLowerCase();
  const args = text.slice(command.length).trim();

  switch (command) {
    case "/start":
      // Handy for first-time setup: shows you your chat id.
      return sendMessage(env, "👋 Welcome to Study Buddy! I'm connected.");
    case "/done":
      return handleDone(env);          // TODO Phase 2: mark complete + streak + commit
    case "/today":
      return handleToday(env);         // TODO Phase 2: resend today's card
    case "/status":
      return handleStatus(env);        // TODO Phase 2: show streak + progress
    case "/note":
      return handleNote(env, args);    // TODO Phase 3: append note to PROGRESS.md
    case "/skip":
      return handleSkip(env);          // TODO Phase 3: rest day (protect streak)
    default:
      return sendMessage(
        env,
        "I know these commands:\n" +
          "✅ /done — finish today\n" +
          "🔁 /today — resend today's card\n" +
          "📊 /status — streak & progress\n" +
          "📝 /note <text> — save a reflection\n" +
          "🛌 /skip — rest day"
      );
  }
}

// --- Command handlers (Phase 1 = placeholders; Phase 2/3 = real logic) --------
async function handleDone(env) {
  // TODO (Phase 2): read state.json -> mark day done -> update streak ->
  // tick PROGRESS.md -> commit to GitHub -> advance currentDay -> preview tomorrow.
  return sendMessage(env, "✅ (coming in Phase 2) This will mark today complete.");
}

async function handleToday(env) {
  // TODO (Phase 2): read state.currentDay -> read daily/day-XXX.md -> send it.
  return sendMessage(env, "🔁 (coming in Phase 2) This will resend today's card.");
}

async function handleStatus(env) {
  // TODO (Phase 2): read state.json -> report day/phase/streak/total.
  return sendMessage(env, "📊 (coming in Phase 2) This will show your streak & progress.");
}

async function handleNote(env, note) {
  if (!note) return sendMessage(env, "📝 Add your note like: /note today was tough but I got it");
  // TODO (Phase 3): append note (with date) to the PROGRESS.md log + commit.
  return sendMessage(env, "📝 (coming in Phase 3) This will save your reflection.");
}

async function handleSkip(env) {
  // TODO (Phase 3): record a rest day, protect the streak.
  return sendMessage(env, "🛌 (coming in Phase 3) This will log a guilt-free rest day.");
}

// ═══════════════════════════════════════════════════════════════════════════
//  SCHEDULED HANDLING  (what the timers do)
// ═══════════════════════════════════════════════════════════════════════════
async function handleSchedule(env) {
  const now = cairoNow(); // real Cairo local time (handles daylight saving)

  // Morning: send today's card at 07:00 Cairo.
  if (now.hour === 7) {
    // TODO (Phase 2): send today's card; record lastMorningSentDate to avoid duplicates.
    return sendMessage(env, "☀️ (coming in Phase 2) Good morning! Today's card goes here.");
  }

  // Evening: remind at 20:30 Cairo if today isn't done yet.
  if (now.hour === 20 && now.minute === 30) {
    // TODO (Phase 3): only remind if not already done today.
    // TODO (Phase 4): on Sundays, send the weekly summary instead.
    return sendMessage(env, "⏰ (coming in Phase 3) Reminder: did you study today?");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════════════

// Send a Telegram message to you. Uses the bot token; Markdown makes it pretty.
async function sendMessage(env, text) {
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) console.log("Telegram send failed:", res.status, await res.text());
  return res;
}

// Get the current time in Cairo, no matter what timezone the server is in.
// The built-in Intl database knows Egypt's daylight-saving rules, so this is
// always correct — that's why we don't hardcode "+2" or "+3" anywhere.
function cairoNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
    weekday: "short",
  }).formatToParts(new Date());

  const get = (type) => parts.find((p) => p.type === type)?.value;
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`, // "YYYY-MM-DD" (Cairo)
    hour: parseInt(get("hour"), 10),
    minute: parseInt(get("minute"), 10),
    weekday: get("weekday"), // e.g. "Sun"
  };
}

// ── GitHub helpers (stubs — implemented in Phase 2) ──────────────────────────
// These will read a file from your repo and commit changes back to it, using
// the GitHub Contents API and your GITHUB_TOKEN. Left as TODO so Phase 1 stays
// simple and testable without needing the token yet.
//
// async function githubReadFile(env, path) { /* TODO Phase 2 */ }
// async function githubWriteFile(env, path, content, message, sha) { /* TODO Phase 2 */ }
