/***********************************************************
a tetragon is a four-sided polygon.
a quadrilateral is a four-angled polygon.
they represent the same thing...a square(ish) shape!

A finished map using this compass looks like this:
┌─┬─┬─┐
├─┼─┼─┤
├─┼─┼─┤
└─┴─┴─┘
***********************************************************/

export const tetragonGyroscope = (
	magnitudes:Array<number>,
): Record<string, number> => {
	// deconstruct magnitudes for each axis.
	const [x, y]: Array<number> = magnitudes
	// set a new rose of index-offsetters.
	return {
		'west':  -x,
		'east':  +x,
		'north': -y,
		'south': +y,
	}
}

/***********************************************************
a hexahedron is a six-sided polyhedron.
standard 6-sided dice are a perfect example of this.
remember that you can stack dice in three dimensions,
and, in fact, thats how they package and ship in bulk.

A finished map using this compass looks like this:

layer 1:    layer 2:    layer 3:
┌─┬─┬─┐     ┌─┬─┬─┐     ┌─┬─┬─┐
├─┼─┼─┤     ├─┼─┼─┤     ├─┼─┼─┤
├─┼─┼─┤     ├─┼─┼─┤     ├─┼─┼─┤
└─┴─┴─┘     └─┴─┴─┘     └─┴─┴─┘
***********************************************************/

// a hexahedron is a six-sided polyhedron.
export const hexahedronGyroscope = (
	magnitudes: Array<number>,
): Record<string, number> => {
	// deconstruct magnitudes for each axis.
	const [x, y, z]: Array<number> = magnitudes
	// set a new rose of index-offsetters.
	return {
		'west':  -x,
		'east':  +x,
		'north': -y,
		'south': +y,
		'above': -z,
		'below': +z,
	}
}

/***********************************************************
hexagons are interesting six-sided polygons.
despite having six sides, you can triangulate a cell
by knowing the location on the two of the three axis.

A finished map using this compass looks like this:
┌─┬─┬─┐
└┬┴┬┴┬┴┐
 └┬┴┬┴┬┴┐
  └─┴─┴─┘
***********************************************************/

// a hexahedron is a six-sided polygon.
export const hexagonGyroscope = (
	magnitudes: Array<number>
): Record<string, number> => {
	// deconstruct magnitudes for each axis.
	const [x, y]: Array<number> = magnitudes
	// set a new rose of index-offsetters.
	return {
		'east': -x,
		'west': +x,
		'northwest': -y,
		'southeast': +y,
		'northeast': x - y,
		'southwest': y - x,
	}
}
