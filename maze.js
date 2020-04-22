import Cell from './cell.js'

// multiply & intersect are reducer functions.
const multiply = (a, b) => a * b
const intersect = (a, b) => a.filter(x => b.includes(x))


// main content
export default class Maze {
	constructor (dimensions) {

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

		// the `rose` describes the offset in each direction.
		// its extremely useful for computing neighbors.
		const rose = {}

		// `antipodes` define the opposite of each direction.
		const antipodes = {}

		// the app gets both from magnitudes.
		for (const [strID, magnitude] of Object.entries(magnitudes)) {

			// use positive / negative as key.
			const positive = `pos-${strID}`
			const negative = `neg-${strID}`

			// assign values to dictionaries via keys.
			rose[negative] = -magnitude
			rose[positive] = +magnitude
			antipodes[negative] = positive
			antipodes[positive] = negative
		}

		// `directions` can help with loops, etc.
		const directions = new Set(Object.keys(rose))

		// set default passages container
		const defaultPassages = {}

		// loop over directions as keys.
		// false is the default value here.
		for (let direction of directions) {
			defaultPassages[direction] = false
		}

		/* ASSIGN TO CLASS */

		// map contains location and magnitude data.
		this.map = {
			dimensions,
			degree,
			magnitudes,
			size,
		}

		// compass contains relative direction data.
		this.compass = {
			rose,
			directions,
			antipodes,
		}

		/* FILL MAP DATA */

		// create data container
		const data = []

		// fill map data with empty cells.
		for (let id = 0; id < size; id++) {
			data[id] = new Cell(id)
			data[id].neighbors = this.findNeighborsOf(id)
			data[id].passages = defaultPassages
		}

		// assign to class
		this.map.data = data
	}

	holdsIndex (id) {

		// a valid index has an index in the array.
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

		// how many times is there an off-by-one match?
		// if these IDs are neighbors, it happens exactly once.
		let counter = 0

		// loop through each coordinate.
		// all coordinates but one must match.
		// dg is shorthand for the current degree.
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


	findNeighborsOf (id01) {

		// initialize return container.
		const neighbors = {}

		// calculate whether the id exists.
		const exist01 = this.holdsIndex(id01)

		// if id01 does not exist... return an empty object.
		if (!exist01) {
			return neighbors
		}

		// set up loop over keys and values.
		const entries = Object.entries(this.compass.rose)
		for (const [direction, modifier] of entries) {

			// calculate potential neighbor via modifier.
			const id02 = id01 + modifier
			const exist02 = this.holdsIndex(id02)

			if (this.holdsNeighbors(id01, id02)) {
				// validate neighbor & add to list.
				neighbors[direction] = id01 + modifier
			} else {
				// neighbor is a boundary.
				neighbors[direction] = null
			}
		}

		// return list of neighbors.
		return neighbors
	}


	findCoordinates (...indexTensor) {
		const cellIndex = indexTensor[0]
		// set up return container.
		const containerOfCoordinates = []

		// loop through all given indices in the tensor.
		for (const strID of indexTensor) {
			const id = parseInt(strID)

			// set up group for given index.
			const coordinates = []

			// loop through each degree.
			// this maps to an index in dimensions.
			// it maps to an index in magnitudes as well.
			for (let dg = 0; dg < this.map.degree; dg++) {

				// dimensions.length === magnitudes.length;
				// their index associates one with the other.
				const dimension = this.map.dimensions[dg]
				const magnitude = this.map.magnitudes[dg]

				// calculate resulting coordinate.
				const coord = Math.floor(id / magnitude % dimension)

				// push into array.
				coordinates.push(coord)
			}

			// add array of coordinates to array.
			containerOfCoordinates.push(coordinates)
		}

		// create a reducer function.
		const reducer = (x, y) => {
			const z = []
			for (let id = 0; id < x.length; id++) {
				const id01 = x[id]
				const id02 = y[id]

				if (id01 === id02) {
					z[id] = y[id] = x[id]
				} else {
					z[id] = undefined
				}
			}
			return z
		}

		// utilize the reducer function.
		const results = containerOfCoordinates.reduce(reducer)

		// BECOME the reducer function!
		return results
	}


	findTensorSlice (...coordinates) {

		// slice will be returned once populated.
		const slice = []

		// generate size & magnitudes from dimensions array.
		const size = this.map.size
		const degree = this.map.degree
		const magnitudes = this.map.magnitudes
		const dimensions = this.map.dimensions

		// this piece creates spacers or iterators.
		// if we have dimensions of [5,4,3] our spacers are:
		// [1,5,20]. The final item = total # of coordinates.
		for (let cellIndex = 0; cellIndex < size; cellIndex++) {
			let validCellIndex = true

			// loop through each index in the dimensions array.
			// it maps to indices in magnitudes & coordinates too.
			for (let dimIndex = 0; dimIndex < degree; dimIndex++) {

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

				if (coordinate === undefined) {
					// pass!
				} else if (result !== coordinate) {
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
