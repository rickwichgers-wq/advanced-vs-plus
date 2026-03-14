import { APP_NAME } from '../utils/brand.js';
import { generatedDocs } from '../core/db.js';
import { getUserEmail } from '../core/auth.js';
import { OUTCOME_MAP, SUCCESS_STORIES, VERTICAL_PROFILES } from '../utils/data.js';

async function callAI(prompt, { system = '' } = {}) {
  if (!window.quick?.ai) {
    throw new Error('AI service not available. Make sure quick.ai is loaded.');
  }

  const messages = [];
  if (system) messages.push({ role: 'system', content: system });
  messages.push({ role: 'user', content: prompt });

  const response = await window.quick.ai.chat(messages);
  return response?.content
    || response?.message?.content
    || response?.choices?.[0]?.message?.content
    || (typeof response === 'string' ? response : '');
}

const SYSTEM_PROMPT = `You are a Shopify sales enablement assistant used by Account Executives and Solutions Consultants. You help articulate the value of Shopify Plus vs Shopify Advanced. Be professional, data-driven, and concise. Use specific numbers and capabilities where possible. Frame everything around business outcomes, not feature lists.`;

// ---------------------------------------------------------------------------
// Rep Prep functions
// ---------------------------------------------------------------------------

function buildOutcomeContext(selectedOutcomes, calcData) {
  const outcomes = selectedOutcomes
    .map(id => OUTCOME_MAP[id])
    .filter(Boolean);

  const outcomeLines = outcomes.map(o =>
    `- ${o.label}: ${o.description}\n  Proof: ${o.proofPoints.join('; ')}`
  ).join('\n');

  let calcContext = '';
  if (calcData) {
    const parts = [];
    if (calcData.annualSavings) parts.push(`Annual fee savings: ${calcData.annualSavings}`);
    if (calcData.posSavings) parts.push(`POS Pro savings: ${calcData.posSavings}`);
    if (calcData.tcoAdvanced && calcData.tcoPlus) parts.push(`TCO: ${calcData.tcoAdvanced} (Advanced) vs ${calcData.tcoPlus} (Plus)`);
    if (calcData.paybackMonths) parts.push(`Payback period: ${calcData.paybackMonths} months`);
    if (parts.length) calcContext = `\n\nCalculator data for this merchant:\n${parts.join('\n')}`;
  }

  return { outcomeLines, calcContext };
}

export async function generateValueStory({ merchantName, vertical, region, gmv, selectedOutcomes, calcData }) {
  const verticalProfile = VERTICAL_PROFILES[vertical];
  const { outcomeLines, calcContext } = buildOutcomeContext(selectedOutcomes, calcData);

  const prompt = `Write a compelling 3-paragraph value story for upgrading ${merchantName || 'this merchant'} from Shopify Advanced to Shopify Plus.

Vertical: ${verticalProfile?.label || vertical || 'General'}
${verticalProfile ? `Selling angle: ${verticalProfile.talkingAngle}` : ''}
Region: ${region || 'Not specified'}
GMV range: ${gmv || 'Not specified'}

Selected business outcomes and proof:
${outcomeLines}
${calcContext}

Structure:
1. Open with the merchant's situation and why the status quo limits growth
2. Connect their specific outcomes to Plus capabilities with concrete numbers
3. Close with the business impact and urgency

Keep it under 300 words. Write in second person ("you/your"). Do not use bullet points — this should read as a narrative.`;

  return await callAI(prompt, { system: SYSTEM_PROMPT });
}

export async function generateTalkingPoints({ merchantName, vertical, region, gmv, selectedOutcomes, calcData }) {
  const verticalProfile = VERTICAL_PROFILES[vertical];
  const { outcomeLines, calcContext } = buildOutcomeContext(selectedOutcomes, calcData);

  const prompt = `Generate 5-7 merchant-specific talking points for a meeting with ${merchantName || 'this merchant'} about upgrading from Shopify Advanced to Shopify Plus.

Vertical: ${verticalProfile?.label || vertical || 'General'}
Region: ${region || 'Not specified'}
GMV range: ${gmv || 'Not specified'}

Selected business outcomes:
${outcomeLines}
${calcContext}

Format each point as:
**Say this:** [the actual phrase to use in conversation]
**Because:** [the supporting evidence or data point]

Make them conversational, not scripted. Focus on outcomes, not features.`;

  return await callAI(prompt, { system: SYSTEM_PROMPT });
}

export async function generateObjectionDrill({ merchantName, vertical, region, gmv, selectedOutcomes, calcData, objectionFocus }) {
  const verticalProfile = VERTICAL_PROFILES[vertical];
  const { outcomeLines, calcContext } = buildOutcomeContext(selectedOutcomes, calcData);

  const focusLine = objectionFocus
    ? `Pay special attention to this objection area: ${objectionFocus}`
    : '';

  const prompt = `Generate 4-5 common objections a merchant might raise when considering upgrading from Shopify Advanced to Shopify Plus, with responses.

Merchant: ${merchantName || 'Not specified'}
Vertical: ${verticalProfile?.label || vertical || 'General'}
GMV range: ${gmv || 'Not specified'}
${focusLine}

Context — what they care about:
${outcomeLines}
${calcContext}

For each objection, structure the response as:
**Objection:** [what the merchant says]
**Acknowledge:** [validate their concern]
**Reframe:** [shift perspective]
**Evidence:** [specific data point or case study]
**Ask:** [follow-up question to move forward]

Tailor objections to this merchant's situation. Include at least one cost objection and one "we don't need it" objection.`;

  return await callAI(prompt, { system: SYSTEM_PROMPT });
}

