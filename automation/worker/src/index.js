// ═══════════════════════════════════════════════════════════════════════════
//  STUDY BUDDY — Cloudflare Worker  (Phase 2: the working MVP)
//
//  This one file is "the brain." It wakes up two ways:
//    1) fetch()     -> when YOU message the bot (Telegram calls our webhook)
//    2) scheduled() -> on a timer (morning card, evening reminder)
//
//  It reads your lessons + progress from GitHub and writes progress back.
//  Everything is commented in plain English on purpose — no black box.
//
//  WHAT WORKS NOW:
//    /today  -> sends the current day's lesson
//    /status -> shows day, streak, total
//    /done   -> marks day complete, updates streak, logs to GitHub, advances
//    /note   -> saves a reflection to PROGRESS.md
//    /skip   -> rest day (streak protected)
//    morning (07:00 Cairo) -> sends today's card
//    evening (20:30 Cairo) -> reminder if not done yet
// ═══════════════════════════════════════════════════════════════════════════

// --- Where things live in your GitHub repo -----------------------------------
const STATE_PATH = "automation/state.json";
const PROGRESS_PATH = "PROGRESS.md";
const dayPath = (n) => `daily/day-${String(n).padStart(3, "0")}.md`;
const GITHUB_API = "https://api.github.com";

export default {
  // ── Entry point #1: a web request (health check OR Telegram webhook) ────────
  async fetch(request, env, ctx) {
    if (request.method === "GET") {
      return new Response("Study Buddy is running ✅", { status: 200 });
    }
    if (request.method === "POST") {
      // SECURITY 1: verify Telegram's secret handshake header.
      if (request.headers.get("x-telegram-bot-api-secret-token") !== env.TELEGRAM_WEBHOOK_SECRET) {
        return new Response("forbidden", { status: 403 });
      }
      const update = await request.json();
      const message = update.message;
      if (message && message.text) {
        // SECURITY 2: only respond to YOU.
        if (String(message.chat.id) === String(env.TELEGRAM_CHAT_ID)) {
          ctx.waitUntil(handleCommand(message.text.trim(), env));
        }
      }
      return new Response("ok", { status: 200 }); // tell Telegram we got it
    }
    return new Response("method not allowed", { status: 405 });
  },

  // ── Entry point #2: a timer fired ───────────────────────────────────────────
  async scheduled(event, env, ctx) {
    ctx.waitUntil(handleSchedule(env));
  },
};

// ═══════════════════════════════════════════════════════════════════════════
//  COMMANDS (what happens when you type /done, /today, etc.)
// ═══════════════════════════════════════════════════════════════════════════
async function handleCommand(text, env) {
  const command = text.split(/\s+/)[0].toLowerCase();
  const args = text.slice(command.length).trim();
  try {
    switch (command) {
      case "/start":
        return sendMessage(env,
          "👋 Welcome to Study Buddy!\n\n" +
          "▶️ /today — today's lesson\n" +
          "✅ /done — finish today (updates your streak)\n" +
          "📊 /status — your progress\n" +
          "📝 /note <text> — save a reflection\n" +
          "🛌 /skip — rest day\n\nLet's learn! 🚀");
      case "/today":  return await handleToday(env);
      case "/status": return await handleStatus(env);
      case "/done":   return await handleDone(env);
      case "/note":   return await handleNote(env, args);
      case "/skip":   return await handleSkip(env);
      default:        return sendMessage(env, "I know: /today /done /status /note /skip");
    }
  } catch (e) {
    console.log("command error:", e);
    return sendMessage(env, `⚠️ Something went wrong with ${command}. (${e.message})`);
  }
}

async function handleToday(env) {
  const { state } = await readState(env);
  const card = await getDayCard(env, state.currentDay);
  if (!card) return sendMessage(env, `😅 Day ${state.currentDay} isn't written yet. Ask your mentor to generate more content!`);
  return sendMessage(env, formatCard(state.currentDay, card));
}

