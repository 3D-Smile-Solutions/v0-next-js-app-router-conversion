"use client"

import { useState, useMemo, useRef } from "react"
import {
  CheckCircle,
  AlertCircle,
  TrendingUp,
  ChevronRight,
  BarChart3,
  Phone,
  RefreshCw,
  ArrowRight,
  Lock,
  Mail,
  User,
  Building2,
  Settings,
  Database,
  Share2,
  Layers,
  Activity,
  Download,
  Loader2,
  Sparkles,
  MapPin,
  Briefcase,
  Info,
  Zap,
} from "lucide-react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts"

// --- BRAND CONFIGURATION ---
const BRAND = {
  primary: "#029482", // 3D Smile Teal
  secondary: "#0A252F", // Dark Blue/Black
  sage: "#B5CDB2", // Sage Green
  beige: "#DFD7D0", // Beige
  gray: "#DCDEDF", // Light Gray
  logoPlaceholder: "Logo.png",
  Darklogo: "LogoD.png",
}

// --- CONFIGURATION ---
const WEBHOOK_URL = ""
// The server API route handles all AI analysis securely

// --- MOCK DATA FOR PREVIEW ---
const MOCK_AI_RESPONSE = {
  summary:
    "Your organization shows strong potential in GTM Foundations but significantly lags in Data Architecture. Without fixing the data model to support DSO hierarchies, your outbound efforts will likely hit a ceiling.",
  risks: [
    {
      title: "Blind Spots in DSO Hierarchy",
      desc: "Your current data model treats every location as a unique account. This means you are likely underestimating the value of large groups and missing cross-sell opportunities.",
    },
    {
      title: "Leaky Funnel at Handoff",
      desc: "The friction you reported at the SDR-to-AE handoff point is likely causing qualified leads to slip through the cracks, inflating your CAC.",
    },
  ],
  wins: [
    {
      title: "Tag Top 50 Accounts",
      desc: "Spend 2 hours this week manually tagging your top 50 accounts with their 'Parent DSO' in the CRM. This will give you an immediate visualization of group value.",
    },
    {
      title: "Standardize Handoff Note",
      desc: "Create a single, required CRM field for SDRs to fill out before an Opportunity can be created. This forces context transfer before the AE call.",
    },
  ],
  benchmark: [
    { subject: "Foundations", A: 80, fullMark: 100 },
    { subject: "Data Model", A: 40, fullMark: 100 },
    { subject: "Stack", A: 60, fullMark: 100 },
    { subject: "Lifecycle", A: 50, fullMark: 100 },
    { subject: "Pipeline", A: 70, fullMark: 100 },
    { subject: "Campaigns", A: 30, fullMark: 100 },
    { subject: "Reporting", A: 40, fullMark: 100 },
    { subject: "Governance", A: 20, fullMark: 100 },
  ],
}

