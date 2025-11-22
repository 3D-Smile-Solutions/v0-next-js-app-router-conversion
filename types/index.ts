import type React from "react"
export interface Question {
  id: string
  title: string
  text: string
}

export interface Section {
  id: string
  title: string
  focus: string
  icon: React.ReactNode
  questions: Question[]
}

export interface Scores {
  [key: string]: number
  total: number
}

export interface LeadData {
  name: string
  title: string
  email: string
  phone: string
  company: string
  category: string
  size: string
  state: string
  zip: string
}

export interface AIAnalysis {
  summary: string
  risks: Array<{ title: string; desc: string }>
  wins: Array<{ title: string; desc: string }>
}

export interface SubmissionPayload {
  leadData: LeadData
  scores: Scores
  responses: Record<string, number>
}
