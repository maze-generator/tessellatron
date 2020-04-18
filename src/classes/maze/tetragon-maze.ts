import Cell from '../cell'

import {
	getDirections,
	getAntipodes,
} from '../../helpers/project'

import {
	multiply,
	range,
} from '../../helpers/main'

import {
	Map,
	Compass,
	algorithm,
	shape,
} from '../../helpers/types'

import {
	recursiveDFS
} from '../../helpers/generator'


/*
a tetragon is a four-sided polygon.
a quadrilateral is a four-angled polygon.
they represent the same thing...a square(ish) shape!

A finished map using this compass looks like this:
┌─┬─┬─┐
├─┼─┼─┤
├─┼─┼─┤
└─┴─┴─┘
*/

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

		// the `magnitudes` are helpful to locate maze cells.
		// these indicate how much an index must move
		// to offset an associated coordinate by exactly one.
		const magnitudes: Array<number> = []
		// loop through dimensions via each index, `i`.
		for (let i:number = 0; i < dimensions.length; i += 1) {
			// collect antecedent dimensions leading up to here.
			const previous:number[] = dimensions.slice(0, i)
			// calculate the product of those dimensions.
			const product:number = previous.reduce(multiply, 1)
			// add the product to the list of magnitudes.
			magnitudes.push(product)
		}

		// the `size`, or number of cells, helps fill the map.
		const size: number = dimensions.reduce(multiply, 1)

		// the `degree` is the total number of dimensions.
		const degree: number = dimensions.length

		// the map `data` begins blank.
		// it will later be populated with cells.
		const data: Array<Cell> = []

		this.map = {
			dimensions,
			magnitudes,
			size,
			degree,
			data,
		}

		/*********COMPASS**************************************/

		// deconstruct magnitudes for each axis.
		const [x, y]: Array<number> = magnitudes

		// the `rose` describes the offset in each direction.
		// its extremely useful for computing neighbors.
		const rose: Record<string, number> = {
			'west':  -x,
			'east':  +x,
			'north': -y,
			'south': +y,
		}

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

	public hasIndex (
		id: number,
	): boolean {
		return 0 <= id && id < this.map.size
	}

	public areNeighbors (
		id01: number,
		id02: number,
	): boolean {
		// validate both indices first.
		if (!this.hasIndex(id01) || !this.hasIndex(id02)) {
			return false
		}

		// calculate coordinates.
		const coordinates1:Array<number> = this.getCoordinates(id01)
		const coordinates2:Array<number> = this.getCoordinates(id02)

		// loop through each coordinate.
		// all coordinates but one must match.
		let counter = 0
		for (const index in range(0, coordinates1.length)) {

			// set up variables
			const coor1:number = coordinates1[index]
			const coor2:number = coordinates2[index]
			const difference:number = Math.abs(coor1 - coor2)

			// check if-gates
			if (difference === 0) {
				// do nothing
			} else if (difference === 1) {
				counter += 1
			} else {
				return false
			} if (counter > 1) {
				return false
			}

		// guarenteed return statement
		} if (counter === 1) {
			return true
		} else {
			return false
		}
	}

	public getNeighbors (
		id01: number,
	): Record<string, number> {

		// initialize return container.
		const neighbors: Record<string, number> = {}

		// set up loop over keys and values.
		const entries: Array<[string, number]> = Object.entries(this.compass.rose)
		for (const [direction, modifier] of entries) {

			// calculate potential neighbor via modifier.
			const id02: number = id01 + modifier

			// validate neighbor & add to list.
			if (this.areNeighbors(id01, id02)) {
				neighbors[direction] = id01 + modifier
			}
		}

		// return list of neighbors.
		return neighbors
	}

	public getCoordinates (
		cellIndex: number
	): Array<number> {

		// coordinates will be returned once populated.
		const coordinates: Array<number> = []

		// loop through each index in the dimensions array.
		// it maps to indices in magnitudes as well.
		for (const dimIndex of range(0, this.map.dimensions.length)) {

			// dimensions.length === magnitudes.length;
			// their index associates one with the other.
			const dimension: number = this.map.dimensions[dimIndex]
			const magnitude: number = this.map.magnitudes[dimIndex]

			// calculate resulting coordinate.
			const result: number = Math.floor(
				cellIndex / magnitude % dimension
			)

			// push into array.
			coordinates.push(result)
		}

		return coordinates
	}

	// getTensorSlice takes in cell coordinates.
	// it returns a slice of the desired cell indices.
	public getTensorSlice (
		...coordinates: Array<number|undefined>
	): Array<number> {

		// slice will be returned once populated.
		const slice: Array<number> = []

		// this piece creates spacers or iterators.
		// if we have dimensions of [5,4,3] our spacers are:
		// [1,5,20]. The final item = total # of coordinates.
		for (const cellIndex of range(0, this.map.size)) {
			let validCellIndex: boolean = true

			// loop through each index in the dimensions array.
			// it maps to indices in magnitudes & coordinates too.
			for (const dimIndex of range(0, this.map.degree)) {

				// dimensions.length === magnitudes.length;
				// dimensions.length === coordinates.length;
				// their index associates one with the others.
				const dimension: number = this.map.dimensions[dimIndex]
				const magnitude: number = this.map.magnitudes[dimIndex]

				// retrieve current input coordinate.
				const coordinate: number|undefined = coordinates[dimIndex]

				// calculate resulting coordinate.
				const result: number = Math.floor(
					cellIndex / magnitude % dimension
				)

				// result doesn't coorespond with given coordinate.
				if (result !== coordinate) {

					validCellIndex = false
					break
				}
			}

			if (validCellIndex) {
				slice.push(cellIndex)
			}
		}
		return slice
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
