"use client"

import type { Scores, AIAnalysis } from "@/types"
import { RadarChartComponent } from "./RadarChartComponent"
import { getAssessmentLevel } from "@/lib/scoring"
import { SECTIONS } from "@/lib/sections"
import { Download, RotateCcw } from "lucide-react"

interface ResultsPageProps {
  scores: Scores
  aiAnalysis: AIAnalysis
  onStartOver: () => void
}

export function ResultsPage({ scores, aiAnalysis, onStartOver }: ResultsPageProps) {
  const level = getAssessmentLevel(scores.total)
  const maxPoints = [12, 16, 12, 16, 12, 10, 10, 10]

  const handlePrint = () => {
    window.print()
  }

  return (
    <div id="printable-area" className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 no-print">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Assessment Complete</h1>
          <p className="text-gray-600">Your Revenue Operations Maturity Analysis</p>
        </div>

        {/* Score Summary */}
        <div className="p-8 rounded-lg mb-8 text-white" style={{ backgroundColor: level.color }}>
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">{scores.total}</div>
            <div className="text-xl opacity-90">out of {98} points</div>
            <div className="mt-4 text-2xl font-semibold">{level.label}</div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{aiAnalysis.summary}</p>
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Risks */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Critical Risks</h3>
            <div className="space-y-4">
              {aiAnalysis.risks.map((risk, idx) => (
                <div key={idx} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">{risk.title}</h4>
                  <p className="text-gray-600 text-sm">{risk.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Wins */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Actionable Quick Wins</h3>
            <div className="space-y-4">
              {aiAnalysis.wins.map((win, idx) => (
                <div key={idx} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">{win.title}</h4>
                  <p className="text-gray-600 text-sm">{win.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Section Breakdown</h3>
          <RadarChartComponent scores={scores} />
        </div>

        {/* Section Scores */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Section Scores</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {SECTIONS.map((section, idx) => (
              <div key={section.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{section.title}</h4>
                  <span className="text-lg font-bold text-[#029482]">
                    {scores[section.id]}/{maxPoints[idx]}
                  </span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div
                    className="bg-[#029482] h-2 rounded-full"
                    style={{
                      width: `${(scores[section.id] / maxPoints[idx]) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center no-print">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#029482] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            <Download size={20} />
            Download PDF Report
          </button>
          <button
            onClick={onStartOver}
            className="flex items-center gap-2 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
          >
            <RotateCcw size={20} />
            Start Over
          </button>
        </div>
      </div>
    </div>
  )
}
