"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface Player {
  id: string
  name: string
  score: number
  timestamp: number
}

interface TreeNode {
  id: string
  players: Player[]
  left?: TreeNode
  right?: TreeNode
  level: number
  position: number
  isMerging?: boolean
  isComparing?: boolean
}

interface MergeSortVisualizerProps {
  players: Player[]
  isAddingPlayer: boolean
  newPlayer?: Player
}

export function MergeSortVisualizer({ players, isAddingPlayer, newPlayer }: MergeSortVisualizerProps) {
  const [tree, setTree] = useState<TreeNode | null>(null)
  const [visualizationEnabled, setVisualizationEnabled] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const [maxSteps, setMaxSteps] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Build the merge sort tree when a new player is added
  useEffect(() => {
    if (isAddingPlayer && newPlayer && visualizationEnabled) {
      // Start the animation
      setIsAnimating(true)
      setAnimationStep(0)

      // Create a tree with the current players
      const initialTree = buildMergeSortTree([...players])
      setTree(initialTree)

      // Calculate the number of steps in the animation
      const steps = calculateTreeDepth(initialTree) * 2 // Divide and merge phases
      setMaxSteps(steps)

      // Animate through the steps
      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        setAnimationStep(currentStep)

        if (currentStep >= steps) {
          clearInterval(interval)
          setIsAnimating(false)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isAddingPlayer, newPlayer, players, visualizationEnabled])

  // Build a merge sort tree from an array of players
  const buildMergeSortTree = (players: Player[], level = 0, position = 0): TreeNode => {
    if (players.length <= 1) {
      return { id: `node-${level}-${position}`, players, level, position }
    }

    const middle = Math.floor(players.length / 2)
    const left = players.slice(0, middle)
    const right = players.slice(middle)

    const leftNode = buildMergeSortTree(left, level + 1, position * 2)
    const rightNode = buildMergeSortTree(right, level + 1, position * 2 + 1)

    return {
      id: `node-${level}-${position}`,
      players: [...players],
      left: leftNode,
      right: rightNode,
      level,
      position,
    }
  }

  // Calculate the depth of the tree
  const calculateTreeDepth = (node: TreeNode | null): number => {
    if (!node || (!node.left && !node.right)) {
      return 0
    }
    return 1 + Math.max(calculateTreeDepth(node.left || null), calculateTreeDepth(node.right || null))
  }

  // Render a tree node
  const renderTreeNode = (node: TreeNode) => {
    // Determine if this node should be highlighted based on the animation step
    const treeDepth = calculateTreeDepth(tree)
    const isActive = node.level === Math.min(Math.floor(animationStep / 2), treeDepth)
    const isMerging = isActive && animationStep % 2 === 1
    const isComparing = isActive && animationStep % 2 === 0

    return (
      <div key={node.id} className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-2 rounded-md text-xs ${
            isMerging
              ? "bg-green-500 dark:bg-green-700 text-white"
              : isComparing
                ? "bg-blue-500 dark:bg-blue-700 text-white"
                : "bg-slate-200 dark:bg-slate-700"
          } transition-colors duration-300`}
        >
          {node.players.map((p) => p.score).join(", ")}
        </motion.div>

        {node.left && node.right && (
          <div className="flex items-start mt-4 space-x-4">
            <div className="flex flex-col items-center">
              <div className="h-6 border-l border-slate-400 dark:border-slate-500"></div>
              {renderTreeNode(node.left)}
            </div>
            <div className="flex flex-col items-center">
              <div className="h-6 border-l border-slate-400 dark:border-slate-500"></div>
              {renderTreeNode(node.right)}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (!visualizationEnabled) {
    return (
      <Card className="bg-background border-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Merge Sort Visualization</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch
                id="visualization-toggle"
                checked={visualizationEnabled}
                onCheckedChange={setVisualizationEnabled}
              />
              <Label htmlFor="visualization-toggle">Enable</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-40 text-muted-foreground">
          Enable visualization to see merge sort in action
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Merge Sort Visualization</CardTitle>
          <div className="flex items-center space-x-2">
            <Switch
              id="visualization-toggle"
              checked={visualizationEnabled}
              onCheckedChange={setVisualizationEnabled}
            />
            <Label htmlFor="visualization-toggle">Enable</Label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isAnimating ? (
          <div className="flex flex-col items-center">
            <div className="mb-4 text-sm text-center">
              <span className="font-semibold">
                {animationStep % 2 === 0 ? "Dividing" : "Merging"} - Step {animationStep + 1} of {maxSteps}
              </span>
            </div>
            <div className="overflow-auto max-w-full p-4">{tree && renderTreeNode(tree)}</div>
            <div className="mt-4 text-xs text-muted-foreground">
              <span className="inline-block w-3 h-3 bg-blue-500 dark:bg-blue-700 rounded-sm mr-2"></span>
              Comparing
              <span className="inline-block w-3 h-3 bg-green-500 dark:bg-green-700 rounded-sm ml-4 mr-2"></span>
              Merging
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-40 text-muted-foreground">
            Add a new player to see the merge sort algorithm in action
          </div>
        )}
      </CardContent>
    </Card>
  )
}

