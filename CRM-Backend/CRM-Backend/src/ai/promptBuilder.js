// // src/ai/promptBuilder.js
// // Detects casual greetings vs CRM questions and builds appropriate prompt

// const CASUAL_TRIGGERS = [
//   "hi",
//   "hello",
//   "hey",
//   "what's up",
//   "whats up",
//   "sup",
//   "good morning",
//   "good afternoon",
//   "good evening",
//   "how are you",
//   "how r u",
//   "yo",
//   "hiya",
//   "greetings",
//   "howdy",
// ];

// function isCasualGreeting(question) {
//   const q = question
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z\s]/g, "");
//   return CASUAL_TRIGGERS.some(
//     (t) => q === t || q.startsWith(t + " ") || q.endsWith(" " + t),
//   );
// }

// export function buildSalesPrompt(insights, question) {
//   console.log("📝 [PROMPT BUILDER] Building prompt for question:", question);

//   // ── Casual greeting → natural reply, no data ─────────────────────────────
//   if (isCasualGreeting(question)) {
//     console.log(
//       "📝 [PROMPT BUILDER] Detected casual greeting — conversational mode",
//     );
//     const prompt = `You are a helpful CRM sales assistant. Reply naturally and warmly in 1-2 sentences. Do NOT list data unless asked.

// User: ${question}
// Assistant:`;
//     console.log(
//       `📝 [PROMPT BUILDER] Prompt length: ${prompt.length} chars (casual mode)`,
//     );
//     return prompt;
//   }

//   // ── CRM question → include sales data ────────────────────────────────────
//   console.log(
//     "📝 [PROMPT BUILDER] Detected CRM question — including sales data",
//   );

//   const {
//     totalDeals = 0,
//     openDeals = 0,
//     wonDeals = 0,
//     lostDeals = 0,
//     totalRevenue = 0,
//     winRate = 0,
//     dealsByStage = {},
//     topPerformers = [],
//     atRiskDeals = [],
//     closingSoonDeals = [],
//   } = insights;

//   const stageLines = Object.entries(dealsByStage)
//     .map(([stage, count]) => `  ${stage}: ${count}`)
//     .join("\n");

//   const topPerfLines = topPerformers.length
//     ? topPerformers
//         .slice(0, 3)
//         .map(
//           (p, i) =>
//             `  ${i + 1}. ${p.name} — ₹${(p.revenue || 0).toLocaleString()} (${p.deals} deals)`,
//         )
//         .join("\n")
//     : "  No data yet";

//   const atRiskLines = atRiskDeals.length
//     ? atRiskDeals
//         .slice(0, 3)
//         .map(
//           (d) =>
//             `  - ${d.dealName}: ₹${(d.amount || 0).toLocaleString()} (${d.stage})`,
//         )
//         .join("\n")
//     : "  None";

//   const closingSoonLines = closingSoonDeals.length
//     ? closingSoonDeals
//         .slice(0, 3)
//         .map(
//           (d) =>
//             `  - ${d.dealName}: ₹${(d.amount || 0).toLocaleString()} closing ${d.closingDate}`,
//         )
//         .join("\n")
//     : "  None";

//   const prompt = `You are a sharp, helpful CRM sales assistant. Answer directly and concisely. Match your tone to the question — be conversational, not robotic. Use bullet points only if listing multiple items, otherwise answer in plain sentences.

// === CURRENT CRM DATA ===
// Deals: ${totalDeals} total | ${openDeals} open | ${wonDeals} won | ${lostDeals} lost
// Revenue: ₹${totalRevenue.toLocaleString()} | Win Rate: ${winRate}%

// Pipeline by stage:
// ${stageLines || "  No stage data"}

// Top Performers:
// ${topPerfLines}

// At-Risk Deals:
// ${atRiskLines}

// Closing Soon:
// ${closingSoonLines}
// ========================

// User question: ${question}
// Answer:`;

//   console.log(
//     `📝 [PROMPT BUILDER] Prompt length: ${prompt.length} chars (CRM mode)`,
//   );
//   return prompt;
// }

// export function buildAdvancedAnalyticsPrompt(snapshot, question) {
//   const {
//     totalDeals,
//     openDeals,
//     wonDeals,
//     winRate,
//     monthlyWonAmount,
//     monthlyWonCount,
//   } = snapshot;

//   return `You are a senior CRM analytics strategist.

// Provide executive-level insights.
// Be concise, sharp, and actionable.
// Do NOT add markdown headers.
// Do NOT combine bullets.
// Use EXACT structure below.

