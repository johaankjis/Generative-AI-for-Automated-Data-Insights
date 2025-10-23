"use server"

import { generateText } from "ai"

export async function generateQuery(prompt: string, queryType: "sql" | "python"): Promise<string> {
  const systemPrompt =
    queryType === "sql"
      ? `You are an expert SQL developer. Generate clean, efficient SQL queries based on user requirements.
Return ONLY the SQL query without any explanations or markdown formatting.
Assume standard table structures and use best practices for query optimization.`
      : `You are an expert Python developer specializing in data analysis.
Generate clean, efficient Python scripts for data processing and analysis.
Return ONLY the Python code without any explanations or markdown formatting.
Use popular libraries like pandas, numpy when appropriate.`

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
          content: prompt,
        },
      ],
      temperature: 0.3,
    })

    // Clean up any markdown code blocks that might have been included
    let cleanedText = text.trim()
    cleanedText = cleanedText.replace(/```sql\n?/g, "")
    cleanedText = cleanedText.replace(/```python\n?/g, "")
    cleanedText = cleanedText.replace(/```\n?/g, "")

    return cleanedText
  } catch (error) {
    console.error("[v0] Error in generateQuery:", error)
    throw new Error("Failed to generate query")
  }
}
