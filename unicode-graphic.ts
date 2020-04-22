import Maze from './maze/tetragon'

export default class UnicodeGraphic {
	maze:Maze
	constructor(maze:Maze) {
		this.maze = maze
	}

	pipeMaze () {
		// a pipe-maze is much more simple to make.
		// a player must follow lines to complete the maze.
		// while less traditional, it is very easy to make.
		// each vertex determinse a unicode character.

		//initialize empty result string.
		let result = ''

		// loop through maze.
		this.maze.map.data.forEach((
			cell:any,
			index:number,
		):void => {
			// assumes there is a path in every direction.
			const north:boolean = cell['passages']['north']
			const south:boolean = cell['passages']['south']
			const east:boolean = cell['passages']['east']
			const west:boolean = cell['passages']['west']

			// add line break if end of line is reached
			if (index % this.maze.map.dimensions[0] === 0) {
				result += '\n'
			}
			// get the symbol to be added to the result string
			result += getGlyph(north, south, east, west, 'pipe')
		})
		return result
	}
}

/*
	def edge_maze(self):
		'''
		an edge-maze is a traditional-looking maze.
		a player must follow the space between lines to finish.
		however, this algorithm is also more complex.
		it must look at 4 nodes to determine 1 unicode glyph.
		'''
		# HACK reassigning self for convenience.
		self = self.maze_object

		# store result item
		result = ''

		# the padding helps analyze corners and boundaries.
		padded_length = self.length + 2
		padded_height = self.height + 2
		padded_maze = [None] * padded_length * padded_height

		# graphics are ultimately what we are aiming to find.
		graphic_length = self.length + 1
		graphic_height = self.height + 1
		graphic_maze = [None] * graphic_length * graphic_height

		# this thing preps for calculations with graphics.
		for location, reference in enumerate(padded_maze):
			# determine row and column
			row = location // (padded_length)
			column = location % (padded_length)

			# checks if the item is padding for the boundary.
			if (row == 0
				or column == 0
				or row == padded_height - 1
					or column == padded_length - 1):
				pass
			else:
				reference = location - padded_length + 1 - row * 2
				padded_maze[location] = reference

		# this thing calculates the graphics.
		for location, reference in enumerate(graphic_maze):
			# determine row and column
			row = location // (graphic_length)
			column = location % (graphic_length)
			location = location + row

			# determines locations of items in the padded_maze.
			nw_loc = padded_maze[location]
			ne_loc = padded_maze[location + 1]
			sw_loc = padded_maze[location + padded_length]
			se_loc = padded_maze[location + padded_length + 1]

			# initialize hallway passageways.
			# if there is a passway, then its true, else false.
			# none indicates an undeterminate value.
			n_hall = None
			s_hall = None
			e_hall = None
			w_hall = None

			# this section is looking at edge pieces.
			# there is only empty space beyond an edge.
			# these ternary operators determines this.
			# north boundary
			if (nw_loc is None
					and ne_loc is None):
				n_hall = True
			# south boundary
			if (sw_loc is None
					and se_loc is None):
				s_hall = True
			# east boundary
			if (ne_loc is None
					and se_loc is None):
				e_hall = True
			# west boundary
			if (nw_loc is None
					and sw_loc is None):
				w_hall = True

			# verify if there is a path in any direction.
			# remember, this glyph represents a wall, not a space.
			# this is checking each path adjacent to the wall.
			# north path
			if ne_loc is not None and nw_loc is not None:
				east = self.maze[ne_loc]
				west = self.maze[nw_loc]
				if (east.neighbors['west'] == west
						and west.neighbors['east'] == east):
					n_hall = True
			# south path
			if se_loc is not None and sw_loc is not None:
				east = self.maze[se_loc]
				west = self.maze[sw_loc]
				if (east.neighbors['west'] == west
						and west.neighbors['east'] == east):
					s_hall = True
			# east path
			if ne_loc is not None and se_loc is not None:
				north = self.maze[ne_loc]
				south = self.maze[se_loc]
				if (north.neighbors['south'] == south
						and south.neighbors['north'] == north):
					e_hall = True
			# west path
			if nw_loc is not None and sw_loc is not None:
				north = self.maze[nw_loc]
				south = self.maze[sw_loc]
				if (north.neighbors['south'] == south
						and south.neighbors['north'] == north):
					w_hall = True

			# add a line break if its an end-of-line.
			if location % padded_length == 0 and location != 0:
				result += '\n'
			# get unicode glyph symbol box-drawing element.
			result += getGlyph(n_hall, s_hall, e_hall, w_hall, 'edge')
		# return maze drawing.
		return result
*/

const getGlyph = (
	north:boolean,
	south:boolean,
	east:boolean,
	west:boolean,
	type:string,
):string => {

	// this function returns a maze drawing character.
	// == TODO ==
	// this is awkwardly large.
	// not sure where to put it semantically.
	// == FIXME ==
	// these unicode characters must be converted!
	// like emojis, its a code smell to have them.

	let pipe = ''
	let edge = ''

	// four passages
	if (north && south && east && west) {
		edge = '  '
		pipe = '┼─'
	}

	// three passages
	else if (south && east && west && !(north)) {
		edge = '╵ '
		pipe = '┬─'
	}
	else if (north && east && west && !(south)) {
		edge = '╷ '
		pipe = '┴─'
	}
	else if (north && south && west && !(east)) {
		edge = '╶─'
		pipe = '┤ '
	}
	else if (north && south && east && !(west)) {
		edge = '╴ '
		pipe = '├─'
	}

	// two passages
	else if (north && south && !(east || west)) {
		edge = '──'
		pipe = '│ '
	}
	else if (north && east && !(south || west)) {
		edge = '┐ '
		pipe = '└─'
	}
	else if (north && west && !(south || east)) {
		edge = '┌─'
		pipe = '┘ '
	}
	else if (south && east && !(north || west)) {
		edge = '┘ '
		pipe = '┌─'
	}
	else if (south && west && !(north || east)) {
		edge = '└─'
		pipe = '┐ '
	}
	else if (east && west && !(north || south)) {
		edge = '│ '
		pipe = '──'
	}

	// one passage
	else if (north && !(south || east || west)) {
		edge = '┬─'
		pipe = '╵ '
	}
	else if (south && !(north || east || west)) {
		edge = '┴─'
		pipe = '╷ '
	}
	else if (east && !(north || south || west)) {
		edge = '┤ '
		pipe = '╶─'
	}
	else if (west && !(north || south || east)) {
		edge = '├─'
		pipe = '╴ '
	}

	// zero passages
	else if (!(north || south || east || west)) {
		edge = '┼─'
		pipe = '  '
	}

	if (type === 'edge') {
		return edge
	} else {
		return pipe
	}
}
