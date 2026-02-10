# 🏰 MoatBot

An AI agent and OpenClaw skill that analyzes new apps and generates competitive moat strategies — defensible advantages that make your product hard to replicate or displace.

## What It Does

Give MoatBot your app idea (or an existing app), and it will:

1. **Analyze** your app's market position, competitors, and vulnerabilities
2. **Identify** moat opportunities across 7 categories
3. **Generate** a prioritized moat-building playbook
4. **Output** actionable strategies with implementation steps

## Moat Categories

MoatBot evaluates and generates strategies across these competitive moat types:

| Moat Type | Description | Example |
|-----------|-------------|---------|
| **Network Effects** | Product gets better as more people use it | Social platforms, collaborative tools |
| **Data Moat** | Proprietary data that improves with usage | Recommendation engines, AI models |
| **Switching Costs** | Makes it painful to leave | File formats, integrations, workflows |
| **Brand & Trust** | Recognition and reputation that takes years to build | Developer tools, security products |
| **Platform/Ecosystem** | Third-party builders create value on top of you | App stores, plugin systems, APIs |
| **Regulatory/Legal** | Patents, licenses, compliance barriers | Fintech, healthcare, government |
| **Cost Advantage** | Structural cost advantages through scale or tech | Infrastructure, manufacturing |

## Usage

### As an OpenClaw Skill

Add to your OpenClaw agent:

```json
{
  "skills": {
    "entries": {
      "moatbot": {
        "source": "github:richkuo/MoatBot/skill"
      }
    }
  }
}
```

Then tell your agent:

```
Analyze moats for my app: [describe your app]
```

### As a Standalone Agent

```bash
git clone https://github.com/richkuo/MoatBot.git
cd MoatBot/agent
bun install
bun run analyze --app "DevFlow" -d "AI dev workflow tool that learns your codebase and automates repetitive tasks"
```

### Example Output

```
🏰 MOAT ANALYSIS: DevFlow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Current Moat Score: 3/10 (Early Stage)

🔴 CRITICAL GAPS:
  • Not yet learning from user codebases at scale
  • Easy to swap for another AI coding tool
  • No plugin system or third-party extensions

🟢 HIGHEST-IMPACT MOAT OPPORTUNITIES:

1. SWITCHING COSTS (Impact: 8/10, Effort: 3/10)
   → The deeper it embeds in workflow, the harder to rip out
   Strategy: Store project-specific context, custom rules, and
   learned patterns per repo. Build deep CI/CD integrations.

2. DATA MOAT (Impact: 9/10, Effort: 5/10)
   → Every codebase touched makes it smarter
   Strategy: Learn coding patterns and architecture decisions per org.
   Offer insights competitors can't replicate without the same data.

3. PLATFORM/ECOSYSTEM (Impact: 7/10, Effort: 6/10)
   → Let others extend the tool's capabilities
   Strategy: Build plugin API for custom automations. Create a
   marketplace for community-built workflows.

4. BRAND & TRUST (Impact: 5/10, Effort: 6/10)
   → Developer mindshare takes years to build
   Strategy: Open-source core components. Build in public.
   Create best-in-class docs and tutorials.

📋 90-DAY MOAT PLAYBOOK:
  Week 1-2:  Ship IDE integrations, start collecting usage data
  Week 3-4:  Build per-repo learning and context persistence
  Week 5-8:  Launch plugin API and developer docs
  Week 9-12: Release org-level insights dashboard (data moat)
```

## Project Structure

```
MoatBot/
├── README.md
├── agent/                  # Standalone agent
│   ├── package.json
│   ├── src/
│   │   ├── index.ts       # CLI entry point
│   │   ├── analyzer.ts    # Core moat analysis engine
│   │   ├── strategies.ts  # Strategy templates per moat type
│   │   ├── scorer.ts      # Moat scoring system
│   │   └── reporter.ts    # Output formatting
│   └── tsconfig.json
├── skill/                  # OpenClaw skill
│   ├── SKILL.md           # Skill definition
│   └── templates/         # Analysis templates
│       ├── moat-analysis.md
│       └── playbook.md
└── examples/              # Example analyses
    ├── devflow.md
    ├── saas-tool.md
    └── developer-platform.md
```

## How It Works

1. **Input**: App description, target market, current stage
2. **Research**: Identifies competitors, market dynamics, existing moats in the space
3. **Analysis**: Scores each moat category for opportunity + feasibility
4. **Strategy**: Generates specific, actionable strategies per moat type
5. **Playbook**: Creates a time-boxed implementation plan

## Contributing

PRs welcome. If you've built a moat and have insights to share, open an issue or submit a strategy template.

## License

MIT
