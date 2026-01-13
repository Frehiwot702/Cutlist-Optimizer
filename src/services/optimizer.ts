import {
  SlabInput,
  RequiredPieceInput,
  CuttingSettings,
  OptimizationResult,
  PlacedPiece
} from "../types/optimizer"
import { toMM } from "./units"

type InternalPiece = {
  id: string
  width: number
  height: number
  allowRotation: boolean
}

export function optimizeCutting(
  slabInput: SlabInput,
  piecesInput: RequiredPieceInput[],
  settings: CuttingSettings
): OptimizationResult {
  const { unit, kerf, allowRotation, grainDirection, optimizationGoal } = settings

  // Convert slab to mm
  const slab = {
    width: toMM(slabInput.width, unit),
    height: toMM(slabInput.height, unit),
    quantity: slabInput.quantity
  }

  const kerfMM = toMM(kerf, unit)

  // Expand pieces
  const expanded: InternalPiece[] = []

  piecesInput.forEach((p, index) => {
    for (let i = 0; i < p.quantity; i++) {
      expanded.push({
        id: `${index}-${i}`,
        width: toMM(p.width, unit),
        height: toMM(p.height, unit),
        allowRotation: p.allowRotation
      })
    }
  })

  // Sort based on optimization goal
  expanded.sort((a, b) => {
    if (optimizationGoal === "MINIMIZE_SLABS") {
      return Math.max(b.width, b.height) - Math.max(a.width, a.height)
    }
    return b.width * b.height - a.width * a.height
  })

  const placed: PlacedPiece[] = []

  let slabIndex = 0
  let cursorX = 0
  let cursorY = 0
  let rowHeight = 0

  for (const piece of expanded) {
    if (slabIndex >= slab.quantity) break

    let w = piece.width
    let h = piece.height
    let rotated = false

    const canRotate =
      allowRotation &&
      piece.allowRotation &&
      grainDirection === "ROTATION_ALLOWED"

    if (canRotate && w > slab.width && h <= slab.width) {
      ;[w, h] = [h, w]
      rotated = true
    }

    if (cursorX + w > slab.width) {
      cursorX = 0
      cursorY += rowHeight + kerfMM
      rowHeight = 0
    }

    if (cursorY + h > slab.height) {
      slabIndex++
      cursorX = 0
      cursorY = 0
      rowHeight = 0
    }

    if (slabIndex >= slab.quantity) break

    placed.push({
      id: piece.id,
      slabIndex,
      x: cursorX,
      y: cursorY,
      width: w,
      height: h,
      rotated
    })

    cursorX += w + kerfMM
    rowHeight = Math.max(rowHeight, h)
  }

  const slabArea = slab.width * slab.height
  const slabsUsed = Math.min(slabIndex + 1, slab.quantity)

  const usedArea = placed.reduce(
    (sum, p) => sum + p.width * p.height,
    0
  )

  const totalArea = slabsUsed * slabArea
  const wasteArea = totalArea - usedArea

  return {
    slabsUsed,
    placedPieces: placed,
    totalWasteAreaMM2: wasteArea,
    wastePercentage: totalArea === 0 ? 0 : (wasteArea / totalArea) * 100
  }
}
