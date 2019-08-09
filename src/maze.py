# python packages
import random
# internal packages
from block import *

class Maze():
	def __init__(self, length, height):
		self.length = length
		self.height = height
		self.maze = [None] * length * height
		# set up the maze
		self.generate_maze()

	def __repr__(self):
		result = ''

		for index, block in enumerate(self.maze):
			north = True
			south = True
			east = True
			west = True

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

			if index % self.length == 0:
				result += '\n'
			result += pick_symbol(north, south, east, west)

		return result

	def get_block(self, row, column):
		'''
		returns the cell located at given coordinates.
		'''
		position = row * self.height + column
		block = self.maze[position]
		return block

	def get_row(self, row):
		'''
		returns the nth full row.
		'''
		east = row * self.height
		west = east + self.length
		row = self.maze[east:west]
		return row

	def get_column(self, column):
		'''
		returns the nth full column.
		'''
		num_columns = self.length
		column = self.maze[column::num_columns]
		return column

	def get_every_row(self):
		'''
		returns an array arrays; a list of every row.
		'''
		every_row = []
		for row in range(0, self.height):
			every_row.append(self.get_row(row))
		return every_row

	def get_every_column(self):
		'''
		returns an array arrays; a list of every column.
		'''
		every_column = []
		for column in range(0, self.length):
			every_column.append(self.get_column(column))
		return every_column

	def generate_maze(self, root_pos = None):
		'''
		generates a perfect maze.
		its done recursively via a depth-first traversal tree.
		this is a setter function; it does not return anything.
		---
		compass = cardinal direction
		reverse = reversed cardinal direction
		root_pos = root position
		neighbor = neighbor position
		'''
		if root_pos is None:
			# root_pos starts at a random point in the maze.
			# this doesnt infer a start/exit in the finished maze.
			# one can always find a path from any point A to B;
			# the program will decide these points later.
			root_pos = random.randint(0, len(self.maze) - 1)
			# note our visited list exists as the maze property.

		# first, fill the maze spot with an empty block.
		self.maze[root_pos] = Block()

		# grab the position id from each cardinal direction.
		root_neighbors = {
			'north': root_pos - self.length,
			'south': root_pos + self.length,
			'east': root_pos + 1,
			'west': root_pos - 1,
		}

		# this is useful for doubly-linked vertices.
		reverse_compass = {
			'north': 'south',
			'south': 'north',
			'east': 'west',
			'west': 'east',
		}

		# this row and column will help validate neighbors.
		root_pos_column = root_pos % self.length
		root_pos_row = root_pos // self.length

		def validate(neighbor):
			'''
			helper function.
			removes neighbors that are invalid in some way,
			such as being out of bounds or across the map.
			'''
			# calculate neighbors row and column position.
			neighbor_column = neighbor % self.length
			neighbor_row = neighbor // self.length

			# ensure neighbor's position lands within the grid.
			if len(self.maze) > neighbor >= 0:

				# the neighbor must share atleast a row or a column;
				# otherwise it isnt really a neighbor, is it.
				if (root_pos_row == neighbor_row
				or root_pos_column == neighbor_column):
					return neighbor

			# not a neighbor.
			return None

		# update neighbors with validate.
		for compass, neighbor in root_neighbors.items():
			# it is safe to update a compass's value in this loop;
			# it isnt safe to update a compass in this loop.
			root_neighbors[compass] = validate(neighbor)

		for compass, neighbor in root_neighbors.items():
			# reverse reverses compass, a cardinal direction.
			reverse = reverse_compass[compass]
			# neighbor is empty, representing a maze boundary.
			if neighbor is None:
				self.maze[root_pos].neighbors[compass] = None

			# neighbor is an int, representing a spot in maze.
			else:
				# this spot is empty! fill it up!
				if self.maze[neighbor] is None:
					# generate a new maze block.
					self.generate_maze(neighbor)
					# link up the net / graph / tree.
					this_block = self.maze[root_pos]
					that_block = self.maze[neighbor]
					this_block.neighbors[compass] = that_block
					that_block.neighbors[reverse] = this_block

				# this spot is filled.
				else:
					pass

def pick_symbol(north, south, east, west):
	'''
	temporary function for drawing wall-maze.
	'''
	if north and south and east and west:
		glyph = '┼'
	# three passages
	elif south and east and west and not (north):
		glyph = '┬'
	elif north and east and west and not (south):
		glyph = '┴'
	elif north and south and west and not (east):
		glyph = '┤'
	elif north and south and east and not (west):
		glyph = '├'
	# two passages
	elif north and south and not (east or west):
		glyph = '│'
	elif north and east and not (south or west):
		glyph = '└'
	elif north and west and not (south or east):
		glyph = '┘'
	elif south and east and not (north or west):
		glyph = '┌'
	elif south and west and not (north or east):
		glyph = '┐'
	elif east and west and not (north or south):
		glyph = '─'
	# one passage
	elif north and not (south or east or west):
		glyph = '╵'
	elif south and not (north or east or west):
		glyph = '╷'
	elif east and not (north or south or west):
		glyph = '╶'
	elif west and not (north or south or east):
		glyph = '╴'
	# zero passages
	elif not (north or south or east or west):
		glyph = ' '

	return glyph