import { SECTIONS, ASSESSMENT_CONFIG } from "./sections"

export function calculateScores(responses: Record<string, number>) {
  const scores: Record<string, number> = {}
  let total = 0

  SECTIONS.forEach((section) => {
    let sectionScore = 0
    section.questions.forEach((question) => {
      sectionScore += responses[question.id] || 0
    })
    scores[section.id] = sectionScore
    total += sectionScore
  })

  scores.total = total
  return scores
}

export function getAssessmentLevel(totalScore: number) {
  const { scoreThresholds } = ASSESSMENT_CONFIG
  if (totalScore >= scoreThresholds.reactive.min && totalScore <= scoreThresholds.reactive.max) {
    return scoreThresholds.reactive
  } else if (totalScore >= scoreThresholds.emerging.min && totalScore <= scoreThresholds.emerging.max) {
    return scoreThresholds.emerging
  } else {
    return scoreThresholds.scalable
  }
}

export function getBenchmarkData(scores: Record<string, number>) {
  const maxPoints = [12, 16, 12, 16, 12, 10, 10, 10]
  return SECTIONS.map((section, idx) => ({
    subject: section.title.split(".")[1].trim().split(" ")[0],
    A: Math.round((scores[section.id] / maxPoints[idx]) * 100),
    fullMark: 100,
  }))
}
