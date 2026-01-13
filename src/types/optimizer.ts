import { Unit } from "../services/units"

export type GrainDirection = "SAME_DIRECTION" | "ROTATION_ALLOWED"
export type OptimizationGoal = "MINIMIZE_WASTE" | "MINIMIZE_SLABS"

export type SlabInput = {
  width: number
  height: number
  quantity: number
}

export type RequiredPieceInput = {
  width: number
  height: number
  quantity: number
  allowRotation: boolean
}

export type CuttingSettings = {
  unit: Unit
  kerf: number
  allowRotation: boolean
  grainDirection: GrainDirection
  optimizationGoal: OptimizationGoal
}

export type PlacedPiece = {
  id: string
  slabIndex: number
  x: number // mm
  y: number // mm
  width: number // mm
  height: number // mm
  rotated: boolean
}

export type OptimizationResult = {
  slabsUsed: number
  placedPieces: PlacedPiece[]
  totalWasteAreaMM2: number
  wastePercentage: number
}
