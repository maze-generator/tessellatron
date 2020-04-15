import Cell from '../classes/cell'

export interface Map {
	dimensions: Array<number>
	magnitudes: Array<number>
	size: number
	data: Array<Cell>
}

export interface Compass {
	layout: shape
	rose: Record<string, number>
	directions: Set<string>
	antipodes: Record<string, string>
}

export interface Generator {
	algorithm: algorithm
	functions: (test:string) => (string)
}

export type shape = (
	// three-sided shapes
	|'trigon'
	|'triangle'
	// four-sided shapes
	|'tetragon'
	|'square'
	|'rectangle'
	// six-sided shapes
	|'hexagon'
	// six-sided bodies
	|'hexahedron'
)

export type algorithm = (
	// breadth-first
	|'recursive breadth-first traversal'
	|'iterative breadth-first traversal'
	// depth-first
	|'recursive depth-first traversal'
	|'iterative depth-first traversal'
)
