// src/main.js
import initSqlJs from "sql.js/dist/sql-wasm.js";
import wasmUrl from "sql.js/dist/sql-wasm.wasm?url";
import { seedSQL } from "./seed.js";
import "./styles.css";

/** =========================================================
 *  ✅ FIXED: Review previous levels without re-locking progress
 *  - progressIndex (highest completed count) drives unlocks
 *  - levelIndex is just the currently viewed level
 *  - Saves SQL per level and restores when revisiting
 *  ✅ FIXED: DDL validate levels (CREATE TABLE) won't fail on re-check
 *  - Auto-rewrites CREATE TABLE -> CREATE TABLE IF NOT EXISTS (validate levels only)
 * ========================================================= */

/** ---------- DOM ---------- */
const runBtn = document.getElementById("run");
const checkBtn = document.getElementById("check");
const nextBtn = document.getElementById("next");
const resetBtn = document.getElementById("reset");
const hintBtn = document.getElementById("hintBtn");

// ✅ Start / Game screens + buttons
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const startGameBtn = document.getElementById("startGame");
const restartGameBtn = document.getElementById("restartGame");

// ✅ Player name UI
const playerNameInput = document.getElementById("playerName");
const savePlayerBtn = document.getElementById("savePlayer");
const nameStatusEl = document.getElementById("nameStatus");

// ✅ Leaderboard popup UI
const openLeaderboardBtn = document.getElementById("openLeaderboard");
const leaderboardPopup = document.getElementById("leaderboardPopup");
const leaderboardBody = document.getElementById("leaderboardBody");
const leaderboardCloseBtn = document.getElementById("leaderboardClose");
const leaderboardClearBtn = document.getElementById("leaderboardClear");

// ✅ Query history clear button
const clearHistoryBtn = document.getElementById("clearHistory");

// ✅ Main IO
const input = document.getElementById("sql");
const output = document.getElementById("output");
const historyEl = document.getElementById("history");

// ✅ HUD
const levelNumEl = document.getElementById("levelNum");
const scoreEl = document.getElementById("score");
const streakEl = document.getElementById("streak");
const historyCountEl = document.getElementById("historyCount");
const levelsProgressEl = document.getElementById("levelsProgress");

// ✅ Level text
const levelTitleEl = document.getElementById("levelTitle");
const levelPromptEl = document.getElementById("levelPrompt");
const difficultyEl = document.getElementById("difficulty");
const statusEl = document.getElementById("status");
const hintTextEl = document.getElementById("hintText");

// ✅ Win popup DOM
const winPopup = document.getElementById("winPopup");
const winTitleEl = document.getElementById("winTitle");
const winMsgEl = document.getElementById("winMsg");
const winQuoteEl = document.getElementById("winQuote");
const winCloseBtn = document.getElementById("winClose");

// ✅ Data Tables (dataset viewer) DOM
const dataBtn = document.getElementById("dataBtn");
const dataPopup = document.getElementById("dataPopup");
const dataCloseBtn = document.getElementById("dataClose");
const tableListEl = document.getElementById("tableList");
const tableTitleEl2 = document.getElementById("tableTitle");
const schemaBoxEl = document.getElementById("schemaBox");
const previewBoxEl = document.getElementById("previewBox");
const tabSchemaBtn = document.getElementById("tabSchema");
const tabPreviewBtn = document.getElementById("tabPreview");

// ✅ Levels list (SIDEBAR) DOM
const levelsListEl = document.getElementById("levelsList");

/** ---------- Game State ---------- */
let SQLMod = null;
let db = null;

/**
 * ✅ Key changes:
 * - levelIndex = what you're viewing right now (can jump back)
 * - progressIndex = how many levels you have completed (unlock anchor)
 *   Example: after completing Level 14, progressIndex = 14
 *   Unlocked levels: indices 0..14 (Levels 1..15)
 * - levelSQL = your saved editor code per level index
 */
const state = {
  levelIndex: 0,
  progressIndex: 0, // ✅ highest completed count (0..levels.length)
  levelSQL: {}, // ✅ { [levelIndex]: "sql text" }

  score: 0,
  streak: 0, // first-try streak
  hintShown: false,
  history: [],
  playerName: "",
  attempts: 0,
  levelStartMs: 0,
};

// ✅ bump storage key to avoid older buggy saves re-locking levels
const STORAGE_KEY = "sql_game_state_v3";
const PLAYER_KEY = "sql_game_player_name_v2";
const LEADERBOARD_KEY = "sql_game_leaderboard_v2";

/** 🔒 Admin PIN */
const ADMIN_PIN = "0429";
let adminUnlocked = false;

/** ================================
 * Point System
 * ================================ */
const SCORING = {
  wrongAttemptPenalty: 12,
  hintPenalty: 18,
  firstTryBonus: 25,
  streakBonusPerLevel: 10,
  maxTimeBonus: 20,
  timeBonusWindowSec: 90,
};

function levelElapsedSec() {
  if (!state.levelStartMs) return 0;
  return Math.floor((Date.now() - state.levelStartMs) / 1000);
}

function computeEarnedPoints(basePoints) {
  const failedAttempts = Math.max(0, state.attempts - 1);

  let timeBonus = 0;
  const t = levelElapsedSec();
  if (t > 0 && t <= SCORING.timeBonusWindowSec) {
    const ratio = 1 - t / SCORING.timeBonusWindowSec;
    timeBonus = Math.round(SCORING.maxTimeBonus * ratio);
  }

  const hintPenalty = state.hintShown ? SCORING.hintPenalty : 0;
  const wrongPenalty = failedAttempts * SCORING.wrongAttemptPenalty;

  const firstTry = state.attempts === 1;
  let bonus = 0;
  if (firstTry) {
    bonus += SCORING.firstTryBonus;
    bonus += state.streak * SCORING.streakBonusPerLevel;
  }

  let earned = basePoints + bonus + timeBonus - hintPenalty - wrongPenalty;
  earned = Math.max(0, earned);

  return {
    earned,
    breakdown: { basePoints, bonus, timeBonus, hintPenalty, wrongPenalty, firstTry },
  };
}

/** ================================
 * SQL Gatekeeper (SAFE)
 * ================================ */
const CORE_TABLES = [
  "customers",
  "products",
  "orders",
  "geo_countries",
  "fx_rates_daily",
  "subscriptions",
  "subscription_events",
  "payments",
  "refunds",
  "sessions",
  "pageviews",
  "support_tickets",
  "ticket_comments",
  "campaigns",
  "ad_spend_daily",
  "campaign_touches",
  "employees",
  "customer_success_assignments",
];

const ALLOWED_PREFIXES = ["tmp_", "user_"];

