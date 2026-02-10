#!/usr/bin/env bun

import { analyzeApp, type AnalysisInput } from "./analyzer";
import { formatReport, formatMarkdown } from "./reporter";
import { parseArgs } from "util";

const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    app: { type: "string", short: "a" },
    description: { type: "string", short: "d" },
    stage: { type: "string", short: "s" },
    market: { type: "string", short: "m" },
    competitors: { type: "string", short: "c" },
    format: { type: "string", short: "f", default: "text" },
    output: { type: "string", short: "o" },
    help: { type: "boolean", short: "h" },
  },
  strict: true,
});

if (values.help || !values.app) {
  console.log(`
🏰 MoatBot — Competitive Moat Analyzer

Usage:
  bun run analyze --app "App Name" --description "What the app does"

Options:
  -a, --app          App name (required)
  -d, --description  App description (uses app name if not provided)
  -s, --stage        Stage: idea, mvp, growth, scale
  -m, --market       Target market
  -c, --competitors  Comma-separated competitor names
  -f, --format       Output format: text (default) or markdown
  -o, --output       Save report to file
  -h, --help         Show this help

Examples:
  bun run analyze --app "My SaaS" -d "A project management tool for remote teams" -s mvp
  bun run analyze --app "Marketplace" -d "AI agents buy from humans" -f markdown -o report.md
  `);
  process.exit(0);
}

const input: AnalysisInput = {
  appName: values.app,
  description: values.description || values.app,
  stage: values.stage,
  market: values.market,
  competitors: values.competitors?.split(",").map((c) => c.trim()),
};

console.log(`\n🏰 Analyzing moats for: ${input.appName}...\n`);

try {
  const scorecard = await analyzeApp(input);
  const report =
    values.format === "markdown"
      ? formatMarkdown(scorecard)
      : formatReport(scorecard);

  console.log(report);

  if (values.output) {
    await Bun.write(values.output, report);
    console.log(`\n📄 Report saved to: ${values.output}`);
  }
} catch (error: any) {
  console.error(`\n❌ Analysis failed: ${error.message}`);
  if (error.message.includes("API")) {
    console.error("Make sure ANTHROPIC_API_KEY is set in your environment.");
  }
  process.exit(1);
}
