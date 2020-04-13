import Map from './map'
import Compass from './compass'
import Generator from './generator'

export default class Main {
	// these are the base inputs.
	layout: string
	algorithm: string

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
		this.layout = layout
		this.algorithm = algorithm

		// create a base map, compass, and generator template.
		this.compass = new Compass(dimensions, layout)
		this.map = new Map(this.compass, dimensions)
		this.generator = new Generator(this.map, this.compass, algorithm)

	}
}