// === CRM ANALYTICS SNAPSHOT ===
// Total Deals: ${totalDeals}
// Open Deals: ${openDeals}
// Won Deals: ${wonDeals}
// Win Rate: ${winRate}%
// Monthly Won Revenue: ₹${monthlyWonAmount.toLocaleString()}
// Monthly Won Count: ${monthlyWonCount}
// ================================

// User question: ${question}

// Respond EXACTLY in this format:

// 1. KEY INSIGHT
// - Insight 1
// - Insight 2

// 2. RISK OBSERVATION
// - Risk 1
// - Risk 2

// 3. OPPORTUNITY SUGGESTION
// - Opportunity 1
// - Opportunity 2

// 4. STRATEGIC RECOMMENDATION
// - Recommendation 1
// - Recommendation 2`;
// }
// export function buildQuickAnalyticsPrompt(snapshot) {
//   const {
//     totalDeals,
//     openDeals,
//     wonDeals,
//     winRate,
//     monthlyWonAmount,
//   } = snapshot;

//   return `You are a CRM executive assistant.

// Provide a concise executive snapshot in EXACTLY 4 lines.

// Use this structure only.
// Do NOT use numbering.
// Do NOT use bullets.
// Do NOT add extra text.

// Pipeline Status: Brief 1 sentence about overall pipeline health based on:
// - Total Deals: ${totalDeals}
// - Open Deals: ${openDeals}
// - Won Deals: ${wonDeals}
// - Win Rate: ${winRate}%

// Main Risk: 1 sentence identifying the biggest risk.

// Immediate Action: 1 practical action.

// Strategic Recommendation: 1 strategic improvement suggestion.

// Monthly Revenue Context: ₹${monthlyWonAmount.toLocaleString()}`;
// }

// src/ai/promptBuilder.js

/* =========================================================
   CASUAL GREETING DETECTION
========================================================= */

const CASUAL_TRIGGERS = [
  "hi",
  "hello",
  "hey",
  "what's up",
  "whats up",
  "sup",
  "good morning",
  "good afternoon",
  "good evening",
  "how are you",
  "how r u",
  "yo",
  "hiya",
  "greetings",
  "howdy",
];

function isCasualGreeting(question) {
  const q = question
    .trim()
    .toLowerCase()
    .replace(/[^a-z\s]/g, "");

  return CASUAL_TRIGGERS.some(
    (t) => q === t || q.startsWith(t + " ") || q.endsWith(" " + t),
  );
}

/* =========================================================
   QUESTION CLASSIFIER (EXTRA LAYER BEFORE BRAIN 1)
========================================================= */

export function classifyQuestion(question) {
  const q = question.toLowerCase();

  // Security sensitive
  if (
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("mobile") ||
    q.includes("contact list") ||
    q.includes("download") ||
    q.includes("export") ||
    q.includes("database")
  ) {
    return "security_sensitive";
  }

  // Analytics questions
  if (
    q.includes("revenue") ||
    q.includes("pipeline") ||
    q.includes("deals") ||
    q.includes("conversion") ||
    q.includes("win rate") ||
    q.includes("stage") ||
    q.includes("performance")
  ) {
    return "analytics_question";
  }

  // Casual greeting
  if (isCasualGreeting(question)) {
    return "casual";
  }

  return "general_crm";
}

/* =========================================================
   SECURITY SYSTEM PROMPT
========================================================= */

export const SECURITY_SYSTEM_PROMPT = `
You are a professional CRM analytics assistant.

STRICT SECURITY RULES:
- Never reveal customer personal data.
- Never reveal emails, phone numbers, addresses.
- Never expose raw database records.
- Never list customers or contacts.
- Only discuss aggregated CRM analytics.

OUTPUT FORMAT RULES (VERY IMPORTANT):
- Never use **markdown**, **asterisks**, ***stars***, or code formatting.
- Never use **bold markers** like **text**.
- Do NOT use symbols like ###, **, or ---.
- Write clean professional text only.

Structure responses like this:

Pipeline Overview
- insight
- insight

Revenue Performance
- insight
- insight

Key Observations
- insight
- insight

Recommendations
- insight
- insight

Allowed topics:
- sales performance
- pipeline analytics
- deal stages
- revenue insights
- CRM strategy
- sales forecasting

If a user asks for restricted information,
politely refuse and explain that customer data is protected.
`;

/* =========================================================
   SALES PROMPT BUILDER
========================================================= */

