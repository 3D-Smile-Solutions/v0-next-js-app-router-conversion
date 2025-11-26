import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendResultsEmail(params: {
  email: string
  name: string
  company: string
  totalScore: number
  assessmentLevel: string
  summary: string
  risks: any[]
  wins: any[]
  scores: any
}) {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
      <div style="background: linear-gradient(135deg, #029482 0%, #0A252F 100%); padding: 30px; border-radius: 8px 8px 0 0; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Your RevOps Assessment Results</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">${params.company}</p>
      </div>

      <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="font-size: 48px; font-weight: bold; color: #029482; margin-bottom: 10px;">${params.totalScore}</div>
          <div style="font-size: 18px; color: #666; margin-bottom: 5px;">Assessment Score</div>
          <div style="font-size: 16px; color: #029482; font-weight: 600;">${params.assessmentLevel} Maturity Level</div>
        </div>

        <div style="background-color: #f0fffe; padding: 20px; border-radius: 8px; border-left: 4px solid #029482; margin-bottom: 25px;">
          <h2 style="margin: 0 0 10px 0; font-size: 18px; color: #0A252F;">Summary</h2>
          <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;">${params.summary}</p>
        </div>

        <div style="margin-bottom: 25px;">
          <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #0A252F;">Section Scores</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div style="background: #f9fafb; padding: 12px; border-radius: 6px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">GTM Foundations</div>
              <div style="font-size: 20px; font-weight: bold; color: #029482;">${params.scores.foundations}/12</div>
            </div>
            <div style="background: #f9fafb; padding: 12px; border-radius: 6px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Data Model</div>
              <div style="font-size: 20px; font-weight: bold; color: #029482;">${params.scores.datamodel}/16</div>
            </div>
            <div style="background: #f9fafb; padding: 12px; border-radius: 6px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Systems Stack</div>
              <div style="font-size: 20px; font-weight: bold; color: #029482;">${params.scores.stack}/12</div>
            </div>
            <div style="background: #f9fafb; padding: 12px; border-radius: 6px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Lead Lifecycle</div>
              <div style="font-size: 20px; font-weight: bold; color: #029482;">${params.scores.lifecycle}/16</div>
            </div>
            <div style="background: #f9fafb; padding: 12px; border-radius: 6px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Pipeline</div>
              <div style="font-size: 20px; font-weight: bold; color: #029482;">${params.scores.pipeline}/12</div>
            </div>
            <div style="background: #f9fafb; padding: 12px; border-radius: 6px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Campaigns</div>
              <div style="font-size: 20px; font-weight: bold; color: #029482;">${params.scores.campaigns}/10</div>
            </div>
            <div style="background: #f9fafb; padding: 12px; border-radius: 6px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Reporting</div>
              <div style="font-size: 20px; font-weight: bold; color: #029482;">${params.scores.reporting}/10</div>
            </div>
            <div style="background: #f9fafb; padding: 12px; border-radius: 6px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Governance</div>
              <div style="font-size: 20px; font-weight: bold; color: #029482;">${params.scores.governance}/10</div>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 25px;">
          <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #0A252F;">Key Risks</h3>
          ${params.risks
            .map(
              (risk) =>
                `<div style="background: #fff5f5; padding: 15px; border-left: 4px solid #dc2626; border-radius: 4px; margin-bottom: 10px;">
                  <div style="font-weight: 600; color: #dc2626; margin-bottom: 5px;">${risk.title}</div>
                  <div style="font-size: 14px; color: #666; line-height: 1.5;">${risk.desc}</div>
                </div>`,
            )
            .join("")}
        </div>

        <div style="margin-bottom: 25px;">
          <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #0A252F;">Quick Wins</h3>
          ${params.wins
            .map(
              (win) =>
                `<div style="background: #f0fdf4; padding: 15px; border-left: 4px solid #16a34a; border-radius: 4px; margin-bottom: 10px;">
                  <div style="font-weight: 600; color: #16a34a; margin-bottom: 5px;">${win.title}</div>
                  <div style="font-size: 14px; color: #666; line-height: 1.5;">${win.desc}</div>
                </div>`,
            )
            .join("")}
        </div>

        <a href="https://cal.com/3dsmilesolutions/3dss-discovery" style="display: inline-block; background-color: #029482; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px; margin-top: 10px;">
          Book a Discovery Call
        </a>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 12px; color: #999;">This assessment was completed by ${params.name}</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #999;">© 2025 3D Smile Solutions. All rights reserved.</p>
        </div>
      </div>
    </div>
  `

  try {
    const response = await resend.emails.send({
      from: "3D Smile Solutions <han@3dsmilesolutions.ai>",
      to: params.email,
      subject: `Your RevOps Assessment Results - Score: ${params.totalScore}/98`,
      html,
    })

    console.log("[v0] Email sent successfully:", {
      id: response.data?.id,
      email: params.email,
      status: response.error ? "failed" : "success",
    })

    if (response.error) {
      throw new Error(`Resend error: ${response.error.message}`)
    }

    return response
  } catch (error: any) {
    console.log("[v0] Email sending failed:", error.message)
    throw error
  }
}
