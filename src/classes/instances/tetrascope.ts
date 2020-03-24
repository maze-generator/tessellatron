import Gyroscope from "../gyroscope"
import { Locator, Slicer } from "../gyroscope"
import { tetragons } from '../compass'

// squareSlicer takes in the map's dimensions,
// and then the cell's coordinates.
// it returns a slice of the desired coordinates.
const tetraSlicer:Slicer = (
	dimensions:Array<number>,
	positions:Array<number|undefined>,
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
	// [1,5,20,60]. The final item = total # of positions.
	allCells.forEach((
		cellIndex:number
	):void => {
		let isValid:boolean = true

		positions.forEach((
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

const tetraLocator:Locator = (
	dimensions:Array<number>,
	axis:number,
):number => {
	return dimensions.slice(0, axis).reduce((a, b) => {
		return a * b
	}, 1)
}

export const tetrascope = (
	dimensions:Array<number>
):Gyroscope => {
	return new Gyroscope(
		tetragons,
		dimensions,
		tetraSlicer,
		tetraLocator,
	)
}