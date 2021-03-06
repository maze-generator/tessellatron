import Cell from '../cell.js'

// multiply is a reducer function.
const multiply = (a, b) => a * b

// initialize normal directions.
const namedVectors = [
	['east', 'west'],
	['south', 'north'],
	['down', 'up'],
	['ana', 'kata'],
]


/***********************************************************
This hypercube class can work with different dimensions.
Why a "hypercube"? Because a hypercube is N-Dimensional.
- a 0D point is a type of hypercube.
- a 1D line is a type of hypercube.
- a 2D square is a type of hypercube.
- a 3D cube is a type of hypercube.
- a 4D tesseract is a type of hypercube.
- a ND analogue of these shapes is a type of hypercube.

If each Cell is a box, a 2D HypercubeGraph looks like this:
┌─┬─┬─┐
├─┼─┼─┤
├─┼─┼─┤
└─┴─┴─┘

***********************************************************/

export default class HypercubeGraph {

	constructor (dimensions) {


		/* CALCULATE MAP INFORMATION */

		// the layout is a hypercube, as defined by this class.
		this.layout = 'hypercube'

		// the `dimensions` represent the lengths of each edge.
		// this includes the width, height, depth, etc.
		this.dimensions = dimensions

		// the `degree` counts how many dimensions there are.
		// for example, a square has two, and a cube has three.
		this.degree = dimensions.length

		// multiply the dimensions together to get `size` param.
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
		this.size = dimensions.reduce(multiply, 1)

		// The `magnitudes` are how much an index must move as
		// to offset an associated coordinate by exactly one.
		// For example, moving east 1 unit might take 1 index,
		// but moving south 1 unit might take 10 indices.
		this.magnitudes = []

		// loop through dimensions via each degree `dg`.
		for (let dg = 0; dg < this.degree; dg += 1) {

			// collect antecedent dimensions leading up to here.
			const previous = dimensions.slice(0, dg)

			// calculate the product of those dimensions.
			const product = previous.reduce(multiply, 1)

			// add the product to the list of magnitudes.
			this.magnitudes.push(product)
		}


		/* CALCULATE COMPASS INFORMATION */

		// the `rose` describes the offset in each direction.
		// its extremely useful for computing neighbors.
		this.compass = {}

		// `antipodes` define the opposite of each direction.
		this.antipodes = {}

		// this special `ordinals` array relates to antipodes.
		// its important just in case some of the dimensions are valued at 1.
		this.ordinals = []


		// the app gets all three from magnitudes.
		for (let dg = 0; dg < this.degree; dg++) {

			// use positive / negative as default key.
			let positive = `pos-${dg}`
			let negative = `neg-${dg}`

			// obtain normal direction
			const namedVector = namedVectors[dg]
			if (namedVector !== undefined) {
				[positive, negative] = namedVector
			}

			// obtain magnitude
			const magnitude = this.magnitudes[dg]

			// assign values to dictionaries via keys.
			this.compass[negative] = -magnitude
			this.compass[positive] = +magnitude
			this.antipodes[negative] = positive
			this.antipodes[positive] = negative
			this.ordinals.push(new Set([positive, negative]))
		}

		// `directions` can help with loops, etc.
		this.directions = new Set(Object.keys(this.compass))

		// set default passages container
		const defaultPassages = {}

		// loop over directions as keys.
		// false is the default value here.
		for (let direction of this.directions) {
			defaultPassages[direction] = false
		}


		/* FILL MAP DATA */

		// `data` is an array that holds Cells.
		// every Cell themself can also hold information.
		this.data = []

		// fill map data with empty cells.
		for (let id = 0; id < this.size; id++) {
			// create a new cell using the id from size.
			this.data[id] = new Cell(id)

			// populate neighbors of this cell.
			this.data[id].neighbors = this.findNeighborsOf(id)

			// create a shallow copy of defaultPassages.
			this.data[id].passages = {...defaultPassages}
		}
	}


	holdsIndex (id) {

		// a valid index has an index in the array.
		return 0 <= id && id < this.size
	}


