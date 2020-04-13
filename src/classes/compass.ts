/***************************NOTES***************************
Compass
- Inputs
	- dimensions: Array<integer>
	- layout: shape
- Properties
	- magnitudes: Array<integer>
	- directions: Set<direction>
	- antipodes: Record<direction, direction>
- Methods
	- getTensorSlice(coordinates: Array<index>): Tensor
	- getCoordinates(tensor: Tensor): Array<index>
	- indicesAreNeighbors(id1: index, id2: index):boolean
	- indexIsWithinBounds(id:index):boolean

==TODO==
- `this.magnitudes` is not the greatest name; rename it.
***********************************************************/
import Map from './map'
import {
	getDirections,
	getAntipodes,
} from '../helpers/project'

export default class Compass {
	// typeset the inputs.
	protected readonly rose: Record<string, number>
	public readonly directions: Set<string>
	public readonly antipodes: Record<string, string>

	// these are needed internally, but they are not
	// semantic enough to be public class properties.
	protected readonly magnitudes: Array<number>

	constructor (
		map: Map,
		layout: string,
	) {
		this.rose = tetragonGyroscope(map.magnitudes)
		this.directions = getDirections(this.rose)
		this.antipodes = getAntipodes(this.rose)
		this.magnitudes = map.magnitudes
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
const hexahedronGyroscope = (
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
const hexagonGyroscope = (
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
