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
	public compass: Compass
	public map: Map
	constructor(
		dimensions: Array<number>,
		layout: string,
		algorithm: string,
	) {
		this.map = {}
		this.compass = {}

		// `dimensions` represents the shape of the maze.
		// eg length=3, width=4, height=5; or simply [3, 4, 5].
		this.map.dimensions = dimensions

		// `magnitudes` are helpful to locate maze cells.
		this.map.magnitudes = getMagnitudes(dimensions)

		// the `size`, or number of cells, helps fill the map.
		this.map.size = getSize(dimensions)

		// the `rose` describes the offset in each direction.
		// its extremely useful for computing neighbors.
		this.compass.rose = tetragonGyroscope(this.map.magnitudes)
		// TODO: properly choose tetragonGyroscope using layout.

		// `directions` are helpful in a pinch.
		this.compass.directions = getDirections(this.compass.rose)

		// `antipodes` define the opposite of each direction.
		this.compass.antipodes = getAntipodes(this.compass.rose)

		// the map `data` begins blank.
		this.map.data = []

		// fill data with actual cells.
		for (let index: number = 0; index < this.size; index++) {
			this.data[index] = new Cell(this, compass, index)
		}
	}

	isValidIndex (
		id: number,
	): boolean {
		// utilize helper function.
		return isValidIndex(this.map.size, id)
	}

	areNeighbors (
		id01: number,
		id02: number,
	): boolean {
		// utilize helper function.
		return areNeighbors(
			this.map.dimensions,
			this.map.size,
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
			this.map.dimensions,
			this.map.size,
			id,
		)
	}

	triangulate (
		id: number
	): Array<number> {
		// utilize helper function.
		return binaryTriangulate(this.map.dimensions, id)
	}

	tensorSlice (
		coordinates: Array<number|undefined>
	): Array<number> {
		// utilize helper function.
		return binaryTensorSlice(this.map.dimensions, coordinates)
	}
}
