import Cell from './cell'

export interface Map {
	dimensions: Array<number>
	magnitudes: Array<number>
	degree: number
	size: number
	data: Array<Cell>
}

export interface Compass {
	rose: Record<string, number>
	directions: Set<string>
	antipodes: Record<string, string>
}
