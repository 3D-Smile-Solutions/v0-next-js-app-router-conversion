"use client"

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts"
import type { Scores } from "@/types"
import { SECTIONS } from "@/lib/sections"

interface RadarChartComponentProps {
  scores: Scores
}

export function RadarChartComponent({ scores }: RadarChartComponentProps) {
  const maxPoints = [12, 16, 12, 16, 12, 10, 10, 10]

  const benchmarkData = SECTIONS.map((section, idx) => ({
    subject: section.title.split(".")[1].trim().split(" ")[0],
    A: Math.round((scores[section.id] / maxPoints[idx]) * 100),
    fullMark: 100,
  }))

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={benchmarkData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Your Score" dataKey="A" stroke="#029482" fill="#029482" fillOpacity={0.5} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
