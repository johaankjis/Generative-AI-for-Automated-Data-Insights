import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { QueryGeneratorForm } from "@/components/query-generator-form"

export default function QueryGeneratorPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-border bg-card">
        <Navigation />
      </aside>
      <main className="flex-1 overflow-auto">
        <Header />
        <div className="p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-balance mb-2">Query Generator</h1>
              <p className="text-muted-foreground text-balance">
                Generate SQL queries and Python scripts using natural language powered by AI
              </p>
            </div>
            <QueryGeneratorForm />
          </div>
        </div>
      </main>
    </div>
  )
}
