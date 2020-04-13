import Cell from './Cell'
import {getMagnitudes, getSize} from '../helpers/project'

export default class Map {
	readonly dimensions: Array<number>
	readonly magnitudes: Array<number>
	readonly size: number
	public data: Array<Cell>
	constructor(
		dimensions:Array<number>,
	) {
		// `dimensions` represents the shape of the maze.
		// eg length=3, width=4, height=5; or simply [3, 4, 5].
		this.dimensions = dimensions

		// `magnitudes` are helpful to locate maze cells.
		this.magnitudes = getMagnitudes(dimensions)

		// the `size`, or number of cells, helps fill the map.
		this.size = getSize(dimensions)

		// the map `data` begins blank.
		this.data = []
	}
}