// --- DATA STRUCTURE ---
const SECTIONS = [
  {
    id: "foundations",
    title: "1. GTM Foundations",
    focus: "ICP, lifecycle, and shared ownership between sales and marketing.",
    icon: <Share2 size={24} />,
    questions: [
      {
        id: "f1",
        title: "ICP and segments",
        text: "We have a written ICP and segments, for example DSO, group practice, single practice, manufacturer, dental SaaS, with criteria that sales and marketing actually use.",
      },
      {
        id: "f2",
        title: "Buying committees",
        text: "For key segments such as DSOs, labs, distributors, we have defined personas and buying roles, economic buyer, clinical champion, operations, finance, IT, and those roles are captured on account and contact records.",
      },
      {
        id: "f3",
        title: "Dental specific value story",
        text: "Our value narrative connects to dental outcomes such as case acceptance, chair time, hygiene production, lab efficiency, DSO EBITDA and valuation, not just generic SaaS metrics.",
      },
      {
        id: "f4",
        title: "Shared lifecycle definitions",
        text: "Lifecycle stages such as subscriber, lead, MQL, SQL, opportunity, customer, and expansion are clearly defined for dental and healthtech buyers and used consistently by sales and marketing.",
      },
      {
        id: "f5",
        title: "Qualification framework in system",
        text: "Our qualification method, for example MEDDIC, SPICED, BANT, or similar, is reflected in required fields and templates in the CRM and engagement tools, not only in tribal knowledge.",
      },
      {
        id: "f6",
        title: "Revenue and pipeline ownership",
        text: "Marketing, sales, and customer success agree on revenue targets and how much pipeline should come from inbound, outbound, and partners for each segment such as DSO, SMB practices, manufacturers.",
      },
    ],
  },
  {
    id: "datamodel",
    title: "2. Data Model & Architecture",
    focus: "Clean, structured data that reflects dental realities.",
    icon: <Database size={24} />,
    questions: [
      {
        id: "d1",
        title: "Single source of truth",
        text: "There is a primary system of record (CRM like HubSpot, Salesforce) for companies, locations, contacts, and deals, with minimal parallel spreadsheets or shadow CRMs.",
      },
      {
        id: "d2",
        title: "DSO and multi location structure",
        text: "Account records are structured so DSOs and group practices have a parent account with associated locations and providers, and sales can see roll up pipeline and revenue.",
      },
      {
        id: "d3",
        title: "Dental channel modeling",
        text: "Accounts and deals capture sales channel for each opportunity, for example direct to practice, DSO, distributor, lab partner, OEM manufacturer.",
      },
      {
        id: "d4",
        title: "Property and field design",
        text: "Core objects such as accounts, contacts, deals have a sensible property set that includes segment, specialty, number of locations, chair count or scanner count, and does not drown users in noise.",
      },
      {
        id: "d5",
        title: "Data dictionary",
        text: "There is a simple data dictionary that defines key fields such as segment, source, product line, channel, what each means, and who owns accuracy.",
      },
      {
        id: "d6",
        title: "Required properties",
        text: "Key ICP and reporting fields, for example segment, product line, region, channel, are required at the right lifecycle and deal stages so records are complete.",
      },
      {
        id: "d7",
        title: "Enrichment for healthcare and dental",
        text: "There is a process to enrich practice size, specialty, DSO affiliation, ownership type, and tech stack, either manually or via vendors, for targeting and reporting.",
      },
      {
        id: "d8",
        title: "Ongoing hygiene",
        text: "There is a recurring process to deduplicate organizations and contacts, normalize practice names, and clean stale data, not just one off cleanups.",
      },
    ],
  },
  {
    id: "stack",
    title: "3. Systems Stack",
    focus: "Platform configuration that supports the GTM motion.",
    icon: <Settings size={24} />,
    questions: [
      {
        id: "s1",
        title: "CRM configuration to motion",
        text: "The CRM is configured for current motions such as DSO enterprise, mid market remote sales, SMB or partner led, rather than left in default mode.",
      },
      {
        id: "s2",
        title: "Marketing platform integration",
        text: "Marketing automation is connected to the CRM with reliable sync of contacts, companies, activities, and lifecycle stages.",
      },
      {
        id: "s3",
        title: "Sales engagement and sequences",
        text: "A sales engagement or sequencing tool is integrated, and outbound activity such as calls, emails, replies, meetings is logged automatically.",
      },
      {
        id: "s4",
        title: "Forms, chat, and tracking",
        text: "Website forms, chat, and key page tracking are integrated with marketing and CRM, and they capture source and campaign information on each contact.",
      },
      {
        id: "s5",
        title: "Product and usage data",
        text: "For SaaS or connected devices, key product signals such as scans per month, cases per month, active providers, or site usage are integrated as properties or separate objects for targeting and expansion.",
      },
      {
        id: "s6",
        title: "Integration monitoring",
        text: "Someone owns monitoring of critical integrations, for example CRM to billing, CRM to product analytics, and there is a process to resolve sync errors quickly.",
      },
    ],
  },
  {
    id: "lifecycle",
    title: "4. Lead Lifecycle",
    focus: "How leads move, get scored, and land with the right owner.",
    icon: <Activity size={24} />,
    questions: [
      {
        id: "l1",
        title: "Lifecycle design",
        text: "There is a documented lifecycle for leads and contacts, from new lead to MQL, SQL, opportunity, customer, recycled, nurture, with criteria for each transition.",
      },
      {
        id: "l2",
        title: "Dental specific lead sources",
        text: "Contact and account records capture if leads came from dental conferences, study clubs, CE webinars, DSO summits, manufacturer or distributor referrals, or digital campaigns.",
      },
      {
        id: "l3",
        title: "Scoring model",
        text: "There is a lead or account scoring model that combines fit, for example DSO size, number of locations, specialty, with engagement such as webinar attendance or pricing page visits.",
      },
      {
        id: "l4",
        title: "Automated routing rules",
        text: "Leads and MQLs are routed automatically based on segment, territory, DSO ownership, and partner rules, so leads do not sit unassigned.",
      },
      {
        id: "l5",
        title: "Response time SLAs",
        text: "Response time SLAs exist for inbound and event leads, for example DSO demo requests from a show, and SLA adherence is tracked in reports.",
      },
      {
        id: "l6",
        title: "Duplicate prevention",
        text: "Duplicate handling rules prevent multiple accounts for the same DSO or large practice group and multiple contact records for the same doctor or admin.",
      },
      {
        id: "l7",
        title: 'Nurture for "not ready"',
        text: "Leads that are not ready to buy, for example early stage DSOs or practices still evaluating, move into defined nurture programs with sequenced content and periodic check ins.",
      },
      {
        id: "l8",
        title: "Lifecycle reporting",
        text: "Funnel and lifecycle reports show volume and conversion across lifecycle stages, for example lead to MQL, MQL to SQL, SQL to opportunity, split by dental and healthtech segments.",
      },
    ],
  },
  {
    id: "pipeline",
    title: "5. Pipeline & Forecast",
    focus: "Deal structure, stage discipline, and forecast reliability.",
    icon: <TrendingUp size={24} />,
    questions: [
      {
        id: "p1",
        title: "Dental aware deal stages",
        text: "Deal stages are defined with clear entry and exit criteria aligned to dental motions such as clinical evaluation, pilot site selection, committee approval, contract and procurement.",
      },
      {
        id: "p2",
        title: "Required deal data",
        text: "Each stage requires critical information such as DSO or practice type, clinical use case, number of locations, estimated seats or units, pricing model, so forecast is grounded in reality.",
      },
      {
        id: "p3",
        title: "SDR to AE handoff",
        text: "There is a standard process and template for SDR to AE handoff that captures qualification details, stakeholders, and next steps inside the CRM, not in a separate document.",
      },
      {
        id: "p4",
        title: "Separate pipelines where needed",
        text: "There are separate pipelines where deal structure and stages differ, for example DSO enterprise, SMB practices, manufacturers, so probabilities and forecasts make sense.",
      },
      {
        id: "p5",
        title: "Forecast process",
        text: "Forecast and pipeline reviews start with data from the system, use consistent criteria such as stage, probability, risk factors, and are held on a regular cadence.",
      },
      {
        id: "p6",
        title: "Win or loss coding",
        text: "Closed won and closed lost deals capture primary reason and competitor or status quo, and those patterns are periodically reviewed by segment and product line.",
      },
    ],
  },
  {
    id: "campaigns",
    title: "6. Campaigns & Planning",
    focus: "Connecting programs and spend to pipeline and revenue.",
    icon: <Layers size={24} />,
    questions: [
      {
        id: "c1",
        title: "Campaign structure",
        text: "Campaigns or equivalent group related initiatives such as DSO conferences, CE webinar series, manufacturer co marketing, and outbound plays, and contacts and deals are associated.",
      },
      {
        id: "c2",
        title: "UTM and tracking standards",
        text: "UTM or similar tracking conventions exist for paid search, paid social, email, partner programs, and are consistently used on tracked links.",
      },
      {
        id: "c3",
        title: "Attribution reporting",
        text: "There is at least first touch and last touch attribution that connects contacts and opportunities to campaigns in the system, especially for high cost events and programs.",
      },
      {
        id: "c4",
        title: "Channel economics",
        text: "Pipeline and revenue are visible by channel, for example conferences, SDR outbound, distributor referrals, CE content, and are used to decide what to scale or cut.",
      },
      {
        id: "c5",
        title: "Joint planning rhythm",
        text: "Sales and marketing review campaign and attribution data together on a regular cadence to select dental events, programs, and channels for the next quarter.",
      },
    ],
  },
  {
    id: "reporting",
    title: "7. Reporting & Analytics",
    focus: "Standard, trusted views of performance.",
    icon: <BarChart3 size={24} />,
    questions: [
      {
        id: "r1",
        title: "Executive dashboards",
        text: "Leadership has standard dashboards they rely on that show revenue, pipeline, funnel metrics by segment such as DSOs, SMB practices, manufacturers, and health systems.",
      },
      {
        id: "r2",
        title: "Role based views",
        text: "SDRs, AEs, marketing managers, and RevOps have dashboards tailored to their work, for example tasks, sequences, event performance, partner deals, and data quality.",
      },
      {
        id: "r3",
        title: "Dental segment cuts",
        text: "Reports can be sliced by practice size, number of locations, DSO or group, specialty, and channel so you can see which sub segments are performing.",
      },
      {
        id: "r4",
        title: "Data freshness and trust",
        text: "Reporting uses up to date data from the core systems, and leaders trust those dashboards more than ad hoc spreadsheets.",
      },
      {
        id: "r5",
        title: "Self service",
        text: "Key stakeholders can answer most day to day questions directly in the reporting layer without needing custom exports from RevOps each time.",
      },
    ],
  },
  {
    id: "governance",
    title: "8. Governance",
    focus: "Keeping the machine stable while you evolve it.",
    icon: <Lock size={24} />,
    questions: [
      {
        id: "g1",
        title: "Clear RevOps owner",
        text: "There is a named owner or team for RevOps who controls changes to fields, workflows, integrations, and core reports.",
      },
      {
        id: "g2",
        title: "Change process",
        text: "There is a straightforward change process for new fields, workflows, and pipelines, including simple testing, documentation, and communication before rollout.",
      },
      {
        id: "g3",
        title: "Documented GTM processes",
        text: "Lead lifecycle, routing rules, deal stages, and key dental workflows such as pilot setup or multi site rollout are documented in a shared, findable place.",
      },
      {
        id: "g4",
        title: "Training and enablement",
        text: "New reps and marketers receive system and process training, and when workflows or stages change, there is live or recorded training, not only an email.",
      },
      {
        id: "g5",
        title: "Feedback loop",
        text: "There is a structured way for reps and marketers to submit system and process feedback, and RevOps responds with clear decisions and timeframes.",
      },
    ],
  },
]

