import Cell from '../classes/cell'

export interface Map {
	dimensions: Array<number>
	magnitudes: Array<number>
	size: number
	data: Array<Cell>
}

export interface Compass {
	rose: Record<string, number>
	directions: Set<string>
	antipodes: Record<string, string>
}