/** ---------- SQL helpers ---------- */
function splitStatements(sql) {
  const out = [];
  let cur = "";
  let inSingle = false;
  let inDouble = false;

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    const prev = sql[i - 1];

    if (ch === "'" && prev !== "\\" && !inDouble) inSingle = !inSingle;
    if (ch === '"' && prev !== "\\" && !inSingle) inDouble = !inDouble;

    if (ch === ";" && !inSingle && !inDouble) {
      if (cur.trim()) out.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

function normalizeSQL(s) {
  return s
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function startsWithAllowedPrefix(name) {
  return ALLOWED_PREFIXES.some((p) => name.toLowerCase().startsWith(p));
}

function isWriteStatement(stmt) {
  const s = normalizeSQL(stmt);
  return /^(create|insert|update|delete|drop|alter|replace)\b/.test(s);
}

function getWriteTarget(stmt) {
  const s = normalizeSQL(stmt);

  let m = s.match(/\bcreate\s+(table|view|trigger)\s+([a-z_][a-z0-9_]*)/);
  if (m) return m[2];

  m = s.match(/\binsert\s+into\s+([a-z_][a-z0-9_]*)/);
  if (m) return m[1];

  m = s.match(/\bupdate\s+([a-z_][a-z0-9_]*)/);
  if (m) return m[1];

  m = s.match(/\bdelete\s+from\s+([a-z_][a-z0-9_]*)/);
  if (m) return m[1];

  m = s.match(/\b(drop|alter)\s+table\s+([a-z_][a-z0-9_]*)/);
  if (m) return m[2];

  return null;
}

function guardSQLOrThrow(sqlText, { allowCoreWrites = false } = {}) {
  const statements = splitStatements(sqlText);
  for (const stmt of statements) {
    const s = normalizeSQL(stmt);
    if (!s) continue;

    if (!isWriteStatement(s)) continue;

    const target = getWriteTarget(s);
    if (!target) {
      throw new Error("Blocked: Write statement not recognized. Use tmp_ or user_ table names.");
    }

    if (!allowCoreWrites && CORE_TABLES.includes(target)) {
      throw new Error(`Blocked: Core table "${target}" is read-only. Use tmp_ or user_ tables.`);
    }

    if (!startsWithAllowedPrefix(target) && !CORE_TABLES.includes(target)) {
      throw new Error(
        `Blocked: You can only write to names starting with tmp_ or user_. (Target: "${target}")`
      );
    }
  }
}

function dataExecOne(sql) {
  const res = db.exec(sql);
  if (!res || !res[0]) return { columns: [], values: [] };
  return res[0];
}

function tableExists(name) {
  const r = dataExecOne(
    `SELECT 1 FROM sqlite_master WHERE type='table' AND name='${name}' LIMIT 1;`
  );
  return (r.values?.length ?? 0) > 0;
}

/**
 * ✅ DDL safety for validate-levels:
 * Converts "CREATE TABLE x" -> "CREATE TABLE IF NOT EXISTS x"
 * so re-checking doesn't throw "already exists".
 */
function makeCreateTableIdempotent(sqlText) {
  if (!sqlText) return sqlText;
  return sqlText.replace(
    /\bcreate\s+table\s+(?!if\s+not\s+exists)/gi,
    "CREATE TABLE IF NOT EXISTS "
  );
}

/** ---------- Demo data fill ---------- */
function safeCount(table) {
  try {
    const r = dataExecOne(`SELECT COUNT(*) AS c FROM ${table};`);
    return Number(r.values?.[0]?.[0] ?? 0);
  } catch {
    return 0;
  }
}

function ensureDemoData() {
  if (safeCount("subscriptions") === 0) {
    db.exec(`
      INSERT INTO subscriptions(subscription_id, customer_id, product_id, start_date, end_date, status, billing_period, mrr_usd) VALUES
      (201,1,2,'2025-03-01',NULL,'active','monthly',79.00),
      (202,2,1,'2025-03-05',NULL,'active','monthly',29.00),
      (203,3,2,'2025-03-10','2025-03-20','canceled','monthly',79.00),
      (204,4,3,'2025-03-15',NULL,'active','monthly',199.00),
      (205,8,1,'2025-03-26',NULL,'active','monthly',29.00);
    `);
  }

  if (safeCount("subscription_events") === 0) {
    db.exec(`
      INSERT INTO subscription_events(event_id, subscription_id, event_date, event_type, old_mrr_usd, new_mrr_usd, note) VALUES
      (301,201,'2025-03-01','created',NULL,79.00,'start'),
      (302,201,'2025-03-20','upgrade',79.00,104.00,'addon'),
      (303,202,'2025-03-05','created',NULL,29.00,'start'),
      (304,203,'2025-03-10','created',NULL,79.00,'start'),
      (305,203,'2025-03-20','canceled',79.00,0.00,'end'),
      (306,204,'2025-03-15','created',NULL,199.00,'start'),
      (307,205,'2025-03-26','created',NULL,29.00,'start'),
      (308,201,'2025-03-20','note',104.00,104.00,'same-day note');
    `);
  }

  if (safeCount("payments") === 0) {
    db.exec(`
      INSERT INTO payments(payment_id, order_id, customer_id, payment_date, amount_usd, payment_method, status) VALUES
      (401,101,1,'2025-03-01',79.00,'card','succeeded'),
      (402,102,1,'2025-03-03',22.50,'card','succeeded'),
      (403,103,2,'2025-03-04',29.00,'card','succeeded'),
      (404,114,8,'2025-03-27',70.00,'card','failed');
    `);
  }

  if (safeCount("refunds") === 0) {
    db.exec(`
      INSERT INTO refunds(refund_id, payment_id, refund_date, amount_usd, reason) VALUES
      (501,401,'2025-03-12',79.00,'customer_request');
    `);
  }

  if (safeCount("sessions") === 0) {
    db.exec(`
      INSERT INTO sessions(session_id, customer_id, session_start, source, device_type, country_code) VALUES
      (601,1,'2025-03-01 09:00','Organic','desktop','US'),
      (602,2,'2025-03-04 10:30','Paid Search','mobile','GB'),
      (603,4,'2025-03-16 14:10','Paid Social','mobile','IN'),
      (604,NULL,'2025-03-18 08:20','Organic','desktop','US');
    `);
  }

  if (safeCount("pageviews") === 0) {
    db.exec(`
      INSERT INTO pageviews(pageview_id, session_id, view_time, page, duration_sec) VALUES
      (701,601,'2025-03-01 09:01','/pricing',35),
      (702,601,'2025-03-01 09:02','/checkout',48),
      (703,602,'2025-03-04 10:31','/pricing',22),
      (704,603,'2025-03-16 14:11','/home',12),
      (705,604,'2025-03-18 08:21','/home',9);
    `);
  }

  if (safeCount("support_tickets") === 0) {
    db.exec(`
      INSERT INTO support_tickets(ticket_id, customer_id, created_at, closed_at, priority, category, status, satisfaction_score) VALUES
      (801,1,'2025-03-02 10:00','2025-03-02 12:00','high','Billing','closed',5),
      (802,2,'2025-03-06 09:00',NULL,'medium','Product','open',NULL),
      (803,4,'2025-03-17 15:00','2025-03-18 09:00','low','Onboarding','closed',4);
    `);
  }

  if (safeCount("ticket_comments") === 0) {
    db.exec(`
      INSERT INTO ticket_comments(comment_id, ticket_id, comment_time, author_type, body) VALUES
      (901,801,'2025-03-02 10:10','customer','Need invoice copy'),
      (902,801,'2025-03-02 10:30','agent','Sent invoice'),
      (903,802,'2025-03-06 09:10','customer','Feature request'),
      (904,803,'2025-03-17 15:20','agent','Welcome!');
    `);
  }

  if (safeCount("campaigns") === 0) {
    db.exec(`
      INSERT INTO campaigns(campaign_id, campaign_name, channel, start_date, end_date) VALUES
      (1001,'Spring Search','Paid Search','2025-03-01',NULL),
      (1002,'Social Boost','Paid Social','2025-03-10',NULL),
      (1003,'Partner Push','Partner','2025-03-05','2025-03-25');
    `);
  }

  if (safeCount("ad_spend_daily") === 0) {
    db.exec(`
      INSERT INTO ad_spend_daily(spend_date, campaign_id, spend_usd, clicks, impressions) VALUES
      ('2025-03-01',1001,60.00,30,900),
      ('2025-03-10',1002,120.00,55,2000),
      ('2025-03-11',1002,80.00,40,1500),
      ('2025-03-12',1002,90.00,45,1600);
    `);
  }

  if (safeCount("campaign_touches") === 0) {
    db.exec(`
      INSERT INTO campaign_touches(touch_id, customer_id, campaign_id, touch_time, touch_type) VALUES
      (1101,2,1001,'2025-03-02 10:00','click'),
      (1102,4,1002,'2025-03-12 14:00','impression'),
      (1103,7,1002,'2025-03-20 11:00','click'),
      (1104,3,1003,'2025-03-08 09:00','click');
    `);
  }

  if (safeCount("employees") === 0) {
    db.exec(`
      INSERT INTO employees(employee_id, name, role, manager_id, region, hired_date) VALUES
      (1201,'Maya','Director CS',NULL,'NA','2024-06-01'),
      (1202,'Noah','CSM',1201,'NA','2024-08-15'),
      (1203,'Isha','CSM',1201,'EU','2024-09-01');
    `);
  }

  if (safeCount("customer_success_assignments") === 0) {
    db.exec(`
      INSERT INTO customer_success_assignments(assignment_id, customer_id, employee_id, start_date, end_date) VALUES
      (1301,1,1202,'2025-03-01',NULL),
      (1302,2,1203,'2025-03-02',NULL),
      (1303,3,1202,'2025-03-10','2025-03-20');
    `);
  }
}

/** ---------- Levels (29) ---------- */
const levels = [
  {
    topic: "Chapter 1 — SELECT Basics",
    difficulty: "Easy",
    prompt: "Retrieve all customers (all columns) from customers, sorted by customer_id.",
    starter: `-- Table: customers
-- Return all columns, sorted by customer_id
`,
    hint: "SELECT * FROM customers ORDER BY customer_id;",
    expected: { sql: "SELECT * FROM customers ORDER BY customer_id;", normalize: { sortBy: [0] } },
    points: 80,
  },
  {
    topic: "Chapter 1 — WHERE Filters",
    difficulty: "Easy",
    prompt: "Show EU customers: customer_id, name, country_code, acquisition_channel sorted by customer_id.",
    starter: `-- Table: customers
-- Filter EU customers
`,
    hint: "WHERE region='EU'",
    expected: {
      sql: "SELECT customer_id, name, country_code, acquisition_channel FROM customers WHERE region='EU' ORDER BY customer_id;",
      normalize: { sortBy: [0] },
    },
    points: 90,
  },
  {
    topic: "Chapter 2 — ORDER BY + LIMIT",
    difficulty: "Easy",
    prompt: "Show the 3 newest signups: name, signup_date ordered newest → oldest.",
    starter: `-- Table: customers
-- Newest signups first
`,
    hint: "ORDER BY signup_date DESC LIMIT 3",
    expected: {
      sql: "SELECT name, signup_date FROM customers ORDER BY signup_date DESC LIMIT 3;",
      normalize: {},
    },
    points: 100,
  },
  {
    topic: "Chapter 3 — Aggregation",
    difficulty: "Easy",
    prompt: "Count customers per region (region, customer_count).",
    starter: `-- Table: customers
-- GROUP BY region
`,
    hint: "SELECT region, COUNT(*) ... GROUP BY region",
    expected: {
      sql: "SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region;",
      normalize: { sortBy: [0] },
    },
    points: 110,
  },
  {
    topic: "Chapter 3 — Aggregation + ROUND",
    difficulty: "Easy",
    prompt: "Show acquisition_channel and average company_size rounded to 1 decimal.",
    starter: `-- Table: customers
-- AVG + ROUND
`,
    hint: "ROUND(AVG(company_size), 1)",
    expected: {
      sql: "SELECT acquisition_channel, ROUND(AVG(company_size), 1) AS average_company_size FROM customers GROUP BY acquisition_channel;",
      normalize: { sortBy: [0] },
    },
    points: 120,
  },
  {
    topic: "Chapter 4 — JOINs",
    difficulty: "Medium",
    prompt: "Show order_id, customer name, product_name, order_date, status for all orders.",
    starter: `-- Tables: orders, customers, products
-- Join orders -> customers -> products
`,
    hint: "JOIN customers on customer_id and products on product_id",
    expected: {
      sql: `
        SELECT o.order_id, c.name, p.product_name, o.order_date, o.status
        FROM orders o
        JOIN customers c ON c.customer_id = o.customer_id
        JOIN products p ON p.product_id = o.product_id
        ORDER BY o.order_id;`,
      normalize: { sortBy: [0] },
    },
    points: 140,
  },
  {
    topic: "Chapter 4 — Revenue (discounts)",
    difficulty: "Medium",
    prompt: "Compute total USD list revenue from PAID orders for EU customers.",
    starter: `-- Tables: orders, customers, products
-- Paid EU revenue (USD list price), include discount_pct
`,
    hint: "SUM(p.price_usd * o.quantity * (1 - o.discount_pct/100.0))",
    expected: {
      sql: `
        SELECT ROUND(SUM(p.price_usd * o.quantity * (1 - o.discount_pct/100.0)), 2) AS total_usd
        FROM orders o
        JOIN customers c ON c.customer_id = o.customer_id
        JOIN products p ON p.product_id = o.product_id
        WHERE c.region='EU' AND o.status='paid';`,
      normalize: { numericCols: [0] },
    },
    points: 160,
  },
  {
    topic: "Chapter 5 — CASE",
    difficulty: "Medium",
    prompt: "Return name and size_bucket: Small (<50), Mid (50-199), Large (200+).",
    starter: `-- Table: customers
-- Use CASE to bucket customers
`,
    hint: "CASE WHEN company_size < 50 THEN 'Small' ... END",
    expected: {
      sql: `
        SELECT name,
               CASE
                 WHEN company_size < 50 THEN 'Small'
                 WHEN company_size BETWEEN 50 AND 199 THEN 'Mid'
                 ELSE 'Large'
               END AS size_bucket
        FROM customers
        ORDER BY name;`,
      normalize: { sortBy: [0] },
    },
    points: 150,
  },
  {
    topic: "Chapter 6 — Subquery",
    difficulty: "Hard",
    prompt: "List subscription_id, customer_id, mrr_usd where mrr_usd > average mrr.",
    starter: `-- Table: subscriptions
-- Subquery with AVG(mrr_usd)
`,
    hint: "WHERE mrr_usd > (SELECT AVG(mrr_usd) FROM subscriptions)",
    expected: {
      sql: `
        SELECT subscription_id, customer_id, mrr_usd
        FROM subscriptions
        WHERE mrr_usd > (SELECT AVG(mrr_usd) FROM subscriptions)
        ORDER BY subscription_id;`,
      normalize: { sortBy: [0], numericCols: [2] },
    },
    points: 200,
  },
  {
    topic: "Chapter 6 — IN",
    difficulty: "Medium",
    prompt: "List distinct customer_id and name for customers with any order status = 'failed'.",
    starter: `-- Tables: customers, orders
-- Use IN (subquery) or JOIN
`,
    hint: "customer_id IN (SELECT customer_id FROM orders WHERE status='failed')",
    expected: {
      sql: `
        SELECT customer_id, name
        FROM customers
        WHERE customer_id IN (SELECT customer_id FROM orders WHERE status='failed')
        ORDER BY customer_id;`,
      normalize: { sortBy: [0] },
    },
    points: 160,
  },
  {
    topic: "Chapter 7 — CTE",
    difficulty: "Medium",
    prompt: "Using a CTE, show order_id and net_usd for paid orders (after discount).",
    starter: `-- Tables: orders, products
-- WITH lines AS (...) SELECT ...
`,
    hint: "WITH lines AS (...) SELECT order_id, net_usd FROM lines",
    expected: {
      sql: `
        WITH lines AS (
          SELECT o.order_id,
                 (p.price_usd * o.quantity * (1 - o.discount_pct/100.0)) AS net_usd
          FROM orders o
          JOIN products p ON p.product_id = o.product_id
          WHERE o.status='paid'
        )
        SELECT order_id, ROUND(net_usd,2) AS net_usd
        FROM lines
        ORDER BY order_id;`,
      normalize: { sortBy: [0], numericCols: [1] },
    },
    points: 170,
  },
  {
    topic: "Chapter 7 — CTE + GROUP BY",
    difficulty: "Hard",
    prompt: "Using a CTE, show customer name and total_paid_usd for paid orders.",
    starter: `-- Tables: orders, products, customers
-- paid_lines CTE then aggregate
`,
    hint: "CTE then SUM(net_usd) GROUP BY customer",
    expected: {
      sql: `
        WITH paid_lines AS (
          SELECT o.customer_id,
                 (p.price_usd * o.quantity * (1 - o.discount_pct/100.0)) AS net_usd
          FROM orders o
          JOIN products p ON p.product_id = o.product_id
          WHERE o.status='paid'
        )
        SELECT c.name, ROUND(SUM(pl.net_usd),2) AS total_paid_usd
        FROM paid_lines pl
        JOIN customers c ON c.customer_id = pl.customer_id
        GROUP BY c.name
        ORDER BY c.name;`,
      normalize: { sortBy: [0], numericCols: [1] },
    },
    points: 210,
  },
  {
    topic: "Chapter 8 — Date Filtering",
    difficulty: "Easy",
    prompt: "List order_id, order_date for orders in March 2025.",
    starter: `-- Table: orders
-- March 2025 window
`,
    hint: "order_date >= '2025-03-01' AND order_date < '2025-04-01'",
    expected: {
      sql: `
        SELECT order_id, order_date
        FROM orders
        WHERE order_date >= '2025-03-01' AND order_date < '2025-04-01'
        ORDER BY order_id;`,
      normalize: { sortBy: [0] },
    },
    points: 110,
  },
  {
    topic: "Chapter 9 — LEFT JOIN (Orphans)",
    difficulty: "Medium",
    prompt: "List customers (customer_id, name) who have zero orders.",
    starter: `-- Tables: customers, orders
-- LEFT JOIN orders and filter NULL
`,
    hint: "LEFT JOIN ... WHERE o.order_id IS NULL",
    expected: {
      sql: `
        SELECT c.customer_id, c.name
        FROM customers c
        LEFT JOIN orders o ON o.customer_id = c.customer_id
        WHERE o.order_id IS NULL
        ORDER BY c.customer_id;`,
      normalize: { sortBy: [0] },
    },
    points: 170,
  },
  {
    topic: "Chapter 10 — FX Rates Join",
    difficulty: "Medium",
    prompt: "For orders on '2025-03-01', show order_id, currency, usd_rate using fx_rates_daily.",
    starter: `-- Tables: orders, fx_rates_daily
-- Join fx_rates_daily on rate_date + currency
`,
    hint: "ON fx.rate_date='2025-03-01' AND fx.currency=o.currency",
    expected: {
      sql: `
        SELECT o.order_id, o.currency, fx.usd_rate
        FROM orders o
        JOIN fx_rates_daily fx
          ON fx.rate_date='2025-03-01' AND fx.currency=o.currency
        WHERE o.order_date='2025-03-01'
        ORDER BY o.order_id;`,
      normalize: { sortBy: [0], numericCols: [2] },
    },
    points: 180,
  },
  {
    topic: "Chapter 10 — FX Revenue",
    difficulty: "Hard",
    prompt: "Compute total USD revenue for paid orders where currency != 'USD' using March 1 fx rates.",
    starter: `-- Tables: orders, products, fx_rates_daily
-- CTE for paid, then join fx and sum
`,
    hint: "SUM(net_usd_list * fx.usd_rate) WHERE currency <> 'USD'",
    expected: {
      sql: `
        WITH paid AS (
          SELECT o.order_id, o.currency,
                 (p.price_usd * o.quantity * (1 - o.discount_pct/100.0)) AS net_usd_list
          FROM orders o
          JOIN products p ON p.product_id=o.product_id
          WHERE o.status='paid'
        )
        SELECT ROUND(SUM(paid.net_usd_list * fx.usd_rate), 2) AS total_usd
        FROM paid
        JOIN fx_rates_daily fx
          ON fx.rate_date='2025-03-01' AND fx.currency=paid.currency
        WHERE paid.currency <> 'USD';`,
      normalize: { numericCols: [0] },
    },
    points: 260,
  },
  {
    topic: "Chapter 11 — Window Rank",
    difficulty: "Hard",
    prompt: "Rank customers by total paid revenue. Return name, total_paid_usd, rev_rank.",
    starter: `-- Tables: orders, products, customers
-- Aggregate then window RANK()
`,
    hint: "RANK() OVER (ORDER BY total_paid_usd DESC)",
    expected: {
      sql: `
        WITH paid_rev AS (
          SELECT o.customer_id,
                 SUM(p.price_usd * o.quantity * (1 - o.discount_pct/100.0)) AS total_paid_usd
          FROM orders o
          JOIN products p ON p.product_id=o.product_id
          WHERE o.status='paid'
          GROUP BY o.customer_id
        )
        SELECT c.name,
               ROUND(pr.total_paid_usd,2) AS total_paid_usd,
               RANK() OVER (ORDER BY pr.total_paid_usd DESC) AS rev_rank
        FROM paid_rev pr
        JOIN customers c ON c.customer_id=pr.customer_id
        ORDER BY rev_rank, c.name;`,
      normalize: { sortBy: [2, 0], numericCols: [1] },
    },
    points: 280,
  },
  {
    topic: "Chapter 11 — Running Total",
    difficulty: "Hard",
    prompt: "For each campaign_id, show spend_date, spend_usd, and running_spend by date.",
    starter: `-- Table: ad_spend_daily
-- Window SUM() OVER (PARTITION BY campaign_id ORDER BY spend_date)
`,
    hint: "SUM(spend_usd) OVER (PARTITION BY campaign_id ORDER BY spend_date)",
    expected: {
      sql: `
        SELECT campaign_id, spend_date, spend_usd,
               SUM(spend_usd) OVER (
                 PARTITION BY campaign_id
                 ORDER BY spend_date
                 ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
               ) AS running_spend
        FROM ad_spend_daily
        ORDER BY campaign_id, spend_date;`,
      normalize: { sortBy: [0, 1], numericCols: [2, 3] },
    },
    points: 300,
  },
  {
    topic: "Chapter 12 — Web Analytics",
    difficulty: "Easy",
    prompt: "Count sessions per source (source, sessions).",
    starter: `-- Table: sessions
-- GROUP BY source
`,
    hint: "SELECT source, COUNT(*) FROM sessions GROUP BY source",
    expected: {
      sql: "SELECT source, COUNT(*) AS sessions FROM sessions GROUP BY source ORDER BY source;",
      normalize: { sortBy: [0] },
    },
    points: 120,
  },
  {
    topic: "Chapter 12 — Pageviews",
    difficulty: "Easy",
    prompt: "Show page and average duration_sec rounded to 1 decimal.",
    starter: `-- Table: pageviews
-- AVG(duration_sec) GROUP BY page
`,
    hint: "ROUND(AVG(duration_sec), 1)",
    expected: {
      sql: "SELECT page, ROUND(AVG(duration_sec),1) AS avg_duration FROM pageviews GROUP BY page ORDER BY page;",
      normalize: { sortBy: [0], numericCols: [1] },
    },
    points: 130,
  },
  {
    topic: "Chapter 13 — Support",
    difficulty: "Easy",
    prompt: "Count support tickets per status (status, ticket_count).",
    starter: `-- Table: support_tickets
-- GROUP BY status
`,
    hint: "SELECT status, COUNT(*) FROM support_tickets GROUP BY status",
    expected: {
      sql: "SELECT status, COUNT(*) AS ticket_count FROM support_tickets GROUP BY status ORDER BY status;",
      normalize: { sortBy: [0] },
    },
    points: 130,
  },
  {
    topic: "Chapter 13 — Support Satisfaction",
    difficulty: "Medium",
    prompt: "Show category and average satisfaction_score rounded to 2 decimals.",
    starter: `-- Table: support_tickets
-- AVG ignores NULL in SQLite
`,
    hint: "ROUND(AVG(satisfaction_score), 2)",
    expected: {
      sql: "SELECT category, ROUND(AVG(satisfaction_score),2) AS avg_satisfaction FROM support_tickets GROUP BY category ORDER BY category;",
      normalize: { sortBy: [0], numericCols: [1] },
    },
    points: 170,
  },
  {
    topic: "Chapter 14 — Marketing",
    difficulty: "Easy",
    prompt: "Touches per customer: customer_id, touches (count).",
    starter: `-- Table: campaign_touches
-- COUNT(*) GROUP BY customer_id
`,
    hint: "SELECT customer_id, COUNT(*) AS touches FROM campaign_touches GROUP BY customer_id",
    expected: {
      sql: "SELECT customer_id, COUNT(*) AS touches FROM campaign_touches GROUP BY customer_id ORDER BY customer_id;",
      normalize: { sortBy: [0] },
    },
    points: 140,
  },
  {
    topic: "Chapter 14 — Attribution",
    difficulty: "Medium",
    prompt: "List distinct customer names who had a touch from a campaign with channel='Paid Social'.",
    starter: `-- Tables: campaign_touches, campaigns, customers
-- campaign_touches -> campaigns -> customers
`,
    hint: "JOIN campaigns and filter channel='Paid Social'",
    expected: {
      sql: `
        SELECT DISTINCT c.name
        FROM campaign_touches t
        JOIN campaigns cam ON cam.campaign_id=t.campaign_id
        JOIN customers c ON c.customer_id=t.customer_id
        WHERE cam.channel='Paid Social'
        ORDER BY c.name;`,
      normalize: { sortBy: [0] },
    },
    points: 180,
  },
  {
    topic: "Chapter 15 — People (Self-Join)",
    difficulty: "Medium",
    prompt: "Show employee name and manager name (NULL if none).",
    starter: `-- Table: employees
-- employees self join
`,
    hint: "LEFT JOIN employees m ON e.manager_id=m.employee_id",
    expected: {
      sql: `
        SELECT e.name AS employee, m.name AS manager
        FROM employees e
        LEFT JOIN employees m ON m.employee_id=e.manager_id
        ORDER BY e.employee_id;`,
      normalize: { sortBy: [0] },
    },
    points: 180,
  },
  {
    topic: "Chapter 16 — Customer Success",
    difficulty: "Medium",
    prompt: "List customer name and CS owner where assignment end_date IS NULL.",
    starter: `-- Tables: customer_success_assignments, customers, employees
-- assignments JOIN customers JOIN employees
`,
    hint: "WHERE a.end_date IS NULL",
    expected: {
      sql: `
        SELECT c.name AS customer, e.name AS cs_owner
        FROM customer_success_assignments a
        JOIN customers c ON c.customer_id=a.customer_id
        JOIN employees e ON e.employee_id=a.employee_id
        WHERE a.end_date IS NULL
        ORDER BY c.name;`,
      normalize: { sortBy: [0] },
    },
    points: 200,
  },

  // ✅ DDL / validate levels
  {
    topic: "Chapter 17 — DDL (CREATE TABLE)",
    difficulty: "Medium",
    prompt:
      "Create a table feature_flags with: flag_key TEXT PRIMARY KEY, enabled INTEGER NOT NULL. (Use tmp_ or user_ prefix.)",
    starter: `-- Example:
-- CREATE TABLE user_feature_flags(flag_key TEXT PRIMARY KEY, enabled INTEGER NOT NULL);
`,
    hint: "Use user_feature_flags or tmp_feature_flags.",
    validate() {
      const ok = tableExists("user_feature_flags") || tableExists("tmp_feature_flags");
      return ok ? { ok: true } : { ok: false, msg: "Create user_feature_flags or tmp_feature_flags." };
    },
    points: 210,
  },
  {
    topic: "Chapter 18 — DML (INSERT)",
    difficulty: "Medium",
    prompt:
      "Insert two rows into your feature flags table: ('new_checkout',1) and ('beta_reports',0). Then SELECT * ordered by flag_key.",
    starter: `-- Use the same table you created in previous level
-- INSERT INTO ...
-- SELECT * FROM ... ORDER BY flag_key;
`,
    hint: "INSERT INTO ... VALUES ('new_checkout',1),('beta_reports',0);",
    validate() {
      const tbl = tableExists("user_feature_flags")
        ? "user_feature_flags"
        : tableExists("tmp_feature_flags")
        ? "tmp_feature_flags"
        : null;

      if (!tbl) return { ok: false, msg: "Feature flags table not found. Create it first." };

      const r = dataExecOne(`SELECT flag_key, enabled FROM ${tbl} ORDER BY flag_key;`);
      const rows = r.values || [];
      const haveNew = rows.some((x) => x[0] === "new_checkout" && Number(x[1]) === 1);
      const haveBeta = rows.some((x) => x[0] === "beta_reports" && Number(x[1]) === 0);

      if (!haveNew || !haveBeta) {
        return { ok: false, msg: `Expected flags in ${tbl}: ('beta_reports',0) and ('new_checkout',1).` };
      }
      return { ok: true };
    },
    points: 230,
  },
  {
    topic: "Chapter 19 — Final Boss (Window + CTE)",
    difficulty: "Hard",
    prompt:
      "For each subscription_id, find the latest event and return subscription_id, event_type, new_mrr_usd.",
    starter: `-- Table: subscription_events
-- Use ROW_NUMBER() OVER (PARTITION BY subscription_id ORDER BY event_date DESC, event_id DESC)
-- then filter rn=1
`,
    hint: "ROW_NUMBER() OVER (PARTITION BY subscription_id ORDER BY event_date DESC, event_id DESC)",
    expected: {
      sql: `
        WITH ranked AS (
          SELECT subscription_id, event_type, new_mrr_usd,
                 ROW_NUMBER() OVER (
                   PARTITION BY subscription_id
                   ORDER BY event_date DESC, event_id DESC
                 ) AS rn
          FROM subscription_events
        )
        SELECT subscription_id, event_type, new_mrr_usd
        FROM ranked
        WHERE rn=1
        ORDER BY subscription_id;`,
      normalize: { sortBy: [0], numericCols: [2] },
    },
    points: 320,
  },
  {
    topic: "Chapter 20 — Payments Status",
    difficulty: "Easy",
    prompt: "Show payment_id, amount_usd for failed payments ordered by payment_id.",
    starter: `-- Table: payments
`,
    hint: "WHERE status='failed'",
    expected: {
      sql: "SELECT payment_id, amount_usd FROM payments WHERE status='failed' ORDER BY payment_id;",
      normalize: { sortBy: [0], numericCols: [1] },
    },
    points: 120,
  },
  {
    topic: "Chapter 21 — Refund Join",
    difficulty: "Medium",
    prompt: "Show refund_id, payment_id, amount_usd, reason ordered by refund_id.",
    starter: `-- Table: refunds
`,
    hint: "SELECT refund_id, payment_id, amount_usd, reason FROM refunds",
    expected: {
      sql: "SELECT refund_id, payment_id, amount_usd, reason FROM refunds ORDER BY refund_id;",
      normalize: { sortBy: [0], numericCols: [2] },
    },
    points: 160,
  },
  {
    topic: "Chapter 22 — Sessions + Pageviews",
    difficulty: "Medium",
    prompt: "Show session_id and number of pageviews for each session, ordered by session_id.",
    starter: `-- Tables: sessions, pageviews
`,
    hint: "LEFT JOIN pageviews then COUNT(pageview_id) GROUP BY session_id",
    expected: {
      sql: `
        SELECT s.session_id, COUNT(p.pageview_id) AS pageviews
        FROM sessions s
        LEFT JOIN pageviews p ON p.session_id = s.session_id
        GROUP BY s.session_id
        ORDER BY s.session_id;`,
      normalize: { sortBy: [0] },
    },
    points: 180,
  },
  {
    topic: "Chapter 23 — Tickets With Comments",
    difficulty: "Medium",
    prompt: "Show ticket_id and number of comments per ticket ordered by ticket_id.",
    starter: `-- Tables: support_tickets, ticket_comments
`,
    hint: "LEFT JOIN ticket_comments and COUNT(comment_id)",
    expected: {
      sql: `
        SELECT t.ticket_id, COUNT(c.comment_id) AS comments
        FROM support_tickets t
        LEFT JOIN ticket_comments c ON c.ticket_id = t.ticket_id
        GROUP BY t.ticket_id
        ORDER BY t.ticket_id;`,
      normalize: { sortBy: [0] },
    },
    points: 190,
  },
  {
    topic: "Chapter 24 — Campaign Spend Summary",
    difficulty: "Hard",
    prompt: "For each campaign_id, show total_spend_usd and total_clicks ordered by campaign_id.",
    starter: `-- Table: ad_spend_daily
`,
    hint: "SUM(spend_usd), SUM(clicks) GROUP BY campaign_id",
    expected: {
      sql: `
        SELECT campaign_id,
               ROUND(SUM(spend_usd),2) AS total_spend_usd,
               SUM(clicks) AS total_clicks
        FROM ad_spend_daily
        GROUP BY campaign_id
        ORDER BY campaign_id;`,
      normalize: { sortBy: [0], numericCols: [1] },
    },
    points: 240,
  },
  {
    topic: "Chapter 25 — Window Avg Spend",
    difficulty: "Hard",
    prompt: "For each campaign_id, show spend_date, spend_usd, and avg_spend_for_campaign (window AVG).",
    starter: `-- Table: ad_spend_daily
`,
    hint: "AVG(spend_usd) OVER (PARTITION BY campaign_id)",
    expected: {
      sql: `
        SELECT campaign_id, spend_date, spend_usd,
               ROUND(AVG(spend_usd) OVER (PARTITION BY campaign_id), 2) AS avg_spend_for_campaign
        FROM ad_spend_daily
        ORDER BY campaign_id, spend_date;`,
      normalize: { sortBy: [0, 1], numericCols: [2, 3] },
    },
    points: 280,
  },
  {
    topic: "Chapter 26 — Create tmp table",
    difficulty: "Medium",
    prompt: "Create tmp_notes(note_id INTEGER PRIMARY KEY, body TEXT NOT NULL).",
    starter: `-- Must start with tmp_ or user_
`,
    hint: "CREATE TABLE tmp_notes(...)",
    validate() {
      const ok = tableExists("tmp_notes") || tableExists("user_notes");
      return ok ? { ok: true } : { ok: false, msg: "Create tmp_notes or user_notes." };
    },
    points: 200,
  },
  {
    topic: "Chapter 27 — Insert into tmp table",
    difficulty: "Medium",
    prompt: "Insert one row into your tmp_notes/user_notes table. Then SELECT *.",
    starter: `-- INSERT INTO tmp_notes(body) VALUES ('hello');
-- SELECT * FROM tmp_notes;
`,
    hint: "INSERT then SELECT",
    validate() {
      const tbl = tableExists("tmp_notes") ? "tmp_notes" : tableExists("user_notes") ? "user_notes" : null;
      if (!tbl) return { ok: false, msg: "Notes table not found. Create it first." };
      const r = dataExecOne(`SELECT COUNT(*) FROM ${tbl};`);
      const c = Number(r.values?.[0]?.[0] ?? 0);
      return c > 0 ? { ok: true } : { ok: false, msg: "Insert at least one row." };
    },
    points: 220,
  },
  {
    topic: "Chapter 28 — Update tmp row",
    difficulty: "Hard",
    prompt: "Update your notes row to change body text, then SELECT *.",
    starter: `-- UPDATE tmp_notes SET body='updated' WHERE note_id=1;
-- SELECT * FROM tmp_notes;
`,
    hint: "UPDATE then SELECT",
    validate() {
      const tbl = tableExists("tmp_notes") ? "tmp_notes" : tableExists("user_notes") ? "user_notes" : null;
      if (!tbl) return { ok: false, msg: "Notes table not found." };
      const r = dataExecOne(`SELECT body FROM ${tbl} LIMIT 1;`);
      const body = String(r.values?.[0]?.[0] ?? "");
      return body && body.toLowerCase() !== "hello"
        ? { ok: true }
        : { ok: false, msg: "Update the body text to a new value." };
    },
    points: 260,
  },
  {
    topic: "Chapter 29 — Finish",
    difficulty: "Hard",
    prompt: "Final check: SELECT the total number of customers.",
    starter: `-- Table: customers
`,
    hint: "SELECT COUNT(*) FROM customers;",
    expected: { sql: "SELECT COUNT(*) AS customer_count FROM customers;", normalize: { numericCols: [0] } },
    points: 300,
  },
];

if (levels.length !== 29) {
  console.warn(`Expected 29 levels, got ${levels.length}.`);
}

/** =========================================================
 * ✅ Win Popup quotes
 * ========================================================= */
const WIN_QUOTES = [
  "Nice work. Your query matched the expected result.",
  "Correct. Keep going — your SQL is improving fast.",
  "Great job. That logic is solid.",
  "Correct. Clean and precise.",
  "Well done. You’re thinking like an analyst.",
  "Correct. That’s the right result set.",
  "Good job. Your filters and sorting are on point.",
  "Correct. You’re building strong SQL instincts.",
  "Nice. You’re reading the data correctly.",
  "Correct. Keep the momentum.",
  "Well done. Joins are starting to feel natural.",
  "Correct. Strong aggregation work.",
  "Nice work. Your query is consistent and accurate.",
  "Correct. This is exactly what the mission asked for.",
  "Great job. You’re becoming faster and cleaner.",
  "Correct. Smooth execution.",
  "Well done. Window functions are powerful — you used them well.",
  "Correct. That solution is reliable.",
  "Nice. You’re thinking in sets, not rows.",
  "Correct. Keep leveling up.",
  "Great work. Your SQL is disciplined.",
  "Correct. You handled edge cases well.",
  "Nice job. That’s a clean approach.",
  "Correct. Good structure and readability.",
  "Well done. You’re close to pro-level thinking.",
  "Correct. Strong finish.",
  "Nice work. You’re building real skill.",
  "Correct. Keep practicing — you’re on track.",
  "Correct. Final challenge cleared.",
];

function randPickNoRepeat(arr, lastValue) {
  if (arr.length <= 1) return arr[0];
  let pick = arr[Math.floor(Math.random() * arr.length)];
  let tries = 0;
  while (pick === lastValue && tries < 10) {
    pick = arr[Math.floor(Math.random() * arr.length)];
    tries++;
  }
  return pick;
}
let lastWinQuote = null;

/** ✅ Modal lock helper */
function syncModalLock() {
  const winOpen = !!winPopup && !winPopup.classList.contains("hidden");
  const lbOpen = !!leaderboardPopup && !leaderboardPopup.classList.contains("hidden");
  const dataOpen = !!dataPopup && !dataPopup.classList.contains("hidden");
  if (winOpen || lbOpen || dataOpen) document.body.classList.add("modal-open");
  else document.body.classList.remove("modal-open");
}

/** ---------- Win Popup ---------- */
function showWinPopup({ earned, breakdown } = {}) {
  if (!winPopup) return;

  const quote = randPickNoRepeat(WIN_QUOTES, lastWinQuote);
  lastWinQuote = quote;

  if (winTitleEl) winTitleEl.textContent = "Correct!";
  if (winMsgEl) {
    if (typeof earned === "number" && breakdown) {
      const bits = [];
      bits.push(`base ${breakdown.basePoints}`);
      if (breakdown.bonus) bits.push(`bonus +${breakdown.bonus}`);
      if (breakdown.timeBonus) bits.push(`time +${breakdown.timeBonus}`);
      if (breakdown.hintPenalty) bits.push(`hint -${breakdown.hintPenalty}`);
      if (breakdown.wrongPenalty) bits.push(`attempts -${breakdown.wrongPenalty}`);
      winMsgEl.textContent = `Correct (+${earned} points). [${bits.join(", ")}]`;
    } else if (typeof earned === "number") {
      winMsgEl.textContent = `Correct (+${earned} points).`;
    } else {
      winMsgEl.textContent = "Correct.";
    }
  }
  if (winQuoteEl) winQuoteEl.textContent = `“${quote}”`;

  winPopup.classList.remove("hidden");
  syncModalLock();
  setTimeout(() => winCloseBtn?.focus?.(), 0);
}

function hideWinPopup() {
  if (!winPopup) return;
  winPopup.classList.add("hidden");
  syncModalLock();
}

/** ---------- Helpers ---------- */
function setStatus(msg, kind = "muted") {
  if (!statusEl) return;
  statusEl.classList.remove("ok", "bad", "muted");
  if (kind === "ok") statusEl.classList.add("ok");
  else if (kind === "bad") statusEl.classList.add("bad");
  else statusEl.classList.add("muted");
  statusEl.textContent = msg;
}

function setNameStatus(msg) {
  if (!nameStatusEl) return;
  nameStatusEl.textContent = msg ?? "";
}

function safeNow() {
  return new Date().toLocaleString();
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/** ✅ Save progress + per-level SQL */
function saveState() {
  const payload = {
    levelIndex: state.levelIndex,
    progressIndex: state.progressIndex,
    levelSQL: state.levelSQL ?? {},

    score: state.score,
    streak: state.streak,
    history: state.history.slice(0, 20),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

/** ✅ Load progress + per-level SQL */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const parsed = JSON.parse(raw);

    // viewing index (clamped)
    const li = Number(parsed.levelIndex ?? 0);
    state.levelIndex = Number.isFinite(li) ? Math.max(0, Math.min(levels.length - 1, li)) : 0;

    // progressIndex = completed count (0..levels.length)
    const pi = Number(parsed.progressIndex ?? parsed.levelIndex ?? 0);
    state.progressIndex = Number.isFinite(pi) ? Math.max(0, Math.min(levels.length, pi)) : 0;

    // keep view accessible
    if (state.levelIndex > state.progressIndex) state.levelIndex = Math.min(state.levelIndex, state.progressIndex);

    state.levelSQL = parsed.levelSQL && typeof parsed.levelSQL === "object" ? parsed.levelSQL : {};

    state.score = parsed.score ?? 0;
    state.streak = parsed.streak ?? 0;
    state.history = Array.isArray(parsed.history) ? parsed.history : [];
  } catch {
    // ignore
  }
}

/** ✅ HUD now uses progressIndex */
function updateHUD() {
  if (levelNumEl) levelNumEl.textContent = String(state.levelIndex + 1);
  if (scoreEl) scoreEl.textContent = String(state.score);
  if (streakEl) streakEl.textContent = String(state.streak);

  if (nextBtn) {
    nextBtn.textContent = state.levelIndex >= levels.length - 1 ? "Finish" : "Next Level →";
  }

  // ✅ Completed count = progressIndex
  if (levelsProgressEl) {
    const completed = Math.max(0, Math.min(levels.length, state.progressIndex));
    levelsProgressEl.textContent = `${completed}/${levels.length}`;
  }
}

/** ---------- Player Name ---------- */
function loadPlayerName() {
  const saved = localStorage.getItem(PLAYER_KEY) || "";
  state.playerName = saved;
  if (playerNameInput) playerNameInput.value = saved;
  setNameStatus(saved ? `Saved as: ${saved}` : "No name saved yet.");
}

function savePlayerName() {
  const name = (playerNameInput?.value ?? "").trim();
  if (!name) {
    setStatus("Please enter your name (for leaderboard tracking).", "bad");
    setNameStatus("Enter a name, then click Save.");
    return;
  }
  state.playerName = name;
  localStorage.setItem(PLAYER_KEY, name);
  setStatus(`Saved player name: ${name}`, "ok");
  setNameStatus(`Saved as: ${name}`);
}

/** ---------- Leaderboard ---------- */
function loadLeaderboard() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function saveLeaderboard(list) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(list));
}

function statusTextForEntry(entry) {
  return entry.completed ? "Completed" : `Level ${entry.levelStopped}`;
}

function upsertLeaderboardEntry({ completed = false } = {}) {
  const name = (state.playerName ?? "").trim();
  if (!name) return;

  const list = loadLeaderboard();
  const levelStopped = completed ? levels.length : Math.max(1, state.progressIndex);
  const now = Date.now();

  const idx = list.findIndex((x) => (x.name ?? "").toLowerCase() === name.toLowerCase());

  const newEntry = { name, score: state.score, levelStopped, completed, updatedAt: now };

  if (idx >= 0) {
    const old = list[idx];
    const oldCompleted = !!old.completed;

    const better =
      newEntry.score > (old.score ?? 0) ||
      (newEntry.score === (old.score ?? 0) && newEntry.levelStopped > (old.levelStopped ?? 0)) ||
      (!oldCompleted && newEntry.completed);

    list[idx] = better ? newEntry : old;
  } else {
    list.push(newEntry);
  }

  saveLeaderboard(list);
}

function renderLeaderboard() {
  if (!leaderboardBody) return;

  const list = loadLeaderboard()
    .slice()
    .sort((a, b) => {
      if ((b.score ?? 0) !== (a.score ?? 0)) return (b.score ?? 0) - (a.score ?? 0);
      if (!!b.completed !== !!a.completed) return b.completed ? 1 : -1;
      if ((b.levelStopped ?? 0) !== (a.levelStopped ?? 0))
        return (b.levelStopped ?? 0) - (a.levelStopped ?? 0);
      return (a.updatedAt ?? 0) - (b.updatedAt ?? 0);
    });

  if (!list.length) {
    leaderboardBody.innerHTML = `<tr><td colspan="4" class="muted">No scores yet.</td></tr>`;
    return;
  }

  leaderboardBody.innerHTML = list
    .map((e, i) => {
      const status = statusTextForEntry(e);
      return `
        <tr>
          <td>${i + 1}</td>
          <td>${escapeHtml(e.name ?? "")}</td>
          <td>${Number(e.score ?? 0)}</td>
          <td>${escapeHtml(status)}</td>
        </tr>
      `;
    })
    .join("");
}

function openLeaderboard() {
  if (!leaderboardPopup) return;
  renderLeaderboard();
  leaderboardPopup.classList.remove("hidden");
  syncModalLock();
  leaderboardCloseBtn?.focus?.();
}

function closeLeaderboard() {
  if (!leaderboardPopup) return;
  leaderboardPopup.classList.add("hidden");
  syncModalLock();
}

/** ---------- Admin ---------- */
function lockAdminUI() {
  adminUnlocked = false;
  leaderboardClearBtn?.classList.add("hidden");
  leaderboardClearBtn?.setAttribute("aria-hidden", "true");
}

function unlockAdmin() {
  const pin = prompt("Admin PIN:");
  if (pin !== ADMIN_PIN) {
    alert("Wrong PIN.");
    return;
  }
  adminUnlocked = true;
  leaderboardClearBtn?.classList.remove("hidden");
  leaderboardClearBtn?.removeAttribute("aria-hidden");
  alert("Admin mode unlocked");
}

function clearLeaderboardAdminOnly() {
  if (!adminUnlocked) {
    alert("Admin mode locked (Use Alt + Shift + M to unlock)");
    return;
  }
  const ok = confirm("Clear ALL leaderboard entries?");
  if (!ok) return;
  localStorage.removeItem(LEADERBOARD_KEY);
  renderLeaderboard();
  alert("Leaderboard cleared.");
}

/** ---------- History ---------- */
function renderHistory() {
  if (!historyEl || !historyCountEl) return;

  historyCountEl.textContent = String(state.history.length);
  if (!state.history.length) {
    historyEl.innerHTML = `<p class="muted">No queries yet. Run something!</p>`;
    return;
  }

  historyEl.innerHTML = state.history
    .slice()
    .reverse()
    .map(
      (h) => `
      <div class="history-item">
        <div class="meta">
          <span>${escapeHtml(h.time)}</span>
          <span>${escapeHtml(h.type)}</span>
        </div>
        <pre>${escapeHtml(h.sql)}</pre>
      </div>
    `
    )
    .join("");
}

function pushHistory(sql, type = "run") {
  const cleaned = (sql ?? "").trim();
  if (!cleaned) return;
  state.history.push({ time: safeNow(), sql: cleaned, type });
  if (state.history.length > 20) state.history.shift();
  renderHistory();
  saveState();
}

/** ---------- SQL result helpers ---------- */
function normalizeResult(execResult, normalizeCfg) {
  if (!execResult || execResult.length === 0) return { columns: [], values: [] };

  const last = execResult[execResult.length - 1];
  const columns = last.columns || [];
  const values = last.values || [];

  let rows = values.map((r) =>
    r.map((v) => {
      if (v === null || v === undefined) return "";
      return v;
    })
  );

  if (normalizeCfg?.numericCols?.length) {
    const idxs = normalizeCfg.numericCols;
    rows = rows.map((row) => {
      const newRow = [...row];
      for (const i of idxs) {
        const n = Number(newRow[i]);
        newRow[i] = Number.isFinite(n) ? Math.round(n * 100) / 100 : newRow[i];
      }
      return newRow;
    });
  }

  if (normalizeCfg?.sortBy?.length) {
    const cols = normalizeCfg.sortBy;
    rows.sort((a, b) => {
      for (const c of cols) {
        if (a[c] < b[c]) return -1;
        if (a[c] > b[c]) return 1;
      }
      return 0;
    });
  }

  return { columns, values: rows };
}

function sameTable(a, b) {
  if (a.columns.length !== b.columns.length) return false;

  for (let i = 0; i < a.columns.length; i++) {
    if (String(a.columns[i]).toLowerCase() !== String(b.columns[i]).toLowerCase()) return false;
  }

  if (a.values.length !== b.values.length) return false;

  for (let r = 0; r < a.values.length; r++) {
    if (a.values[r].length !== b.values[r].length) return false;
    for (let c = 0; c < a.values[r].length; c++) {
      if (String(a.values[r][c]) !== String(b.values[r][c])) return false;
    }
  }
  return true;
}

function renderTable(result) {
  if (!output) return;

  if (!result || result.length === 0) {
    output.innerHTML = "<p class='muted'>No results</p>";
    return;
  }

  const last = result[result.length - 1];
  const { columns, values } = last;

  let html = "<table><thead><tr>";
  columns.forEach((c) => (html += `<th>${escapeHtml(c)}</th>`));
  html += "</tr></thead><tbody>";

  values.forEach((row) => {
    html += "<tr>";
    row.forEach((v) => (html += `<td>${escapeHtml(v ?? "")}</td>`));
    html += "</tr>";
  });

  html += "</tbody></table>";
  output.innerHTML = html;
}

/** ---------- DB Reset ---------- */
function hardResetDB() {
  if (!SQLMod) return;
  try {
    db?.close?.();
  } catch {}
  db = new SQLMod.Database();
  db.run(seedSQL);
  ensureDemoData();
}

/** ---------- Start / Game Screens ---------- */
function showStartScreen() {
  startScreen?.classList.remove("hidden");
  gameScreen?.classList.add("hidden");
}

function showGameScreen() {
  startScreen?.classList.add("hidden");
  gameScreen?.classList.remove("hidden");
}

function getStarterText(lvl) {
  return (lvl.starter ?? "").trimEnd() + (lvl.starter ? "\n" : "");
}

/** ✅ Remove "Chapter X — " ONLY for display */
function stripChapterLabel(s) {
  const raw = String(s ?? "");
  return raw.replace(/^chapter\s*\d+\s*[—-]\s*/i, "").trim();
}

/** ✅ Detect tables for: "Retrieve from: ..." */
function uniq(arr) {
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    const k = String(x).toLowerCase();
    if (!seen.has(k)) {
      seen.add(k);
      out.push(String(x));
    }
  }
  return out;
}

function detectTablesForLevel(lvl) {
  const starter = String(lvl?.starter ?? "");
  const m = starter.match(/^\s*--\s*Tables?\s*:\s*(.+)$/im);
  if (m && m[1]) {
    const list = m[1].split(",").map((x) => x.trim()).filter(Boolean);
    if (list.length) return uniq(list);
  }

  const text =
    String(lvl?.prompt ?? "") +
    "\n" +
    String(lvl?.expected?.sql ?? "") +
    "\n" +
    starter;

  const found = CORE_TABLES.filter((t) => new RegExp(`\\b${t}\\b`, "i").test(text));
  if (found.length) return uniq(found);

  return ["(not specified)"];
}

/** ✅ Save editor SQL per level */
function saveEditorSQLForCurrentLevel() {
  if (!input) return;
  const idx = state.levelIndex;
  state.levelSQL[idx] = input.value ?? "";
  saveState();
}

/** ✅ Load editor SQL per level */
function getEditorSQLForLevel(idx) {
  const saved = state.levelSQL?.[idx];
  if (typeof saved === "string" && saved.trim().length) return saved;
  return null;
}

function setProgressIndex(nextCompletedCount) {
  const capped = Math.max(0, Math.min(levels.length, nextCompletedCount));
  state.progressIndex = Math.max(state.progressIndex, capped);
}

/** ✅ Level loading restores saved SQL if it exists */
function loadLevel() {
  const lvl = levels[state.levelIndex];

  state.hintShown = false;
  state.attempts = 0;
  state.levelStartMs = Date.now();

  if (hintTextEl) hintTextEl.textContent = "";

  const cleanTopic = stripChapterLabel(lvl.topic ?? lvl.title ?? "");
  if (levelTitleEl) levelTitleEl.textContent = `Level ${state.levelIndex + 1}: ${cleanTopic}`;

  const tables = detectTablesForLevel(lvl);
  const tablesLine = `Retrieve from: ${tables.join(", ")}`;
  if (levelPromptEl) levelPromptEl.textContent = `${lvl.prompt}\n${tablesLine}`;

  if (difficultyEl) difficultyEl.textContent = lvl.difficulty ?? "—";

  // ✅ restore previous code if user already wrote something for this level
  const restored = getEditorSQLForLevel(state.levelIndex);
  if (input) input.value = restored ?? getStarterText(lvl);

  // ✅ if you're opening a completed level, Next should be available immediately
  if (nextBtn) {
    const alreadyCompleted = state.levelIndex < state.progressIndex;
    nextBtn.disabled = !alreadyCompleted;
  }

  if (output) output.innerHTML = `<p class="muted">Write a query and click <b>Run Query</b>.</p>`;

  renderLevelsList();
  setStatus("Write your query, click Run Query, then Check Answer.", "muted");
  updateHUD();
  saveState();
}

/** ✅ Start Game (auto-save name) */
function startGame() {
  let name = (state.playerName ?? "").trim();
  if (!name) name = (playerNameInput?.value ?? "").trim();
  if (!name) name = "Player";

  state.playerName = name;
  localStorage.setItem(PLAYER_KEY, name);
  setNameStatus(`Saved as: ${name}`);

  state.levelIndex = 0;
  state.progressIndex = 0;
  state.levelSQL = {};
  state.score = 0;
  state.streak = 0;
  state.hintShown = false;
  state.history = [];
  state.attempts = 0;
  state.levelStartMs = 0;

  hardResetDB();

  saveState();
  renderHistory();
  updateHUD();
  renderLevelsList();

  showGameScreen();
  loadLevel();
  setStatus("Write your query, click Run Query, then Check Answer.", "muted");
}

function restartGame() {
  const ok = confirm("Restart the game from Level 1? (Leaderboard stays)");
  if (!ok) return;

  state.levelIndex = 0;
  state.progressIndex = 0;
  state.levelSQL = {};
  state.score = 0;
  state.streak = 0;
  state.hintShown = false;
  state.history = [];
  state.attempts = 0;
  state.levelStartMs = 0;

  saveState();
  renderHistory();
  updateHUD();
  renderLevelsList();

  loadPlayerName();
  showStartScreen();
  setStatus("Welcome back! Enter your name and click Save.", "muted");
}

function clearHistory() {
  if (!state.history.length) {
    setStatus("History is already empty.", "muted");
    return;
  }
  const ok = confirm("Clear all query history?");
  if (!ok) return;

  state.history = [];
  renderHistory();
  saveState();
  setStatus("Query history cleared.", "muted");
}

/** ---------- Core Actions ---------- */
function runQuery() {
  if (!db) {
    if (output) output.innerHTML = `<p class="error">Database is still loading...</p>`;
    return;
  }

  try {
    const sql = input?.value.trim() ?? "";
    if (!sql) {
      if (output) output.innerHTML = `<p class="error">Type a SQL query first.</p>`;
      setStatus("Type a SQL query first.", "bad");
      return;
    }

    // ✅ save what user typed for this level
    saveEditorSQLForCurrentLevel();

    guardSQLOrThrow(sql);

    pushHistory(sql, "run");
    const result = db.exec(sql);
    renderTable(result);
    setStatus("Query executed. Now click Check Answer to validate.", "muted");
  } catch (err) {
    if (output) output.innerHTML = `<p class="error">${escapeHtml(err.message)}</p>`;
    setStatus(err.message || "Your query was blocked.", "bad");
  }
}

function checkAnswer() {
  if (!db) return;

  const lvl = levels[state.levelIndex];

  try {
    const userSQL = input?.value.trim() ?? "";
    if (!userSQL) {
      setStatus("Type a SQL query before checking.", "bad");
      return;
    }

    // ✅ save what user typed for this level
    saveEditorSQLForCurrentLevel();

    guardSQLOrThrow(userSQL);
    pushHistory(userSQL, "check");

    state.attempts += 1;

    // ✅ Validate-level (DDL/DML) flow
    if (typeof lvl.validate === "function") {
      // ✅ make CREATE TABLE safe on re-checks
      const safeSQL = makeCreateTableIdempotent(userSQL);

      db.exec(safeSQL);
      const v = lvl.validate(db);

      if (v?.ok) {
        const base = lvl.points ?? 0;
        const { earned, breakdown } = computeEarnedPoints(base);
        state.score += earned;

        if (breakdown.firstTry) state.streak += 1;
        else state.streak = 0;

        // ✅ Unlock forward based on progressIndex (NOT current view)
        setProgressIndex(state.levelIndex + 1);

        setStatus(`Correct! +${earned} points`, "ok");
        if (nextBtn) nextBtn.disabled = false;

        updateHUD();
        saveState();
        upsertLeaderboardEntry({ completed: false });
        showWinPopup({ earned, breakdown });
        renderLevelsList();
        return;
      }

      state.streak = 0;
      updateHUD();
      saveState();
      setStatus(`Not quite. ${v?.msg ?? "Try again."}`, "bad");
      renderLevelsList();
      return;
    }

    // Expected-result compare
    const userRaw = db.exec(userSQL);
    const expRaw = db.exec(lvl.expected.sql);

    const userNorm = normalizeResult(userRaw, lvl.expected.normalize);
    const expNorm = normalizeResult(expRaw, lvl.expected.normalize);

    if (userNorm.columns.length !== expNorm.columns.length) {
      state.streak = 0;
      updateHUD();
      saveState();
      setStatus(
        `Column mismatch. Expected: ${expNorm.columns.join(", ")} | You returned: ${userNorm.columns.join(", ")}`,
        "bad"
      );
      renderLevelsList();
      return;
    }

    const ok = sameTable(userNorm, expNorm);

    if (ok) {
      const base = lvl.points ?? 0;
      const { earned, breakdown } = computeEarnedPoints(base);
      state.score += earned;

      if (breakdown.firstTry) state.streak += 1;
      else state.streak = 0;

      // ✅ Unlock forward based on progressIndex (NOT current view)
      setProgressIndex(state.levelIndex + 1);

      setStatus(`Correct! +${earned} points`, "ok");
      if (nextBtn) nextBtn.disabled = false;

      updateHUD();
      saveState();
      upsertLeaderboardEntry({ completed: false });
      showWinPopup({ earned, breakdown });
      renderLevelsList();
      return;
    }

    state.streak = 0;
    updateHUD();
    saveState();
    setStatus("Not quite. Try again (Hint available).", "bad");
    renderLevelsList();
  } catch (err) {
    setStatus(`Error while checking: ${err.message}`, "bad");
    renderLevelsList();
  }
}

function nextLevel() {
  hideWinPopup();

  // ✅ if you’re at the end and have completed all, mark completed
  if (state.progressIndex >= levels.length && state.levelIndex >= levels.length - 1) {
    setStatus("You finished all levels! (Marked as Completed)", "ok");
    upsertLeaderboardEntry({ completed: true });
    if (nextBtn) nextBtn.disabled = true;
    updateHUD();
    renderLevelsList();
    return;
  }

  if (state.levelIndex >= levels.length - 1) {
    setStatus("This is the final level.", "muted");
    if (nextBtn) nextBtn.disabled = true;
    updateHUD();
    renderLevelsList();
    return;
  }

  // ✅ move forward in view
  state.levelIndex += 1;

  // ✅ prevent viewing a locked level
  if (state.levelIndex > state.progressIndex) {
    state.levelIndex = state.progressIndex;
  }

  saveState();
  loadLevel();
}

function resetDB() {
  if (!db) return;

  hardResetDB();
  state.streak = 0;
  state.attempts = 0;
  state.levelStartMs = Date.now();

  if (output) output.innerHTML = `<p class="muted">DB reset. Write a query and click <b>Run Query</b>.</p>`;
  setStatus("DB reset complete. You can retry the level from scratch.", "muted");

  updateHUD();
  saveState();
  renderLevelsList();
}

function showHint() {
  const lvl = levels[state.levelIndex];
  state.hintShown = true;
  if (hintTextEl) hintTextEl.textContent = lvl.hint ?? "";
  setStatus("Hint shown (hint penalty will apply).", "muted");
  saveState();
}

/** =========================
 * Dataset Viewer
 * ========================= */
function renderMiniTable({ columns, values }) {
  if (!columns.length) return `<p class="muted">No data.</p>`;

  const thead = `<thead><tr>${columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${values
    .map((row) => `<tr>${row.map((v) => `<td>${escapeHtml(v ?? "")}</td>`).join("")}</tr>`)
    .join("")}</tbody>`;

  return `<div style="overflow:auto;"><table>${thead}${tbody}</table></div>`;
}

function setDataTab(which) {
  if (!schemaBoxEl || !previewBoxEl || !tabSchemaBtn || !tabPreviewBtn) return;
  const schema = which === "schema";
  tabSchemaBtn.classList.toggle("active", schema);
  tabPreviewBtn.classList.toggle("active", !schema);
  schemaBoxEl.classList.toggle("hidden", !schema);
  previewBoxEl.classList.toggle("hidden", schema);
}

function selectTable(tableName, btnEl) {
  if (tableListEl) {
    [...tableListEl.querySelectorAll("button")].forEach((b) => b.classList.remove("active"));
  }
  btnEl?.classList.add("active");

  if (tableTitleEl2) tableTitleEl2.textContent = tableName;

  setDataTab("schema");

  const schema = dataExecOne(`PRAGMA table_info(${tableName});`);
  if (schemaBoxEl) schemaBoxEl.innerHTML = renderMiniTable(schema);

  const preview = dataExecOne(`SELECT * FROM ${tableName} LIMIT 10;`);
  if (previewBoxEl) previewBoxEl.innerHTML = renderMiniTable(preview);
}

function renderTablesList() {
  if (!db || !tableListEl) return;

  const { values } = dataExecOne(`
    SELECT name
    FROM sqlite_master
    WHERE type='table' AND name NOT LIKE 'sqlite_%'
    ORDER BY name;
  `);

  tableListEl.innerHTML = "";

  if (!values.length) {
    tableListEl.innerHTML = `<p class="muted">No tables found.</p>`;
    return;
  }

  values.forEach(([name], idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = name;
    btn.className = "data-table-btn";
    btn.addEventListener("click", () => selectTable(name, btn));
    tableListEl.appendChild(btn);

    if (idx === 0) selectTable(name, btn);
  });
}

function openDataPopup() {
  if (!dataPopup) return;
  renderTablesList();
  dataPopup.classList.remove("hidden");
  syncModalLock();
  setTimeout(() => dataCloseBtn?.focus?.(), 0);
}

function closeDataPopup() {
  if (!dataPopup) return;
  dataPopup.classList.add("hidden");
  syncModalLock();
}

/** =========================
 * Levels Sidebar
 * ========================= */
function getUnlockedMaxIndex() {
  // unlocked based on progressIndex (NOT current view)
  return Math.max(0, Math.min(levels.length, state.progressIndex));
}

function renderLevelsList() {
  if (!levelsListEl) return;

  const progress = getUnlockedMaxIndex();

  // progress display = completed count
  if (levelsProgressEl) {
    const completed = Math.max(0, Math.min(levels.length, state.progressIndex));
    levelsProgressEl.textContent = `${completed}/${levels.length}`;
  }

  levelsListEl.innerHTML = levels
    .map((lvl, idx) => {
      const isUnlocked = idx <= progress;
      const isCurrent = idx === state.levelIndex;
      const isCompleted = idx < progress;

      const badge = isCurrent ? "⭐" : isCompleted ? "✅" : isUnlocked ? "🔓" : "🔒";
      const topicClean = stripChapterLabel(lvl.topic ?? `Level ${idx + 1}`);
      const diff = lvl.difficulty ?? "";

      return `
        <button
          type="button"
          class="level-item ${isCurrent ? "current" : ""} ${isUnlocked ? "" : "locked"}"
          data-level="${idx}"
          ${isUnlocked ? "" : 'disabled aria-disabled="true"'}
          title="${isUnlocked ? "Open level" : "Locked"}"
        >
          <div class="li-top">
            <div class="li-num">Level ${idx + 1}</div>
            <div class="li-badge">${badge}</div>
          </div>
          <div class="li-title">${escapeHtml(topicClean)}</div>
          <div class="li-sub">${escapeHtml(diff)}</div>
        </button>
      `;
    })
    .join("");

  [...levelsListEl.querySelectorAll("button.level-item")].forEach((btn) => {
    const idx = Number(btn.getAttribute("data-level"));
    if (!Number.isFinite(idx)) return;
    if (btn.disabled) return;

    btn.addEventListener("click", () => {
      // changing view level must NOT change progressIndex
      state.levelIndex = idx;

      // if somehow user clicks beyond progress (shouldn't happen), clamp
      if (state.levelIndex > state.progressIndex) state.levelIndex = state.progressIndex;

      saveState();
      hideWinPopup();
      loadLevel();
    });
  });
}

/** ---------- Hotkeys ---------- */
function setupHotkeys() {
  document.addEventListener(
    "keydown",
    (e) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (e.key === "Escape") {
        if (winPopup && !winPopup.classList.contains("hidden")) hideWinPopup();
        if (leaderboardPopup && !leaderboardPopup.classList.contains("hidden")) closeLeaderboard();
        if (dataPopup && !dataPopup.classList.contains("hidden")) closeDataPopup();
        return;
      }

      if (mod && e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        runQuery();
        return;
      }

      if (e.altKey && e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        checkAnswer();
        return;
      }

      if (mod && e.shiftKey && (e.code === "KeyB" || e.key.toLowerCase() === "b")) {
        e.preventDefault();
        e.stopPropagation();
        if (leaderboardPopup && !leaderboardPopup.classList.contains("hidden")) closeLeaderboard();
        else openLeaderboard();
        return;
      }

      if (e.altKey && e.shiftKey && (e.code === "KeyM" || e.key.toLowerCase() === "m")) {
        e.preventDefault();
        e.stopPropagation();
        unlockAdmin();
        return;
      }
    },
    true
  );
}
// ✅ Do NOT persist player name across reloads
localStorage.removeItem(PLAYER_KEY);

