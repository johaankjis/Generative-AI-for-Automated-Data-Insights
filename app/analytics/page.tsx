import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { SelfServiceAnalytics } from "@/components/self-service-analytics"

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-border bg-card">
        <Navigation />
      </aside>
      <main className="flex-1 overflow-auto">
        <Header />
        <div className="p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-balance mb-2">Self-Service Analytics</h1>
              <p className="text-muted-foreground text-balance">
                Ask questions in natural language and get instant insights without coding
              </p>
            </div>
            <SelfServiceAnalytics />
          </div>
        </div>
      </main>
    </div>
  )
}
