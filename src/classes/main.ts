import Map from './map'
import Compass from './compass'
import Generator from './generator'

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
		dimensions: Array<number>,
		layout: string = 'square',
		algorithm: string = 'recursive breadth-first search',
	) {
		// take inputs of size & layout.
		this.dimensions = dimensions
		this.layout = layout
		this.algorithm = algorithm

		// create a base map, compass, and generator template.
		this.map = new Map(dimensions)
		this.compass = new Compass(this.map, layout)
		this.generator = new Generator(this.map, this.compass, algorithm)
	}
}