/** ---------- Init ---------- */
async function initDB() {
  try {
    SQLMod = await initSqlJs({
      locateFile: (file) => (file.endsWith(".wasm") ? wasmUrl : file),
    });

    db = new SQLMod.Database();
    db.run(seedSQL);
    ensureDemoData();

    loadPlayerName();
    loadState();
    renderHistory();
    updateHUD();

    lockAdminUI();
    showStartScreen();
    setStatus("Welcome! Enter your name, save, then Start Game.", "muted");

    setupHotkeys();
    renderLevelsList();
  } catch (err) {
    if (output) output.innerHTML = `<p class="error">Failed to initialize DB: ${escapeHtml(err.message)}</p>`;
    setStatus("DB failed to initialize. Check console.", "bad");
    console.error(err);
  }
}

/** ---------- Events ---------- */
runBtn?.addEventListener("click", runQuery);
checkBtn?.addEventListener("click", checkAnswer);
nextBtn?.addEventListener("click", nextLevel);
resetBtn?.addEventListener("click", resetDB);
hintBtn?.addEventListener("click", showHint);

clearHistoryBtn?.addEventListener("click", clearHistory);
startGameBtn?.addEventListener("click", startGame);
restartGameBtn?.addEventListener("click", restartGame);

savePlayerBtn?.addEventListener("click", savePlayerName);
playerNameInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") savePlayerName();
});

openLeaderboardBtn?.addEventListener("click", openLeaderboard);
leaderboardCloseBtn?.addEventListener("click", closeLeaderboard);
leaderboardClearBtn?.addEventListener("click", clearLeaderboardAdminOnly);

if (leaderboardPopup) {
  leaderboardPopup.addEventListener("click", (e) => {
    if (e.target === leaderboardPopup) closeLeaderboard();
  });
}

if (winCloseBtn) {
  winCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    nextLevel();
  });
}
if (winPopup) {
  winPopup.addEventListener("click", (e) => {
    if (e.target === winPopup) hideWinPopup();
  });
}

dataBtn?.addEventListener("click", openDataPopup);
dataCloseBtn?.addEventListener("click", closeDataPopup);
tabSchemaBtn?.addEventListener("click", () => setDataTab("schema"));
tabPreviewBtn?.addEventListener("click", () => setDataTab("preview"));
if (dataPopup) {
  dataPopup.addEventListener("click", (e) => {
    if (e.target === dataPopup) closeDataPopup();
  });
}

/**
 * ✅ Auto-save SQL while typing (so you NEVER lose your code)
 */
input?.addEventListener("input", () => {
  saveEditorSQLForCurrentLevel();
});

// ✅ start DB + UI
initDB();
