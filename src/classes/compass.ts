export default class Compass {
	protected readonly magnitudes:Array<number>
	protected readonly rose:{[key:string]:number}
	constructor (
		dimensions:Array<number>
	) {
		// create a multiplier affect for magnitudes.
		const magnitudes = []
		const multiplier = (a:number, b:number):void => a * b
		// loop through the size of each dimension.
		for (const index in Object.keys(dimensions)) {
			magnitudes.push(
				dimensions.slice(0, index).reduce(multiplier, 1)
			)
		}
		this.magnitudes = magnitudes
	}

	protected set rose (
		rose:{[key:string]:number}
	):{[key:string]:number} {
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
			const reversed:string = vectors.get(-vector)
			// here is where reverse-directions is set!
			this.opposites[direction] = reversed
		}

		// finally, just return the rose to set.
		return rose
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
		const [x, y] = this.magnitudes
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

/***************************NOTES***************************
==NOTE==
- `Compass` is a default class so that it can be typecast.

==TODO==
- the for loop in the primary class is suboptimal.
- `this.magnitudes` is not the greatest name; rename it.
***********************************************************/
