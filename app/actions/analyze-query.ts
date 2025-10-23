"use server"

import { generateText } from "ai"

interface AnalysisResult {
  question: string
  answer: string
  insights: string[]
  visualizationType?: string
  confidence: number
}

export async function analyzeQuery(query: string): Promise<AnalysisResult> {
  const systemPrompt = `You are an expert data analyst helping non-technical users understand their data.

When given a question about data or metrics:
1. Provide a clear, direct answer (as if you have access to the data)
2. Generate 3-5 actionable insights related to the question
3. Suggest an appropriate visualization type (bar chart, line chart, pie chart, etc.)
4. Assign a confidence score (0-100) based on how well you can answer the question

Return your response as JSON in this exact format:
{
  "question": "the original question",
  "answer": "a clear, concise answer with specific numbers/percentages",
  "insights": ["insight 1", "insight 2", "insight 3"],
  "visualizationType": "recommended chart type",
  "confidence": 85
}

Make the answer sound natural and data-driven. Use realistic numbers and percentages.`

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
          content: query,
        },
      ],
      temperature: 0.7,
    })

    // Parse the JSON response
    const cleanedText = text
      .trim()
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
    const result: AnalysisResult = JSON.parse(cleanedText)

    return result
  } catch (error) {
    console.error("[v0] Error in analyzeQuery:", error)
    throw new Error("Failed to analyze query")
  }
}
