import Cell from './cell'

export interface GraphType {
	layout: string
	dimensions: Array<number>
	magnitudes: Array<number>
	degree: number
	size: number
	compass: Record<string, number>
	directions: Set<string>
	antipodes: Record<string, string>
	data: Array<Cell>
	json: string

	holdsIndex (
		id: number,
	): (boolean)

	holdsNeighbors (
		id01: number,
		id02: number,
	): (boolean)

	connectPassage (
		direction: string,
		id01: number,
		id02: number,
	): (void)

	connectNeighbor (
		direction: string,
		id01: number,
		id02: number,
	): (void)

	findNeighborsOf (
		id01: number,
	): (Record<string, number|null>)

	findCoordinates (
		...indexTensor: Array<number>
	): (Array<number|undefined>)

	findTensorSlice (
		...coordinates: Array<number|undefined>
	): (Array<number>)
}

/*
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
*/
