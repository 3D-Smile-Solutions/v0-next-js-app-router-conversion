import { type NextRequest, NextResponse } from "next/server"

async function generateAIAnalysis(data: any) {
  if (!process.env.GEMINI_API_KEY) {
    return {
      summary:
        "Thank you for completing the assessment! Your data has been saved successfully. Configure GEMINI_API_KEY in your environment variables to receive AI-powered insights.",
      risks: [
        { title: "Configure AI Analysis", desc: "Add your Gemini API key to enable detailed AI-generated insights." },
        { title: "Enhanced Reporting", desc: "With AI enabled, you'll receive personalized recommendations." },
      ],
      wins: [
        { title: "Assessment Complete", desc: "Your assessment data is being saved and analyzed." },
        { title: "Next Steps", desc: "Share this report with your RevOps team for alignment discussions." },
      ],
    }
  }

  const prompt = `You are a Revenue Operations Expert analyzing assessment results for ${data.leadData.company} (Size: ${data.leadData.size}, Category: ${data.leadData.category}).

Overall Score: ${data.scores.total}/98

Section Scores:
- GTM Foundations: ${data.scores.foundations}/12
- Data Model: ${data.scores.datamodel}/16
- Systems Stack: ${data.scores.stack}/12
- Lead Lifecycle: ${data.scores.lifecycle}/16
- Pipeline: ${data.scores.pipeline}/12
- Campaigns: ${data.scores.campaigns}/10
- Reporting: ${data.scores.reporting}/10
- Governance: ${data.scores.governance}/10

Return ONLY valid JSON with this exact structure, no markdown or code blocks:
{
  "summary": "2-3 sentences highlighting their biggest strength and critical gap",
  "risks": [
    {"title": "Specific Risk 1", "desc": "Concrete business impact description"},
    {"title": "Specific Risk 2", "desc": "Concrete business impact description"}
  ],
  "wins": [
    {"title": "Actionable Win 1", "desc": "Specific step they can take this week"},
    {"title": "Actionable Win 2", "desc": "Specific step they can take this week"}
  ]
}`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      },
    )

    if (!response.ok) {
      throw new Error("Gemini API request failed")
    }

    const result = await response.json()
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      throw new Error("No response from Gemini")
    }

    return JSON.parse(text)
  } catch (error) {
    console.error("AI analysis error:", error)
    return {
      summary:
        "Your assessment has been submitted successfully. Our team will review your responses and provide detailed recommendations.",
      risks: [
        { title: "Data Model Review", desc: "Consider auditing your CRM data structure for consistency and accuracy." },
        { title: "Process Documentation", desc: "Document current RevOps processes to identify improvement areas." },
      ],
      wins: [
        { title: "Assessment Complete", desc: "You've successfully assessed your RevOps maturity." },
        { title: "Next Review", desc: "Schedule a follow-up assessment in 3-6 months to track progress." },
      ],
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Generate AI analysis
    const aiAnalysis = await generateAIAnalysis(data)

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
