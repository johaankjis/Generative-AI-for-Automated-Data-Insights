import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Clock, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-border bg-card">
        <Navigation />
      </aside>
      <main className="flex-1 overflow-auto">
        <Header />
        <div className="p-6 space-y-6">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20 p-8">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-balance mb-2">Welcome to AI Data Insights</h2>
              <p className="text-lg text-muted-foreground text-balance mb-6">
                Leverage LLMs to automate SQL/Python generation, anomaly explanations, and executive reporting
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <Link href="/query-generator">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/analytics">Explore Analytics</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Coding Time Saved</CardTitle>
                <Zap className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">35%</div>
                <p className="text-xs text-muted-foreground">Reduction in analyst effort</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Report Preparation</CardTitle>
                <Clock className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">50%</div>
                <p className="text-xs text-muted-foreground">Faster report generation</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Anomaly Investigation</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">40%</div>
                <p className="text-xs text-muted-foreground">Faster root-cause analysis</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
                <Shield className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">80%</div>
                <p className="text-xs text-muted-foreground">Stakeholder adoption rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Automated Query Generation</CardTitle>
                <CardDescription>
                  AI-powered SQL and Python script generation using OpenAI GPT and LangChain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Auto-generated SQL queries
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Python script automation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    35% reduction in coding time
                  </li>
                </ul>
                <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
                  <Link href="/query-generator">Try Query Generator</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Executive Summaries</CardTitle>
                <CardDescription>Prompt-engineered pipeline for stakeholder-ready narratives</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Performance metric summaries
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Consistent narratives
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    50% faster report prep
                  </li>
                </ul>
                <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
                  <Link href="/summaries">Generate Summary</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Anomaly Detection</CardTitle>
                <CardDescription>Automated root-cause explanations using LLM reasoning</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Intelligent anomaly detection
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Root-cause analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    40% faster investigations
                  </li>
                </ul>
                <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
                  <Link href="/anomalies">View Anomalies</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Self-Service Analytics</CardTitle>
                <CardDescription>Enable non-technical stakeholders to generate insights</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    No coding required
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Natural language queries
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Instant insights
                  </li>
                </ul>
                <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
                  <Link href="/analytics">Start Analyzing</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
