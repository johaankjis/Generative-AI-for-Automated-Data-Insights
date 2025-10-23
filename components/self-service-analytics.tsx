"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, Send, BarChart3, TrendingUp, Users, DollarSign } from "lucide-react"
import { analyzeQuery } from "@/app/actions/analyze-query"

interface AnalysisResult {
  question: string
  answer: string
  insights: string[]
  visualizationType?: string
  confidence: number
}

const SAMPLE_QUESTIONS = [
  "What was our revenue growth last quarter?",
  "How many new users signed up this month?",
  "What's the average customer lifetime value?",
  "Which product has the highest conversion rate?",
]

export function SelfServiceAnalytics() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<AnalysisResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalyze = async (question?: string) => {
    const queryToAnalyze = question || query
    if (!queryToAnalyze.trim()) return

    setIsLoading(true)
    try {
      const result = await analyzeQuery(queryToAnalyze)
      setResults([result, ...results])
      setQuery("")
    } catch (error) {
      console.error("[v0] Error analyzing query:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleAnalyze()
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-green-500/20 text-green-500 border-green-500/50"
    if (confidence >= 60) return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
    return "bg-red-500/20 text-red-500 border-red-500/50"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
          <CardDescription>Type your question in natural language to get instant insights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="e.g., What's our customer churn rate this month?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={() => handleAnalyze()} disabled={isLoading || !query.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Try these sample questions:</p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_QUESTIONS.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAnalyze(question)}
                  disabled={isLoading}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Analysis Results</h2>

          {results.map((result, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      {result.question}
                    </CardTitle>
                  </div>
                  <Badge className={getConfidenceColor(result.confidence)}>{result.confidence}% confidence</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                  <p className="text-lg font-semibold leading-relaxed">{result.answer}</p>
                </div>

                {result.insights.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Key Insights
                    </h4>
                    <ul className="space-y-2">
                      {result.insights.map((insight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span className="leading-relaxed">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.visualizationType && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BarChart3 className="h-4 w-4" />
                    <span>Recommended visualization: {result.visualizationType}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {results.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-4 mb-6">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold">No queries yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Start by asking a question about your data. Our AI will analyze it and provide instant insights without
                requiring any coding knowledge.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
