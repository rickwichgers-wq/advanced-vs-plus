import { APP_NAME } from '../utils/brand.js';
import { generatedDocs } from '../core/db.js';
import { getUserEmail } from '../core/auth.js';

async function callAI(prompt, { system = '' } = {}) {
  if (!window.quick?.ai) {
    throw new Error('AI service not available. Make sure quick.ai is loaded.');
  }

  const messages = [];
  if (system) messages.push({ role: 'system', content: system });
  messages.push({ role: 'user', content: prompt });

  const response = await window.quick.ai.chat({ messages });
  return response?.content || response?.message?.content || '';
}

const SYSTEM_PROMPT = `You are a Shopify sales enablement assistant used by Account Executives and Solutions Consultants. You help articulate the value of Shopify Plus vs Shopify Advanced. Be professional, data-driven, and concise. Use specific numbers and capabilities where possible.`;

export async function generateOnePager({ merchantName, industry, gmv, needs, region }) {
  const prompt = `Generate a one-page value proposition for upgrading ${merchantName} from Shopify Advanced to Shopify Plus.

Industry: ${industry}
Annual GMV: ${gmv}
Region: ${region}
Key needs: ${needs}

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

export async function generateEmail({ merchantName, context, tone = 'professional' }) {
  const prompt = `Write a follow-up email to ${merchantName} after a conversation about upgrading from Shopify Advanced to Shopify Plus.

Context: ${context}
Tone: ${tone}

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

export async function generateTalkTrack({ scenario, objection }) {
  const prompt = `Create an objection-handling talk track for a Shopify Plus sales conversation.

Scenario: ${scenario}
Objection: ${objection}

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

export async function generateExecutiveSummary({ merchantName, dealSize, timeline, stakeholders }) {
  const prompt = `Write an executive summary for a Shopify Plus deal review.

Merchant: ${merchantName}
Deal size: ${dealSize}
Timeline: ${timeline}
Key stakeholders: ${stakeholders}

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
