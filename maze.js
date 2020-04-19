import Cell from './cell.js'

// multiply is a reducer function.
const multiply = (a, b) => a * b

const intesect =  (a, b) => a.filter(x => b.includes(x))

class Maze {
	constructor (
		dimensions
	) {

		/* CALCULATE MAP INFORMATION */

		// the `degree` counts how many dimensions there are.
		// for example, a square has two, and a cube has three.
		const degree = dimensions.length

		// just multiply the dimensions together to get `size`.
		// it represents the maximum number of cells to be held.
		//
		// == EDGE CASE ==
		// the value of the nth-dimension is implicitly 1.
		// for example, the 3rd-dimension of [2,3] is 1.
		// it follows that the 1st-dimension of [] is also 1.
		// thus, this function returns 1 if given an empty array.
		//
		// == REASONING ==
		// if any dimension were zero, there would be nothing.
		// zero would be multiplied in places, giving zero back.
		const size = dimensions.reduce(multiply, 1)

		// The `magnitudes` are how much an index must move as
		// to offset an associated coordinate by exactly one.
		// For example, moving east 1 unit might take 1 index,
		// but moving south 1 unit might take 10 indices.
		const magnitudes = []

		// loop through dimensions via each index `id`.
		for (let id = 0; id < dimensions.length; id += 1) {
			// collect antecedent dimensions leading up to here.
			const previous = dimensions.slice(0, id)
			// calculate the product of those dimensions.
			const product = previous.reduce(multiply, 1)
			// add the product to the list of magnitudes.
			magnitudes.push(product)
		}

		/* CALCULATE COMPASS INFORMATION */

		// deconstruct `magnitudes` for each axis.
		const [x, y] = magnitudes
		// the `rose` describes the offset in each direction.
		// its extremely useful for computing neighbors.
		const rose = {
			'west':  -x,
			'east':  +x,
			'north': -y,
			'south': +y,
		}

		// `directions` is a simple set of named vectors.
		// luckily, these are exactly the keys of the `rose`.
		const directions = new Set([
			'west',
			'east',
			'north',
			'south',
		])

		// `antipodes` define the opposite of each direction.
		const antipodes = {
			'west':  'east',
			'east':  'west',
			'north': 'south',
			'south': 'north',
		}

		/* FILL MAP DATA */

		// initialize map data as an empty array.
		const data = []
		// fill map data with empty cells.
		for (let id = 0; id < size; id++) {
			data[id] = new this.Cell(id)
		}

		/* ASSIGN TO CLASS */

		// map contains location and magnitude data.
		this.map = {
			dimensions,
			degree,
			magnitudes,
			size,
			data,
		}

		// compass contains relative direction data.
		this.compass = {
			rose,
			directions,
			antipodes,
		}
	}

	holdsIndex (id) {
		return 0 <= id && id < this.map.size
	}

	holdsNeighbors (id01, id02) {
		// validate both indices first.
		if (!this.holdsIndex(id01) || !this.holdsIndex(id02)) {
			return false
		}

		// calculate coordinates.
		const coords01 = this.findCoordinates(id01)
		const coords02 = this.findCoordinates(id02)

		// loop through each coordinate.
		// all coordinates but one must match.
		let counter = 0
		for (let dg = 0; dg < this.map.degree; dg++) {

			// set up difference variable, `delta`.
			const delta = Math.abs(coords01[dg] - coords02[dg])

			// check if-gates
			if (delta === 0) {
				// do nothing
			} else if (delta === 1) {
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

	findNeighborsOf (id) {
		// initialize return container.
		const neighbors= {}

		// set up loop over keys and values.
		const entries = Object.entries(rose)
		for (const [direction, modifier] of entries) {

			// calculate potential neighbor via modifier.
			const id02 = id01 + modifier

			// validate neighbor & add to list.
			if (this.holdsNeighbors(id01, id02)) {
				neighbors[direction] = id01 + modifier
			}
		}

		// return list of neighbors.
		return neighbors
	}

	connectPassage (direction, id01, id02) {
		// get instances of cells.
		const cell01 = this.map.data[id01]
		const cell02 = this.map.data[id02]

		// `reversed` is the antipode of a direction.
		// for example, `reversed` of 'north' is 'south'.
		const reversed = this.compass.antipodes[direction]

		// set passages.
		cell01.passages[direction] = true
		cell02.passages[reversed] = true
	}

	connectNeighbor (direction, id01, id02) {
		// get instances of cells.
		const cell01 = this.map.data[id01]
		const cell02 = this.map.data[id02]

		// `reversed` is the antipode of a direction.
		// for example, `reversed` of 'north' is 'south'.
		const reversed = this.compass.antipodes[direction]

		// set neighbors.
		cell01.neighbors[direction] = cell02.id
		cell02.neighbors[reversed] = cell01.id
	}

	findCoordinates (...indexTensor) {
		// coordinates will be returned once populated.
		let coordinates = []
		for (let id; id < this.map.size; id++) {
			coordinates.push(id)
		}

		// get magnitudes.
		const magnitudes = this.map.magnitudes
		const dimensions = this.map.dimensions

		for (const cellIndex of indexTensor) {
			const cellCoords = []

			// loop through each index in the dimensions array.
			// it maps to indices in magnitudes as well.
			for (let dimIndex; dimIndex < this.map.degree; dimIndex++) {

				// dimensions.length === magnitudes.length;
				// their index associates one with the other.
				const dimension = dimensions[dimIndex]
				const magnitude = magnitudes[dimIndex]

				// calculate resulting coordinate.
				const result = Math.floor(
					cellIndex / magnitude % dimension
				)

				// push into array.
				cellCoords.push(result)
			}
			// ensure validity across all dimensions with helper.
			coordinates = intesection(coordinates, cellCoords)
		}
	}

	findTensorSlice (...coordinates) {
		// slice will be returned once populated.
		const slice = []

		// generate size & magnitudes from dimensions array.
		const size = this.map.size
		const degree = this.map.degree
		const magnitudes = this.map.magnitudes

		// this piece creates spacers or iterators.
		// if we have dimensions of [5,4,3] our spacers are:
		// [1,5,20]. The final item = total # of coordinates.
		for (let cellIndex; cellIndex < size; cellIndex++) {
			let validCellIndex = true

			// loop through each index in the dimensions array.
			// it maps to indices in magnitudes & coordinates too.
			for (let dimIndex; dimIndex < degree; dimIndex++) {

				// dimensions.length === magnitudes.length;
				// dimensions.length === coordinates.length;
				// their index associates one with the others.
				const dimension = dimensions[dimIndex]
				const magnitude = magnitudes[dimIndex]

				// retrieve current input coordinate.
				const coordinate = coordinates[dimIndex]

				// calculate resulting coordinate.
				const result = Math.floor(
					cellIndex / magnitude % dimension
				)

				if (result !== coordinate) {
					// result doesn't coorespond with given coordinate.
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
}
