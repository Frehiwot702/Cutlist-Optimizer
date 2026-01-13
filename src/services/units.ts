export type Unit = "mm" | "cm" | "inch"


export function toMM(value: number, unit: Unit): number {
  switch (unit) {
    case 'cm':
      return value * 10
    case 'inch':
      return value * 25.4
    default:
      return value
  }
}

export function fromMM(value: number, unit: Unit): number {
  switch (unit) {
    case 'cm':
      return value / 10
    case 'inch':
      return value / 25.4
    default:
      return value
  }
}
