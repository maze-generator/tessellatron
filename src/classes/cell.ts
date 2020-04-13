import Map from './map'
import Compass from './compass'
import {getNeighbors} from '../helpers/project'

export default class Cell {
	map: Map
	compass: Compass
	public id: number
	public status: 'unvisited'|'active'|'passive'|'complete'
	public passages: Record<string, boolean>
	public neighbors: Record<string, number>
	constructor (
		map: Map,
		compass: Compass,
		id: number,
	) {
		// initialize basic information.
		this.id = id
		this.status = 'unvisited'

		// add class information.
		this.map = map
		this.compass = compass

		// initialize neighbors.
		this.neighbors = getNeighbors(
			this.compass.rose,
			this.map.dimensions,
			this.map.size,
			this.id,
		)

		// initialize passages.
		this.passages = {}
		for (const direction of this.compass.directions) {
			// `false` means there is no direct connection to a neighbor.
			// this changes when something connects two cells with one another.
			this.passages[direction] = false
		}
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

	public hasPath (
	): boolean {
		// a direction is either a wall (false) or path (true).
		// check if there's any passages in the values.
		return Object.values(this.passages).includes(true)
		// `.values()` makes a list of booleans from passages.
		// `.includes()` creates a boolean, which is returned.
	}

	public hasWall (
	): boolean {
		// a direction is either a wall (true) or path (false).
		// check if there's any boundaries in the values.
		return Object.values(this.boundaries).includes(true)
		// `.values()` makes a list of booleans from boundaries.
		// `.includes()` creates a boolean, which is returned.
	}

	public hasNeighbor (
		id: number,
	): boolean {
		// check if this is a neighbor of that.
		return Object.values(this.neighbors).includes(id)
		// `.values()` makes a list of cells from neighbors.
		// `.includes()` creates a boolean, which is returned.
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

	public connectCell (
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
}

	/*
	public stringJSON (
	):string {
		const data: Record<string, any> = {}
		data['id'] = this.id
		data['passages'] = this.passages
		data['neighbors'] = {}
		for (const direction in this.compass.directions) {
			// neighbor is a cell...usually.
			// otherwise, it is null or defined.
			//
			// null means the neighbor is out-of-bounds.
			// this occurs if the cell is a side- or corner-piece.
			//
			// undefined just means the neighbor isnt yet defined.
			// this occurs before the algorithm is done running.
			const neighbor = this.neighbors[direction]
			if (neighbor !== undefined && neighbor !== null) {
				data['neighbors'][direction] = neighbor['id']
			} else if (neighbor === null) {
				data['neighbors'][direction] = null
			} else {
				// neighbor is presumeably undefined.
				// such a value isnt valid JSON, so its omitted.
			}
		}
		// JSON stringify for an output.
		return JSON.stringify(data)
	}
	*/
