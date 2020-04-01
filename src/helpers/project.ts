// create a mini-multiplier reducer function.
const multiply = (a:number, b:number):number => a * b

/***********************************************************
This section includes helper functions for `dimensions`.
Given the `dimensions` array, the application can find:
- the total `size` of the map
- the `magnitudes` of the each given dimension

These properties are important for initializing the map,
and for calculating the coordinates of a particular index.
***********************************************************/

export const getSize = (
	dimensions: Array<number>,
):number => {
	// calculate `size` of the maze, aka the number of cells.
	return dimensions.reduce(multiply, 1)
	// == EDGE CASE ==
	// the value of the nth-dimension is implicitly 1.
	// for example, the 3rd-dimension of [2,3] is 1.
	// it follows that the 1st-dimension of [] is also 1.
	// thus, this function returns 1 if given an empty array.
}

export const getMagnitudes = (
	dimensions: Array<number>,
):Array<number> => {
	// the `magnitudes` are how much an index must move as
	// to offset an associated coordinate by exactly one.
	const magnitudes = []
	// loop through dimensions via each index, `i`.
	for (let i:number = 0; i < dimensions.length; i += 1) {
		// collect antecedent dimensions leading up to here.
		const previous:number[] = dimensions.slice(0, i)
		// calculate the product of those dimensions.
		const product:number = previous.reduce(multiply, 1)
		// add the product to the list of magnitudes.
		magnitudes.push(product)
	}
	return magnitudes
	// == NOTE ==
	// this function supports non-variable dimensions.
	// for example, each row holds the same number of cells.
}

/***********************************************************
This section includes helper functions for a compass `rose`.
Given a `rose` object, the application can find:
- a set of supported `directions`
- a the polar opposite of each direction, or `diametric`.

These properties are important for orienting cells in place.
***********************************************************/

export const getDirections = (
	rose: {[key: string]: number},
) => {
	// `directions` is a simple set of named vectors.
	// luckily, these are exactly the keys of the `rose`.
	return new Set(Object.keys(rose))
}

export const getDiametrics = (
	rose: {[key: string]: number},
) => {
	// `diametrics` is a harder nut to crack.
	// it pairs directions with their respective opposites.

	// first, we do need `directions`.
	const directions = getDirections(rose)

	// reverse the keys into a JavaScript Map, `vectors`.
	// the keys are numbers, so they can be made negative.
	// use that to find the opposing direction string.
	const reverse = (
		reverseMap: Map<number, string>,
		direction: string,
	): Map<number, string> => {
		reverseMap.set(rose[direction], direction)
		return reverseMap
	}
	const vectors: Map<number, string> = (
		// set the `vectors` into a map with reduce.
		[...directions].reduce(reverse, new Map())
	)

	// initialize diametrics.
	const diametrics: {[key: string]: string} = {}
	for (const direction of directions) {
		const vector: number = rose[direction]
		// TODO -> bad `|| 'none'`...
		// TODO -> its a frowny face for goodness sake!
		const reversed: string = vectors.get(-vector) || ':('
		// here is where reverse-directions is set!
		diametrics[direction] = reversed
	}
	return diametrics
}
