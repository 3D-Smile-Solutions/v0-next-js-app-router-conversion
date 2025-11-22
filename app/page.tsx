"use client"

import { useState, useMemo } from "react"
import { SECTIONS } from "@/lib/sections"
import { calculateScores } from "@/lib/scoring"
import { AssessmentQuestion } from "@/components/AssessmentQuestion"
import { SectionCard } from "@/components/SectionCard"
import { LeadForm } from "@/components/LeadForm"
import { ResultsPage } from "@/components/ResultsPage"
import type { AIAnalysis, LeadData } from "@/types"
import { ChevronRight, ChevronLeft } from "lucide-react"

export default function Page() {
  const [activeSection, setActiveSection] = useState(0)
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null)
  const [isAiLoading, setIsAiLoading] = useState(false)

  const scores = useMemo(() => calculateScores(responses), [responses])
  const currentSection = SECTIONS[activeSection]

  const isSectionComplete = useMemo(() => {
    return currentSection.questions.every((q) => responses[q.id] !== undefined)
  }, [currentSection, responses])

  const isAllComplete = useMemo(() => {
    return SECTIONS.every((section) => section.questions.every((q) => responses[q.id] !== undefined))
  }, [responses])

  const handleQuestionChange = (questionId: string, value: number) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleLeadSubmit = async (leadData: LeadData) => {
    setIsSubmittingLead(true)
    setIsAiLoading(true)

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadData,
          scores,
          responses,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setAiAnalysis(data.analysis)
      } else {
        alert("Failed to submit. Please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmittingLead(false)
      setIsAiLoading(false)
    }
  }

  if (aiAnalysis) {
    return (
      <ResultsPage
        scores={scores}
        aiAnalysis={aiAnalysis}
        onStartOver={() => {
          setResponses({})
          setActiveSection(0)
          setShowLeadForm(false)
          setAiAnalysis(null)
        }}
      />
    )
  }

  if (showLeadForm) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setShowLeadForm(false)}
            className="mb-6 text-[#029482] hover:underline flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Back to Assessment
          </button>
          <LeadForm onSubmit={handleLeadSubmit} isLoading={isSubmittingLead || isAiLoading} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Revenue Operations Maturity Assessment</h1>
          <p className="text-gray-600">Evaluate your RevOps capabilities across 8 key areas</p>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-gray-900">
                {Object.keys(responses).length}/49 questions answered
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#029482] h-2 rounded-full transition-all"
                style={{
                  width: `${(Object.keys(responses).length / 49) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Sections */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-2">
              {SECTIONS.map((section, idx) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  isActive={activeSection === idx}
                  isCompleted={section.questions.every((q) => responses[q.id] !== undefined)}
                  score={scores[section.id]}
                  onClick={() => setActiveSection(idx)}
                />
              ))}
            </div>
          </div>

          {/* Main Assessment Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {/* Section Title */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentSection.title}</h2>
                <p className="text-gray-600">{currentSection.focus}</p>
              </div>

              {/* Questions */}
              <div className="mb-8">
                {currentSection.questions.map((question) => (
                  <AssessmentQuestion
                    key={question.id}
                    question={question}
                    response={responses[question.id]}
                    onChange={handleQuestionChange}
                  />
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                <button
                  onClick={() => setActiveSection((prev) => Math.max(0, prev - 1))}
                  disabled={activeSection === 0}
                  className="flex items-center gap-2 px-6 py-2 text-gray-700 disabled:opacity-50 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                {activeSection === SECTIONS.length - 1 ? (
                  <button
                    onClick={() => setShowLeadForm(true)}
                    disabled={!isAllComplete}
                    className="px-8 py-2 bg-[#029482] text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
                  >
                    Review & Submit
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveSection((prev) => Math.min(SECTIONS.length - 1, prev + 1))}
                    disabled={!isSectionComplete}
                    className="flex items-center gap-2 px-6 py-2 bg-[#029482] text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
