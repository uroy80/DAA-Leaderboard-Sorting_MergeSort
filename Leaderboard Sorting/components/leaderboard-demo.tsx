"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { MergeSortVisualizer } from "./merge-sort-visualizer"

// Player type definition
interface Player {
  id: string
  name: string
  score: number
  timestamp: number
}

// Add onPlayersChange to the component props
// interface LeaderboardDemoProps {
//   onPlayersChange?: (players: Player[]) => void
// }

// Initial players data
const initialPlayers: Player[] = [
  { id: "p1", name: "Sahil", score: 150, timestamp: Date.now() - 5000 },
  { id: "p2", name: "Raghu", score: 200, timestamp: Date.now() - 4000 },
  { id: "p3", name: "Ayush", score: 120, timestamp: Date.now() - 3000 },
  { id: "p4", name: "Ritin", score: 180, timestamp: Date.now() - 2000 },
  { id: "p5", name: "Priyanshu", score: 160, timestamp: Date.now() - 1000 },
]

// Merge function for merge sort
const merge = (left: Player[], right: Player[]): Player[] => {
  const result: Player[] = []
  let leftIndex = 0
  let rightIndex = 0

  // Compare elements and merge
  while (leftIndex < left.length && rightIndex < right.length) {
    // Sort by score (descending)
    if (left[leftIndex].score > right[rightIndex].score) {
      result.push(left[leftIndex])
      leftIndex++
    } else if (left[leftIndex].score < right[rightIndex].score) {
      result.push(right[rightIndex])
      rightIndex++
    } else {
      // If scores are equal, sort by timestamp (ascending) for stability
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
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

// Merge sort implementation
const mergeSort = (players: Player[]): Player[] => {
  if (players.length <= 1) {
    return players
  }

  const middle = Math.floor(players.length / 2)
  const left = players.slice(0, middle)
  const right = players.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}

// Merge a new player into an already sorted list
const mergeNewPlayer = (sortedPlayers: Player[], newPlayer: Player): Player[] => {
  return merge(sortedPlayers, [newPlayer])
}

export default function LeaderboardDemo() {
  const [players, setPlayers] = useState<Player[]>([])
  const [newPlayerName, setNewPlayerName] = useState("")
  const [newPlayerScore, setNewPlayerScore] = useState("")
  const [sortingSteps, setSortingSteps] = useState<Player[][]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isAddingPlayer, setIsAddingPlayer] = useState(false)
  const [newlyAddedPlayer, setNewlyAddedPlayer] = useState<Player | undefined>(undefined)

  // Initialize with sorted players
  useEffect(() => {
    const sorted = mergeSort([...initialPlayers])
    setPlayers(sorted)
  }, [])

  const addNewPlayer = () => {
    if (!newPlayerName || !newPlayerScore) return

    const score = Number.parseInt(newPlayerScore)
    if (isNaN(score)) return

    const newPlayer: Player = {
      id: `p${Date.now()}`,
      name: newPlayerName,
      score,
      timestamp: Date.now(),
    }

    // Set the newly added player for visualization
    setNewlyAddedPlayer(newPlayer)
    setIsAddingPlayer(true)

    // Create animation steps
    const steps: Player[][] = []
    steps.push([...players]) // Original state

    // Final merged state
    const merged = mergeNewPlayer(players, newPlayer)
    steps.push(merged)

    setSortingSteps(steps)
    setCurrentStep(0)
    setIsAnimating(true)

    // Reset form
    setNewPlayerName("")
    setNewPlayerScore("")

    // Start animation
    let step = 0
    const interval = setInterval(() => {
      step++
      setCurrentStep(step)

      if (step >= steps.length - 1) {
        clearInterval(interval)
        setPlayers(merged)
        setIsAnimating(false)

        // Reset the adding player state after animation completes
        setTimeout(() => {
          setIsAddingPlayer(false)
          setNewlyAddedPlayer(undefined)
        }, 3000) // Keep visualization visible for 3 seconds after animation completes
      }
    }, 1000)
  }

  const deletePlayer = (playerId: string) => {
    // Create animation steps
    const steps: Player[][] = []
    steps.push([...players]) // Original state

    // Final state after deletion
    const filteredPlayers = players.filter((player) => player.id !== playerId)
    steps.push(filteredPlayers)

    setSortingSteps(steps)
    setCurrentStep(0)
    setIsAnimating(true)

    // Start animation
    let step = 0
    const interval = setInterval(() => {
      step++
      setCurrentStep(step)

      if (step >= steps.length - 1) {
        clearInterval(interval)
        setPlayers(filteredPlayers)
        setIsAnimating(false)
      }
    }, 1000)
  }

  const getPlayerRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-400" />
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 2:
        return <Award className="h-5 w-5 text-amber-700" />
      default:
        return <span className="text-gray-400 font-mono">{index + 1}</span>
    }
  }

  return (
    <div className="space-y-8">
      <Card className="bg-background border-border">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Live Leaderboard</span>
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              {isAnimating ? "Updating..." : "Live"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Player name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                className="bg-muted"
              />
              <Input
                placeholder="Score"
                type="number"
                value={newPlayerScore}
                onChange={(e) => setNewPlayerScore(e.target.value)}
                className="bg-muted w-24"
              />
              <Button onClick={addNewPlayer} disabled={isAnimating}>
                Add Player
              </Button>
            </div>

            <div className="rounded-md border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-3 text-left w-16">Rank</th>
                    <th className="p-3 text-left">Player</th>
                    <th className="p-3 text-right">Score</th>
                    <th className="p-3 text-right w-16">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {(isAnimating ? sortingSteps[currentStep] : players).map((player, index) => (
                      <motion.tr
                        key={player.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`border-t ${
                          isAnimating && sortingSteps[0].findIndex((p) => p.id === player.id) !== index
                            ? "bg-muted bg-opacity-30"
                            : ""
                        }`}
                      >
                        <td className="p-3 flex items-center justify-center">{getPlayerRankIcon(index)}</td>
                        <td className="p-3">{player.name}</td>
                        <td className="p-3 text-right font-mono">{player.score}</td>
                        <td className="p-3 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePlayer(player.id)}
                            disabled={isAnimating}
                            className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <span className="sr-only">Delete</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <MergeSortVisualizer players={players} isAddingPlayer={isAddingPlayer} newPlayer={newlyAddedPlayer} />
    </div>
  )
}

export type { Player }

