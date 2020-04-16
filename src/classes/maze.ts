import Cell from './cell'
import {
	getSize,
	getMagnitudes,
	getDirections,
	getAntipodes,
	binaryGetCoordinates,
	binaryGetTensorSlice,
	isIndexValid,
	getNeighbors,
	areNeighbors,
} from '../helpers/project'
import {
	Map,
	Compass,
	algorithm,
	shape,
} from '../helpers/types'
import {
	tetragonGyroscope
} from '../helpers/gyroscope'
import {
	recursiveDFS
} from '../helpers/generator'

export default class Maze {
	public algorithm: algorithm
	public map: Map
	public compass: Compass
	constructor(
		dimensions: Array<number>,
		layout: shape = 'square',
		algorithm: algorithm = 'recursive breadth-first traversal',
	) {

		// `algorithm` describes the maze-generation technique.
		this.algorithm = algorithm

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
			layout,
			rose,
			directions,
			antipodes,
		}

		/*********EXECUTE**************************************/

		// initialize map data
		this.reset()
	}

	public reset (
	): void {
		// clear map data of all contents.
		this.map.data = []

		// refill map data with empty cells.
		for (let id: number = 0; id < this.map.size; id++) {
			this.map.data[id] = new Cell(this, id)
		}
	}

	public generate (
		id: number
	): void {
		recursiveDFS(
			id,
			this.map.data,
			this.compass.antipodes,
		)
	}

	public isIndexValid (
		id: number,
	): boolean {
		// utilize helper function.
		return isIndexValid(this.map.size, id)
		// TODO: dependent on layout shape.
	}

	public areNeighbors (
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
		// TODO: dependent on layout shape.
	}

	public getNeighbors (
		id: number,
	): Record<string, number> {
		// utilize helper function.
		return getNeighbors(
			this.compass.rose,
			this.map.dimensions,
			this.map.size,
			id,
		)
		// TODO: dependent on layout shape.
	}

	public getCoordinates (
		id: number
	): Array<number> {
		// utilize helper function.
		return binaryGetCoordinates(this.map.dimensions, id)
		// TODO: binaryGetTensorSlice on layout shape.
	}

	public getTensorSlice (
		...coordinates: Array<number|undefined>
	): Array<number> {
		// utilize helper function.
		return binaryGetTensorSlice(this.map.dimensions, coordinates)
		// TODO: dependent on layout shape.
	}

	get json (
	): string {
		const stringyCells: Array<string> = []
		for (const cell of this.map.data) {
			stringyCells.push(JSON.parse(cell.json))
		}

		const jsObject = {
			algorithm: this.algorithm,
			map: {
				dimensions: this.map.dimensions,
				magnitudes: this.map.magnitudes,
				size: this.map.size,
				data: stringyCells,
			},
			compass: {
				layout: this.compass.layout,
				rose: this.compass.rose,
				directions: [...this.compass.directions],
				antipodes: this.compass.antipodes,
			},
		}

		return JSON.stringify(jsObject)
	}
}
