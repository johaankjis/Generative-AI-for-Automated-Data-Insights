"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertTriangle, TrendingUp, TrendingDown, Search } from "lucide-react"
import { detectAnomalies } from "@/app/actions/detect-anomalies"

interface Anomaly {
  metric: string
  value: number
  expected: number
  deviation: number
  severity: "high" | "medium" | "low"
  explanation: string
}

export function AnomalyDetectionInterface() {
  const [metricName, setMetricName] = useState("")
  const [dataPoints, setDataPoints] = useState("")
  const [context, setContext] = useState("")
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleDetect = async () => {
    if (!metricName.trim() || !dataPoints.trim()) return

    setIsLoading(true)
    try {
      const result = await detectAnomalies(metricName, dataPoints, context)
      setAnomalies(result)
    } catch (error) {
      console.error("[v0] Error detecting anomalies:", error)
      setAnomalies([])
    } finally {
      setIsLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
      case "low":
        return "bg-blue-500/20 text-blue-500 border-blue-500/50"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Input</CardTitle>
          <CardDescription>Provide your metric data for anomaly detection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metric-name">Metric Name</Label>
            <Input
              id="metric-name"
              placeholder="e.g., Daily Active Users, Revenue, API Response Time"
              value={metricName}
              onChange={(e) => setMetricName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="data-points">Data Points</Label>
            <Textarea
              id="data-points"
              placeholder="Enter your time series data (comma-separated or one per line):&#10;100, 105, 102, 98, 103, 45, 101, 99&#10;&#10;Or with dates:&#10;2024-01-01: 100&#10;2024-01-02: 105&#10;2024-01-03: 102"
              value={dataPoints}
              onChange={(e) => setDataPoints(e.target.value)}
              rows={6}
              className="resize-none font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="context">Additional Context (Optional)</Label>
            <Textarea
              id="context"
              placeholder="Provide any relevant context: recent changes, known events, seasonal patterns, etc."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <Button
            onClick={handleDetect}
            disabled={isLoading || !metricName.trim() || !dataPoints.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Data...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Detect Anomalies
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {anomalies.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Detected Anomalies</h2>
            <Badge variant="outline" className="text-sm">
              {anomalies.length} {anomalies.length === 1 ? "anomaly" : "anomalies"} found
            </Badge>
          </div>

          <div className="grid gap-4">
            {anomalies.map((anomaly, index) => (
              <Card
                key={index}
                className="border-l-4"
                style={{
                  borderLeftColor:
                    anomaly.severity === "high"
                      ? "hsl(var(--destructive))"
                      : anomaly.severity === "medium"
                        ? "#eab308"
                        : "#3b82f6",
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        {anomaly.metric}
                      </CardTitle>
                      <CardDescription>Anomaly detected in data point</CardDescription>
                    </div>
                    <Badge className={getSeverityColor(anomaly.severity)}>{anomaly.severity.toUpperCase()}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Actual Value</p>
                      <p className="text-2xl font-bold flex items-center gap-2">
                        {anomaly.value}
                        {anomaly.deviation < 0 ? (
                          <TrendingDown className="h-5 w-5 text-destructive" />
                        ) : (
                          <TrendingUp className="h-5 w-5 text-primary" />
                        )}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Expected Value</p>
                      <p className="text-2xl font-bold">{anomaly.expected}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Deviation</p>
                      <p className="text-2xl font-bold">
                        {anomaly.deviation > 0 ? "+" : ""}
                        {anomaly.deviation}%
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Root Cause Analysis</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{anomaly.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
