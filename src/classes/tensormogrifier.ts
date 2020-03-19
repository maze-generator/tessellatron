// a `Tensor` is a nth-dimensional array of numbers.
// '0' is a valid `Tensor`, as is `[[2,3],[2,5]]`.
type Tensor = Array<Tensor>|number


// a `Slicer` callback finds an nth-dimensional coordinate.
// it returns a cell, a row of cells, or a plane of cells.
type Slicer = (
	positions:Array<number|undefined>,
	dimensions:Array<number>,
) => (Tensor)

// a `Locator` callback finds neighboring addresses.
// such an address takes on the form of an index.
// one can use such an index to find a cell in `Map`.
type Locator = (
	index:number,
	dimensions:Array<number>
) => (number)

class Tensormogrifier {
	private readonly dimensions:Array<number>
	private readonly slicer:Slicer
	private readonly locators:{[key:string]:Locator}

	constructor (
		dimensions:Array<number>,
		slicer:Slicer,
		locators:{[key:string]:Locator},
	) {
		this.dimensions = dimensions
		this.slicer = slicer
		this.locators = locators
	}

	public getNeighborIndex (
		index:number,
		direction:string,
	):number {
		const callback:Locator = this.locators[direction]
		return callback(index, this.dimensions)
	}

	public getSlicedTensor (
		...positions:Array<number|undefined>
	):Tensor {
		return this.slicer(positions, this.dimensions)
	}
}

export default Tensormogrifier
