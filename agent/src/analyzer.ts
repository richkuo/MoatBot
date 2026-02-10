import Anthropic from "@anthropic-ai/sdk";
import {
  MOAT_TYPES,
  MOAT_LABELS,
  MOAT_STRATEGIES,
  type MoatType,
} from "./strategies";
import {
  type MoatScore,
  type MoatScorecard,
  calculatePriority,
  calculateOverallScore,
  getStage,
  identifyCriticalGaps,
  identifyExistingMoats,
} from "./scorer";

const ANALYSIS_PROMPT = `You are MoatBot, an expert at analyzing competitive moats for technology products and apps.

Given an app description, analyze it across these 7 moat types and score each from 1-10:

1. Network Effects - Does the product get better with more users?
2. Data Moat - Does usage generate proprietary, valuable data?
3. Switching Costs - How hard is it for users to leave?
4. Brand & Trust - How strong is brand recognition and trust?
5. Platform/Ecosystem - Are third parties building on top?
6. Regulatory/Legal - Are there legal barriers protecting the business?
7. Cost Advantage - Are there structural cost advantages?

For each moat type, provide:
- current: Current strength (1-10)
- opportunity: How much potential this moat has (1-10)
- effort: How hard it is to build (1-10, where 10 = very hard)
- impact: How much it would protect the business (1-10)

Also provide:
- criticalGaps: Array of strings describing high-opportunity gaps
- existingMoats: Array of strings describing current strengths

Respond ONLY with valid JSON in this exact format:
{
  "scores": {
    "network_effects": { "current": N, "opportunity": N, "effort": N, "impact": N },
    "data_moat": { "current": N, "opportunity": N, "effort": N, "impact": N },
    "switching_costs": { "current": N, "opportunity": N, "effort": N, "impact": N },
    "brand_trust": { "current": N, "opportunity": N, "effort": N, "impact": N },
    "platform_ecosystem": { "current": N, "opportunity": N, "effort": N, "impact": N },
    "regulatory_legal": { "current": N, "opportunity": N, "effort": N, "impact": N },
    "cost_advantage": { "current": N, "opportunity": N, "effort": N, "impact": N }
  },
  "criticalGaps": ["string", "string"],
  "existingMoats": ["string", "string"]
}`;

export interface AnalysisInput {
  appName: string;
  description: string;
  stage?: string;
  market?: string;
  competitors?: string[];
}

export async function analyzeApp(
  input: AnalysisInput,
  apiKey?: string
): Promise<MoatScorecard> {
  const client = new Anthropic({ apiKey: apiKey || process.env.ANTHROPIC_API_KEY });

  const userMessage = `Analyze moats for this app:

App Name: ${input.appName}
Description: ${input.description}
${input.stage ? `Stage: ${input.stage}` : ""}
${input.market ? `Target Market: ${input.market}` : ""}
${input.competitors?.length ? `Competitors: ${input.competitors.join(", ")}` : ""}

Score each moat type and identify gaps and strengths.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    system: ANALYSIS_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Parse JSON response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse analysis response");
  }

  const data = JSON.parse(jsonMatch[0]);

  // Build scorecard
  const scores: MoatScore[] = MOAT_TYPES.map((type) => {
    const raw = data.scores[type] || {
      current: 0,
      opportunity: 0,
      effort: 5,
      impact: 0,
    };
    const score: MoatScore = {
      type,
      label: MOAT_LABELS[type],
      current: raw.current,
      opportunity: raw.opportunity,
      effort: raw.effort,
      impact: raw.impact,
      priority: 0,
    };
    score.priority = calculatePriority(score);
    return score;
  });

  const overallScore = calculateOverallScore(scores);

  return {
    appName: input.appName,
    overallScore,
    stage: getStage(overallScore),
    scores,
    criticalGaps: data.criticalGaps || identifyCriticalGaps(scores),
    existingMoats: data.existingMoats || identifyExistingMoats(scores),
  };
}
