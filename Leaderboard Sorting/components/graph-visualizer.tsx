"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

interface Player {
  id: string
  name: string
  score: number
  timestamp: number
}

interface GraphVisualizerProps {
  players: Player[]
}

export function GraphVisualizer({ players }: GraphVisualizerProps) {
  const [activeTab, setActiveTab] = useState("bar")
  const [maxScore, setMaxScore] = useState(0)

  useEffect(() => {
    if (players.length > 0) {
      const highestScore = Math.max(...players.map((player) => player.score))
      setMaxScore(highestScore > 0 ? highestScore : 200)
    }
  }, [players])

  const getColorForIndex = (index: number) => {
    const colors = [
      "bg-yellow-500 dark:bg-yellow-600",
      "bg-gray-400 dark:bg-gray-500",
      "bg-amber-700 dark:bg-amber-800",
      "bg-blue-500 dark:bg-blue-600",
      "bg-green-500 dark:bg-green-600",
      "bg-purple-500 dark:bg-purple-600",
      "bg-red-500 dark:bg-red-600",
      "bg-indigo-500 dark:bg-indigo-600",
      "bg-pink-500 dark:bg-pink-600",
      "bg-teal-500 dark:bg-teal-600",
    ]
    return colors[index % colors.length]
  }

  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Leaderboard Visualization</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="rank">Rank Graph</TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="pt-4">
            <div className="h-64 flex items-end justify-around gap-2">
              {players.map((player, index) => (
                <div key={player.id} className="flex flex-col items-center">
                  <motion.div
                    className={`w-12 ${getColorForIndex(index)} rounded-t-md flex items-end justify-center text-white text-xs font-bold`}
                    initial={{ height: 0 }}
                    animate={{ height: `${(player.score / maxScore) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  >
                    {player.score}
                  </motion.div>
                  <div className="text-xs mt-2 text-center w-12 truncate" title={player.name}>
                    {player.name}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rank" className="pt-4">
            <div className="h-64 relative">
              {/* Horizontal grid lines */}
              {[0, 1, 2, 3, 4].map((line) => (
                <div
                  key={line}
                  className="absolute w-full border-t border-muted-foreground/20"
                  style={{ top: `${line * 25}%` }}
                />
              ))}

              {/* Rank positions */}
              {players.map((player, index) => (
                <motion.div
                  key={player.id}
                  className="absolute flex items-center gap-2"
                  initial={{ left: `${(index / (players.length - 1 || 1)) * 100}%`, top: "100%" }}
                  animate={{
                    left: `${(index / (players.length - 1 || 1)) * 100}%`,
                    top: `${(player.score / maxScore) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <div className={`w-4 h-4 rounded-full ${getColorForIndex(index)}`} />
                  <div className="text-xs bg-background/80 dark:bg-background/80 px-1 rounded">{player.name}</div>
                </motion.div>
              ))}
            </div>
            <div className="text-xs text-center mt-4 text-muted-foreground">
              X-axis: Rank Position (left to right) • Y-axis: Score Value (bottom to top)
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

