class Cell {
	position:number
	compass:{[key:string]:string}
	pathways:{[key:string]:boolean}
	neighbors:{[key:string]:Cell|undefined|null}
	constructor (
		compass:{[key:string]:string},
		position:number,
	) {
		// initialize basic information.
		this.position = position
		this.compass = compass

		// initialize pathways & neighbors.
		this.pathways = {}
		this.neighbors = {}
		for (const direction in this.compass) {
			this.pathways[direction] = false
			this.neighbors[direction] = undefined
		}
	}

	get boundaries ():{[key:string]:boolean} {
		// boundaries is the opposite of pathways.
		const boundaries:{[key:string]:boolean} = {}
		// loop through pathways and reverse values for boundaries.
		for (const [direction, isPath] of Object.entries(this.pathways)) {
			boundaries[direction] = !isPath
		}
		// there you have it!
		return boundaries
	}

	hasPath ():boolean {
		// a direction is either a wall (false) or path (true).
		// check if there's any pathways in the values.
		return Object.values(this.pathways).includes(true)
		// `.values()` makes a list of booleans from pathways.
		// `.includes()` creates a boolean, which is returned.
	}

	hasWall ():boolean {
		// a direction is either a wall (true) or path (false).
		// check if there's any boundaries in the values.
		return Object.values(this.boundaries).includes(true)
		// `.values()` makes a list of booleans from boundaries.
		// `.includes()` creates a boolean, which is returned.
	}

	hasNeighbor (that:Cell):boolean {
		// check if this is a neighbor of that.
		return Object.values(this.neighbors).includes(that)
		// `.values()` makes a list of cells from neighbors.
		// `.includes()` creates a boolean, which is returned.
	}

	joinWithNeighbor (
		that:Cell,
		direction:string,
	):void {
		// `mirroring` is the opposite of a direction.
		// for example, the mirror of north is south.
		const mirroring:string = this.compass[direction]
		// set neighbors.
		this.neighbors[direction] = that
		that.neighbors[mirroring] = this
	}
}

export default Cell
