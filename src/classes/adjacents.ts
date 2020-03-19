import Compass from './compass'

// a `Locator` callback finds neighboring addresses.
// such an address takes on the form of an index.
// one can use such an index to find a cell in `Map`.
type Locator = (
	index:number,
	...dimensions:Array<number>
) => (number)

class Adjacents extends Compass {
	private readonly triangulators:{[key:string]:Locator}
	private readonly dimensions:Array<number>

	constructor (
		opposites:{[key:string]:string},
		triangulators:{[key:string]:Locator},
		...dimensions:Array<number>
	) {
		super(opposites)
		this.triangulators = triangulators
		this.dimensions = dimensions
	}

	public lookup (
		index:number,
		direction:string,
	):number {
		const callback:Locator = this.triangulators[direction]
		return callback(index, ...this.dimensions)
	}
}

export default Adjacents
