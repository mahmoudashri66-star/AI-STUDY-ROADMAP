// ═══════════════════════════════════════════════════════════════════════════
//  STUDY BUDDY — Cloudflare Worker  (v2: learning + backlog + controls)
//
//  This one file is "the brain." It wakes up two ways:
//    1) fetch()     -> when YOU message the bot (Telegram calls our webhook)
//    2) scheduled() -> on a timer (morning card, evening reminder)
//
//  It reads your lessons + progress from GitHub and writes progress back.
//  Everything is commented in plain English on purpose — no black box.
//
//  COMMANDS:
//    Learning:  /today  /done  /status  /note <text>  /skip
//    Backlog:   /learn <topic>   /backlog   /drop <n>
//    Control:   /pause  /resume  /settime <hour>
//    Help:      /help   /menu
//  Timers: morning card at state.morningHour, reminder at reminderHour:reminderMinute
//          (Cairo time; skipped when state.paused is true)
// ═══════════════════════════════════════════════════════════════════════════

// --- Where things live in your GitHub repo -----------------------------------
const STATE_PATH = "automation/state.json";
const PROGRESS_PATH = "PROGRESS.md";
const BACKLOG_PATH = "learning-backlog.md";
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
//  COMMANDS
// ═══════════════════════════════════════════════════════════════════════════
async function handleCommand(text, env) {
  const command = text.split(/\s+/)[0].toLowerCase();
  const args = text.slice(command.length).trim();
  try {
    switch (command) {
      // learning
      case "/start":  return sendMessage(env, "👋 Welcome to Study Buddy!\n\n" + helpText());
      case "/today":  return await handleToday(env);
      case "/status": return await handleStatus(env);
      case "/done":   return await handleDone(env);
      case "/note":   return await handleNote(env, args);
      case "/skip":   return await handleSkip(env);
      // backlog
      case "/learn":  return await handleLearn(env, args);
      case "/backlog":return await handleBacklog(env);
      case "/drop":   return await handleDrop(env, args);
      // control
      case "/pause":  return await handlePause(env);
      case "/resume": return await handleResume(env);
      case "/settime":return await handleSetTime(env, args);
      // help
      case "/help":
      case "/menu":   return sendMessage(env, helpText());
      default:        return sendMessage(env, "I didn't recognize that. Here's what I can do:\n\n" + helpText());
    }
  } catch (e) {
    console.log("command error:", e);
    return sendMessage(env, `⚠️ Something went wrong with ${command}. (${e.message})`);
  }
}

// The one place that lists every command (used by /help, /menu, /start, unknown).
function helpText() {
  return (
    "🤖 Study Buddy — your commands\n\n" +
    "📚 Learning\n" +
    "▶️ /today — today's lesson\n" +
    "✅ /done — finish today (streak +1)\n" +
    "📊 /status — day, streak & progress\n" +
    "📝 /note <text> — save a reflection\n" +
    "🛌 /skip — rest day (streak stays safe)\n\n" +
    "📥 Backlog — capture things to learn later\n" +
    "➕ /learn <topic> — save something you want to learn\n" +
    "📋 /backlog — see your saved topics\n" +
    "🗑️ /drop <number> — remove a backlog item\n\n" +
    "⚙️ Control\n" +
    "⏸️ /pause — stop daily cards (vacation mode)\n" +
    "▶️ /resume — turn daily cards back on\n" +
    "⏰ /settime <hour> — set morning time, 0–23 (Cairo)\n\n" +
    "❓ /help or /menu — show this list"
  );
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
    (state.paused ? `⏸️ Delivery is PAUSED (use /resume)\n` : "") +
    `\n${doneToday ? "Today is done — nice! 😴" : "Today isn't done yet. Reply /done when you finish."}`);
}