const SCORING_GUIDE = [
  { val: 0, label: "Not true at all" },
  { val: 1, label: "Somewhat true / Inconsistent" },
  { val: 2, label: "Fully true / Documented" },
]

const COMPANY_SIZES = [
  {
    id: "smb",
    label: "Small & Medium Business (SMB)",
    desc: "Fewer than 100 employees | Revenue < $50M",
    detail: "Often have a simpler sales process due to smaller buying teams.",
  },
  {
    id: "mid",
    label: "Mid-Market",
    desc: "100-999 employees | Revenue $50M - $1B",
    detail: "Need specialized roles; often use cloud-based services and prioritize quick ROI.",
  },
  {
    id: "ent",
    label: "Enterprise",
    desc: "Over 1,000 employees | Revenue > $1B",
    detail: "Complex hierarchies, global reach, long sales cycles due to many stakeholders.",
  },
]

// --- COMPONENTS ---

const BrandLogo = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5 L89 27.5 V72.5 L50 95 L11 72.5 V27.5 Z" fill="white" fillOpacity="0.1" />
    <path d="M50 95 L11 72.5 V27.5 L50 5 L89 27.5 V72.5 Z" stroke="white" strokeWidth="0" />
    <path d="M30 35 L70 35 L70 45 L40 45 L40 55 L70 55 L70 75 L30 75 L30 65 L60 65 L60 55 L30 55 Z" fill="white" />
  </svg>
)

