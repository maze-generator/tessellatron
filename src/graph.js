import HypercubeGraph from './graph/hypercube.js'
import Cell from './cell.js'


export default class {
	constructor (
		dimensions,
		layout = 'hypercube',
	) {
		// get the associated typing.
		if (layout === 'hypercube') {
			return new HypercubeGraph(dimensions)

		// } else if (layout === 'trigon') {
		// 	return new TrigonGraph(dimensions)

		// } else if (layout === 'hexagon') {
		// 	return new HexagonGraph(dimensions)

		} else {
			return new HypercubeGraph(dimensions)
		}
	}
}
