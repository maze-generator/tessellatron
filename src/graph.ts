import HypercubeGraph from './graph/hypercube'
import {GraphType} from './types'
import Cell from './cell'

export default (
	dimensions: Array<number>,
	layout: string = 'hypercube',
): GraphType => {
	// get the associated typing.
	if (layout === 'hypercube') {
		return new HypercubeGraph(dimensions)

	} else if (layout === 'trigon') {
		return new HypercubeGraph(dimensions)

	} else if (layout === 'hexagon') {
		return new HypercubeGraph(dimensions)

	} else {
		return new HypercubeGraph(dimensions)
	}
}
