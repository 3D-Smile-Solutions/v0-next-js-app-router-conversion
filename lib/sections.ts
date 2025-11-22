import {
  BarChart3,
  Workflow,
  Zap,
  Users,
  TrendingUp,
  Settings,
  ItalicIcon as AnalyticsIcon,
  Shield,
} from "lucide-react"

export const SECTIONS = [
  {
    id: "foundations",
    title: "1. GTM Foundations",
    focus: "Sales and marketing alignment with core RevOps principles",
    icon: BarChart3,
    questions: [
      {
        id: "f1",
        title: "Revenue Leadership Structure",
        text: "We have a Chief Revenue Officer (CRO) or equivalent leadership role that oversees sales, marketing, and customer success.",
      },
      {
        id: "f2",
        title: "Cross-Functional Alignment",
        text: "Sales and marketing teams are aligned on target account lists, messaging, and lead scoring criteria.",
      },
      {
        id: "f3",
        title: "Go-to-Market Strategy",
        text: "We have a documented, updated Go-to-Market strategy that defines customer segments, positioning, and channels.",
      },
      {
        id: "f4",
        title: "Compensation Alignment",
        text: "Sales and marketing compensation plans are aligned and reward behaviors that drive revenue outcomes.",
      },
      {
        id: "f5",
        title: "SLA Definition",
        text: "We have defined SLAs between marketing and sales regarding lead quantity, quality, and follow-up.",
      },
      {
        id: "f6",
        title: "Revenue Goals Cascading",
        text: "Revenue goals are cascaded through departments with individual and team quotas aligned to company targets.",
      },
    ],
  },
  {
    id: "datamodel",
    title: "2. Data Model & Architecture",
    focus: "Foundation for accurate reporting and predictive analytics",
    icon: Workflow,
    questions: [
      {
        id: "d1",
        title: "CRM Data Structure",
        text: "Our CRM has a well-defined, documented data model with clear relationships between accounts, contacts, and opportunities.",
      },
      {
        id: "d2",
        title: "Data Governance",
        text: "We have established data governance standards with clear ownership and documentation of data definitions.",
      },
      {
        id: "d3",
        title: "Customer Hierarchy",
        text: "We maintain a clear account hierarchy with parent accounts, business units, and subsidiaries properly mapped.",
      },
      {
        id: "d4",
        title: "Data Hygiene Processes",
        text: "We have documented processes and tools to ensure data accuracy, deduplication, and regular cleaning.",
      },
      {
        id: "d5",
        title: "Custom Field Strategy",
        text: "Custom fields in our CRM follow a naming convention and are documented with clear purpose and usage.",
      },
      {
        id: "d6",
        title: "Data Integration Layer",
        text: "We have a planned, documented data integration architecture connecting all systems of record.",
      },
      {
        id: "d7",
        title: "Pipeline Data Accuracy",
        text: "Opportunity stage progression, close dates, and deal values are consistently accurate and up-to-date.",
      },
      {
        id: "d8",
        title: "Compliance & Audit Trail",
        text: "We maintain audit trails, change logs, and compliance documentation for sensitive customer data.",
      },
    ],
  },
  {
    id: "stack",
    title: "3. Systems Stack",
    focus: "Integrated tools that support revenue operations",
    icon: Zap,
    questions: [
      {
        id: "s1",
        title: "Core Systems Integration",
        text: "Our CRM, marketing automation, and forecasting tools are integrated with minimal manual data entry.",
      },
      {
        id: "s2",
        title: "Sales Enablement Tools",
        text: "We have implemented sales enablement tools (content, training, playbooks) integrated with our CRM.",
      },
      {
        id: "s3",
        title: "Analytics Platform",
        text: "We have a centralized analytics platform (BI tool, data warehouse) for reporting across all systems.",
      },
      {
        id: "s4",
        title: "Workflow Automation",
        text: "We use workflow automation to minimize manual data entry and repetitive processes.",
      },
      {
        id: "s5",
        title: "Tool Consolidation",
        text: "We have completed a tools audit and are working to reduce tool sprawl and redundancy.",
      },
      {
        id: "s6",
        title: "System Reliability",
        text: "Our core systems have documented uptime SLAs and we have backup/disaster recovery plans in place.",
      },
    ],
  },
  {
    id: "lifecycle",
    title: "4. Lead Lifecycle",
    focus: "Clear definition and management of buyer journey",
    icon: Users,
    questions: [
      {
        id: "l1",
        title: "Lead Definition",
        text: "We have clearly defined what constitutes a lead, MQL, SAL, SQL, and opportunity with specific criteria.",
      },
      {
        id: "l2",
        title: "Lead Scoring",
        text: "We have a lead scoring model that combines behavioral and firmographic data to prioritize leads.",
      },
      {
        id: "l3",
        title: "Lead Assignment Logic",
        text: "Lead assignment rules are documented and automated based on territory, industry, or company size.",
      },
      {
        id: "l4",
        title: "Lead Nurturing Programs",
        text: "We have defined nurture tracks for leads at different stages in the buying journey.",
      },
      {
        id: "l5",
        title: "Prospect Journey Mapping",
        text: "We have mapped the prospect journey with defined touchpoints and milestones for each stage.",
      },
      {
        id: "l6",
        title: "Lead Status Management",
        text: "Lead status changes are triggered automatically or tracked closely with defined rules for progression.",
      },
      {
        id: "l7",
        title: "Engagement Tracking",
        text: "We track prospect engagement across channels (email, web, ads, events) within our CRM.",
      },
      {
        id: "l8",
        title: "Lead Response Process",
        text: "We have a documented, timed process for sales to respond to leads with measured response rates.",
      },
    ],
  },
  {
    id: "pipeline",
    title: "5. Pipeline & Forecast",
    focus: "Accuracy and visibility into revenue generation",
    icon: TrendingUp,
    questions: [
      {
        id: "p1",
        title: "Pipeline Stages",
        text: "We have documented pipeline stages with clear entry/exit criteria and average deal duration.",
      },
      {
        id: "p2",
        title: "Sales Forecast Process",
        text: "We have a documented forecasting process with defined rules for how reps forecast pipeline.",
      },
      {
        id: "p3",
        title: "Deal Velocity Tracking",
        text: "We track deal velocity (how long deals spend in each stage) and use this for forecasting.",
      },
      {
        id: "p4",
        title: "Forecast Accuracy",
        text: "Our forecasts are within ±10% of actual bookings, analyzed monthly for accuracy trends.",
      },
      {
        id: "p5",
        title: "Scenario Modeling",
        text: "We perform scenario modeling (best case, most likely, worst case) in forecasting processes.",
      },
      {
        id: "p6",
        title: "Pipeline Health Monitoring",
        text: "We monitor pipeline health metrics (coverage, aging deals, stage distribution) regularly.",
      },
    ],
  },
  {
    id: "campaigns",
    title: "6. Campaigns & Planning",
    focus: "Strategic execution of revenue initiatives",
    icon: Settings,
    questions: [
      {
        id: "c1",
        title: "Campaign Planning Framework",
        text: "We have a defined framework for planning and executing campaigns with clear goals and success metrics.",
      },
      {
        id: "c2",
        title: "Budget Allocation",
        text: "We allocate marketing and sales budgets based on channel performance and ROI analysis.",
      },
      {
        id: "c3",
        title: "Campaign Execution Process",
        text: "Campaigns are executed consistently using documented playbooks and checklists.",
      },
      {
        id: "c4",
        title: "Campaign Attribution",
        text: "We track campaign influence on opportunities and revenue with multi-touch attribution modeling.",
      },
      {
        id: "c5",
        title: "Launch Readiness Review",
        text: "We conduct launch readiness reviews to ensure alignment between marketing, sales, and enablement teams.",
      },
    ],
  },
  {
    id: "reporting",
    title: "7. Reporting & Analytics",
    focus: "Data-driven decision making across the organization",
    icon: AnalyticsIcon,
    questions: [
      {
        id: "r1",
        title: "Executive Dashboards",
        text: "We have executive dashboards that track key revenue metrics (pipeline, forecast, ARR, CAC).",
      },
      {
        id: "r2",
        title: "Sales Productivity Metrics",
        text: "We measure and report on rep productivity (activities, conversion rates, win rates, deal size).",
      },
      {
        id: "r3",
        title: "Marketing Attribution",
        text: "We have defined marketing attribution models and report on marketing contribution to revenue.",
      },
      {
        id: "r4",
        title: "Predictive Analytics",
        text: "We use predictive analytics or AI to forecast outcomes and identify at-risk deals or leads.",
      },
      {
        id: "r5",
        title: "Data Transparency",
        text: "Sales and marketing teams have self-service access to reports relevant to their roles.",
      },
    ],
  },
  {
    id: "governance",
    title: "8. Governance",
    focus: "Processes and accountability for revenue operations",
    icon: Shield,
    questions: [
      {
        id: "g1",
        title: "RevOps Leadership",
        text: "We have a dedicated RevOps leader or team with accountability for tools, processes, and data.",
      },
      {
        id: "g2",
        title: "Change Management Process",
        text: "We have a formal change management process for updates to CRM, processes, and tools.",
      },
      {
        id: "g3",
        title: "Process Documentation",
        text: "All revenue processes are documented, centralized, and regularly reviewed/updated.",
      },
      {
        id: "g4",
        title: "Training & Adoption",
        text: "We have regular training programs to ensure tool adoption and process compliance.",
      },
      {
        id: "g5",
        title: "KPI Review Cadence",
        text: "We conduct regular review sessions (weekly, monthly) to analyze metrics and make data-driven decisions.",
      },
    ],
  },
]

export const BRAND = {
  name: "3D Smile Solutions",
  primary: "#029482",
  secondary: "#0A252F",
  sage: "#B5CDB2",
  beige: "#DFD7D0",
  gray: "#DCDEDF",
  background: "#F8FAFA",
  logoPlaceholder: "/logo.png",
}

export const ASSESSMENT_CONFIG = {
  totalPoints: 98,
  scoreThresholds: {
    reactive: { min: 0, max: 39, label: "Reactive Revenue Operations", color: "#DC2626" },
    emerging: { min: 40, max: 69, label: "Emerging Revenue Operations", color: "#F59E0B" },
    scalable: { min: 70, max: 98, label: "Scalable Revenue Operations", color: "#029482" },
  },
}
