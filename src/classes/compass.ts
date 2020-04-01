export default class Compass {
	protected readonly _dimensions:Array<number>
	protected readonly _magnitudes:Array<number>
	protected _rose: {[key:string]:number}
	public opposites: {[key:string]:string}
	public directions: Set<string>
	constructor (
		dimensions:Array<number>
	) {
		this._dimensions = dimensions
		this._magnitudes = this.calculateMagnitudes()
		this._rose = {}
		this.opposites = {}
		this.directions = new Set()
	}

	private calculateMagnitudes () {
		// a magnitude is the amount of indices to travel
		// to shift the nth coordinate by one.
		// for example, to get from [1, 4, 6] to [1, 5, 6].
		// each dimension has an associated magnitude.
		const magnitudes:Array<number> = []

		// create a mini-multiplier reducer function.
		const multiplier = (a:number, b:number):number => a * b

		// loop through the this._dimensions via index, `i`.
		for (
			let i:number = 0;
			i < this._dimensions.length;
			i += 1
		) {
			// collect dimensions leading up to current dimension.
			const previous:number[] = this._dimensions.slice(0, i)
			// calculate the product of those dimensions.
			const product:number = previous.reduce(multiplier, 1)
			// add the product to the list of magnitudes.
			magnitudes.push(product)
		}

		// magnitudes is useful just for this.
		return magnitudes
	}

	public get rose ():{[key:string]:number} {
		return this._rose
	}

	public set rose (
		rose:{[key:string]:number}
	) {
		// `directions` is a simple set of named vectors.
		// luckily, these are exactly the keys of `rose`.
		this.directions = new Set(Object.keys(rose))

		// `opposites` is a harder nut to crack.
		// the app reverses the keys into a JavaScript Map.
		// since the keys are numbers, they can be inverted.
		// use that to find the opposing direction string.
		const reducer = (
			map:Map<number, string>,
			direction:string,
		):Map<number, string> => {
			// compute the `vector` of the direction.
			map.set(rose[direction], direction)
			return map
		}
		const vectors:Map<number, string> = (
			// set the `vectors` into a map with reduce.
			Object.keys(rose).reduce(reducer, new Map())
		)
		// initialize opposites.
		this.opposites = {}
		for (const direction of this.directions) {
			const vector:number = rose[direction]
			// TODO -> bad `|| 'none'`
			const reversed:string = vectors.get(-vector) || ':('
			// here is where reverse-directions is set!
			this.opposites[direction] = reversed
		}

		// finally, just return the new rose as the new magnets.
		this._rose = rose
	}

	public reverse(direction:string):string {
		// directly pulling from `opposites` would be easy...
		// ...but, it seems more semantic using a method here!
		return this.opposites[direction]
	}

	public offset (
		index:number,
	):{[key:string]:number} {
		const offset:{[key:string]:number} = {}
		for (const [direction, modifier] of Object.entries(this.rose)) {
			offset[direction] = index + modifier
		}
		return offset
	}
}

const triangulator = (
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


// tetragonSlicer takes in the map's dimensions,
// and then the cell's coordinates.
// it returns a slice of the desired coordinates.
const tetragonSlicer = (
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

// a tetragon is a four-sided polygon.
// a quadrilateral is a four-angled polygon.
// they mean the same thing.
export class TetragonCompass extends Compass {
	constructor (
		dimensions:Array<number>
	) {
		super(dimensions)
		// deconstruct magnitudes for each axis.
		const [x, y] = this._magnitudes
		// generate a rose of index-offsetters.
		this.rose = {
			'north': -y,
			'south': +y,
			'east':  +x,
			'west':  -x,
		}
	}

	slicer (
		coordinates:Array<number|undefined>
	):Array<number> {
		return tetragonSlicer(this._dimensions, coordinates)
	}

	triangulator (
		index:number
	):Array<number> {
		return triangulator(this._dimensions, index)
	}
}

// a hexahedron is a six-sided polyhedron.
export class HexahedronCompass extends Compass {
	constructor (
		dimensions:Array<number>
	) {
		super(dimensions)
		// deconstruct magnitudes for each axis.
		const [x, y, z] = this._magnitudes
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

	slicer (
		coordinates:Array<number|undefined>
	):Array<number> {
		return tetragonSlicer(this._dimensions, coordinates)
	}
}

// a hexahedron is a six-sided polygon.
export class HexagonCompass extends Compass {
	constructor (
		dimensions:Array<number>
	) {
		super(dimensions)
		// deconstruct magnitudes for each axis.
		const [x, y] = this._magnitudes
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

/***************************NOTES***************************
==NOTE==
- `Compass` is a default class so that it can be typecast.

==TODO==
- the for loop in the primary class is suboptimal.
- `this._magnitudes` is not the greatest name; rename it.
***********************************************************/
