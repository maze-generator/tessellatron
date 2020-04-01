import {
	getSize,
	getMagnitudes,
	getDirections,
	getDiametrics,
} from '../helpers/project'
import {range} from '../helpers/series'

 class Compass {
	protected readonly dimensions: Array<number>
	protected rose: {[key: string]: number}
	constructor (
		dimensions: Array<number>
	) {
		this.dimensions = dimensions
		this.rose = {}
	}

	public get magnitudes () {
		return getMagnitudes(this.dimensions)
	}

	public get directions () {
		return getDirections(this.rose)
	}

	public get diametrics () {
		return getDiametrics(this.rose)
	}

	public reverse(direction: string): string {
		// directly pulling from `diametrics` would be easy...
		// ...but, it seems more semantic using a method here!
		return this.diametrics[direction]
	}
}

/***********************************************************
a tetragon is a four-sided polygon.
a quadrilateral is a four-angled polygon.
they represent the same thing...a square(ish) shape!

A finished map using this compass looks like this:
┌┬┬┐
├┼┼┤
├┼┼┤
└┴┴┘
***********************************************************/
export class TetragonCompass extends Compass {
	public readonly rose: {[key: string]: number}
	constructor (
		dimensions: Array<number>
	) {
		// extend various functions from base class.
		super(dimensions)
		// deconstruct magnitudes for each axis.
		const [x, y] = this.magnitudes
		// set a new rose of index-offsetters.
		this.rose = {
			'north': -y,
			'south': +y,
			'east':  +x,
			'west':  -x,
		}
	}

	public tensorSlice (
		...coordinates: Array<number|undefined>
	): Array<number> {
		return binaryTensorSlice(this.dimensions, coordinates)
	}

	public triangulate (
		index: number
	): Array<number> {
		return binaryTriangulate(this.dimensions, index)
	}
}


/***********************************************************
a hexahedron is a six-sided polyhedron.
standard 6-sided dice are a perfect example of this.
remember that you can stack dice in three dimensions,
and, in fact, thats how they package and ship in bulk.

A finished map using this compass looks like this:

layer 1:    layer 2:    layer 3:
┌┬┬┐        ┌┬┬┐        ┌┬┬┐
├┼┼┤        ├┼┼┤        ├┼┼┤
├┼┼┤        ├┼┼┤        ├┼┼┤
└┴┴┘        └┴┴┘        └┴┴┘
***********************************************************/

// a hexahedron is a six-sided polyhedron.
export class HexahedronCompass extends Compass {
	public readonly rose: {[key: string]: number}
	constructor (
		dimensions: Array<number>
	) {
		// extend various functions from base class.
		super(dimensions)
		// deconstruct magnitudes for each axis.
		const [x, y, z] = this.magnitudes
		// set a new rose of index-offsetters.
		this.rose = {
			'above': -z,
			'below': +z,
			'north': -y,
			'south': +y,
			'east':  -x,
			'west':  +x,
		}
	}

	public tensorSlice (
		...coordinates: Array<number|undefined>
	): Array<number> {
		return binaryTensorSlice(this.dimensions, coordinates)
	}

	public triangulate (
		index: number
	): Array<number> {
		return binaryTriangulate(this.dimensions, index)
	}
}


/***********************************************************
hexagons are interesting six-sided polygons.
despite having six sides, you can triangulate a cell
by knowing the location on the two of the three axis.

A finished map using this compass looks like this:
⬡ ⬡ ⬡
 ⬡ ⬡ ⬡
  ⬡ ⬡ ⬡
***********************************************************/

// a hexahedron is a six-sided polygon.
export class HexagonCompass extends Compass {
	public readonly rose: {[key: string]: number}
	constructor (
		dimensions: Array<number>
	) {
		// extend various functions from base class.
		super(dimensions)
		// deconstruct magnitudes for each axis.
		const [x, y] = this.magnitudes
		// set a new rose of index-offsetters.
		this.rose = {
			'east': -x,
			'west': +x,
			'northwest': -y,
			'southeast': +y,
			'northeast': x - y,
			'southwest': y - x,
		}
	}

	public tensorSlice (
		...coordinates: Array<number|undefined>
	): Array<number> {
		return binaryTensorSlice(this.dimensions, coordinates)
	}

	public triangulate (
		index: number
	): Array<number> {
		return binaryTriangulate(this.dimensions, index)
	}
}



const binaryTriangulate = (
	dimensions: Array<number>,
	index: number,
): Array<number> => {
	const coordinates: Array<number> = []
	dimensions.forEach((
		currentDimension: number,
		positionIndex: number,
	): void => {
		const leadingDimensions: Array<number> = dimensions.slice(0, positionIndex)
		const magnitude: number = leadingDimensions.reduce((
			a: number,
			b: number,
		): number => {
			return a * b
		}, 1)
		const coordinate: number = Math.floor(index / magnitude) % currentDimension
		coordinates.push(coordinate)
	})
	return coordinates
}


// binarySlice takes in the map's dimensions,
// and then the cell's coordinates.
// it returns a slice of the desired coordinates.
const binaryTensorSlice = (
	dimensions: Array<number>,
	coordinates: Array<number|undefined>,
): Array<number> => {

	const size: number = getSize(dimensions)
	const validCells: Array<number> = []

	// this piece creates spacers or iterators.
	// if we have dimensions of [5,4,3] our spacers are:
	// [1,5,20]. The final item = total # of coordinates.
	for (const cellIndex of range(0, size)) {
		let isValid: boolean = true

		coordinates.forEach((
			currentPosition: number|undefined,
			positionIndex: number,
		): void => {
			if (currentPosition !== undefined) {
				const currentDimension: number = dimensions[positionIndex]
				const previousDimensions: Array<number> = dimensions.slice(0, positionIndex)
				const magnitude: number = previousDimensions.reduce((
					a: number,
					b: number,
				): number => {
					return a * b
				}, 1)

				// check if the cell index is valid right now...
				if (Math.floor(cellIndex / magnitude) % currentDimension !== currentPosition) {
					isValid = false
				}
			}
		})
		if (isValid) {
			validCells.push(cellIndex)
		}
	}
	return validCells
}

export default TetragonCompass

/***************************NOTES***************************
==NOTE==
- `Compass` is a default class so that it can be typecast.

==TODO==
- the for loop in the primary class is suboptimal.
- `this.magnitudes` is not the greatest name; rename it.
***********************************************************/
