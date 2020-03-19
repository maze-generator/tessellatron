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
	public shape:string
	private readonly dimensions:Array<number>
	private readonly slicer:Slicer
	private readonly triangulators:{[key:string]:Locator}

	constructor (
		shape:string,
		dimensions:Array<number>,
		slicer:Slicer,
		triangulators:{[key:string]:Locator},
	) {
		this.shape = shape
		this.dimensions = dimensions
		this.slicer = slicer
		this.triangulators = triangulators
	}

	public getNeighborIndex (
		index:number,
		direction:string,
	):number {
		const callback:Locator = this.triangulators[direction]
		return callback(index, this.dimensions)
	}

	public getSlicedTensor (
		...positions:Array<number|undefined>,
	):Tensor {
		return this.slicer(positions, this.dimensions)
	}
}

export default Tensormogrifier
