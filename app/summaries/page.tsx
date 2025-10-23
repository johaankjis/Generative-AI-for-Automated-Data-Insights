import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { SummaryGeneratorForm } from "@/components/summary-generator-form"

export default function SummariesPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-border bg-card">
        <Navigation />
      </aside>
      <main className="flex-1 overflow-auto">
        <Header />
        <div className="p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-balance mb-2">Executive Summary Generator</h1>
              <p className="text-muted-foreground text-balance">
                Transform raw data and metrics into stakeholder-ready narratives using AI
              </p>
            </div>
            <SummaryGeneratorForm />
          </div>
        </div>
      </main>
    </div>
  )
}
