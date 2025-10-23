"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Copy, Check, Sparkles } from "lucide-react"
import { generateQuery } from "@/app/actions/generate-query"

export function QueryGeneratorForm() {
  const [prompt, setPrompt] = useState("")
  const [queryType, setQueryType] = useState<"sql" | "python">("sql")
  const [generatedCode, setGeneratedCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    try {
      const result = await generateQuery(prompt, queryType)
      setGeneratedCode(result)
    } catch (error) {
      console.error("[v0] Error generating query:", error)
      setGeneratedCode("Error generating query. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>Describe what you want to query or analyze</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="query-type">Query Type</Label>
            <Select value={queryType} onValueChange={(value) => setQueryType(value as "sql" | "python")}>
              <SelectTrigger id="query-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sql">SQL Query</SelectItem>
                <SelectItem value="python">Python Script</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Natural Language Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Example: Get all users who signed up in the last 30 days and made at least one purchase"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={8}
              className="resize-none"
            />
          </div>

          <Button onClick={handleGenerate} disabled={isLoading || !prompt.trim()} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate {queryType === "sql" ? "SQL" : "Python"}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Generated Code</CardTitle>
              <CardDescription>AI-generated {queryType === "sql" ? "SQL query" : "Python script"}</CardDescription>
            </div>
            {generatedCode && (
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {generatedCode ? (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{generatedCode}</code>
            </pre>
          ) : (
            <div className="bg-muted/50 p-8 rounded-lg text-center text-muted-foreground">
              <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Your generated code will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
