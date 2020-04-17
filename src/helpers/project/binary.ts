import {
	getMagnitudes,
	getSize,
} from '../project'
import {range} from '../main'

/***********************************************************
the following methods support cell lookup.
with an index, you can determine coordinates.
with coordinates, you get an index.
with partial coordinates, you get a slice. neato!
***********************************************************/

export const getCoordinates = (
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
export const getTensorSlice = (
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

export const isIndexValid = (
	size:number,
	id:number,
): boolean => {
	return 0 <= id && id < size
}

export const areNeighbors = (
	dimensions: Array<number>,
	size: number,
	id01: number,
	id02: number,
) => {
	// validate both indices first.
	if (!isIndexValid(size, id01) || !isIndexValid(size, id02)) {
		return false
	}

	// calculate coordinates.
	const coordinates1:Array<number> = getCoordinates(dimensions, id01)
	const coordinates2:Array<number> = getCoordinates(dimensions, id02)

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

export const getNeighbors = (
	rose: Record<string, number>,
	dimensions: Array<number>,
	size: number,
	id01: number,
): Record<string, number> => {

	// initialize return container.
	const neighbors: Record<string, number> = {}

	// set up loop over keys and values.
	const entries: Array<[string, number]> = Object.entries(rose)
	for (const [direction, modifier] of entries) {

		// calculate potential neighbor via modifier.
		const id02: number = id01 + modifier

		// validate neighbor & add to list.
		if (areNeighbors(dimensions, size, id01, id02)) {
			neighbors[direction] = id01 + modifier
		}
	}

	// return list of neighbors.
	return neighbors
}
