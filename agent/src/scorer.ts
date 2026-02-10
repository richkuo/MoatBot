import { MOAT_TYPES, MOAT_LABELS, type MoatType } from "./strategies";

export interface MoatScore {
  type: MoatType;
  label: string;
  current: number; // 1-10
  opportunity: number; // 1-10
  effort: number; // 1-10
  impact: number; // 1-10
  priority: number; // calculated
}

export interface MoatScorecard {
  appName: string;
  overallScore: number;
  stage: string;
  scores: MoatScore[];
  criticalGaps: string[];
  existingMoats: string[];
}

export function calculatePriority(score: MoatScore): number {
  // Priority = (Impact × Opportunity) / Effort
  return Math.round(((score.impact * score.opportunity) / score.effort) * 10) / 10;
}

export function calculateOverallScore(scores: MoatScore[]): number {
  const total = scores.reduce((sum, s) => sum + s.current, 0);
  return Math.round((total / scores.length) * 10) / 10;
}

export function getStage(overallScore: number): string {
  if (overallScore <= 2) return "Vulnerable — No significant moats";
  if (overallScore <= 4) return "Early — Building initial defenses";
  if (overallScore <= 6) return "Developing — Some moats forming";
  if (overallScore <= 8) return "Strong — Multiple active moats";
  return "Fortress — Deeply entrenched";
}

export function identifyCriticalGaps(scores: MoatScore[]): string[] {
  return scores
    .filter((s) => s.current <= 2 && s.opportunity >= 7)
    .map(
      (s) =>
        `${s.label}: High opportunity (${s.opportunity}/10) but no current moat (${s.current}/10)`
    );
}

export function identifyExistingMoats(scores: MoatScore[]): string[] {
  return scores
    .filter((s) => s.current >= 5)
    .map((s) => `${s.label}: ${s.current}/10`);
}

export function rankByPriority(scores: MoatScore[]): MoatScore[] {
  return [...scores].sort((a, b) => b.priority - a.priority);
}

export function createEmptyScorecard(appName: string): MoatScorecard {
  const scores: MoatScore[] = MOAT_TYPES.map((type) => ({
    type,
    label: MOAT_LABELS[type],
    current: 0,
    opportunity: 0,
    effort: 0,
    impact: 0,
    priority: 0,
  }));

  return {
    appName,
    overallScore: 0,
    stage: "Vulnerable — No significant moats",
    scores,
    criticalGaps: [],
    existingMoats: [],
  };
}
