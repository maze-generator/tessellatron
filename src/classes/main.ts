import Map from './map.ts'

export default class Main {
	constructor(
		layout: string,
		algorithm: string,
		dimensions: Array<number>,
	) {
		// take inputs of size & layout.
		this.layout = layout
		this.dimensions = dimensions

		// create a base map & compass template.
		this.map = new Map(dimensions)
		this.compass = new Compass(layout, dimensions)

		// create a base maze algorithm template.
		// with maze algorithm, create cells, and insert to map.
		this.generator = new Generator(algorithm)
	}
}
