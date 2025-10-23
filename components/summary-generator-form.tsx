"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, FileText, Download } from "lucide-react"
import { generateSummary } from "@/app/actions/generate-summary"

export function SummaryGeneratorForm() {
  const [reportTitle, setReportTitle] = useState("")
  const [dataInput, setDataInput] = useState("")
  const [summaryType, setSummaryType] = useState<"executive" | "technical" | "stakeholder">("executive")
  const [generatedSummary, setGeneratedSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!dataInput.trim() || !reportTitle.trim()) return

    setIsLoading(true)
    try {
      const result = await generateSummary(reportTitle, dataInput, summaryType)
      setGeneratedSummary(result)
    } catch (error) {
      console.error("[v0] Error generating summary:", error)
      setGeneratedSummary("Error generating summary. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([generatedSummary], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${reportTitle.replace(/\s+/g, "_")}_summary.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>Configure your executive summary parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="report-title">Report Title</Label>
              <Input
                id="report-title"
                placeholder="Q4 2024 Performance Review"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary-type">Summary Type</Label>
              <Select
                value={summaryType}
                onValueChange={(value) => setSummaryType(value as "executive" | "technical" | "stakeholder")}
              >
                <SelectTrigger id="summary-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="executive">Executive Summary</SelectItem>
                  <SelectItem value="technical">Technical Report</SelectItem>
                  <SelectItem value="stakeholder">Stakeholder Brief</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="data-input">Data & Metrics</Label>
            <Textarea
              id="data-input"
              placeholder="Paste your data, metrics, or key findings here. Example:&#10;- Revenue: $2.5M (up 15% YoY)&#10;- Customer acquisition: 1,200 new users&#10;- Churn rate: 3.2% (down from 4.1%)&#10;- Top performing product: Enterprise plan"
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              rows={10}
              className="resize-none font-mono text-sm"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isLoading || !dataInput.trim() || !reportTitle.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Summary...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate Summary
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedSummary && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Summary</CardTitle>
                <CardDescription>AI-generated {summaryType} summary</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-6 rounded-lg prose prose-sm max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap">{generatedSummary}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
