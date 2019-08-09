class UnicodeGraphic(Maze):


	def __repr__(self, Maze):
		string_length = self.length + 1
		string_height = self.height + 1
		string_maze = [None] * string_length * string_height
		for location, character in enumerate(string_maze):
			# get initial index
			nw = location - string_length - 1
			ne = location - string_length
			sw = location - 1
			se = location
			# recalibrate to 'true self' indices
			nw = nw - (nw // string_height)
			ne = ne - (ne // string_height)
			sw = sw - (sw // string_height)
			se = se - (se // string_height)
			print(
				'---\n'
				f'nw {nw}\n'
				f'ne {ne}\n'
				f'sw {sw}\n'
				f'se {se}\n'
			)
			
		return 'WiP'

'''
00 01 02 03
04 05 06 07
08 09 10 11
12 13 14 15
16 17 18 19

-- -- -- -- 
-- 00 01 02
-- 03 04 05
-- 06 07 08
-- 09 10 11

-- -- -- --
-- 05 06 07
-- 09 10 11
-- 13 14 15
-- 17 18 19

5 5 5 # length of line + row #
6 6 6 # length of line + row #
7 7 7 # length of line + row #
8 8 8 # length of line + row #
'''

'''
		# check if quadrant is on a corner.
		# nw_corner
		if se == 0:
			
		# ne_corner
		elif sw == string_length:
			
		# sw_corner
		elif ne == string_length * (string_height - 1):
			
		# se_corner
		elif nw == string_length * string_height - 1:
			
		# check if quadrant is on a boundary.
		# n_boundary
		elif ne < 0 and nw < 0:
			
		# s_boundary
		elif se >= string_length and sw >= string_length:

		# e_boundary and w_boundary
		elif 
		
		else:
			pass

		north = nw.neighbors['east'] and ne.neighbors['west']
		south = sw.neighbors['east'] and se.neighbors['west']
		east = se.neighbors['north'] and ne.neighbors['south']
		west = nw.neighbors['north'] and sw.neighbors['south']
'''

def get_glyph(north, south, east, west):
	'''
	this function returns a maze drawing character.
	'''
	# == FIXME ==
	# this function is awkwardly large.
	# not sure where to put it semantically.
	# == TODO ==
	# these unicode characters must be converted!
	# like emojis, its a code smell to have them.

	# four passages
	if north and south and east and west:
		glyph = ' '
	# three passages
	elif south and east and west and not (north):
		glyph = '╵'
	elif north and east and west and not (south):
		glyph = '╷'
	elif north and south and west and not (east):
		glyph = '╶'
	elif north and south and east and not (west):
		glyph = '╴'
	# two passages
	elif north and south and not (east or west):
		glyph = '─'
	elif north and east and not (south or west):
		glyph = '┐'
	elif north and west and not (south or east):
		glyph = '┌'
	elif south and east and not (north or west):
		glyph = '┘'
	elif south and west and not (north or east):
		glyph = '└'
	elif east and west and not (north or south):
		glyph = '│'
	# one passage
	elif north and not (south or east or west):
		glyph = '┬'
	elif south and not (north or east or west):
		glyph = '┴'
	elif east and not (north or south or west):
		glyph = '┤'
	elif west and not (north or south or east):
		glyph = '├'
	# zero passages
	elif not (north or south or east or west):
		glyph = '┼'

	return glyph