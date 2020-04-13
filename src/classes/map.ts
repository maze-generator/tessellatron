import Compass from './compass'
import Cell from './cell'
import {
	getMagnitudes,
	getSize,
	binaryTriangulate,
	binaryTensorSlice,
	isValidIndex,
	areNeighbors,
	getNeighbors,
} from '../helpers/project'

export default class Map {
	readonly dimensions: Array<number>
	readonly magnitudes: Array<number>
	readonly size: number
	public data: Array<Cell>
	private compass: Compass
	constructor(
		compass: Compass,
		dimensions: Array<number>,
	) {
		// `dimensions` represents the shape of the maze.
		// eg length=3, width=4, height=5; or simply [3, 4, 5].
		this.dimensions = dimensions

		// `magnitudes` are helpful to locate maze cells.
		this.magnitudes = getMagnitudes(dimensions)

		// the `size`, or number of cells, helps fill the map.
		this.size = getSize(dimensions)

		// the map `data` begins blank.
		this.data = []

		// compass functionality is neccessary for the cells.
		this.compass = compass

		// fill data with actual cells.
		for (let index: number = 0; index < this.size; index++) {
			this.data[index] = new Cell(this, compass, index)
		}
	}

	isValidIndex (
		id: number,
	): boolean {
		// utilize helper function.
		return isValidIndex(this.size, id)
	}

	areNeighbors (
		id01: number,
		id02: number,
	): boolean {
		// utilize helper function.
		return areNeighbors(
			this.dimensions,
			this.size,
			id01,
			id02,
		)
	}

	getNeighbors(
		id: number,
	): Record<string, number> {
		// utilize helper function.
		return getNeighbors(
			this.compass.rose,
			this.dimensions,
			this.size,
			id,
		)
	}

	triangulate (
		id: number
	): Array<number> {
		// utilize helper function.
		return binaryTriangulate(this.dimensions, id)
	}

	tensorSlice (
		coordinates: Array<number|undefined>
	): Array<number> {
		// utilize helper function.
		return binaryTensorSlice(this.dimensions, coordinates)
	}
}