	holdsNeighbors (id01, id02) {

		// validate both indices first.
		if (!this.holdsIndex(id01) || !this.holdsIndex(id02)) {
			return false
		}

		// calculate coordinates.
		const coordinates01 = this.findCoordinates(id01)
		const coordinates02 = this.findCoordinates(id02)

		// count how many times is there an off-by-one match.
		// if these IDs are neighbors, it happens exactly once.
		let counter = 0

		// loop through each coordinate.
		// all coordinates but one must match.
		// dg is shorthand for the current degree.
		for (let dg = 0; dg < this.degree; dg++) {

			const coordinate01 = coordinates01[dg]
			const coordinate02 = coordinates02[dg]

			// ensure values are not undefined.
			if (
				coordinate01 === undefined
				|| coordinate02 === undefined
			) {
				return false
			} else {

				// set up difference variable.
				const difference = Math.abs(coordinate01 - coordinate02)

				// check if-gates
				if (difference === 0) {
					// do nothing; continue
				} else if (difference === 1) {
					counter += 1
				} else {
					return false
				} if (counter > 1) {
					return false
				}
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
		const cell01 = this.data[id01]
		const cell02 = this.data[id02]

		// `antipode` is the polar opposite of a direction.
		// for example, `antipode` of 'north' is 'south'.
		const antipode = this.antipodes[direction]

		// set passages.
		cell01.passages[direction] = true
		cell02.passages[antipode] = true
	}


	connectNeighbor (direction, id01, id02) {

		// get instances of cells.
		const cell01 = this.data[id01]
		const cell02 = this.data[id02]

		// `antipode` is the polar opposite of a direction.
		// for example, `antipode` of 'north' is 'south'.
		const antipode = this.antipodes[direction]

		// set neighbors.
		cell01.neighbors[direction] = id02
		cell02.neighbors[antipode] = id01
	}


	findNeighborsOf (id01) {

		// initialize return container.
		const neighbors = {}

		// calculate whether the id exists.
		const exist01 = this.holdsIndex(id01)

		// if id01 does not exist, then return an empty object.
		if (!exist01) {
			return neighbors
		}

		// track all modifiers used in the loop.
		let usedModifiers = new Set()

		// set up loop over the directions via opposite-ordinals.
		// bigger-magnitude directions come first.
		for (const directions of [...this.ordinals].reverse()) {
			for (const direction of directions) {
				const modifier = this.compass[direction]

				// calculate potential neighbor via modifier.
				const id02 = id01 + modifier

				// skip any "stale" modifiers.
				// it happens with dimensions of length one!
				if (usedModifiers.has(modifier)) {
					neighbors[direction] = null
				}

				// ensure both IDs are valid, and add to neighbors.
				else if (this.holdsNeighbors(id01, id02)) {
					neighbors[direction] = id02
					usedModifiers.add(modifier)
				}

				// if they are not, then the neighbor is void.
				// id01 must be a corner- or edge-piece.
				else {
					neighbors[direction] = null
				}
			}
		}

		// return list of neighbors.
		return neighbors
	}


	findCoordinates (...indexTensor) {

		// this container will be reduced once populated.
		const containerOfCoordinates = []

		// loop through all given indices in the tensor.
		for (const id of indexTensor) {

			// set up coordinates array for given index.
			const coordinates = []

			// loop through each degree.
			// dg is shorthand for the current degree.
			// this maps to an index in dimensions.
			// it also maps to an index in magnitudes.
			for (let dg = 0; dg < this.degree; dg++) {

				// dimensions.length === magnitudes.length;
				// their index associates one with the other.
				const dimension = this.dimensions[dg]
				const magnitude = this.magnitudes[dg]

				// calculate resulting coordinate
				// for this dimension (eg longitude vs latitude)
				// and for this index.
				const coordinate = Math.floor(
					id / magnitude % dimension
				)

				// push coordinate into array.
				// remember: these coordinates are only for this id.
				coordinates.push(coordinate)
			}

			// add array of coordinates to array.
			containerOfCoordinates.push(coordinates)
		}

		// create a reducer function that compares
		// the coordinates of two indices.
		// each coordinate is kept if they match.
		// otherwise, they are replaced with undefined.
		const reducer = (xCoords, yCoords) => {

			// zCoords represents the reduced array.
			const zCoords = []

			// loop through each dimension.
			// remember: the number of dimensions here
			// is equal the degree of the graph.
			// dg is shorthand for the current degree.
			for (let dg = 0; dg < this.degree; dg++) {

				// grab the coordinate of both sets of coordinates.
				const coordinate01 = xCoords[dg]
				const coordinate02 = yCoords[dg]

				// if either coordinate is undefined, its a no-match.
				if (
					coordinate01 === undefined
					|| coordinate02 === undefined
				) {
					zCoords[dg] = undefined

				// verify if this dimension's coordinates match.
				} else if (coordinate01 === coordinate02) {
					zCoords[dg] = coordinate01

				// otherwise it is definately not a match.
				} else {
					zCoords[dg] = undefined
				}
			}

			// zCoords represents matching entries between two
			// potentially similar arrays, and their differences.
			// its analogous to an intersection of two sets.
			return zCoords
		}

		// utilize the reducer function.
		const results = containerOfCoordinates.reduce(reducer)

		// the final zCoords from the reducer explains
		// what coordinates match for every index given.
		// an undefined entry means there is no match there.
		return results
	}


	findTensorSlice (...coordinates) {

		// slice will be returned once populated.
		const slice = []

		// this piece creates spacers or iterators.
		// if we have dimensions of [5,4,3] our spacers are:
		// [1,5,20]. The final item = total # of coordinates.
		for (let id = 0; id < this.size; id++) {
			let idIsValid = true

			// dg is shorthand for the current degree.
			// it maps to indices in dimensions, magnitudes, and coordinates.
			for (let dg = 0; dg < this.degree; dg++) {
				// grab current variables associated with degree.
				const dimension = this.dimensions[dg]
				const magnitude = this.magnitudes[dg]
				const coordinate01 = coordinates[dg]

				// calculate the actual coordinate of the index.
				const coordinate02 = Math.floor(
					id / magnitude % dimension
				)

				// a given coordinate of undefined is a wildcard.
				if (coordinate01 === undefined || coordinate02 === undefined) {
					// pass; exit if-gate

				// check for matching coordinates.
				} else if (coordinate01 === coordinate02) {
					// pass; id is valid in this dimension.

				// in this dimension, the id's coordinate
				// does not match the given coordinate.
				} else {
					idIsValid = false
					break
				}
			}

			// if positive results, add to slice to return later.
			if (idIsValid) {
				slice.push(id)
			}
		}

		// return populated slice container.
		return slice
	}


	get json () {

		// parse json of each cell, in order of id.
		const stringyCells = []
		for (const cell of this.data) {

			// add to cells array.
			stringyCells.push(JSON.parse(cell.json))
		}

		// create object for json.
		const jsObject = {
			'layout': this.layout,
			'dimensions': this.dimensions,
			'magnitudes': this.magnitudes,
			'degree': this.degree,
			'size': this.size,
			'compass': this.compass,
			'directions': [...this.directions],
			'antipodes': this.antipodes,
			'data': stringyCells,
		}

		return JSON.stringify(jsObject, null, 2)
	}
}
