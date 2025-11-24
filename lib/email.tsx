import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendResultsEmail({
  email,
  name,
  company,
  totalScore,
  assessmentLevel,
  summary,
  risks,
  wins,
  scores,
}: {
  email: string
  name: string
  company: string
  totalScore: number
  assessmentLevel: string
  summary: string
  risks: Array<{ title: string; desc: string }>
  wins: Array<{ title: string; desc: string }>
  scores: any
}) {
  const baseUrl = "https://cal.com/3dsmilesolutions/3dss-discovery"

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #029482 0%, #0A252F 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .score-box { background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #029482; }
          .score-box h3 { margin-top: 0; color: #0A252F; }
          .section-scores { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0; }
          .section-score { background: #f0f9f7; padding: 10px; border-radius: 4px; font-size: 14px; }
          .section-score strong { color: #029482; }
          .summary { background: white; padding: 15px; border-radius: 6px; margin: 20px 0; }
          .risks, .wins { margin: 20px 0; }
          .risk-item, .win-item { background: white; padding: 15px; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid #d32f2f; }
          .win-item { border-left-color: #029482; }
          .risk-item h4, .win-item h4 { margin: 0 0 8px 0; color: #0A252F; }
          .risk-item p, .win-item p { margin: 0; font-size: 14px; color: #666; }
          .cta-button { 
            display: inline-block; 
            background: #029482; 
            color: white; 
            padding: 14px 30px; 
            border-radius: 6px; 
            text-decoration: none; 
            margin: 20px 0; 
            font-weight: 600;
            text-align: center;
          }
          .cta-button:hover { background: #0A252F; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>RevOps Assessment Results</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px;">Your Personalized Analysis is Ready</p>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for completing the RevOps Assessment for ${company}. Here are your personalized results.</p>
            
            <div class="score-box">
              <h3>Overall Score: ${totalScore}/98</h3>
              <p><strong>Assessment Level:</strong> ${assessmentLevel}</p>
              <div class="section-scores">
                <div class="section-score"><strong>GTM:</strong> ${scores.foundations}/12</div>
                <div class="section-score"><strong>Data:</strong> ${scores.datamodel}/16</div>
                <div class="section-score"><strong>Systems:</strong> ${scores.stack}/12</div>
                <div class="section-score"><strong>Lifecycle:</strong> ${scores.lifecycle}/16</div>
                <div class="section-score"><strong>Pipeline:</strong> ${scores.pipeline}/12</div>
                <div class="section-score"><strong>Campaigns:</strong> ${scores.campaigns}/10</div>
                <div class="section-score"><strong>Reporting:</strong> ${scores.reporting}/10</div>
                <div class="section-score"><strong>Governance:</strong> ${scores.governance}/10</div>
              </div>
            </div>
            
            <div class="summary">
              <h3 style="color: #0A252F; margin-top: 0;">Executive Summary</h3>
              <p>${summary}</p>
            </div>
            
            <div class="risks">
              <h3 style="color: #0A252F;">Key Risks</h3>
              ${risks
                .map(
                  (risk) => `
                <div class="risk-item">
                  <h4>${risk.title}</h4>
                  <p>${risk.desc}</p>
                </div>
              `,
                )
                .join("")}
            </div>
            
            <div class="wins">
              <h3 style="color: #0A252F;">Quick Wins</h3>
              ${wins
                .map(
                  (win) => `
                <div class="win-item">
                  <h4>${win.title}</h4>
                  <p>${win.desc}</p>
                </div>
              `,
                )
                .join("")}
            </div>
            
            <div style="text-align: center;">
              <a href="${baseUrl}" class="cta-button">Book a Discovery Call</a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">Next Step: Schedule a call with our RevOps experts to develop a customized improvement plan based on your assessment results.</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 3D Smile Solutions. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `

  try {
    const response = await resend.emails.send({
      from: "3D Smile Solutions <onboarding@resend.dev>",
      to: email,
      subject: `Your RevOps Assessment Results - Score: ${totalScore}/98 (${assessmentLevel})`,
      html: htmlContent,
    })

    console.log("[v0] Email sent successfully:", response)
    return response
  } catch (error) {
    console.error("[v0] Email sending failed:", error)
    throw error
  }
}
