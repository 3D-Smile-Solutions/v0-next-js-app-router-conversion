"use client"

import type { Section } from "@/types"
import { CheckCircle2 } from "lucide-react"

interface SectionCardProps {
  section: Section
  isActive: boolean
  isCompleted: boolean
  score?: number
  onClick: () => void
}

export function SectionCard({ section, isActive, isCompleted, score, onClick }: SectionCardProps) {
  const Icon = section.icon

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg text-left transition-all ${
        isActive
          ? "bg-[#029482] text-white shadow-lg"
          : isCompleted
            ? "bg-gray-100 border-2 border-green-500"
            : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon size={20} />
            <h3 className="font-semibold">{section.title}</h3>
          </div>
          <p className={`text-sm ${isActive ? "text-blue-100" : "text-gray-600"}`}>{section.focus}</p>
        </div>
        {isCompleted && <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />}
      </div>
      {score !== undefined && (
        <div className={`mt-3 text-sm font-semibold ${isActive ? "text-blue-100" : "text-gray-700"}`}>
          Score: {score}/{section.questions.length * 2}
        </div>
      )}
    </button>
  )
}
