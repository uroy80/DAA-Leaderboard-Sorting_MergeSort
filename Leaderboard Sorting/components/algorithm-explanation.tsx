import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AlgorithmExplanation() {
  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <CardTitle>Merge Sort for Real-Time Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="algorithm">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="algorithm" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-400">Initial Setup</h3>
              <p className="text-sm text-muted-foreground">1. Start with an unsorted list of player scores</p>
              <p className="text-sm text-muted-foreground">
                2. Apply standard merge sort to create an initial sorted list
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-400">Real-Time Updates</h3>
              <p className="text-sm text-muted-foreground">
                1. When a new score arrives, treat it as a single-element sorted list
              </p>
              <p className="text-sm text-muted-foreground">
                2. Merge it into the existing sorted list using merge sort's merge step
              </p>
              <p className="text-sm text-muted-foreground">3. This is much faster than re-sorting the entire list</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-400">Stability</h3>
              <p className="text-sm text-muted-foreground">
                If two players have the same score, their original order is preserved (first to achieve the score ranks
                higher)
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-400">Player Deletion</h3>
              <p className="text-sm text-muted-foreground">
                1. When a player is deleted, we simply filter them out of the array
              </p>
              <p className="text-sm text-muted-foreground">
                2. Since the array is already sorted, no re-sorting is needed
              </p>
              <p className="text-sm text-muted-foreground">3. This operation has O(n) time complexity</p>
            </div>
          </TabsContent>
          <TabsContent value="code" className="pt-4">
            <pre className="bg-slate-900 dark:bg-slate-950 p-4 rounded-md overflow-x-auto text-xs text-slate-300">
              <code>
                {`// Merge function for merge sort
const merge = (left, right) => {
  const result = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < left.length && 
         rightIndex < right.length) {
    // Sort by score (descending)
    if (left[leftIndex].score > right[rightIndex].score) {
      result.push(left[leftIndex])
      leftIndex++
    } else if (left[leftIndex].score < right[rightIndex].score) {
      result.push(right[rightIndex])
      rightIndex++
    } else {
      // If scores are equal, sort by timestamp (ascending)
      if (left[leftIndex].timestamp <= right[rightIndex].timestamp) {
        result.push(left[leftIndex])
        leftIndex++
      } else {
        result.push(right[rightIndex])
        rightIndex++
      }
    }
  }

  // Add remaining elements
  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex))
}`}
              </code>
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

