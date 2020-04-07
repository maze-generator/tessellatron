import {range} from '../helpers/series'

// create a mini-multiplier reducer function.
const multiply = (a:number, b:number):number => a * b

/***********************************************************
This section includes helper functions for `dimensions`.
Given the `dimensions` array, the application can find:
- the total `size` of the map
- the `magnitudes` of the each given dimension

These properties are important for initializing the map,
and for calculating the coordinates of a particular index.
***********************************************************/

export const getSize = (
	dimensions: Array<number>,
):number => {
	// calculate `size` of the maze, aka the number of cells.
	return dimensions.reduce(multiply, 1)
	// == EDGE CASE ==
	// the value of the nth-dimension is implicitly 1.
	// for example, the 3rd-dimension of [2,3] is 1.
	// it follows that the 1st-dimension of [] is also 1.
	// thus, this function returns 1 if given an empty array.
}

export const getMagnitudes = (
	dimensions: Array<number>,
):Array<number> => {
	// the `magnitudes` are how much an index must move as
	// to offset an associated coordinate by exactly one.
	const magnitudes = []
	// loop through dimensions via each index, `i`.
	for (let i:number = 0; i < dimensions.length; i += 1) {
		// collect antecedent dimensions leading up to here.
		const previous:number[] = dimensions.slice(0, i)
		// calculate the product of those dimensions.
		const product:number = previous.reduce(multiply, 1)
		// add the product to the list of magnitudes.
		magnitudes.push(product)
	}
	return magnitudes
	// == NOTE ==
	// this function supports non-variable dimensions.
	// for example, each row holds the same number of cells.
}

/***********************************************************
This section includes helper functions for a compass `rose`.
Given a `rose` object, the application can find:
- a set of supported `directions`
- a the polar opposite of each direction, or `diametric`.

These properties are important for orienting cells in place.
***********************************************************/

export const getDirections = (
	rose: Record<string, number>
) => {
	// `directions` is a simple set of named vectors.
	// luckily, these are exactly the keys of the `rose`.
	return new Set(Object.keys(rose))
}

export const getDiametrics = (
	rose: Record<string, number>
) => {
	// `diametrics` is a harder nut to crack.
	// it pairs directions with their respective opposites.

	// first, we do need `directions`.
	const directions = getDirections(rose)

	// reverse the keys into a JavaScript Map, `vectors`.
	// the keys are numbers, so they can be made negative.
	// use that to find the opposing direction string.
	const reverse = (
		reverseMap: Map<number, string>,
		direction: string,
	): Map<number, string> => {
		reverseMap.set(rose[direction], direction)
		return reverseMap
	}
	const vectors: Map<number, string> = (
		// set the `vectors` into a map with reduce.
		[...directions].reduce(reverse, new Map())
	)

	// initialize diametrics.
	const diametrics: Record<string, string> = {}
	for (const direction of directions) {
		const vector: number = rose[direction]
		// TODO -> bad `|| 'none'`...
		// TODO -> its a frowny face for goodness sake!
		const reversed: string = vectors.get(-vector) || ':('
		// here is where reverse-directions is set!
		diametrics[direction] = reversed
	}
	return diametrics
}

/***********************************************************
the following methods support cell lookup.
with an index, you can determine coordinates.
with coordinates, you get an index.
with partial coordinates, you get a slice. neato!
***********************************************************/

export const binaryTriangulate = (
	dimensions: Array<number>,
	cellIndex: number,
): Array<number> => {
	// coordinates will be returned once populated.
	const coordinates: Array<number> = []

	// generate magnitudes from dimensions array.
	const magnitudes: Array<number> = getMagnitudes(dimensions)

	// loop through each index in the dimensions array.
	// it maps to indices in magnitudes as well.
	for (const dimIndex of range(0, dimensions.length)) {
		// dimensions.length === magnitudes.length;
		// their index associates one with the other.
		const dimension: number = dimensions[dimIndex]
		const magnitude: number = magnitudes[dimIndex]

		// calculate resulting coordinate.
		const result: number = Math.floor(
			cellIndex / magnitude % dimension
		)

		// push into array.
		coordinates.push(result)
	}
	return coordinates
}

// binarySlice takes in the map's dimensions,
// and then the cell's coordinates.
// it returns a slice of the desired coordinates.
export const binaryTensorSlice = (
	dimensions: Array<number>,
	coordinates: Array<number|undefined>,
): Array<number> => {
	// slice will be returned once populated.
	const slice: Array<number> = []

	// generate size & magnitudes from dimensions array.
	const size: number = getSize(dimensions)
	const magnitudes: Array<number> = getMagnitudes(dimensions)

	// this piece creates spacers or iterators.
	// if we have dimensions of [5,4,3] our spacers are:
	// [1,5,20]. The final item = total # of coordinates.
	for (const cellIndex of range(0, size)) {
		let validCellIndex: boolean = true

		// loop through each index in the dimensions array.
		// it maps to indices in magnitudes & coordinates too.
		for (const dimIndex of range(0, dimensions.length)) {
			// dimensions.length === magnitudes.length;
			// dimensions.length === coordinates.length;
			// their index associates one with the others.
			const dimension: number = dimensions[dimIndex]
			const magnitude: number = magnitudes[dimIndex]

			// retrieve current input coordinate.
			const coordinate: number|undefined = coordinates[dimIndex]

			// calculate resulting coordinate.
			const result: number = Math.floor(
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

/***********************************************************
validate two neighbors
***********************************************************/

export const indexIsWithinBounds = (
	id:number,
	size:number,
):boolean => {
	return 0 <= id && id < size
}

export const indicesAreNeighbors = (
	id1: number,
	id2: number,
	size: number,
	dimensions: Array<number>,
) => {
		// validate both indices first.
		if (!indexIsWithinBounds(id1, size) || !indexIsWithinBounds(id2, size)) {
			return false
		}

		// calculate coordinates.
		const coordinates1:Array<number> = binaryTriangulate(dimensions, id1)
		const coordinates2:Array<number> = binaryTriangulate(dimensions, id2)

		// loop through each coordinate.
		// all coordinates but one must match.
		let counter = 0
		for (const coorIndex in range(0, coordinates1.length)) {
			// set up variables
			const coor1:number = coordinates1[coorIndex]
			const coor2:number = coordinates2[coorIndex]
			const difference:number = Math.abs(coor1 - coor2)
			// check if-gates
			if (difference === 0) {
				// do nothing
			} else if (difference === 1) {
				counter += 1
			} else {
				break
			} if (counter > 1) {
				break
			}
		} if (counter === 1) {
			return true
		} else {
			return false
		}
}
