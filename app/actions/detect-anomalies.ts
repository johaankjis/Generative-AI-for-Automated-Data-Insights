"use server"

import { generateText } from "ai"

interface Anomaly {
  metric: string
  value: number
  expected: number
  deviation: number
  severity: "high" | "medium" | "low"
  explanation: string
}

export async function detectAnomalies(metricName: string, dataPoints: string, context: string): Promise<Anomaly[]> {
  const systemPrompt = `You are an expert data analyst specializing in anomaly detection and root cause analysis.

Analyze the provided time series data and identify anomalies (outliers, unusual patterns, or significant deviations).

For each anomaly detected, provide:
1. The anomalous value
2. The expected value (based on the pattern)
3. The percentage deviation
4. Severity level (high: >50% deviation, medium: 20-50%, low: <20%)
5. A detailed explanation of the potential root cause

Return your response as a JSON array of anomalies. If no significant anomalies are found, return an empty array.

Example format:
[
  {
    "metric": "Daily Active Users",
    "value": 45,
    "expected": 100,
    "deviation": -55,
    "severity": "high",
    "explanation": "Significant drop of 55% below expected value. This could indicate a system outage, major bug, or external event affecting user access. Recommend immediate investigation of server logs and user feedback."
  }
]`

  try {
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Metric: ${metricName}\n\nData Points:\n${dataPoints}\n\n${context ? `Additional Context:\n${context}` : ""}\n\nAnalyze this data and identify any anomalies.`,
        },
      ],
      temperature: 0.3,
    })

    // Parse the JSON response
    const cleanedText = text
      .trim()
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
    const anomalies: Anomaly[] = JSON.parse(cleanedText)

    return anomalies
  } catch (error) {
    console.error("[v0] Error in detectAnomalies:", error)
    throw new Error("Failed to detect anomalies")
  }
}
