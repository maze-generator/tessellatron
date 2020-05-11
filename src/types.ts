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
