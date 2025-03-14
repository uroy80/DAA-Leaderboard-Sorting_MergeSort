import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TimeComplexity() {
  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <CardTitle>Time Complexity Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-blue-400 mb-2">Initial Sort</h3>
          <div className="flex justify-between items-center bg-muted p-3 rounded-md">
            <span className="text-sm">Time Complexity:</span>
            <span className="font-mono text-green-400">O(n log n)</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Where n is the number of players initially</p>
        </div>

        <div>
          <h3 className="font-semibold text-blue-400 mb-2">Incremental Merge</h3>
          <div className="flex justify-between items-center bg-muted p-3 rounded-md">
            <span className="text-sm">Time Complexity:</span>
            <span className="font-mono text-green-400">O(n)</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Merging one new score into a sorted list of size n</p>
        </div>

        <div>
          <h3 className="font-semibold text-blue-400 mb-2">Player Deletion</h3>
          <div className="flex justify-between items-center bg-muted p-3 rounded-md">
            <span className="text-sm">Time Complexity:</span>
            <span className="font-mono text-green-400">O(n)</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Filtering out a player from a list of size n</p>
        </div>

        <div>
          <h3 className="font-semibold text-blue-400 mb-2">Space Complexity</h3>
          <div className="flex justify-between items-center bg-muted p-3 rounded-md">
            <span className="text-sm">Space Complexity:</span>
            <span className="font-mono text-yellow-400">O(n)</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Extra space for merging (temporary arrays)</p>
        </div>

        <div className="bg-slate-900 dark:bg-slate-950 p-4 rounded-md border border-slate-700 dark:border-slate-800">
          <h3 className="font-semibold text-blue-400 mb-2">Real-World Performance</h3>
          <p className="text-sm text-muted-foreground">
            For 1000 players with 10 updates per second, each merge is ~1000 comparisons—executes in &lt;1ms on a
            typical server.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This is why merge sort is ideal for real-time leaderboards in games with thousands of players.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

