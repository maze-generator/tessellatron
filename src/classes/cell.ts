class Cell {
	id: number
	neighbors: {[key: string]: number | null}
	constructor (id: number) {
		this.id = id
		this.neighbors = {
			'north': null,
			'south': null,
			'east': null,
			'west': null,
		}
	}
}

export default Cell
