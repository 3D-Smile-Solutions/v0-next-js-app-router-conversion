import { type NextRequest, NextResponse } from "next/server"
import { sendResultsEmail } from "@/lib/email"

async function generateAIAnalysis(data: any) {
  if (!process.env.GEMINI_API_KEY) {
    return generateFallbackAnalysis(data)
  }

  // Identify weakest and strongest sections for personalization
  const scores = data.scores
  const sectionScores = [
    { name: "GTM Foundations", score: scores.foundations, max: 12 },
    { name: "Data Model", score: scores.datamodel, max: 16 },
    { name: "Systems Stack", score: scores.stack, max: 12 },
    { name: "Lead Lifecycle", score: scores.lifecycle, max: 16 },
    { name: "Pipeline", score: scores.pipeline, max: 12 },
    { name: "Campaigns", score: scores.campaigns, max: 10 },
    { name: "Reporting", score: scores.reporting, max: 10 },
    { name: "Governance", score: scores.governance, max: 10 },
  ]

  const sortedByScore = [...sectionScores].sort((a, b) => b.score - a.score)
  const weakestSection = sortedByScore[sortedByScore.length - 1]
  const strongestSection = sortedByScore[0]
  const totalPercentage = Math.round((scores.total / 98) * 100)

  const prompt = `You are a Revenue Operations Expert analyzing assessment results for ${data.leadData.company} (Size: ${data.leadData.size}, Category: ${data.leadData.category}).

Overall Score: ${scores.total}/98 (${totalPercentage}% - this translates to a ${getAssessmentLevel(scores.total)} organization)

Section Scores:
- GTM Foundations: ${scores.foundations}/12
- Data Model: ${scores.datamodel}/16
- Systems Stack: ${scores.stack}/12
- Lead Lifecycle: ${scores.lifecycle}/16
- Pipeline: ${scores.pipeline}/12
- Campaigns: ${scores.campaigns}/10
- Reporting: ${scores.reporting}/10
- Governance: ${scores.governance}/10

Strongest Area: ${strongestSection.name} (${strongestSection.score}/${strongestSection.max})
Weakest Area: ${weakestSection.name} (${weakestSection.score}/${weakestSection.max})

IMPORTANT: Generate unique, personalized insights based on THESE SPECIFIC SCORES. Do NOT provide generic responses. 
Focus on:
1. Why their weakest area (${weakestSection.name}) is impacting their RevOps
2. How their strongest area (${strongestSection.name}) is an asset
3. Concrete, actionable next steps specific to their scores

Return ONLY valid JSON with this exact structure, no markdown or code blocks:
{
  "summary": "2-3 sentences that specifically references their overall score (${totalPercentage}%), assessment level, their strongest area (${strongestSection.name}), and their biggest gap (${weakestSection.name})",
  "risks": [
    {"title": "Risk specific to ${weakestSection.name}", "desc": "Specific business impact for a ${getAssessmentLevel(scores.total)} RevOps organization with weak ${weakestSection.name}"},
    {"title": "Risk 2", "desc": "Another specific risk based on their scores"}
  ],
  "wins": [
    {"title": "Win 1 - Leverage ${strongestSection.name}", "desc": "Specific action they can take this week using their strength in ${strongestSection.name}"},
    {"title": "Win 2", "desc": "Another specific actionable win based on their scores"}
  ]
}`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.8,
            maxOutputTokens: 1200,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMessage = errorData?.error?.message || `API error: ${response.status}`

      // Log errors but use fallback for all API failures
      if (response.status === 429) {
        console.log("[v0] Gemini API rate limited (429), using fallback analysis")
      } else {
        console.log("[v0] Gemini API error:", errorMessage)
      }

      return generateFallbackAnalysis(data)
    }

    const result = await response.json()
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      console.log("[v0] No response text from Gemini, using fallback")
      return generateFallbackAnalysis(data)
    }

    const parsed = JSON.parse(text)
    console.log("[v0] Generated personalized AI analysis for score:", data.scores.total)
    return parsed
  } catch (error: any) {
    console.log("[v0] AI analysis error, using fallback:", error.message)
    return generateFallbackAnalysis(data)
  }
}

function getAssessmentLevel(score: number): string {
  if (score < 33) return "Reactive"
  if (score < 66) return "Emerging"
  return "Scalable"
}

