/***********************************************************
This section includes helper functions for a compass `rose`.
Given a `rose` object, the application can find:
- a set of supported `directions`
- a the polar opposite of each direction, or `antipode`.

These properties are important for orienting cells in place.
***********************************************************/

export const getDirections = (
	rose: Record<string, number>
) => {
	// `directions` is a simple set of named vectors.
	// luckily, these are exactly the keys of the `rose`.
	return new Set(Object.keys(rose))
}

export const getAntipodes = (
	rose: Record<string, number>
) => {
	// `antipodes` is a harder nut to crack.
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

	// initialize antipodes.
	const antipodes: Record<string, string> = {}
	for (const direction of directions) {
		const vector: number = rose[direction]
		// TODO -> bad `|| 'none'`...
		// TODO -> its a frowny face for goodness sake!
		const reversed: string = vectors.get(-vector) || ':('
		// here is where reverse-directions is set!
		antipodes[direction] = reversed
	}
	return antipodes
}
