type OffsetIndexCallback = (
	number:number,
	...argument:Array<number>
) => (number)

class Compass {
	private opposites:{[key:string]:string}
	private modifiers:{[key:string]:OffsetIndexCallback}
	constructor (
		opposites:{[key:string]:string},
		modifiers:{[key:string]:OffsetIndexCallback},
	) {
		// `opposites` is an object with strings for key/vals.
		// every direction has an opposite direction.
		// for example, 'north' and 'south' are opposites.
		// this `opposites['south']` would obtain 'north'.
		this.opposites = opposites
		this.modifiers = modifiers
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

const squareCompass:Compass = new Compass(
	{
		'west':'east',
		'east':'west',
		'north':'south',
		'south':'north',
	},
	{
		'west': (
			index:number,
			...dimensions:Array<number>
		):number => {
			return index - 1
		},

		'east': (
			index:number,
			...dimensions:Array<number>
		):number => {
			return index + 1
		},

		'north': (
			index:number,
			...dimensions:Array<number>
		):number => {
			return index - dimensions[0]
		},

		'south': (
			index:number,
			...dimensions:Array<number>
		):number => {
			return index + dimensions[0]
		}
	}
)

export default Compass
export {squareCompass}
