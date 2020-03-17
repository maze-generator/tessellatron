class Cell {
	neighbors: {[key:string]:Cell|undefined|null}
	constructor () {
		this.neighbors = {
			'north': undefined,
			'south': undefined,
			'east': undefined,
			'west': undefined,
		}
	}

	hasNeighbor (that:Cell):boolean {
		// check if this is a neighbor of that.
		for (const neighbor of Object.values(this.neighbors)) {
			if (neighbor === that) {
				return true
			}
		}
		// loop completed; that neighbor not found.
		return false
	}
}

export default Cell
