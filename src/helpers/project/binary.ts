import {range} from '../main'

/***********************************************************
the following methods support cell lookup.
with an index, you can determine coordinates.
with coordinates, you get an index.
with partial coordinates, you get a slice. neato!
***********************************************************/

/***********************************************************
validate two neighbors
***********************************************************/

export const isIndexValid = (
	size:number,
	id:number,
): boolean => {
	return 0 <= id && id < size
}
