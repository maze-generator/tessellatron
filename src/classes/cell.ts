import Maze from './maze'
import {
	Map,
	Compass,
} from '../helpers/types'

export default class Cell {
	public map: Map
	public compass: Compass
	public id: number
	public status: 'unvisited'|'active'|'passive'|'complete'
	public passages: Record<string, boolean>
	public neighbors: Record<string, number>
	constructor (
		maze: Maze,
		id: number,
	) {
		// initialize basic information.
		this.id = id
		this.status = 'unvisited'

		// add information from parent
		this.map = maze.map
		this.compass = maze.compass

		// add neighbors
		this.neighbors = maze.getNeighbors(id)

		// initialize passages.
		this.passages = {}
		for (const direction of this.compass.directions) {
			// `false` means there is no direct connection to a neighbor.
			// this changes when something connects two cells with one another.
			this.passages[direction] = false
		}
	}

	public addNeighbor (
		id: number,
		direction:string,
	):void {

		// get instance of that cell.
		const that = this.map.data[id]

		// `reversed` is the antipode of a direction.
		// for example, `reversed` of 'north' is 'south'.
		const reversed: string = this.compass.antipodes[direction]

		// set neighbors.
		this.neighbors[direction] = that.id
		that.neighbors[reversed] = this.id
	}

	public addPassage (
		id: number,
		direction:string,
	): void {

		// get instance of that cell.
		const that = this.map.data[id]

		// `reversed` is the antipode of a direction.
		// for example, `reversed` of 'north' is 'south'.
		const reversed: string = this.compass.antipodes[direction]

		// set passages.
		this.passages[direction] = true
		that.passages[reversed] = true
	}

	public get boundaries (
	): Record<string, boolean> {
		// boundaries is the opposite of passages.
		const boundaries:Record<string, boolean> = {}
		// loop through passages and reverse values for boundaries.
		for (const direction in this.passages) {
			boundaries[direction] = !this.passages[direction]
		}
		// there you have it!
		return boundaries
	}

	public get hasPath (
	): boolean {
		// a direction is either a wall (false) or path (true).
		// check if there's any passages in the values.
		return Object.values(this.passages).includes(true)
		// `.values()` makes a list of booleans from passages.
		// `.includes()` creates a boolean, which is returned.
	}

	public get hasWall (
	): boolean {
		// a direction is either a wall (true) or path (false).
		// check if there's any boundaries in the values.
		return Object.values(this.boundaries).includes(true)
		// `.values()` makes a list of booleans from boundaries.
		// `.includes()` creates a boolean, which is returned.
	}

	public get json (
	): string {
		const jsObject = {
			id: this.id,
			status: this.status,
			neighbors: this.neighbors,
			passages: this.passages,
		}
		return JSON.stringify(jsObject)
	}
}
