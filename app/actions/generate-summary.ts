"use server"

import { generateText } from "ai"

export async function generateSummary(
  reportTitle: string,
  dataInput: string,
  summaryType: "executive" | "technical" | "stakeholder",
): Promise<string> {
  const systemPrompts = {
    executive: `You are an expert business analyst creating executive summaries.
Generate a concise, high-level summary suitable for C-level executives.
Focus on key insights, business impact, and strategic recommendations.
Use clear, professional language and structure the summary with:
1. Executive Overview
2. Key Findings
3. Business Impact
4. Recommendations
Keep it concise (300-500 words) and actionable.`,
    technical: `You are a senior data analyst creating technical reports.
Generate a detailed technical summary with data-driven insights.
Include methodology, detailed metrics, and technical analysis.
Structure the report with:
1. Overview
2. Methodology
3. Detailed Findings
4. Technical Insights
5. Conclusions
Be thorough and include relevant technical details.`,
    stakeholder: `You are a communications specialist creating stakeholder briefs.
Generate a clear, accessible summary for non-technical stakeholders.
Focus on outcomes, impact, and next steps in plain language.
Structure the brief with:
1. Summary
2. What This Means
3. Key Takeaways
4. Next Steps
Keep it clear, concise, and easy to understand.`,
  }

  try {
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompts[summaryType],
        },
        {
          role: "user",
          content: `Report Title: ${reportTitle}\n\nData and Metrics:\n${dataInput}\n\nGenerate a comprehensive ${summaryType} summary based on this information.`,
        },
      ],
      temperature: 0.5,
    })

    return text.trim()
  } catch (error) {
    console.error("[] Error in generateSummary:", error)
    throw new Error("Failed to generate summary")
  }
}
