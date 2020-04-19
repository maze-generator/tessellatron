class Cell {
	constructor (id) {
		// cell status can be one of several things:
		// -> unvisited
		// -> active (currently being modified)
		// -> passive (partially completed)
		// -> complete
		this.status = 'unvisited'

		// each cell has a unique id.
		this.id = id

		// each valid direction has a cell id or null.
		// null represents a boundary or edge.
		// a cell can be looked up with its id.
		this.neighbors = {}

		// passages & boundaries are opposites.
		// setting one means setting the other!
		this._passages = {}
		this._boundaries = {}

		// antipodes are needed to know opposing directions,
		// like north & south, or east & west.
		this._antipodes = {}
	}

	get boundaries () {
		return this._boundaries
	}

	set boundaries (newBounds) {
		for (const direction of directions) {
			this._passages[direction] = !newBounds[direction]
		}
		this._boundaries = newBounds
	}

	get passages () {
		return this._passages
	}

	set passages (newPaths) {
		for (const direction of directions) {
			this._boundaries[direction] = !newPaths[direction]
		}
		this._passages = newPaths
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
		// each boundary's direction has a wall or path.
		// check if there's any boundaries in the values.
		// a path is represented by false, and a wall is true.
		return Object.values(this.boundaries).includes(true)
		// `.values()` takes a list of booleans from boundaries.
		// `.includes()` will see if there are any walls.
	}
}
