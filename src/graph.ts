import HypercubeGraph from './graph/hypercube'

export default class Graph {
	constructor(
		dimensions: Array<number>,
		layout: string = 'hypercube',
	) {
		if (layout === 'hypercube') {
			return new HypercubeGraph(dimensions)
		}
	}
}