async function handleStatus(env) {
  const { state } = await readState(env);
  const doneToday = state.lastCompletedDate === cairoNow().date;
  return sendMessage(env,
    "📊 Your progress\n\n" +
    `📅 Day ${state.currentDay} of ${state.totalDaysGenerated}\n` +
    `🔥 Streak: ${state.streak} day(s)  (best: ${state.longestStreak})\n` +
    `✅ Completed: ${state.totalDaysCompleted} day(s)\n` +
    (state.restDays ? `🛌 Rest days: ${state.restDays}\n` : "") +
    `\n${doneToday ? "Today is done — nice! 😴" : "Today isn't done yet. Reply /done when you finish."}`);
}

async function handleDone(env) {
  const today = cairoNow().date;
  const { state, sha } = await readState(env);

  if (state.lastCompletedDate === today) {
    return sendMessage(env, `✅ You already finished today! Rest up. 🔥 Streak: ${state.streak}`);
  }

  // Streak: consecutive day keeps it going; a gap resets it.
  state.streak = state.lastCompletedDate === prevDate(today) ? state.streak + 1 : 1;
  if (state.streak > state.longestStreak) state.longestStreak = state.streak;

  const completedDay = state.currentDay;
  state.totalDaysCompleted += 1;
  state.lastCompletedDate = today;
  state.lastActionDate = today;
  state.currentDay += 1;

  await writeState(env, state, sha, `Day ${completedDay} complete (via /done)`);
  await addProgressLine(env, `- ${today} — Day ${completedDay} ✅ completed`);

  let reply = `✅ Day ${completedDay} done — great work!\n🔥 Streak: ${state.streak} day(s)`;
  if (completedDay % 6 === 0) reply += `\n\n🎉 A full week complete! Week ${completedDay / 6} down. Proud of you.`;
  const next = await getDayCard(env, state.currentDay);
  reply += next
    ? `\n\n🔜 Tomorrow — Day ${state.currentDay}: ${next.meta.title || ""}`
    : `\n\n(Next day isn't written yet — your mentor will add it.)`;
  return sendMessage(env, reply);
}

async function handleNote(env, note) {
  if (!note) return sendMessage(env, "📝 Write it like: /note today finally clicked!");
  const today = cairoNow().date;
  await addProgressLine(env, `- ${today} — 📝 ${note}`);
  return sendMessage(env, "📝 Saved to your journal. Nice reflection!");
}

async function handleSkip(env) {
  const today = cairoNow().date;
  const { state, sha } = await readState(env);
  state.restDays = (state.restDays || 0) + 1;
  state.lastActionDate = today;
  state.lastCompletedDate = today; // keeps streak continuity without counting a lesson
  await writeState(env, state, sha, `Rest day ${today}`);
  return sendMessage(env, `🛌 Rest day logged — your 🔥 streak (${state.streak}) is safe. See you tomorrow!`);
}

// ═══════════════════════════════════════════════════════════════════════════
//  TIMERS
// ═══════════════════════════════════════════════════════════════════════════
async function handleSchedule(env) {
  const now = cairoNow(); // real Cairo time (daylight saving handled automatically)
  try {
    if (now.hour === 7) return await doMorning(env, now.date);
    if (now.hour === 20 && now.minute === 30) return await doEvening(env, now.date);
  } catch (e) {
    console.log("schedule error:", e);
  }
}

async function doMorning(env, today) {
  const { state, sha } = await readState(env);
  if (state.lastMorningSentDate === today) return; // don't send twice
  const card = await getDayCard(env, state.currentDay);
  const msg = card
    ? `☀️ Good morning, Mahmoud! Here's today's card:\n\n${formatCard(state.currentDay, card)}\n\n👉 Reply /done when you finish.`
    : `☀️ Good morning! Day ${state.currentDay} isn't written yet — ask your mentor to add more.`;
  await sendMessage(env, msg);
  state.lastMorningSentDate = today;
  await writeState(env, state, sha, `Morning card sent (${today})`);
}

async function doEvening(env, today) {
  const { state, sha } = await readState(env);
  if (state.lastCompletedDate === today || state.lastReminderSentDate === today) return;
  await sendMessage(env, `⏰ Evening check-in: did you study today? Reply /done to keep your 🔥 streak (${state.streak}) alive. You've got this! 💪`);
  state.lastReminderSentDate = today;
  await writeState(env, state, sha, `Evening reminder sent (${today})`);
}

