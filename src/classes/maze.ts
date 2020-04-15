import Cell from './cell'
import {
	getSize,
	getMagnitudes,
	getDirections,
	getAntipodes,
	binaryTriangulate,
	binaryTensorSlice,
	isIndexValid,
	areNeighbors,
	getNeighbors,
} from '../helpers/project'
import {
	Map,
	Compass,
} from '../helpers/types'
import {
	tetragonGyroscope
} from './gyroscope'

export default class Maze {
	public map: Map
	public compass: Compass
	constructor(
		dimensions: Array<number>,
		layout: string,
		algorithm: string,
	) {

		/*********MAP******************************************/

		// `magnitudes` are helpful to locate maze cells.
		const magnitudes: Array<number> = getMagnitudes(dimensions)

		// the `size`, or number of cells, helps fill the map.
		const size: number = getSize(dimensions)

		// the map `data` begins blank.
		// it will later be populated with cells.
		const data: Array<Cell> = []

		this.map = {
			dimensions,
			magnitudes,
			size,
			data,
		}

		/*********COMPASS**************************************/

		// the `rose` describes the offset in each direction.
		// its extremely useful for computing neighbors.
		const rose: Record<string, number> = tetragonGyroscope(magnitudes)
		// TODO: properly choose tetragonGyroscope using layout.

		// `directions` are helpful in a pinch.
		const directions: Set<string> = getDirections(rose)

		// `antipodes` define the opposite of each direction.
		const antipodes: Record<string, string> = getAntipodes(rose)

		this.compass = {
			rose,
			directions,
			antipodes,
		}

		/*********EXECUTE**************************************/

		// fill data with actual cells.
		for (let id: number = 0; id < this.map.size; id++) {
			this.map.data[id] = new Cell(this, id)
		}
	}

	isIndexValid (
		id: number,
	): boolean {
		// utilize helper function.
		return isIndexValid(this.map.size, id)
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
