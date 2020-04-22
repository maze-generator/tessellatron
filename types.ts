import Cell from '../classes/cell'

export interface Map {
	dimensions: Array<number>
	magnitudes: Array<number>
	size: number
	degree: number
	data: Array<Cell>
}

export interface Compass {
	layout: shape
	rose: Record<string, number>
	directions: Set<string>
	antipodes: Record<string, string>
}

export interface Generator {
	method: algorithm
	functions: (test:string) => (string)
}

export type shape = (
	// three-sided shapes
	// |'trigon'
	// |'trilateral'
	|'triangle'

	// four-sided shapes
	// |'tetragon'
	// |'quadrilateral'
	// |'quadrangle'
	|'square'
	// |'rectangle'
	// |'rhombus'

	// six-sided shapes
	|'hexagon'

	// six-sided bodies
	// |'hexahedron'
	|'cube'

	// twelve-sided bodies
	|'rhombic dodecahedron'

	// eight-sided entity
	|'tesseract'
)

export type algorithm = (
	// breadth-first
	|'recursive breadth-first traversal'
	|'iterative breadth-first traversal'

	// depth-first
	|'recursive depth-first traversal'
	|'iterative depth-first traversal'
)