const SectionScoreCard = ({ section, score, maxScore }) => {
  const percentage = (score / maxScore) * 100
  let status = ""
  let colorClass = ""
  let barColor = ""
  let desc = ""

  if (percentage <= 40) {
    status = "Fragmented"
    colorClass = "text-red-700 bg-red-50 border-red-200"
    barColor = "bg-red-500"
    desc = "Foundations missing; constraining revenue."
  } else if (percentage <= 70) {
    status = "Emerging"
    colorClass = "text-yellow-800 bg-yellow-50 border-yellow-200"
    barColor = "bg-yellow-500"
    desc = "Basics exist; risk of breakage as you scale."
  } else {
    status = "Scalable"
    colorClass = "text-[#029482] bg-[#029482]/10 border-[#029482]/20"
    barColor = "bg-[#029482]"
    desc = "Solid foundation; focus on optimization."
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col h-full break-inside-avoid print:break-inside-avoid">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-slate-100 text-[#0A252F]">{section.icon}</div>
        <h3 className="font-bold text-[#0A252F] text-base leading-tight">{section.title}</h3>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full border ${colorClass} print:border-black print:text-black`}
          >
            {status}
          </span>
          <span className="text-sm font-bold text-slate-600">
            {score}/{maxScore}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4">{desc}</p>
        <div className="w-full bg-slate-100 rounded-full h-1.5 print:border print:border-slate-200">
          <div className={`h-1.5 rounded-full ${barColor} print:bg-black`} style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    </div>
  )
}

const LeadForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    company: "",
    category: "",
    size: "",
    state: "",
    zip: "",
  })

  const isFormValid =
    Object.values(formData).every((val) => val && val.toString().trim() !== "") && formData.zip.trim().length === 5

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-8 text-center" style={{ backgroundColor: BRAND.secondary }}>
        <div className="mb-6 flex flex-col items-center justify-center">
          <img
            src={BRAND.Darklogo || "/placeholder.svg"}
            alt="3D Smile Solutions"
            className="h-18 w-auto object-contain mb-2"
            onError={(e) => {
              e.target.style.display = "none"
              e.target.nextSibling.style.display = "flex"
            }}
          />
          <div style={{ display: "none" }} className="flex-col items-center">
            <div className="w-16 h-16 mb-2 bg">
              <BrandLogo />
            </div>
            <span className="text-white font-bold text-xl tracking-wide">3D Smile Solutions</span>
          </div>
        </div>
        <p className="text-[#029482] font-bold text-sm tracking-wide uppercase mb-4">WORK SMARTER. GROW FASTER.</p>
        <h2 className="text-2xl font-bold text-white mb-1">Assessment Complete!</h2>
        <p className="text-slate-300 text-sm">Enter details to unlock your full RevOps Maturity Report.</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(formData)
        }}
        className="p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User size={16} />
              </div>
              <input
                required
                type="text"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#029482] outline-none text-sm"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Job Title *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Briefcase size={16} />
              </div>
              <input
                required
                type="text"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#029482] outline-none text-sm"
                placeholder="VP of Sales"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Work Email *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={16} />
              </div>
              <input
                required
                type="email"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#029482] outline-none text-sm"
                placeholder="jane@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone size={16} />
              </div>
              <input
                required
                type="tel"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#029482] outline-none text-sm"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company Name *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Building2 size={16} />
              </div>
              <input
                required
                type="text"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#029482] outline-none text-sm"
                placeholder="Acme Dental Group"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category *</label>
              <select
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#029482] outline-none text-sm bg-white"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="" disabled>
                  Select Category...
                </option>
                <option value="SaaS">SaaS / Software</option>
                <option value="Hardware">Hardware</option>
                <option value="DSO">DSO / Dental Group</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company Size *</label>
              <select
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#029482] outline-none text-sm bg-white"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              >
                <option value="" disabled>
                  Select Size...
                </option>
                <option value="SMB">SMB ({"<"}100 employees)</option>
                <option value="Mid-Market">Mid-Market (100-999)</option>
                <option value="Enterprise">Enterprise (1,000+)</option>
              </select>
            </div>
          </div>

          {formData.size && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex gap-3 text-sm text-blue-800">
              <Info size={18} className="shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-1">
                  {
                    COMPANY_SIZES.find((s) => s.label.startsWith(formData.size === "SMB" ? "Small" : formData.size))
                      .label
                  }
                </span>
                <p className="text-xs mb-1 opacity-80">
                  {
                    COMPANY_SIZES.find((s) => s.label.startsWith(formData.size === "SMB" ? "Small" : formData.size))
                      .desc
                  }
                </p>
                <p className="text-xs leading-relaxed">
                  {
                    COMPANY_SIZES.find((s) => s.label.startsWith(formData.size === "SMB" ? "Small" : formData.size))
                      .detail
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">State *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <MapPin size={16} />
              </div>
              <input
                required
                type="text"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#029482] outline-none text-sm"
                placeholder="CA"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Zip Code *</label>
            <input
              required
              type="text"
              maxLength={5}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#029482] outline-none text-sm"
              placeholder="90210"
              value={formData.zip}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 5)
                setFormData({ ...formData, zip: val })
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className={`w-full font-bold py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 mt-6 transition-all
            ${
              isSubmitting || !isFormValid
                ? "bg-slate-400 cursor-not-allowed text-slate-200"
                : "bg-[#029482] hover:opacity-90 text-white hover:scale-[1.02]"
            }`}
        >
          {isSubmitting ? (
            "Processing..."
          ) : (
            <>
              Unlock Report <ArrowRight size={20} />
            </>
          )}
        </button>

        <p className="text-xs text-center text-slate-400 mt-4">
          {!isFormValid && "Please fill out all fields completely. Zip code must be 5 digits. "}
          Your data is secure. We will email you a copy of your results.
        </p>
      </form>
    </div>
  )
}

const AIReport = ({ analysis, scores }) => {
  const radarData = useMemo(() => {
    if (analysis?.benchmark) return analysis.benchmark

    const subjects = {
      foundations: "Foundations",
      datamodel: "Data",
      stack: "Stack",
      lifecycle: "Lifecycle",
      pipeline: "Pipeline",
      campaigns: "Campaigns",
      reporting: "Reporting",
      governance: "Governance",
    }
    return Object.keys(scores)
      .filter((k) => k !== "total")
      .map((key) => ({
        subject: subjects[key],
        A: Math.min(
          100,
          Math.round(
            (scores[key] /
              (key === "datamodel" || key === "lifecycle"
                ? 16
                : key === "campaigns" || key === "reporting" || key === "governance"
                  ? 10
                  : 12)) *
              100,
          ),
        ),
        fullMark: 100,
      }))
  }, [analysis, scores])

  if (!analysis) return null

  return (
    <div className="space-y-8 print:space-y-4">
      {/* 1. Executive Summary & Radar Chart Row */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Summary Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-lg flex-1">
          <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-4">
            <div className="p-2 bg-[#029482]/10 rounded-lg text-[#029482]">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#0A252F]">Strategic Executive Summary</h3>
          </div>
          <p className="text-slate-700 leading-relaxed text-lg">{analysis.summary || "Analysis pending..."}</p>
        </div>

        {/* Radar Chart Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-lg flex-1 min-h-[300px] flex flex-col items-center justify-center">
          <h4 className="text-[#0A252F] font-bold mb-4 text-center">Performance vs. Benchmark</h4>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Your Score" dataKey="A" stroke="#029482" fill="#029482" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 2. Top Risks */}
      <div className="bg-red-50 rounded-xl border border-red-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-100 rounded-lg text-red-700">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-xl font-bold text-red-900">Critical Risks Identified</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysis.risks?.map((risk, i) => (
            <div key={i} className="bg-white p-5 rounded-lg border border-red-100 shadow-sm">
              <h4 className="font-bold text-red-800 mb-2">{risk.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{risk.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Quick Wins */}
      <div className="bg-[#029482]/5 rounded-xl border border-[#029482]/20 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#029482]/10 rounded-lg text-[#029482]">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold text-[#0A252F]">Actionable Quick Wins</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysis.wins?.map((win, i) => (
            <div key={i} className="bg-white p-5 rounded-lg border border-[#029482]/20 shadow-sm">
              <h4 className="font-bold text-[#029482] mb-2">{win.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{win.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- MAIN COMPONENT ---

export default function RevOpsChecklist() {
  const [responses, setResponses] = useState({})
  const [activeSection, setActiveSection] = useState("foundations")
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const [leadData, setLeadData] = useState(null)

  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [isAiLoading, setIsAiLoading] = useState(false)

  const scrollRef = useRef(null)

  const calculateSectionScore = (sectionId) => {
    const section = SECTIONS.find((s) => s.id === sectionId)
    return section.questions.reduce((acc, q) => acc + (responses[q.id] || 0), 0)
  }

  const scores = useMemo(() => {
    const results = {}
    let total = 0
    SECTIONS.forEach((section) => {
      const sScore = calculateSectionScore(section.id)
      results[section.id] = sScore
      total += sScore
    })
    return { ...results, total }
  }, [responses])

  const isComplete = useMemo(() => {
    const totalQuestions = SECTIONS.reduce((acc, s) => acc + s.questions.length, 0)
    const answered = Object.keys(responses).length
    return totalQuestions === answered
  }, [responses])

  const getOverallAssessment = (total) => {
    if (total <= 39)
      return {
        label: "Reactive Revenue Operations",
        color: "text-red-600",
        desc: "Systems are working against you, high risk of wasted spend and unreliable forecasts.",
      }
    if (total <= 69)
      return {
        label: "Emerging Revenue Operations",
        color: "text-yellow-600",
        desc: "Some structure exists, but you are leaving material pipeline and efficiency on the table.",
      }
    return {
      label: "Scalable Revenue Operations",
      color: "text-[#029482]",
      desc: "Fundamentals are strong. Next phase is optimization, automation, and experimentation.",
    }
  }

  // AI analysis is now handled entirely by the server API route
  // The server securely processes the Gemini API call and returns the analysis in the response
  // Removed generateAIAnalysis function

  const handleLeadSubmit = async (formData) => {
    setIsSubmittingLead(true)
    setLeadData(formData)

    const payload = {
      leadData: formData,
      scores: scores,
      responses: responses,
    }

    try {
      console.log("[v0] Submitting form data to API:", payload)
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      console.log("[v0] API response status:", response.status)
      const result = await response.json()
      console.log("[v0] API response data:", result)

      if (result.success) {
        setAiAnalysis(result.analysis)
        setShowLeadForm(false)
        setIsSubmitted(true)
        window.scrollTo(0, 0)
      } else {
        alert("Error submitting form. Please try again.")
      }
    } catch (e) {
      console.error("[v0] Submission error:", e)
      alert("Error submitting form. Please try again.")
    } finally {
      setIsSubmittingLead(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (isSubmitted) {
    const assessment = getOverallAssessment(scores.total)

    return (
      <div
        className="min-h-screen font-sans p-4 md:p-8 print:bg-white print:p-0"
        style={{ backgroundColor: "#F8FAFA" }}
      >
        <style>{`
          @media print {
            body * { visibility: hidden; }
            #printable-area, #printable-area * { visibility: visible; }
            #printable-area { position: absolute; left: 0; top: 0; width: 100%; }
            .no-print { display: none !important; }
            .print-break { page-break-before: always; }
          }
        `}</style>

        <div id="printable-area" className="max-w-6xl mx-auto">
          <div className="text-center mb-12 print:mb-6">
            <div
              className="inline-flex items-center justify-center p-3 text-white rounded-full mb-4 shadow-lg print:shadow-none print:text-black"
              style={{ backgroundColor: BRAND.primary }}
            >
              <Activity size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A252F] mb-2">RevOps Maturity Results</h1>
            <p className="text-slate-600">
              Prepared for{" "}
              <span className="font-bold" style={{ color: BRAND.secondary }}>
                {leadData?.company}
              </span>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8 print:shadow-none print:border-2">
            <div
              className="h-2"
              style={{ background: `linear-gradient(to right, ${BRAND.primary}, ${BRAND.sage})` }}
            ></div>
            <div className="p-8 md:p-12 text-center">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Total Score</p>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-6xl font-black text-[#0A252F]">{scores.total}</span>
                <span className="text-2xl text-slate-400 font-medium">/ 98</span>
              </div>
              <h2 className={`text-3xl font-bold mb-4 ${assessment.color} print:text-black`}>{assessment.label}</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">{assessment.desc}</p>
            </div>
          </div>

          {isAiLoading ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 mb-8 text-center">
              <Loader2 size={48} className="text-[#029482] animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0A252F]">Analyzing your data...</h3>
            </div>
          ) : (
            <AIReport analysis={aiAnalysis} scores={scores} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 print:grid-cols-2 print:gap-6">
            {SECTIONS.map((section) => (
              <SectionScoreCard
                key={section.id}
                section={section}
                score={scores[section.id]}
                maxScore={section.questions.length * 2}
              />
            ))}
          </div>

          <div
            className="text-white rounded-2xl p-8 md:p-12 text-center shadow-2xl no-print"
            style={{ backgroundColor: BRAND.secondary }}
          >
            <h3 className="text-2xl font-bold mb-4">Build your Scalable Revenue Engine</h3>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
              We've sent a detailed breakdown to <strong>{leadData?.email}</strong>. Let's review your red flags and
              build a roadmap to fix them.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handlePrint}
                className="text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                style={{ backgroundColor: BRAND.primary }}
              >
                <Download size={20} /> Download PDF Report
              </button>
              <button
                onClick={() => window.location.reload()}
                className="border border-slate-500 text-slate-300 px-8 py-4 rounded-lg font-bold hover:bg-slate-800 flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} /> Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showLeadForm) {
    return (
      <div
        className="min-h-screen font-sans flex flex-col items-center justify-center p-4"
        style={{ backgroundColor: "#F8FAFA" }}
      >
        <div className="w-full max-w-md mb-8 text-center">
          <div
            className="inline-flex items-center justify-center p-3 text-white rounded-full mb-6 shadow-lg"
            style={{ backgroundColor: BRAND.primary }}
          >
            <Activity size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[#0A252F] mb-2">Calculations Complete</h1>
          <p className="text-slate-600">Unlock your RevOps Score to see how you stack up.</p>
        </div>
        <LeadForm onSubmit={handleLeadSubmit} isSubmitting={isSubmittingLead} />
      </div>
    )
  }

  return (
    <div className="min-h-screen font-sans text-slate-800" style={{ backgroundColor: "#F8FAFA" }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-start gap-3 flex-col">
            <div className="flex items-center justify-center">
              <img
                src={BRAND.logoPlaceholder || "/placeholder.svg"}
                alt="3D Smile Solutions"
                className="h-10 md:h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = "none"
                  e.target.nextSibling.style.display = "block"
                }}
              />
              <div style={{ display: "none" }}>
                <BrandLogo />
              </div>
            </div>
            <div className="hidden md:flex flex-col ">
              <span className="font-bold text-lg leading-none" style={{ color: BRAND.secondary }}>
              </span>
              <span className="text-xs font-medium tracking-wide" style={{ color: BRAND.primary }}>
                WORK SMARTER. GROW FASTER.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-slate-500 uppercase font-bold">Progress</span>
              <span className="text-sm font-bold" style={{ color: BRAND.primary }}>
                {Object.keys(responses).length} / 49
              </span>
            </div>
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${(Object.keys(responses).length / 49) * 100}%`, backgroundColor: BRAND.primary }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A252F] mb-2">Revenue Operations Checklist</h1>
          <p className="text-lg text-slate-600">Sales and marketing alignment, tailored to dental and healthtech.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="lg:sticky lg:top-24 space-y-2 overflow-y-auto max-h-[80vh] pb-4 lg:pb-0">
              <h2 className="text-xs font-bold text-slate-400 uppercase mb-3 px-2">Sections</h2>
              {SECTIONS.map((section) => {
                const isActive = activeSection === section.id
                const answered = section.questions.filter((q) => responses[q.id] !== undefined).length
                const isDone = answered === section.questions.length

                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id)
                      setTimeout(() => {
                        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }, 10)
                    }}
                    className={`w-[calc(100%-10px)] ml-1 text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all ${isActive ? "bg-white shadow-md ring-1 ring-[#029482]" : "hover:bg-slate-100 text-slate-600"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={isActive ? "text-[#029482]" : "text-slate-400"}>{section.icon}</div>
                      <span className={`text-sm font-bold ${isActive ? "text-[#0A252F]" : ""}`}>
                        {section.title.split(".")[0]}
                      </span>
                    </div>
                    {isDone && <CheckCircle size={16} className="text-[#029482]" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Main Question Area */}
          <div className="lg:w-3/4" ref={scrollRef}>
            {SECTIONS.map((section) => {
              const answeredCount = section.questions.filter((q) => responses[q.id] !== undefined).length
              const isSectionComplete = answeredCount === section.questions.length

              return (
                <div key={section.id} className={activeSection === section.id ? "block" : "hidden"}>
                  <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg text-white shrink-0" style={{ backgroundColor: BRAND.primary }}>
                        {section.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[#0A252F] mb-2">{section.title}</h2>
                        <p className="text-slate-600">{section.focus}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {section.questions.map((q, idx) => (
                      <div
                        key={q.id}
                        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="mb-4">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Question {idx + 1}
                          </span>
                          <h3 className="text-lg font-bold text-[#0A252F] mt-1">{q.title}</h3>
                          <p className="text-slate-600 mt-2 leading-relaxed">{q.text}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {SCORING_GUIDE.map((opt) => {
                            const isSelected = responses[q.id] === opt.val
                            return (
                              <label
                                key={opt.val}
                                className={`cursor-pointer p-3 rounded-lg border flex items-center gap-3 transition-all ${isSelected ? "bg-[#029482]/5 border-[#029482] ring-1 ring-[#029482]" : "hover:bg-slate-50 border-slate-200"}`}
                              >
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-[#029482]" : "border-slate-300"}`}
                                >
                                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#029482]" />}
                                </div>
                                <div>
                                  <div
                                    className={`font-bold text-sm ${isSelected ? "text-[#0A252F]" : "text-slate-700"}`}
                                  >
                                    {opt.val} Points
                                  </div>
                                  <div className="text-xs text-slate-500">{opt.label}</div>
                                </div>
                                <input
                                  type="radio"
                                  name={q.id}
                                  className="hidden"
                                  onChange={() => setResponses({ ...responses, [q.id]: opt.val })}
                                />
                              </label>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    {section.id !== "governance" ? (
                      <button
                        onClick={() => {
                          const currIdx = SECTIONS.findIndex((s) => s.id === section.id)
                          const nextId = SECTIONS[currIdx + 1].id
                          setActiveSection(nextId)
                          setTimeout(
                            () => scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
                            10,
                          )
                        }}
                        disabled={!isSectionComplete}
                        className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all
                          ${
                            isSectionComplete
                              ? "text-white hover:opacity-90 hover:scale-105 shadow-md"
                              : "bg-slate-200 text-slate-400 cursor-not-allowed"
                          }`}
                        style={isSectionComplete ? { backgroundColor: BRAND.secondary } : {}}
                      >
                        {isSectionComplete ? "Next Section" : "Complete Section to Continue"} <ChevronRight size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowLeadForm(true)
                          window.scrollTo(0, 0)
                        }}
                        disabled={!isComplete}
                        className={`px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 shadow-lg transition-all ${isComplete ? "text-white hover:scale-105" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
                        style={isComplete ? { backgroundColor: BRAND.primary } : {}}
                      >
                        Finish Assessment <BarChart3 size={20} />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
