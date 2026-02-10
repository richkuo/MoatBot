export interface MoatStrategy {
  type: string;
  name: string;
  description: string;
  tactics: string[];
  metrics: string[];
  timeframe: string;
}

export const MOAT_TYPES = [
  "network_effects",
  "data_moat",
  "switching_costs",
  "brand_trust",
  "platform_ecosystem",
  "regulatory_legal",
  "cost_advantage",
] as const;

export type MoatType = (typeof MOAT_TYPES)[number];

export const MOAT_LABELS: Record<MoatType, string> = {
  network_effects: "Network Effects",
  data_moat: "Data Moat",
  switching_costs: "Switching Costs",
  brand_trust: "Brand & Trust",
  platform_ecosystem: "Platform/Ecosystem",
  regulatory_legal: "Regulatory/Legal",
  cost_advantage: "Cost Advantage",
};

export const MOAT_STRATEGIES: Record<MoatType, MoatStrategy> = {
  network_effects: {
    type: "network_effects",
    name: "Network Effects",
    description:
      "Product becomes more valuable as more people use it. The holy grail of moats.",
    tactics: [
      "Identify which side of the network to subsidize first (supply vs demand)",
      "Build viral loops: every user action should invite or create value for others",
      "Create local network effects (city-by-city, community-by-community) before going broad",
      "Add social features: profiles, follows, sharing, collaboration",
      "Build APIs that let others build on your platform (indirect network effects)",
      "Implement referral programs with meaningful incentives",
    ],
    metrics: [
      "Viral coefficient (K-factor)",
      "User-to-user interactions per day",
      "Network density (connections per user)",
      "Time-to-value for new users based on network size",
    ],
    timeframe: "6-18 months to establish, compounds over years",
  },
  data_moat: {
    type: "data_moat",
    name: "Data Moat",
    description:
      "Proprietary data that improves your product and is impossible for competitors to replicate.",
    tactics: [
      "Log everything from day 1 — usage patterns, preferences, outcomes",
      "Build feedback loops: user actions → better predictions → more usage",
      "Create unique data combinations (e.g., behavior + outcomes + context)",
      "Offer insights dashboards that showcase data only you have",
      "Use data to train proprietary models (AI/ML advantage)",
      "Build data partnerships that are exclusive or hard to replicate",
    ],
    metrics: [
      "Unique data points collected per user per day",
      "Model accuracy improvement over time",
      "Data-driven feature adoption rate",
      "Prediction accuracy vs competitors",
    ],
    timeframe: "3-6 months to start, deepens continuously",
  },
  switching_costs: {
    type: "switching_costs",
    name: "Switching Costs",
    description:
      "Make it expensive (time, effort, data loss) for users to leave.",
    tactics: [
      "Deep integrations with tools users already use (SSO, APIs, webhooks)",
      "Build workflow-specific features that users customize extensively",
      "Create proprietary file formats or data structures",
      "Implement reputation/history systems that don't transfer",
      "Build team features: shared workspaces, permissions, collaboration",
      "Offer migration tools IN but not OUT",
      "Create certification programs and trained user communities",
    ],
    metrics: [
      "Average integrations per user",
      "Custom configurations per account",
      "Data volume stored per user",
      "Churn rate vs integration depth correlation",
    ],
    timeframe: "1-3 months for initial lock-in, deepens with usage",
  },
  brand_trust: {
    type: "brand_trust",
    name: "Brand & Trust",
    description:
      "Recognition, reputation, and trust that takes years to build and moments to lose.",
    tactics: [
      "Own a category name (be the verb: 'just Google it')",
      "Create educational content: tutorials, courses, documentation",
      "Build in public: share metrics, decisions, roadmap openly",
      "Invest in developer relations and community",
      "Get security certifications early (SOC2, ISO 27001)",
      "Sponsor and speak at industry events",
      "Build a distinctive brand voice and visual identity",
    ],
    metrics: [
      "Brand search volume",
      "NPS score",
      "Organic vs paid traffic ratio",
      "Community size and engagement",
    ],
    timeframe: "6-24 months for recognition, ongoing investment",
  },
  platform_ecosystem: {
    type: "platform_ecosystem",
    name: "Platform/Ecosystem",
    description:
      "Third-party developers and partners create value on top of your product.",
    tactics: [
      "Build robust APIs and SDKs from day 1",
      "Create a plugin/extension marketplace",
      "Offer developer incentives (revenue share, grants, free tier)",
      "Publish standards and protocols others adopt",
      "Build an app store or integration directory",
      "Create developer documentation that's best-in-class",
      "Host hackathons and developer competitions",
    ],
    metrics: [
      "Number of third-party integrations",
      "API calls per month",
      "Developer community size",
      "Revenue generated through platform partners",
    ],
    timeframe: "6-12 months to establish, grows exponentially",
  },
  regulatory_legal: {
    type: "regulatory_legal",
    name: "Regulatory/Legal",
    description:
      "Patents, compliance, licenses, and regulations that create barriers to entry.",
    tactics: [
      "File patents on novel methods and algorithms",
      "Get compliance certifications competitors don't have (HIPAA, FedRAMP)",
      "Obtain exclusive licenses or partnerships",
      "Build relationships with regulators and standards bodies",
      "Create terms of service that protect your data/APIs from scraping",
      "Trademark your brand, product names, and key features",
    ],
    metrics: [
      "Patents filed/granted",
      "Compliance certifications held",
      "Legal barriers identified for competitors",
      "Regulatory relationships established",
    ],
    timeframe: "3-12 months for initial filings, years for full protection",
  },
  cost_advantage: {
    type: "cost_advantage",
    name: "Cost Advantage",
    description:
      "Structural cost advantages through technology, scale, or operational efficiency.",
    tactics: [
      "Build proprietary infrastructure that reduces unit costs at scale",
      "Negotiate volume discounts with suppliers/providers",
      "Optimize core algorithms for efficiency (less compute per request)",
      "Use open-source strategically to reduce costs",
      "Build in regions with lower operational costs",
      "Vertically integrate: own your stack instead of paying vendors",
    ],
    metrics: [
      "Cost per unit/transaction vs competitors",
      "Gross margin trend",
      "Infrastructure cost per user",
      "Operational efficiency ratio",
    ],
    timeframe: "3-6 months for initial advantages, compounds with scale",
  },
};
