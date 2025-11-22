"use client"

import type { Question } from "@/types"

interface AssessmentQuestionProps {
  question: Question
  response: number | undefined
  onChange: (questionId: string, value: number) => void
}

export function AssessmentQuestion({ question, response, onChange }: AssessmentQuestionProps) {
  return (
    <div className="mb-8 pb-8 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{question.title}</h3>
      <p className="text-gray-700 mb-6">{question.text}</p>
      <div className="flex gap-3">
        {[0, 1, 2].map((value) => (
          <button
            key={value}
            onClick={() => onChange(question.id, value)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              response === value ? "bg-[#029482] text-white" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            {value === 0 ? "Not True" : value === 1 ? "Somewhat True" : "Fully True"}
          </button>
        ))}
      </div>
    </div>
  )
}
