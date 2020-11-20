export default class {
	constructor (id) {
		// each cell has a unique "ID".
		// this "ID" is associated with its index in the map.
		this.id = id

		// a cell "status" can equal one of several things:
		// -> unvisited
		// -> active (currently being modified)
		// -> passive (partially completed)
		// -> complete
		this.status = 'unvisited'

		// a "neighbor" is an accessible cell.
		// "neighbors" holds direction/neighbor pairings.
		// each valid direction holds a nearby Cell ID or null.
		// -> a neighboring Cell can be looked up with its ID.
		// -> a null value represents a boundary or edge.
		this.neighbors = {}

		// a "passage" indicates if a neighbor is accessible.
		// "passages" holds direction/passage pairings.
		// each valid direction holds a truthy value here.
		// -> a passage is true, and a boundary is false.
		this.passages = {}
	}

	get hasPath () {
		// each passage's direction has a wall or path.
		// check if there's any passages in the values.
		// a path is represented by true, and a wall is false.
		return Object.values(this.passages).includes(true)
		// `.values()` takes a list of booleans from passages.
		// `.includes()` will see if there are any paths.
	}

	get hasWall () {
		// each passage's direction has a wall or path.
		// check if there's any boundary in the values.
		// a path is represented by true, and a wall is false.
		return Object.values(this.passages).includes(false)
		// `.values()` takes a list of booleans from boundaries.
		// `.includes()` will see if there are any walls.
	}

	get json () {
		// create object for json.
		const jsObject = {
			id: this.id,
			status: this.status,
			neighbors: this.neighbors,
			passages: this.passages,
		}
		return JSON.stringify(jsObject)
	}
}