async function handleDone(env) {
  const today = cairoNow().date;
  const { state, sha } = await readState(env);
  if (state.lastCompletedDate === today) {
    return sendMessage(env, `✅ You already finished today! Rest up. 🔥 Streak: ${state.streak}`);
  }
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

// ── Backlog commands ─────────────────────────────────────────────────────────
async function handleLearn(env, topic) {
  if (!topic) return sendMessage(env, "📥 Use it like: /learn how to fine-tune an LLM");
  const today = cairoNow().date;
  const f = await githubGet(env, BACKLOG_PATH);
  const header = "# 📥 Learning Backlog\n\nTopics I want to learn (captured via /learn). Your mentor (Kiro) turns these into bonus lessons.\n";
  let text = f ? f.text : header;
  text = text.replace(/\s+$/, "") + `\n- ${today} — ${topic}\n`;
  await githubPut(env, BACKLOG_PATH, text, `Backlog: add "${topic}"`, f ? f.sha : undefined);
  return sendMessage(env, `📥 Captured! Added to your backlog:\n"${topic}"\n\nSee everything with /backlog. Your mentor will turn these into bonus lessons.`);
}

async function handleBacklog(env) {
  const items = await readBacklogItems(env);
  if (!items.length) return sendMessage(env, "📥 Your backlog is empty. Capture something with:\n/learn <topic>");
  const list = items.map((it, i) => `${i + 1}. ${it}`).join("\n");
  return sendMessage(env, `📥 Your learning backlog (${items.length}):\n\n${list}\n\n🗑️ Remove one with /drop <number>.`);
}

async function handleDrop(env, arg) {
  const n = parseInt(arg, 10);
  if (!n) return sendMessage(env, "🗑️ Use it like: /drop 2  (the number shown in /backlog)");
  const f = await githubGet(env, BACKLOG_PATH);
  if (!f) return sendMessage(env, "📥 Your backlog is empty.");
  const lines = f.text.split("\n");
  const itemIdx = lines.map((l, i) => (l.startsWith("- ") ? i : -1)).filter((i) => i >= 0);
  if (n < 1 || n > itemIdx.length) return sendMessage(env, `There's no item ${n}. You have ${itemIdx.length}.`);
  const removed = lines[itemIdx[n - 1]].replace(/^- /, "").trim();
  lines.splice(itemIdx[n - 1], 1);
  await githubPut(env, BACKLOG_PATH, lines.join("\n"), `Backlog: drop item ${n}`, f.sha);
  return sendMessage(env, `🗑️ Removed:\n"${removed}"`);
}

async function readBacklogItems(env) {
  const f = await githubGet(env, BACKLOG_PATH);
  if (!f) return [];
  return f.text.split("\n").filter((l) => l.startsWith("- ")).map((l) => l.replace(/^- /, "").trim());
}

// ── Control commands ─────────────────────────────────────────────────────────
async function handlePause(env) {
  const { state, sha } = await readState(env);
  state.paused = true;
  await writeState(env, state, sha, "Pause daily delivery");
  return sendMessage(env, "⏸️ Paused. I won't send daily cards until you /resume. Your streak & progress are safe.");
}

async function handleResume(env) {
  const { state, sha } = await readState(env);
  state.paused = false;
  await writeState(env, state, sha, "Resume daily delivery");
  return sendMessage(env, "▶️ Resumed! Daily cards are back on. Welcome back. 🔥");
}

async function handleSetTime(env, arg) {
  const h = parseInt(arg, 10);
  if (isNaN(h) || h < 0 || h > 23) return sendMessage(env, "⏰ Use it like: /settime 8  (hour 0–23, Cairo time)");
  const { state, sha } = await readState(env);
  state.morningHour = h;
  await writeState(env, state, sha, `Set morning time to ${h}:00`);
  return sendMessage(env, `⏰ Morning card time set to ${String(h).padStart(2, "0")}:00 Cairo. ✅`);
}

// ═══════════════════════════════════════════════════════════════════════════
//  TIMERS  (cron fires every :00 and :30; we act at the right Cairo time)
// ═══════════════════════════════════════════════════════════════════════════
async function handleSchedule(env) {
  try {
    const now = cairoNow(); // real Cairo time (daylight saving handled automatically)
    const { state, sha } = await readState(env);
    if (state.paused) return; // vacation mode — send nothing
    const morningHour = state.morningHour ?? 7;
    const reminderHour = state.reminderHour ?? 20;
    const reminderMinute = state.reminderMinute ?? 30;
    if (now.hour === morningHour && now.minute === 0) return await doMorning(env, state, sha, now.date);
    if (now.hour === reminderHour && now.minute === reminderMinute) return await doEvening(env, state, sha, now.date);
  } catch (e) {
    console.log("schedule error:", e);
  }
}

async function doMorning(env, state, sha, today) {
  if (state.lastMorningSentDate === today) return; // don't send twice
  const card = await getDayCard(env, state.currentDay);
  const msg = card
    ? `☀️ Good morning, Mahmoud! Here's today's card:\n\n${formatCard(state.currentDay, card)}\n\n👉 Reply /done when you finish.`
    : `☀️ Good morning! Day ${state.currentDay} isn't written yet — ask your mentor to add more.`;
  await sendMessage(env, msg);
  state.lastMorningSentDate = today;
  await writeState(env, state, sha, `Morning card sent (${today})`);
}

async function doEvening(env, state, sha, today) {
  if (state.lastCompletedDate === today || state.lastReminderSentDate === today) return;
  await sendMessage(env, `⏰ Evening check-in: did you study today? Reply /done to keep your 🔥 streak (${state.streak}) alive. You've got this! 💪`);
  state.lastReminderSentDate = today;
  await writeState(env, state, sha, `Evening reminder sent (${today})`);
}

// ═══════════════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════════════
async function sendMessage(env, text) {
  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, disable_web_page_preview: true }),
  });
  if (!res.ok) console.log("Telegram send failed:", res.status, await res.text());
  return res;
}

function formatCard(dayNum, card) {
  const header = `📚 Day ${dayNum}${card.meta.title ? " — " + card.meta.title : ""}` +
    (card.meta.phase ? `\n(Phase ${card.meta.phase})` : "");
  return `${header}\n\n${toTelegram(card.body)}`;
}

function toTelegram(md) {
  return md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1: $2").replace(/\*\*/g, "").replace(/`/g, "").trim();
}

function cairoNow() {
  const p = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false, weekday: "short",
  }).formatToParts(new Date());
  const g = (t) => p.find((x) => x.type === t)?.value;
  return { date: `${g("year")}-${g("month")}-${g("day")}`, hour: +g("hour"), minute: +g("minute"), weekday: g("weekday") };
}

function prevDate(dateStr) {
  const d = new Date(dateStr + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

function ghHeaders(env) {
  return {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "study-buddy-worker",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function githubGet(env, path) {
  const url = `${GITHUB_API}/repos/${env.GITHUB_REPO}/contents/${path}?ref=${env.GITHUB_BRANCH}`;
  const res = await fetch(url, { headers: ghHeaders(env) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub read ${path}: ${res.status}`);
  const data = await res.json();
  return { text: b64ToUtf8(data.content), sha: data.sha };
}

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

async function addProgressLine(env, line) {
  const f = await githubGet(env, PROGRESS_PATH);
  if (!f) return;
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
