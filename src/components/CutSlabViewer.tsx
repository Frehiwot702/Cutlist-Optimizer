import { PlacedPiece } from "../types/optimizer"

type Props = {
  slabWidthMM: number
  slabHeightMM: number
  slabIndex: number
  pieces: PlacedPiece[]
}

export function CutSlabViewer({
  slabWidthMM,
  slabHeightMM,
  slabIndex,
  pieces
}: Props) {
  const svgWidth = 500
  const svgHeight = 300

  const scale = Math.min(
    svgWidth / slabWidthMM,
    svgHeight / slabHeightMM
  )

  return (
    <svg width={svgWidth} height={svgHeight}>
      <rect
        width={slabWidthMM * scale}
        height={slabHeightMM * scale}
        fill="#eee"
        stroke="#222"
        strokeWidth={2}
      />

      {pieces
        .filter(p => p.slabIndex === slabIndex)
        .map(p => (
          <g key={p.id}>
            <rect
              x={p.x * scale}
              y={p.y * scale}
              width={p.width * scale}
              height={p.height * scale}
              fill="#4caf50"
              stroke="#111"
            />
            <text
              x={(p.x + p.width / 2) * scale}
              y={(p.y + p.height / 2) * scale}
              fontSize={10}
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {Math.round(p.width)}×{Math.round(p.height)}
            </text>
          </g>
        ))}
    </svg>
  )
}
