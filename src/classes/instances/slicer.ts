import { TetragonCompass } from '../compass'

// a `Slicer` callback finds an nth-dimensional coordinate.
// it returns a cell, a row of cells, or a plane of cells.
export type Slicer = (
	dimensions:Array<number>,
	coordinates:Array<number|undefined>,
) => Array<number>

// tetragonSlicer takes in the map's dimensions,
// and then the cell's coordinates.
// it returns a slice of the desired coordinates.
const tetragonSlicer = (
	coordinates:Array<number|undefined>,
):Array<number> => {

	const size:number = dimensions.reduce((
		a:number,
		b:number,
	):number => {
		return a * b
	})

	const allCells:Array<number> = [...Array(size).keys()]
	const validCells:Array<number> = []

	// this piece creates spacers or iterators.
	// if we have dimensions of [5,4,3] our spacers are:
	// [1,5,20,60]. The final item = total # of coordinates.
	allCells.forEach((
		cellIndex:number
	):void => {
		let isValid:boolean = true

		coordinates.forEach((
			currentPosition:number|undefined,
			positionIndex:number,
		):void => {
			if (currentPosition !== undefined) {
				const currentDimension:number = dimensions[positionIndex]
				const previousDimensions:Array<number> = dimensions.slice(0, positionIndex)
				const magnitude:number = previousDimensions.reduce((
					a:number,
					b:number,
				):number => {
					return a * b
				}, 1)

				// check if the cell index is valid right now...
				if (Math.floor(cellIndex / magnitude) % currentDimension !== currentPosition) {
					isValid = false
				}
			}
		})
		if (isValid) {
			validCells.push(cellIndex)
		}
	})
	return validCells
}
