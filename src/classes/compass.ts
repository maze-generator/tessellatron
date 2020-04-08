/***************************NOTES***************************
Compass
- Inputs
	- dimensions: Array<integer>
	- layout: shape
- Properties
	- magnitudes: Array<integer>
	- directions: Set<direction>
	- diametrics: Record<direction, direction>
- Methods
	- getTensorSlice(coordinates: Array<index>): Tensor
	- getCoordinates(tensor: Tensor): Array<index>
	- indicesAreNeighbors(id1: index, id2: index):boolean
	- indexIsWithinBounds(id:index):boolean

==TODO==
- `this.magnitudes` is not the greatest name; rename it.
***********************************************************/

import {
	getMagnitudes,
	getDirections,
	getDiametrics,
} from '../helpers/project'

class Compass {
	// typeset the inputs.
	protected data: Record<string, number>
	public directions: Set<string>
	private diametrics: Record<string, string>

	// these are needed internally, but they are not
	// semantic enough to be public class properties.
	protected readonly dimensions: Array<number>
	protected readonly magnitudes: Array<number>

	constructor (
		layout: string,
		dimensions: Array<number>,
	) {
		this.data = {} // UTILIZE GYROSCOPE METHOD
		this.directions = getDirections(this.data)
		this.diametrics = getDiametrics(this.data)
		this.dimensions = dimensions
		this.magnitudes = getMagnitudes(dimensions)
	}

	public reverse(direction: string): string {
		// directly pulling from `diametrics` would be easy...
		// ...but, it seems more semantic using a method here!
		return this.diametrics[direction]
	}
}

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

const tetragonGyroscope = (
	magnitudes:Array<number>,
): Record<string, number> => {
	// deconstruct magnitudes for each axis.
	const [x, y]:number = magnitudes
	// set a new data of index-offsetters.
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
const hexahedronGyroscope = (
	magnitudes: Array<number>,
): Record<string, number> => {
	// deconstruct magnitudes for each axis.
	const [x, y, z]:number = magnitudes
	// set a new data of index-offsetters.
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
const hexagonGyroscope = (
	magnitudes: Array<number>
): Record<string, number> => {
	// deconstruct magnitudes for each axis.
	const [x, y] = this.magnitudes
	// set a new data of index-offsetters.
	return {
		'east': -x,
		'west': +x,
		'northwest': -y,
		'southeast': +y,
		'northeast': x - y,
		'southwest': y - x,
	}
}
