// a `Slicer` callback finds an nth-dimensional coordinate.
// it returns a cell, a row of cells, or a plane of cells.
export type Slicer = (
	dimensions:Array<number>,
	positions:Array<number|undefined>,
) => Array<number>

export default class Gyroscope {
	private readonly dimensions:Array<number>
	private readonly slicer:Slicer
	constructor (
		dimensions:Array<number>,
		slicer:Slicer,
	) {
		this.dimensions = dimensions
		this.slicer = slicer
	}


	public sliceAt (
		coordinates:Array<number|undefined>
	):Array<number> {
		return this.slicer(this.dimensions, coordinates)
	}
}
