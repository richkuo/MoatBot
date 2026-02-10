---
name: moatbot
description: Analyze apps and generate competitive moat strategies — defensible advantages that make products hard to replicate.
metadata:
  openclaw:
    emoji: "🏰"
---

# MoatBot Skill

Analyze any app or product and generate a competitive moat strategy.

## When to Use

Use this skill when:
- A user describes a new app idea and wants to know how to defend it
- Analyzing an existing product's competitive advantages
- Building a go-to-market strategy that includes defensibility
- Comparing moat strength between competing products

## Moat Framework

Evaluate every app across these 7 moat types:

### 1. Network Effects
- **Direct**: More users = better for each user (social networks)
- **Indirect/Two-sided**: More supply = more demand = more supply (marketplaces)
- **Data network**: More usage = better AI/recommendations = more usage

### 2. Data Moat
- Proprietary datasets that improve with usage
- Unique data combinations competitors can't replicate
- Data flywheels: usage → data → better product → more usage

### 3. Switching Costs
- Integration depth (APIs, webhooks, data formats)
- Workflow lock-in (users build habits around your UX)
- Data portability barriers (history, reputation, content)
- Ecosystem dependencies (plugins, extensions, integrations)

### 4. Brand & Trust
- Developer mindshare and community
- Security/compliance reputation
- Word-of-mouth and organic growth
- Content/education moat (tutorials, docs, courses)

### 5. Platform/Ecosystem
- Third-party developers building on top
- Plugin/extension marketplaces
- API ecosystem and SDKs
- Standards ownership (being the default protocol)

### 6. Regulatory/Legal
- Patents and IP
- Compliance certifications (SOC2, HIPAA, etc.)
- Government contracts or approvals
- Licensing requirements

### 7. Cost Advantage
- Infrastructure efficiency at scale
- Proprietary technology reducing COGS
- Bulk purchasing or supply agreements
- Geographic or operational advantages

## Analysis Process

When asked to analyze moats for an app:

1. **Understand the app**: What it does, target market, current stage, revenue model
2. **Map competitors**: Who else is in this space, what moats do they have
3. **Score each moat type** (1-10) for:
   - **Current strength**: How strong is this moat today?
   - **Opportunity**: How much potential does this moat type have?
   - **Effort**: How hard is it to build?
   - **Impact**: How much would it protect the business?
4. **Prioritize**: Rank moat opportunities by (Impact × Opportunity) / Effort
5. **Generate strategies**: 2-3 specific, actionable strategies per top moat
6. **Build playbook**: 90-day implementation plan with milestones

## Output Format

```markdown
🏰 MOAT ANALYSIS: [App Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Overall Moat Score: X/10 ([Stage])

🔴 CRITICAL GAPS:
  • [Gap 1]
  • [Gap 2]

🟡 EXISTING MOATS:
  • [Moat 1]: [Score]/10 — [Why]

🟢 TOP MOAT OPPORTUNITIES:

1. [MOAT TYPE] (Impact: X/10, Effort: X/10)
   → [One-line description]
   Strategy: [Specific, actionable strategy]
   
2. [MOAT TYPE] (Impact: X/10, Effort: X/10)
   → [One-line description]
   Strategy: [Specific, actionable strategy]

📋 90-DAY MOAT PLAYBOOK:
  Week 1-2:  [Action]
  Week 3-4:  [Action]
  Week 5-8:  [Action]
  Week 9-12: [Action]
```

## Tips

- Early-stage apps should focus on 1-2 moat types max
- Network effects are the strongest moat but hardest to bootstrap
- Data moats compound over time — start collecting early even if you don't use it yet
- Switching costs are the easiest moat to build quickly
- Don't confuse features with moats — features can be copied, moats can't
