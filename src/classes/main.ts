import Map from './map'
import Compass from './compass'

export default class Main {
	// these are the base inputs.
	layout: string
	algorithm: string
	dimensions: Array<number>

	// these are generated from the class.
	map: Map
	compass: Compass
	generator: Generator

	constructor(
		layout: string,
		algorithm: string,
		dimensions: Array<number>,
	) {
		// take inputs of size & layout.
		this.layout = layout
		this.algorithm = algorithm
		this.dimensions = dimensions

		// create a base map & compass template.
		this.map = new Map(dimensions)
		this.compass = new Compass(layout, dimensions)

		// create a base maze algorithm template.
		// with maze algorithm, create cells, and insert to map.
		this.generator = new Generator(algorithm)
	}
}
