class Block():
	def __init__(self, id):
		# take in parameters.
		self.id = id
		self.neighbors = {
			'north': None,
			'south': None,
			'east': None,
			'west': None,
		}