// ═══════════════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════════════

// Send a plain-text Telegram message (bare URLs auto-link; nothing can break).
async function sendMessage(env, text) {
  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, disable_web_page_preview: true }),
  });
  if (!res.ok) console.log("Telegram send failed:", res.status, await res.text());
  return res;
}

// Turn a lesson card into a clean Telegram message.
function formatCard(dayNum, card) {
  const header = `📚 Day ${dayNum}${card.meta.title ? " — " + card.meta.title : ""}` +
    (card.meta.phase ? `\n(Phase ${card.meta.phase})` : "");
  return `${header}\n\n${toTelegram(card.body)}`;
}

// Make markdown readable in Telegram: [label](url) -> "label: url", drop ** and `.
function toTelegram(md) {
  return md
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1: $2")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .trim();
}

// Current time in Cairo, DST-correct (the Intl database knows Egypt's rules).
function cairoNow() {
  const p = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false, weekday: "short",
  }).formatToParts(new Date());
  const g = (t) => p.find((x) => x.type === t)?.value;
  return { date: `${g("year")}-${g("month")}-${g("day")}`, hour: +g("hour"), minute: +g("minute"), weekday: g("weekday") };
}

// The day before a given YYYY-MM-DD (noon avoids any timezone edge cases).
function prevDate(dateStr) {
  const d = new Date(dateStr + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

// ── GitHub Contents API helpers ──────────────────────────────────────────────
function ghHeaders(env) {
  return {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "study-buddy-worker",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

// Read a file: returns { text, sha } or null if it doesn't exist.
async function githubGet(env, path) {
  const url = `${GITHUB_API}/repos/${env.GITHUB_REPO}/contents/${path}?ref=${env.GITHUB_BRANCH}`;
  const res = await fetch(url, { headers: ghHeaders(env) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub read ${path}: ${res.status}`);
  const data = await res.json();
  return { text: b64ToUtf8(data.content), sha: data.sha };
}

// Write (commit) a file. Pass the current sha so GitHub knows what we're updating.
async function githubPut(env, path, text, message, sha) {
  const body = { message, content: utf8ToB64(text), branch: env.GITHUB_BRANCH };
  if (sha) body.sha = sha;
  const res = await fetch(`${GITHUB_API}/repos/${env.GITHUB_REPO}/contents/${path}`, {
    method: "PUT",
    headers: { ...ghHeaders(env), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GitHub write ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

async function readState(env) {
  const f = await githubGet(env, STATE_PATH);
  if (!f) throw new Error("state.json not found");
  return { state: JSON.parse(f.text), sha: f.sha };
}
async function writeState(env, state, sha, message) {
  return githubPut(env, STATE_PATH, JSON.stringify(state, null, 2) + "\n", message, sha);
}

async function getDayCard(env, dayNum) {
  const f = await githubGet(env, dayPath(dayNum));
  if (!f) return null;
  return parseDayFile(f.text);
}

// Split "---frontmatter---\nbody" into { meta, body }.
function parseDayFile(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: text.trim() };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*"?(.*?)"?\s*$/);
    if (kv) meta[kv[1]] = kv[2];
  }
  return { meta, body: m[2].trim() };
}

// Add a line to the top of the Daily log section in PROGRESS.md.
async function addProgressLine(env, line) {
  const f = await githubGet(env, PROGRESS_PATH);
  if (!f) return; // PROGRESS.md optional; don't crash if missing
  let text = f.text;
  const heading = "## 📝 Daily log";
  const idx = text.indexOf(heading);
  if (idx !== -1) {
    const eol = text.indexOf("\n", idx) + 1;
    text = text.slice(0, eol) + "\n" + line + text.slice(eol);
  } else {
    text += `\n${line}\n`;
  }
  await githubPut(env, PROGRESS_PATH, text, "Study Buddy: update daily log", f.sha);
}

// UTF-8 safe base64 (so emojis survive the trip to/from GitHub).
function b64ToUtf8(b64) {
  const bin = atob(b64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
function utf8ToB64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}
