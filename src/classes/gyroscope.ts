// a `Slicer` callback finds an nth-dimensional coordinate.
// it returns a cell, a row of cells, or a plane of cells.
export type Slicer = (
	positions:Array<number|undefined>,
	dimensions:Array<number>,
) => Array<number>

// a `Locator` callback finds neighboring addresses.
// such an address takes on the form of an index.
// one can use such an index to find a cell in `Map`.
export type Locator = (
	index:number,
	dimensions:Array<number>
) => number

class Gyroscope {
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

export default Gyroscope
