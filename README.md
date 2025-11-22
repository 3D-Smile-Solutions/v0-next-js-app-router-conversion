# Revenue Operations Maturity Assessment Tool

A comprehensive Next.js 14 application for evaluating Revenue Operations maturity across 8 key dimensions with AI-powered insights.

## Features

- 49-question assessment across 8 RevOps areas
- Real-time scoring and progress tracking
- Lead capture form with validation
- AI-generated insights using Gemini API
- Radar chart visualization of scores
- PDF report generation
- Google Sheets integration for data storage

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone [repository-url]
cd revops-assessment
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Create `.env.local` file with:
\`\`\`
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_SHEETS_WEBHOOK_URL=your_google_sheets_webhook_url_here
\`\`\`

### Environment Variables

- **GEMINI_API_KEY** (Optional): For AI-powered insights. Get it from [Google AI Studio](https://aistudio.google.com)
- **GOOGLE_SHEETS_WEBHOOK_URL** (Optional): For saving submissions to Google Sheets

### Local Development

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to start the assessment.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`
   - `GOOGLE_SHEETS_WEBHOOK_URL`
4. Deploy

\`\`\`bash
vercel deploy
\`\`\`

## Google Sheets Setup

To save assessment data to Google Sheets:

1. Create a Google Sheet
2. Set up Google Apps Script as a webhook
3. Copy the deployment URL
4. Add to `GOOGLE_SHEETS_WEBHOOK_URL` environment variable

## Scoring System

- **Total Points**: 98
- **Sections**: 8 (each with 2-8 questions)
- **Scale**: 0-2 points per question

### Assessment Levels

- **0-39**: Reactive Revenue Operations (Red)
- **40-69**: Emerging Revenue Operations (Yellow)
- **70-98**: Scalable Revenue Operations (Teal)

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Recharts (for radar chart)
- Lucide React (for icons)
- Gemini API (for AI analysis)

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx                 # Main assessment component
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── api/
│       └── submit/
│           └── route.ts         # API route for submissions
├── components/
│   ├── AssessmentQuestion.tsx   # Question component
│   ├── SectionCard.tsx          # Section navigation card
│   ├── LeadForm.tsx             # Lead capture form
│   ├── RadarChartComponent.tsx  # Chart visualization
│   └── ResultsPage.tsx          # Results display
├── lib/
│   ├── sections.ts              # Section and question data
│   └── scoring.ts               # Scoring logic
└── types/
    └── index.ts                 # TypeScript types
\`\`\`

## License

MIT