export function buildSalesPrompt(insights, question) {
  console.log("📝 [PROMPT BUILDER] Building prompt for:", question);

  // ── Casual greeting
  if (isCasualGreeting(question)) {
    const prompt = `
User: ${question}
Assistant:`;

    return [
      {
        role: "system",
        content:
          "You are a friendly CRM assistant. Reply warmly in 1-2 sentences.",
      },
      {
        role: "user",
        content: prompt,
      },
    ];
  }

  console.log("📝 [PROMPT BUILDER] CRM analytics prompt");

  const {
    totalDeals = 0,
    openDeals = 0,
    wonDeals = 0,
    lostDeals = 0,
    totalRevenue = 0,
    winRate = 0,
    dealsByStage = {},
    topPerformers = [],
    atRiskDeals = [],
    closingSoonDeals = [],
  } = insights;

  const stageLines = Object.entries(dealsByStage)
    .map(([stage, count]) => `${stage}: ${count}`)
    .join("\n");

  const topPerfLines = topPerformers.length
    ? topPerformers
        .slice(0, 3)
        .map(
          (p, i) =>
            `${i + 1}. ${p.name} — ₹${(p.revenue || 0).toLocaleString()} (${p.deals} deals)`,
        )
        .join("\n")
    : "No data yet";

  const atRiskLines = atRiskDeals.length
    ? atRiskDeals
        .slice(0, 3)
        .map(
          (d) =>
            `${d.dealName}: ₹${(d.amount || 0).toLocaleString()} (${d.stage})`,
        )
        .join("\n")
    : "None";

  const closingSoonLines = closingSoonDeals.length
    ? closingSoonDeals
        .slice(0, 3)
        .map(
          (d) =>
            `${d.dealName}: ₹${(d.amount || 0).toLocaleString()} closing ${d.closingDate}`,
        )
        .join("\n")
    : "None";

  const prompt = `
=== CRM SALES SNAPSHOT ===

Deals:
Total: ${totalDeals}
Open: ${openDeals}
Won: ${wonDeals}
Lost: ${lostDeals}

Revenue: ₹${totalRevenue.toLocaleString()}
Win Rate: ${winRate}%

Pipeline by Stage:
${stageLines || "No stage data"}

Top Performers:
${topPerfLines}

At Risk Deals:
${atRiskLines}

Closing Soon:
${closingSoonLines}

==========================

User Question:
${question}

Provide a structured CRM analysis using these sections:

Pipeline Overview
Revenue Performance
Key Observations
Recommendations

Use bullet points.
Do not use markdown symbols.
`;

  return [
    {
      role: "system",
      content: SECURITY_SYSTEM_PROMPT,
    },
    {
      role: "user",
      content: prompt,
    },
  ];
}

/* =========================================================
   ADVANCED ANALYTICS PROMPT
========================================================= */

export function buildAdvancedAnalyticsPrompt(snapshot, question) {
  const {
    totalDeals,
    openDeals,
    wonDeals,
    winRate,
    monthlyWonAmount,
    monthlyWonCount,
  } = snapshot;

  const prompt = `
=== CRM ANALYTICS SNAPSHOT ===

Total Deals: ${totalDeals}
Open Deals: ${openDeals}
Won Deals: ${wonDeals}

Win Rate: ${winRate}%

Monthly Won Revenue: ₹${monthlyWonAmount.toLocaleString()}
Monthly Won Count: ${monthlyWonCount}

===============================

User Question:
${question}

Provide executive CRM insights.
`;

  return [
    {
      role: "system",
      content:
        SECURITY_SYSTEM_PROMPT +
        "\nProvide executive-level analytics insights.",
    },
    {
      role: "user",
      content: prompt,
    },
  ];
}

/* =========================================================
   QUICK ANALYTICS PROMPT
========================================================= */

export function buildQuickAnalyticsPrompt(snapshot) {
  const { totalDeals, openDeals, wonDeals, winRate, monthlyWonAmount } =
    snapshot;

  const prompt = `
CRM SNAPSHOT

Total Deals: ${totalDeals}
Open Deals: ${openDeals}
Won Deals: ${wonDeals}
Win Rate: ${winRate}%

Monthly Revenue: ₹${monthlyWonAmount.toLocaleString()}

Provide a concise executive summary.
`;

  return [
    {
      role: "system",
      content:
        SECURITY_SYSTEM_PROMPT +
        "\nProvide a short executive summary in 4 sentences.",
    },
    {
      role: "user",
      content: prompt,
    },
  ];
}
