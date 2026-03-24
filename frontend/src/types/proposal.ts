export interface ProposalTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  sections?: string[];
  fields?: string[];
  promptStyle?: string;
}

export const proposalTemplates: ProposalTemplate[] = [
  { 
    id: "it-project", 
    name: "IT Project Proposal", 
    description: "For software, platforms, and enterprise systems", 
    category: "Technology", 
    icon: "💻",
    sections: ["introduction", "problem", "solution", "scope", "deliverables", "timeline", "pricing", "terms", "conclusion"],
    fields: ["techStack", "coreFeatures", "timeline", "budget", "projectGoals", "existingSystems", "targetAudience", "securityRequirements", "postLaunchSupport"],
    promptStyle: "technical_formal"
  },
  {
    id: "mobile-app",
    name: "Mobile App Development Proposal",
    category: "Technology",
    description: "For Android, iOS, and cross-platform apps",
    icon: "📱",
    sections: ["introduction", "problem", "solution", "features", "timeline", "deliverables", "pricing", "terms", "conclusion"],
    fields: ["platform", "coreFeatures", "timeline", "budget", "appMonetization", "targetAudience", "thirdPartyIntegrations", "designPreferences", "maintenanceNeeds"],
    promptStyle: "product_technical"
  },
  {
    id: "website-dev",
    name: "Website Development Proposal",
    category: "Technology",
    description: "For business websites, ecommerce, and portals",
    icon: "🌐",
    sections: ["introduction", "requirements", "solution", "features", "timeline", "pricing", "terms", "conclusion"],
    fields: ["pagesRequired", "coreFeatures", "timeline", "budget", "targetAudience", "competitorWebsites", "seoRequirements", "ecommerceFunctionality", "brandGuidelines"],
    promptStyle: "clean_professional"
  },
  {
    id: "ai-automation",
    name: "AI / Automation Proposal",
    category: "Technology",
    description: "For AI tools, automation systems, and smart workflows",
    icon: "🤖",
    sections: ["introduction", "problem", "aiSolution", "workflow", "benefits", "timeline", "pricing", "terms", "conclusion"],
    fields: ["useCase", "automationGoals", "timeline", "budget", "currentWorkflow", "dataSources", "expectedROI", "integrationPoints"],
    promptStyle: "advanced_technical"
  },
  {
    id: "marketing",
    name: "Digital Marketing Proposal",
    category: "Marketing",
    description: "For SEO, ads, and social media campaigns",
    icon: "📈",
    sections: ["introduction", "marketAnalysis", "strategy", "channels", "timeline", "pricing", "terms", "conclusion"],
    fields: ["targetAudience", "marketingChannels", "timeline", "budget", "campaignGoals", "competitorAnalysis", "currentMetrics", "monthlyAdSpend", "kpis"],
    promptStyle: "persuasive_business"
  },
  {
    id: "branding",
    name: "Branding & Design Proposal",
    category: "Design",
    description: "For logo, branding, and UI/UX design services",
    icon: "🎨",
    sections: ["introduction", "brandGoals", "designApproach", "deliverables", "timeline", "pricing", "terms", "conclusion"],
    fields: ["designScope", "brandValues", "timeline", "budget", "targetAudience", "competitorBrands", "colorPreferences", "requiredAssets"],
    promptStyle: "creative_professional"
  },
  {
    id: "construction",
    name: "Construction Proposal",
    category: "Infrastructure",
    description: "For building and infrastructure projects",
    icon: "🏗️",
    sections: ["introduction", "projectOverview", "scope", "materials", "timeline", "costEstimate", "terms", "conclusion"],
    fields: ["location", "totalArea", "timeline", "budget", "materialsRequired", "siteCondition", "permitsNeeded", "architecturalStyle", "sustainabilityGoals"],
    promptStyle: "formal_contract"
  },
  {
    id: "water-supply",
    name: "Water Supply Service Proposal",
    category: "Services",
    description: "For tanker supply and utility services",
    icon: "💧",
    sections: ["introduction", "serviceOverview", "supplyPlan", "schedule", "pricing", "terms", "conclusion"],
    fields: ["dailyRequirement", "serviceDuration", "timeline", "budget", "deliveryLocation", "waterQualityNeeds", "storageCapacity", "emergencyContact"],
    promptStyle: "service_professional"
  },
  {
    id: "consulting",
    name: "Business Consulting Proposal",
    category: "Business",
    description: "For advisory, strategy, and consulting services",
    icon: "📊",
    sections: ["introduction", "clientChallenges", "approach", "deliverables", "timeline", "pricing", "terms", "conclusion"],
    fields: ["businessChallenges", "consultingStrategy", "timeline", "budget", "companySize", "industrySector", "shortTermGoals", "longTermVision", "keyStakeholders"],
    promptStyle: "strategic_formal"
  },
  {
    id: "blank",
    name: "Custom Blank Proposal",
    category: "General",
    description: "Start from scratch with full flexibility",
    icon: "📝",
    sections: ["introduction", "problem", "solution", "scope", "timeline", "pricing", "terms", "conclusion"],
    fields: ["problemStatement", "proposedSolution", "timeline", "budget", "projectScope", "deliverables", "assumptions", "additionalNotes"],
    promptStyle: "general"
  }
];

export interface ProposalTheme {
  id: string;
  name: string;
  description: string;
  colorHex: string;
}

export const proposalThemes: ProposalTheme[] = [
  { id: "modern", name: "Modern Corporate", description: "Clean white + blue styling", colorHex: "#2563eb" },
  { id: "creative", name: "Creative / Marketing", description: "Colorful + bold layouts", colorHex: "#ec4899" },
  { id: "dark", name: "Dark Premium", description: "Dark UI + neon accents", colorHex: "#1f2937" },
  { id: "formal", name: "Formal Document", description: "Traditional document style", colorHex: "#4b5563" },
  { id: "service", name: "Service Business", description: "Simple business layout", colorHex: "#16a34a" },
];

export interface ProposalSections {
  introduction: string;
  problemStatement: string;
  proposedSolution: string;
  scopeOfWork: string;
  deliverables: string;
  timeline: string;
  pricing: string;
  terms: string;
  conclusion: string;
}

export interface ProposalData {
  templateId: string;
  templateName: string;
  templateSections?: string[];
  templateFields?: string[];
  themeId: string;
  themeName: string;
  clientName: string;
  clientCompany: string;
  proposalTitle: string;
  projectName: string;
  proposalDate: string;
  validityDate: string;
  preparedBy: string;
  problemStatement: string;
  clientRequirements: string;
  objectives: string;
  notes: string;
  services: string[];
  deliverables: string;
  estimatedTimeline: string;
  budget: string;
  keyFeatures: string;
  scopeOfWork: string;
  tone: "Formal" | "Professional" | "Persuasive";
  proposalStyle: "Short" | "Detailed" | "Executive";
  sections: Record<string, string> | null;
  customFields: Record<string, string>;
}

export const defaultProposalData: ProposalData = {
  templateId: "",
  templateName: "",
  templateSections: [],
  templateFields: [],
  themeId: "modern",
  themeName: "Modern Corporate",
  clientName: "",
  clientCompany: "",
  proposalTitle: "",
  projectName: "",
  proposalDate: new Date().toISOString().split("T")[0],
  validityDate: "",
  preparedBy: "",
  problemStatement: "",
  clientRequirements: "",
  objectives: "",
  notes: "",
  services: [],
  deliverables: "",
  estimatedTimeline: "",
  budget: "",
  keyFeatures: "",
  scopeOfWork: "",
  tone: "Professional",
  proposalStyle: "Detailed",
  sections: null,
  customFields: {},
};
