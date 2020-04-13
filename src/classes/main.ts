import Maze from './maze'
import Generator from './generator'

export default class Main {
	// these are the base inputs.
	layout: string
	algorithm: string

	// these are generated from the class.
	maze: Maze
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
		this.maze = new Maze(dimensions, layout, algorithm)
		this.generator = new Generator(this.maze, algorithm)

		this.generator.recursiveDFS(0)
	}
}
