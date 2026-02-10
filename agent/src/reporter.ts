import type { MoatScorecard, MoatScore } from "./scorer";
import { MOAT_STRATEGIES } from "./strategies";
import { rankByPriority } from "./scorer";

export function formatReport(scorecard: MoatScorecard): string {
  const ranked = rankByPriority(scorecard.scores);
  const topOpportunities = ranked.filter((s) => s.opportunity >= 5).slice(0, 4);

  let report = "";

  // Header
  report += `🏰 MOAT ANALYSIS: ${scorecard.appName}\n`;
  report += "━".repeat(40) + "\n\n";

  // Overall score
  report += `📊 Overall Moat Score: ${scorecard.overallScore}/10 (${scorecard.stage})\n\n`;

  // Scorecard table
  report += "| Moat Type | Current | Opportunity | Effort | Impact | Priority |\n";
  report += "|-----------|---------|-------------|--------|--------|----------|\n";
  for (const score of scorecard.scores) {
    report += `| ${score.label} | ${score.current}/10 | ${score.opportunity}/10 | ${score.effort}/10 | ${score.impact}/10 | ${score.priority} |\n`;
  }
  report += "\n";

  // Critical gaps
  if (scorecard.criticalGaps.length > 0) {
    report += "🔴 CRITICAL GAPS:\n";
    for (const gap of scorecard.criticalGaps) {
      report += `  • ${gap}\n`;
    }
    report += "\n";
  }

  // Existing moats
  if (scorecard.existingMoats.length > 0) {
    report += "🟡 EXISTING MOATS:\n";
    for (const moat of scorecard.existingMoats) {
      report += `  • ${moat}\n`;
    }
    report += "\n";
  }

  // Top opportunities
  if (topOpportunities.length > 0) {
    report += "🟢 TOP MOAT OPPORTUNITIES:\n\n";
    for (let i = 0; i < topOpportunities.length; i++) {
      const score = topOpportunities[i];
      const strategy = MOAT_STRATEGIES[score.type];
      report += `${i + 1}. ${score.label.toUpperCase()} (Impact: ${score.impact}/10, Effort: ${score.effort}/10)\n`;
      report += `   → ${strategy.description}\n`;
      report += `   Top tactics:\n`;
      for (const tactic of strategy.tactics.slice(0, 3)) {
        report += `   • ${tactic}\n`;
      }
      report += `   Metrics: ${strategy.metrics.slice(0, 2).join(", ")}\n`;
      report += `   Timeframe: ${strategy.timeframe}\n\n`;
    }
  }

  // 90-day playbook placeholder
  report += "📋 90-DAY MOAT PLAYBOOK:\n";
  report += "  Week 1-2:  [Quick wins — lowest effort, highest impact tactics]\n";
  report += "  Week 3-4:  [Foundation — set up data collection, initial integrations]\n";
  report += "  Week 5-8:  [Build — implement primary moat strategy]\n";
  report += "  Week 9-12: [Deepen — measure, iterate, expand moat coverage]\n";

  return report;
}

export function formatMarkdown(scorecard: MoatScorecard): string {
  const ranked = rankByPriority(scorecard.scores);
  let md = `# 🏰 Moat Analysis: ${scorecard.appName}\n\n`;
  md += `**Overall Score:** ${scorecard.overallScore}/10 — ${scorecard.stage}\n\n`;

  md += "## Scorecard\n\n";
  md += "| Moat Type | Current | Opportunity | Effort | Impact | Priority |\n";
  md += "|-----------|---------|-------------|--------|--------|----------|\n";
  for (const score of scorecard.scores) {
    md += `| ${score.label} | ${score.current} | ${score.opportunity} | ${score.effort} | ${score.impact} | ${score.priority} |\n`;
  }

  if (scorecard.criticalGaps.length > 0) {
    md += "\n## Critical Gaps\n\n";
    for (const gap of scorecard.criticalGaps) {
      md += `- 🔴 ${gap}\n`;
    }
  }

  md += "\n## Strategies\n\n";
  for (let i = 0; i < Math.min(ranked.length, 3); i++) {
    const score = ranked[i];
    const strategy = MOAT_STRATEGIES[score.type];
    md += `### ${i + 1}. ${score.label}\n\n`;
    md += `${strategy.description}\n\n`;
    md += "**Tactics:**\n";
    for (const tactic of strategy.tactics) {
      md += `- ${tactic}\n`;
    }
    md += "\n";
  }

  return md;
}
