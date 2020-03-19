class Compass {
	private readonly opposites:{[key:string]:string}

	constructor (
		opposites:{[key:string]:string},
	) {
		// `opposites` is an object with strings for key/vals.
		// every direction has an opposite direction.
		// for example, 'north' and 'south' are opposites.
		// this `opposites['south']` would obtain 'north'.
		this.opposites = opposites
	}

	public get directions():Set<string> {
		// `directions` is a simple set of named vectors.
		// luckily, these are exactly the keys of `opposites`.
		return new Set(Object.keys(this.opposites))
	}

	public reverse(direction:string):string {
		// directly pulling `opposites` would be easy enough.
		// ...but, it seems more semantic using a method here!
		return this.opposites[direction]
	}
}

export default Compass
