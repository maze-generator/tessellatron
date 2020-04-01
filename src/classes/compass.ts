import {
	getSize,
	getMagnitudes,
	getDirections,
	getDiametrics,
} from '../helpers/project'

 class Compass {
	protected readonly dimensions:Array<number>
	protected _rose: {[key:string]:number}
	constructor (
		dimensions:Array<number>
	) {
		this._rose = {}
		// set defaults for typescript
		this.dimensions = dimensions

		// calibrate rose
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

	// @ts-ignore -> must be public
	public get rose ():{[key:string]:number} {
		return this._rose
	}

	// @ts-ignore -> must be protected or private
	protected set rose (
		rose:{[key:string]:number}
	):void {
		// first, set the internal rose as expected.
		this._rose = rose
	}

	public reverse(direction:string):string {
		// directly pulling from `diametrics` would be easy...
		// ...but, it seems more semantic using a method here!
		return this.diametrics[direction]
	}
}

// a tetragon is a four-sided polygon.
// a quadrilateral is a four-angled polygon.
// they mean the same thing.
export class TetragonCompass extends Compass {
	constructor (
		dimensions:Array<number>
	) {
		super(dimensions)
		// deconstruct magnitudes for each axis.
		const [x, y] = this.magnitudes
		// generate a rose of index-offsetters.
		this.rose = {
			'north': -y,
			'south': +y,
			'east':  +x,
			'west':  -x,
		}
	}

	slice (
		coordinates:Array<number|undefined>
	):Array<number> {
		return binarySlice(this.dimensions, coordinates)
	}

	triangulate (
		index:number
	):Array<number> {
		return binaryTriangulate(this.dimensions, index)
	}
}

// a hexahedron is a six-sided polyhedron.
export class HexahedronCompass extends Compass {
	constructor (
		dimensions:Array<number>
	) {
		super(dimensions)
		// deconstruct magnitudes for each axis.
		const [x, y, z] = this.magnitudes
		// generate a rose of index-offsetters.
		this.rose = {
			'above': -z,
			'below': +z,
			'north': -y,
			'south': +y,
			'east':  -x,
			'west':  +x,
		}
	}

	slice (
		coordinates:Array<number|undefined>
	):Array<number> {
		return binarySlice(this.dimensions, coordinates)
	}
}

// a hexahedron is a six-sided polygon.
export class HexagonCompass extends Compass {
	constructor (
		dimensions:Array<number>
	) {
		super(dimensions)
		// deconstruct magnitudes for each axis.
		const [x, y] = this.magnitudes
		// generate a rose of index-offsetters.
		this.rose = {
			'northwest': -y,
			'southeast': +y,
			'northeast': x - y,
			'southwest': y - x,
			'east': -x,
			'west': +x,
		}
	}
}



const binaryTriangulate = (
	dimensions:Array<number>,
	index:number,
):Array<number> => {
	const coordinates:Array<number> = []
	dimensions.forEach((
		currentDimension:number,
		positionIndex:number,
	):void => {
		const leadingDimensions:Array<number> = dimensions.slice(0, positionIndex)
		const magnitude:number = leadingDimensions.reduce((
			a:number,
			b:number,
		):number => {
			return a * b
		}, 1)
		const coordinate:number = Math.floor(index / magnitude) % currentDimension
		coordinates.push(coordinate)
	})
	return coordinates
}


// binarySlice takes in the map's dimensions,
// and then the cell's coordinates.
// it returns a slice of the desired coordinates.
const binarySlice = (
	dimensions:Array<number>,
	coordinates:Array<number|undefined>,
):Array<number> => {

	const size:number = dimensions.reduce((
		a:number,
		b:number,
	):number => {
		return a * b
	})

	const allCells:Array<number> = [...Array(size).keys()]
	const validCells:Array<number> = []

	// this piece creates spacers or iterators.
	// if we have dimensions of [5,4,3] our spacers are:
	// [1,5,20,60]. The final item = total # of coordinates.
	allCells.forEach((
		cellIndex:number
	):void => {
		let isValid:boolean = true

		coordinates.forEach((
			currentPosition:number|undefined,
			positionIndex:number,
		):void => {
			if (currentPosition !== undefined) {
				const currentDimension:number = dimensions[positionIndex]
				const previousDimensions:Array<number> = dimensions.slice(0, positionIndex)
				const magnitude:number = previousDimensions.reduce((
					a:number,
					b:number,
				):number => {
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
	})
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
