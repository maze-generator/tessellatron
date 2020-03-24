export type Rose = {string:number[]}

// a tetragon is a four-sided polygon.
// a quadrilateral is a four-angled polygon.
// they mean the same thing.
export const tetragons = (
	dimensions:Array<number>
):{string:number} => {
	// create a multiplier affect for mySlice.
	const mySlice = []
	for (const index in Object.keys(dimensions)) {
		mySlice.push(
			dimensions.slice(0, index).reduce((a, b) => a * b, 1)
		)
	}
	// deconstruct dimensions into proper variables.
	const [x, y] = mySlice
	// return a rose of index-offsetters.
	return {
		'north': -y,
		'south': +y,
		'east':  +x,
		'west':  -x,
	}
}

// a hexahedron is a six-sided polyhedron.
export const hexahedrons = (
	dimensions:Array<number>
):{string:number} => {
	// create a multiplier affect for mySlice.
	const mySlice = []
	for (const index in Object.keys(dimensions)) {
		mySlice.push(
			dimensions.slice(0, index).reduce((a, b) => a * b, 1)
		)
	}
	// deconstruct dimensions into proper variables.
	const [x, y, z] = mySlice
	// return a rose of index-offsetters.
	return {
		'above': -z,
		'below': +z,
		'north': -y,
		'south': +y,
		'east':  -x,
		'west':  +x,
	}
}

// a hexahedron is a six-sided polygon.
export const hexagons = (
	dimensions:Array<number>
):{string:number} => {
	// create a multiplier affect for mySlice.
	const mySlice = []
	for (const index in Object.keys(dimensions)) {
		mySlice.push(
			dimensions.slice(0, index).reduce((a, b) => a * b, 1)
		)
	}
	// deconstruct dimensions into proper variables.
	const [x, y] = mySlice
	// return a rose of index-offsetters.
	return {
		'northwest': -y,
		'southeast': +y,
		'northeast': x - y,
		'southwest': y - x,
		'east': -x,
		'west': +x,
	}
}
