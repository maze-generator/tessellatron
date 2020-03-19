class DimensionalCompass {
	private dimensions:Array<[string, string]>
	private reversals:{[key:string]:string}
	constructor (
		dimensions:Array<[string, string]> = [
			['north', 'south'],
			['west', 'east'],
		]
	) {
		// `dimensions` helps describe whether an object is
		// 2nd-dimensional, 3rd-dimensional, or Nth-dimensional.
		this.dimensions = dimensions

		// `reversals` describes polar opposites, or antipodes.
		// this will populate when dimensions is looped through.
		this.reversals = {}

		// a `reversal` is the antipode of a direction.
		// for example, the `reversal` of 'north' is 'south'.
		for (const [direction, reversal] of this.dimensions) {
			// add to reversals.
			this.reversals[direction] = reversal
			this.reversals[reversal] = direction
		}
	}

	public get directions():Set<string> {
		// `directions` is a simple set of named vectors.
		// luckily, these are exactly the keys of reversals!
		return new Set(Object.keys(this.reversals))
	}

	public reverse(direction:string):string {
		return this.reversals[direction]
	}

	public dimension(direction:string):number {
		for (const [index, pairing] of Object.entries(this.dimensions)) {
			if (direction in pairing) {
				return parseInt(index)
			}
		}
		throw new Error('direction does not exist!')
	}
}

export default DimensionalCompass
