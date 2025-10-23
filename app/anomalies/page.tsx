import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { AnomalyDetectionInterface } from "@/components/anomaly-detection-interface"

export default function AnomaliesPage() {
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
              <h1 className="text-3xl font-bold text-balance mb-2">Anomaly Detection</h1>
              <p className="text-muted-foreground text-balance">
                Identify unusual patterns and get AI-powered root cause analysis
              </p>
            </div>
            <AnomalyDetectionInterface />
          </div>
        </div>
      </main>
    </div>
  )
}
