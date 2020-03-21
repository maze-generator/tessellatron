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

	const dimensionModulos:Array<number> = []

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
		dimensionModulos.push(iterator)
	})
	const size:number = dimensionModulos[-1]
	const allIndices:Array<number> = [...Array(size).keys()]
	const validIndices:Array<boolean> = []
	allIndices.forEach((
		index:number
	):void => {
		let fullyDivisible:boolean = true
		positions.forEach((
			_, index:number
		):void => {
			const position:number|undefined = positions[index]
			const modulo:number = dimensionModulos[index]
		})
		validIndices[index] = true
	})
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
