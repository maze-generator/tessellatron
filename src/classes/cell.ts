class Cell {
	neighbors: {[key: string]:number|undefined|null}
	constructor () {
		this.neighbors = {
			'north': undefined,
			'south': undefined,
			'east': undefined,
			'west': undefined,
		}
	}
}

export default Cell