function generateFallbackAnalysis(data: any) {
  const scores = data.scores
  const level = getAssessmentLevel(scores.total)
  const sectionScores = [
    { name: "GTM Foundations", score: scores.foundations, max: 12 },
    { name: "Data Model", score: scores.datamodel, max: 16 },
    { name: "Systems Stack", score: scores.stack, max: 12 },
    { name: "Lead Lifecycle", score: scores.lifecycle, max: 16 },
    { name: "Pipeline", score: scores.pipeline, max: 12 },
    { name: "Campaigns", score: scores.campaigns, max: 10 },
    { name: "Reporting", score: scores.reporting, max: 10 },
    { name: "Governance", score: scores.governance, max: 10 },
  ]

  const sortedByScore = [...sectionScores].sort((a, b) => b.score - a.score)
  const weakest = sortedByScore[sortedByScore.length - 1]
  const strongest = sortedByScore[0]

  return {
    summary: `${data.leadData.company} is at a ${level} stage of RevOps maturity with a score of ${scores.total}/98. Your strongest area is ${strongest.name} (${strongest.score}/${strongest.max}), but ${weakest.name} (${weakest.score}/${weakest.max}) requires immediate attention to improve revenue operations efficiency.`,
    risks: [
      {
        title: `${weakest.name} Gaps - Your Biggest Challenge`,
        desc: `With a ${weakest.name} score of only ${weakest.score}/${weakest.max}, this is creating friction in your RevOps process. This directly impacts your ability to execute efficiently and measure success accurately.`,
      },
      {
        title: "Process Documentation & Standardization",
        desc: `At a ${level} maturity level, processes likely lack standardization. This leads to inconsistent execution, longer ramp times for new team members, and difficulty scaling revenue operations.`,
      },
    ],
    wins: [
      {
        title: `Leverage Your ${strongest.name} Strength`,
        desc: `Your ${strongest.name} score of ${strongest.score}/${strongest.max} is a competitive advantage. This week, document how this strength is driving results and share best practices with your team.`,
      },
      {
        title: `Create a 30-Day ${weakest.name} Improvement Plan`,
        desc: `Schedule a call with our team to develop a targeted plan for improving ${weakest.name}. Quick wins here can move your needle significantly.`,
      },
    ],
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const aiAnalysis = await generateAIAnalysis(data)

    const assessmentLevel = getAssessmentLevel(data.scores.total)

    if (data.leadData.email) {
      try {
        await sendResultsEmail({
          email: data.leadData.email,
          name: data.leadData.name,
          company: data.leadData.company,
          totalScore: data.scores.total,
          assessmentLevel: assessmentLevel,
          summary: aiAnalysis.summary,
          risks: aiAnalysis.risks,
          wins: aiAnalysis.wins,
          scores: data.scores,
        })
      } catch (emailError: any) {
        console.warn("[v0] Email sending failed (will not affect form submission):", emailError.message)
        // Don't fail the form submission if email fails
      }
    }

    // If Google Sheets webhook URL is configured, send data to Google Sheets
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        const sheetPayload = {
          timestamp: new Date().toISOString(),
          name: data.leadData.name,
          title: data.leadData.title,
          email: data.leadData.email,
          phone: data.leadData.phone,
          company: data.leadData.company,
          category: data.leadData.category,
          size: data.leadData.size,
          state: data.leadData.state,
          zip: data.leadData.zip,
          totalScore: data.scores.total,
          assessmentLevel: assessmentLevel,
          foundationsScore: data.scores.foundations,
          datamodelScore: data.scores.datamodel,
          stackScore: data.scores.stack,
          lifecycleScore: data.scores.lifecycle,
          pipelineScore: data.scores.pipeline,
          campaignsScore: data.scores.campaigns,
          reportingScore: data.scores.reporting,
          governanceScore: data.scores.governance,
          responses: JSON.stringify(data.responses),
          aiSummary: aiAnalysis.summary,
          aiRisks: JSON.stringify(aiAnalysis.risks),
          aiWins: JSON.stringify(aiAnalysis.wins),
          ipAddress: request.headers.get("x-forwarded-for") || "unknown",
          userAgent: request.headers.get("user-agent") || "unknown",
        }

        await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sheetPayload),
        })
      } catch (error) {
        console.error("Google Sheets submission error:", error)
        // Don't fail the API call if Google Sheets fails
      }
    }

    return NextResponse.json({
      success: true,
      analysis: aiAnalysis,
    })
  } catch (error: any) {
    console.error("Submission error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
