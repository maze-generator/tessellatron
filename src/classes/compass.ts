export default class Compass {
	protected readonly _magnitudes:Array<number>
	protected _magnets: {[key:string]:number}
	public opposites: {[key:string]:string}
	public directions: Set<string>
	constructor (
		dimensions:Array<number>
	) {
		// create a multiplier affect for magnitudes.
		const magnitudes:Array<number> = []
		const multiplier = (a:number, b:number):number => a * b
		// loop through the size of each dimension.
		Object.keys(dimensions).forEach((
			_:any,
			index:number,
		) => {
			magnitudes.push(
				dimensions.slice(0, index).reduce(multiplier, 1)
			)
		})
		this._magnitudes = magnitudes
		this._magnets = {}
		this.opposites = {}
		this.directions = new Set()
	}

	public get rose ():{[key:string]:number} {
		return this._magnets
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
		for (const direction in this.directions) {
			const vector:number = this.rose[direction]
			// TODO -> bad `|| 'none'`
			const reversed:string = vectors.get(-vector) || 'none'
			// here is where reverse-directions is set!
			this.opposites[direction] = reversed
		}

		// finally, just return the new rose as the new magnets.
		this._magnets = rose
	}

	public reverse(direction:string):string {
		// directly pulling from `opposites` would be easy...
		// ...but, it seems more semantic using a method here!
		return this.opposites[direction]
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
		const [x, y] = this._magnitudes
		// generate a rose of index-offsetters.
		this.rose = {
			'north': -y,
			'south': +y,
			'east':  +x,
			'west':  -x,
		}
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
