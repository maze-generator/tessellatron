import Tensormogrifier, {
	Tensor,
	Slicer,
	Locator,
} from "../tensormogrifier"

const squaredSlicer = (
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

				console.log(cellIndex, currentDimension, magnitude)

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

const squaredLocators = {}

const getSquaredFunctions = (
	dimensions:Array<number>
):Tensormogrifier => {
	return new Tensormogrifier(
		dimensions,
		squaredSlicer,
		squaredLocators,
	)
}

export default getSquaredFunctions
