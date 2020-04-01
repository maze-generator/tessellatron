```ts
export default class Map {
} {

}



export default class Maze {
	dimensions:Array<number>
	magnitudes:Array<number>
	size:number
	map:Array<Cell|null|undefined>
	constructor (
		dimensions:Array<number>
	) {
		// dimensions represents the shape of the maze.
		// eg length=3, width=4, height=5; or simply [3, 4, 5].
		this.dimensions = dimensions

		// create a mini-multiplier reducer function.
		const multiplier = (a:number, b:number):number => a * b

		// calculate size of the maze, aka the number of cells.
		this.size = dimensions.reduce(multiplier)

		// the magnitudes are how much an index must move as
		// to offset an associated coordinate by exactly one.
		this.magnitude = []
		// loop through dimensions via each index, `i`.
		for (let i:number = 0; i < dimensions.length; i += 1) {
			// collect antecedent dimensions leading up to this.
			const previous:number[] = dimensions.slice(0, i)
			// calculate the product of those dimensions.
			const product:number = previous.reduce(multiplier, 1)
			// add the product to the list of magnitudes.
			this.magnitude.push(product)
		}

		// the board begins blank.
		this.map = new Array(this.size)
	}
}
```
