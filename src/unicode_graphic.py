class UnicodeGraphic():
	def __init__(self, maze_object):
		self.maze_object = maze_object

	def pipe_maze(self):
		# HACK reassigning self.
		self = self.maze_object

		# initialize empty result string.
		result = ''
		# loop through maze.
		for index, block in enumerate(self.maze):
			# assumes there is a path in every direction.
			north = True
			south = True
			east = True
			west = True

			# verify if there actually is a path each way.
			if (block.neighbors['north'] == False 
			or block.neighbors['north'] is None):
				north = False
			if (block.neighbors['south'] == False 
			or block.neighbors['south'] is None):
				south = False
			if (block.neighbors['east'] == False 
			or block.neighbors['east'] is None):
				east = False
			if (block.neighbors['west'] == False 
			or block.neighbors['west'] is None):
				west = False

			# add line break if end of line is reached
			if index % self.length == 0:
				result += '\n'
			# get the symbol to be added to the result string
			result += get_glyph(north, south, east, west, 'pipe')
		return result

	def edge_maze(self):
		self = self.maze_object
		# store result item
		text = ''

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
			if ne_loc is not None and nw_loc is not None:
				east = self.maze[ne_loc]
				west = self.maze[nw_loc]
				if (east.neighbors['west'] == west
				and west.neighbors['east'] == east):
					n_hall = True

			if se_loc is not None and sw_loc is not None:
				east = self.maze[se_loc]
				west = self.maze[sw_loc]
				if (east.neighbors['west'] == west
				and west.neighbors['east'] == east):
					s_hall = True

			if ne_loc is not None and se_loc is not None:
				north = self.maze[ne_loc]
				south = self.maze[se_loc]
				if (north.neighbors['south'] == south
				and south.neighbors['north'] == north):
					e_hall = True

			if nw_loc is not None and sw_loc is not None:
				north = self.maze[nw_loc]
				south = self.maze[sw_loc]
				if (north.neighbors['south'] == south
				and south.neighbors['north'] == north):
					w_hall = True

			# add a line break if its an end-of-line.
			if location % padded_length == 0 and location != 0:
				text += '\n'
			# get unicode glyph symbol box-drawing element.
			text += get_glyph(n_hall, s_hall, e_hall, w_hall, 'edge')
		# return maze drawing.
		return text

def get_glyph(north, south, east, west, type):
	'''
	this function returns a maze drawing character.
	== TODO ==
	this is awkwardly large.
	not sure where to put it semantically.
	== FIXME ==
	these unicode characters must be converted!
	like emojis, its a code smell to have them.
	'''

	# four passages
	if north and south and east and west:
		edge = ' '
		pipe = '┼'

	# three passages
	elif south and east and west and not (north):
		edge = '╵'
		pipe = '┬'
	elif north and east and west and not (south):
		edge = '╷'
		pipe = '┴'
	elif north and south and west and not (east):
		edge = '╶'
		pipe = '┤'
	elif north and south and east and not (west):
		edge = '╴'
		pipe = '├'

	# two passages
	elif north and south and not (east or west):
		edge = '─'
		pipe = '│'
	elif north and east and not (south or west):
		edge = '┐'
		pipe = '└'
	elif north and west and not (south or east):
		edge = '┌'
		pipe = '┘'
	elif south and east and not (north or west):
		edge = '┘'
		pipe = '┌'
	elif south and west and not (north or east):
		edge = '└'
		pipe = '┐'
	elif east and west and not (north or south):
		edge = '│'
		pipe = '─'

	# one passage
	elif north and not (south or east or west):
		edge = '┬'
		pipe = '╵'
	elif south and not (north or east or west):
		edge = '┴'
		pipe = '╷'
	elif east and not (north or south or west):
		edge = '┤'
		pipe = '╶'
	elif west and not (north or south or east):
		edge = '├'
		pipe = '╴'

	# zero passages
	elif not (north or south or east or west):
		edge = '┼'
		pipe = ' '

	if type == 'edge':
		return edge
	if type == 'pipe':
		return pipe
