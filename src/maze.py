class Maze():
	def __init__(self, length, height):
		self.length = length
		self.height = height
		self.maze = [None]*length*height

	def get_row(self, row_id):
		'''
		returns the nth full row.
		'''
		left = row_id * self.height
		right = left + self.length
		row = self.maze[left:right]
		return row

	def get_column(self, column_id):
		'''
		returns the nth full column.
		'''
		num_columns = self.length
		column = self.maze[column_id::num_columns]
		return column

	def get_block(self, row_id, column_id):
		'''
		returns the cell located at given coordinates.
		'''
		index = row_id * self.height + column_id
		block = self.maze[index]
		return block



# maze parent is LRTB?
# maze left open?
# maze right open?
# maze top open?
# maze bottom open?
# how many openings wanted?
