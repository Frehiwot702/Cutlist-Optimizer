type Props = {
  widthMM: number
  heightMM: number
}

export function RawSlabViewer({ widthMM, heightMM }: Props) {
  const svgWidth = 500
  const svgHeight = 300

  const scale = Math.min(
    svgWidth / widthMM,
    svgHeight / heightMM
  )

  return (
    <svg width={svgWidth} height={svgHeight}>
      <rect
        width={widthMM * scale}
        height={heightMM * scale}
        fill="#ddd"
        stroke="#222"
        strokeWidth={2}
      />
      <text x={10} y={20} fill="#333">
        Raw Slab
      </text>
    </svg>
  )
}
