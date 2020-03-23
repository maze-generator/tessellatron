import Compass from './compass'

class Cell {
	public position:number
	public pathways:{[key:string]:boolean}
	public neighbors:{[key:string]:Cell|undefined|null}
	private readonly compass:Compass
	constructor (
		position:number,
		compass:Compass,
	) {
		// initialize basic information.
		this.position = position
		this.compass = compass

		// initialize pathways & neighbors.
		this.pathways = {}
		this.neighbors = {}
		for (const direction of this.compass.directions) {
			this.pathways[direction] = false
			this.neighbors[direction] = undefined
		}
	}

	public get boundaries ():{[key:string]:boolean} {
		// boundaries is the opposite of pathways.
		const boundaries:{[key:string]:boolean} = {}
		// loop through pathways and reverse values for boundaries.
		for (const [direction, isPath] of Object.entries(this.pathways)) {
			boundaries[direction] = !isPath
		}
		// there you have it!
		return boundaries
	}

	public hasPath ():boolean {
		// a direction is either a wall (false) or path (true).
		// check if there's any pathways in the values.
		return Object.values(this.pathways).includes(true)
		// `.values()` makes a list of booleans from pathways.
		// `.includes()` creates a boolean, which is returned.
	}

	public hasWall ():boolean {
		// a direction is either a wall (true) or path (false).
		// check if there's any boundaries in the values.
		return Object.values(this.boundaries).includes(true)
		// `.values()` makes a list of booleans from boundaries.
		// `.includes()` creates a boolean, which is returned.
	}

	public hasNeighbor (
		that:Cell,
	):boolean {
		// check if this is a neighbor of that.
		return Object.values(this.neighbors).includes(that)
		// `.values()` makes a list of cells from neighbors.
		// `.includes()` creates a boolean, which is returned.
	}

	public joinWithNeighbor (
		that:Cell,
		direction:string,
	):void {
		// `reversed` is the antipode of a direction.
		// for example, `reversed` of 'north' is 'south'.
		const reversed:string = this.compass.reverse(direction)
		// set neighbors.
		this.neighbors[direction] = that
		that.neighbors[reversed] = this
	}
}

export default Cell