export function getMatchingProof(selectedOutcomes) {
  const outcomes = selectedOutcomes.map(id => OUTCOME_MAP[id]).filter(Boolean);

  const merchantNames = new Set();
  outcomes.forEach(o => o.stories.forEach(m => merchantNames.add(m)));

  const stories = SUCCESS_STORIES.filter(s => merchantNames.has(s.merchant));
  const proofPoints = outcomes.flatMap(o => o.proofPoints);
  const uniqueProof = [...new Set(proofPoints)];

  return { stories, proofPoints: uniqueProof };
}

// ---------------------------------------------------------------------------
// Document generators (updated to accept shared context)
// ---------------------------------------------------------------------------

export async function generateOnePager({ merchantName, industry, vertical, gmv, needs, region, calcData }) {
  const verticalLabel = VERTICAL_PROFILES[vertical]?.label || industry || vertical || '';
  let calcLine = '';
  if (calcData?.annualSavings) calcLine = `\nCalculator insight: estimated ${calcData.annualSavings} annual savings on Plus.`;

  const prompt = `Generate a one-page value proposition for upgrading ${merchantName} from Shopify Advanced to Shopify Plus.

Industry: ${verticalLabel}
Annual GMV: ${gmv}
Region: ${region}
Key needs: ${needs}
${calcLine}

Format as a structured document with: Executive Summary, Key Benefits (3-5 bullets), Financial Impact, Recommended Next Steps. Keep it under 500 words.`;

  const content = await callAI(prompt, { system: SYSTEM_PROMPT });

  const doc = await generatedDocs.create({
    type: 'one-pager',
    merchantName,
    content,
    createdBy: getUserEmail(),
  });

  return { content, doc };
}

export async function generateEmail({ merchantName, context, conversationContext, tone = 'professional', calcData }) {
  const ctx = conversationContext || context || '';
  let calcLine = '';
  if (calcData?.annualSavings) calcLine = `\nRelevant data: estimated ${calcData.annualSavings} annual savings on Plus.`;

  const prompt = `Write a follow-up email to ${merchantName} after a conversation about upgrading from Shopify Advanced to Shopify Plus.

Context: ${ctx}
Tone: ${tone}
${calcLine}

Include a subject line. Keep it concise and actionable.`;

  const content = await callAI(prompt, { system: SYSTEM_PROMPT });

  const doc = await generatedDocs.create({
    type: 'email',
    merchantName,
    content,
    createdBy: getUserEmail(),
  });

  return { content, doc };
}

export async function generateTalkTrack({ scenario, objection, merchantName, vertical, calcData }) {
  const verticalLabel = VERTICAL_PROFILES[vertical]?.label || '';
  let extraContext = '';
  if (merchantName) extraContext += `\nMerchant: ${merchantName}`;
  if (verticalLabel) extraContext += `\nVertical: ${verticalLabel}`;
  if (calcData?.annualSavings) extraContext += `\nCalculator insight: estimated ${calcData.annualSavings} annual savings.`;

  const prompt = `Create an objection-handling talk track for a Shopify Plus sales conversation.

Scenario: ${scenario}
Objection: ${objection}
${extraContext}

Structure as: Acknowledge → Reframe → Evidence → Ask. Include specific data points about Plus vs Advanced.`;

  const content = await callAI(prompt, { system: SYSTEM_PROMPT });

  const doc = await generatedDocs.create({
    type: 'talk-track',
    scenario,
    content,
    createdBy: getUserEmail(),
  });

  return { content, doc };
}

export async function generateExecutiveSummary({ merchantName, dealSize, timeline, stakeholders, vertical, calcData }) {
  const verticalLabel = VERTICAL_PROFILES[vertical]?.label || '';
  let extraContext = '';
  if (verticalLabel) extraContext += `\nVertical: ${verticalLabel}`;
  if (calcData?.annualSavings) extraContext += `\nCalculator insight: estimated ${calcData.annualSavings} annual savings.`;

  const prompt = `Write an executive summary for a Shopify Plus deal review.

Merchant: ${merchantName}
Deal size: ${dealSize}
Timeline: ${timeline}
Key stakeholders: ${stakeholders}
${extraContext}

Include: Opportunity Overview, Why Plus, Commercial Summary, Risk/Mitigation, Next Steps. Keep under 400 words.`;

  const content = await callAI(prompt, { system: SYSTEM_PROMPT });

  const doc = await generatedDocs.create({
    type: 'executive-summary',
    merchantName,
    content,
    createdBy: getUserEmail(),
  });

  return { content, doc };
}

export async function getRecentDocs(limit = 10) {
  const all = await generatedDocs.getAll();
  return all
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
}
