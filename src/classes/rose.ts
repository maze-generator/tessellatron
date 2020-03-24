class Rose {
	protected readonly magnitudes:Array<number>
	public readonly rose:{[key:string]:number}
	constructor (
		protected readonly dimensions:Array<number>
	) {
		// create a multiplier affect for magnitudes.
		const magnitudes = []
		for (const index in Object.keys(dimensions)) {
			magnitudes.push(
				dimensions.slice(0, index).reduce((a, b) => a * b, 1)
			)
		}
		this.magnitudes = magnitudes
	}
}

// a tetragon is a four-sided polygon.
// a quadrilateral is a four-angled polygon.
// they mean the same thing.
export class TetragonRose extends Rose {
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
export class HexahedronRose extends Rose {
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
export class HexagonRose extends Rose {
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
