import Maze from './maze'
import {shape} from '../helpers/types'

export default class Main {
	// these are generated from the class.
	maze: Maze

	constructor(
		dimensions: Array<number>,
		layout: shape = 'square',
		algorithm: string = 'recursive breadth-first search',
	) {
		// create a base map, compass, and generator template.
		this.maze = new Maze(dimensions, layout, algorithm)
		this.maze.generate(0)
	}
}
