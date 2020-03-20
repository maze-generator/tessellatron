import Tensormogrifier, {
	Tensor,
	Slicer,
	Locator,
} from "../tensormogrifier"


const squaredSlicer = (
	dimensions:Array<number>,
	positions:Array<number|undefined>,
):Tensor => {
	dimensions.unshift(1)

	const dimensionIterators:Array<number> = []
	const validValues:Array<Array<number>> = []

	// this piece creates spacers or iterators.
	// if we have dimensions of [5,4,3] our spacers are:
	// [1,5,20,60]. The final item = total # of positions.
	positions.forEach((
		position:number|undefined,
		index:number,
	):void =>{
		const dimensionsThusFar:Array<number> = dimensions.slice(0, index)
		const iterator:number = dimensionsThusFar.reduce((
			a:number,
			b:number,
		):number => {
			return a * b
		})
		dimensionIterators.push(iterator)
	})
	const size:number = dimensionIterators[-1]
	const validIndices:Array<boolean|undefined> = Array(size)
}

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
