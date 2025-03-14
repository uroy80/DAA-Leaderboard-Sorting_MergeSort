import LeaderboardDemo from "@/components/leaderboard-demo"
import { AlgorithmExplanation } from "@/components/algorithm-explanation"
import { TimeComplexity } from "@/components/time-complexity"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemeProvider } from "@/providers/theme-provider"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark">
      <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-foreground">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Real-Time Leaderboard Sorting
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Using Merge Sort for Dynamic Multiplayer Game Leaderboards
              </p>
            </div>
            <ThemeToggle />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LeaderboardDemo />
            </div>
            <div className="space-y-8">
              <AlgorithmExplanation />
              <TimeComplexity />
            </div>
          </div>

          <Footer />
        </div>
      </main>
    </ThemeProvider>
  )
}

