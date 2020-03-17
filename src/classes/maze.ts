import Cell from './cell'


class Maze {
	length:number
	height:number
	maze!:Array<Cell|undefined|null>
	constructor (
		length:number,
		height:number,
	) {
		// initialize maze parameters.
		this.length = length
		this.height = height

		// fill in maze array with pointers to maze blocks.
		// blocks reference their neighbors, creating a graph.
		this.generate()
	}

	get size ():number {
		/*
		returns the full size of the maze.
		*/
		return this.length * this.height
	}

	getBlock (
		row:number,
		column:number,
	):Cell|undefined|null {
		/*
		returns the cell located at given coordinates.
		*/
		const position = row * this.height + column
		return this.maze[position]
	}

	getRow (
		row:number
	):Array<Cell|undefined|null> {
		/*
		returns the nth full row.
		*/
		const west:number = row * this.height
		const east:number = west + this.length
		return this.maze.slice(east, west)
	}

	getColumn (
		column:number
	):Array<Cell|undefined|null> {
		/*
		returns the nth full column.
		*/
		const results:Array<Cell|undefined|null> = []
		for (
			// start loop at column number.
			let index:number = column;
			// end loop when the index is out-of-bounds.
			index < this.size;
			// the column-count is also the index-incrementer.
			index += this.length
		) {
			// add cell to results.
			results.push(this.maze[index])
		}
		return results
	}
}

generate = () => {
	/*
	generates a perfect maze.
	its done recursively via a depth-first traversal tree.
	this is a setter function; it does not return anything.
	---
	compass = cardinal direction
	reverse = reversed cardinal direction
	root_pos = root position
	neighbor = neighbor position
	*/
	// Set (or reset) maze to an empty board.
	const size = this.length * this.height
	this.maze = new Array<number|undefined|null>(size)
}

/*
	def generate_maze(self, root_pos=None):
		if root_pos is None:
			# root_pos starts at a random point in the maze.
			# this doesnt infer a start/exit in the finished maze.
			# one can always find a path from any point A to B;
			# the program will decide these points later.
			root_pos = random.randint(0, len(self.maze) - 1)
			# note our visited list exists as the maze property.

		# first, fill the maze spot with an empty block.
		self.maze[root_pos] = Block(root_pos)

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

		# randomize compass order
		random_neighbors = list(root_neighbors.items())
		random.shuffle(random_neighbors)

		for compass, neighbor in random_neighbors:
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

	def shortest_path_bfs(self, paths=None, A=None, B=None):
		'''
		A = given starting node
		B = given finishing node
		C = arbitrary iterated node
		a_list = traversed list of nodes
		b_list = traversed list of nodes
		c_list = traversed list of nodes
		queue:
		visited: set of visited vertices
		vertices: every single vertex in the graph
		'''
		# set up default parameters.
		if A is None or B is None:
			# a_loc = random.randint(0, 0)
			# b_loc = random.randint(0, len(self.maze) - 1)
			a_loc = 0
			b_loc = len(self.maze) - 1
			print('find', b_loc)
			A = self.maze[a_loc]
			B = self.maze[b_loc]
		# create vertex queue, and start with vertex A.
		queue = [[A]]  # HACK not a real queue.
		# create visited set, and start with vertex A.
		visited = {A}

		while queue != []:
			# dequeue first vertex.
			# HACK change later for non-array.
			a_list = queue.pop()
			A = a_list[-1]
			# check a condition.
			if A == B:
				print(len(a_list), 'steps')
				return a_list
			# add its neighbors to the queue.
			for compass in A.neighbors:
				# get vertex from compass.
				C = A.neighbors[compass]
				# pass if neighbor does not exist.
				if C is None or C is False:
					pass
				# pass if neighbor has been visited already.
				elif C in visited:
					pass
				else:
					# visit the vertex.
					visited.add(C)
					# HACK change later for non-array.
					c_list = a_list[:]
					c_list.append(C)
					queue.insert(0, c_list)
		return paths

	def aerate_maze(self, n=1):
		'''
		deletes n random walls to destroy trees.
		this could make a maze easier or harder.
		'''
		# this will allow us to iterate through blocks.
		# we want to find a block with a blocked neighbor.
		unvisited = list(range(0, len(self.maze)))
		random.shuffle(unvisited)

		# loop through until its found
		block_id = None
		block = None
		found = False
		while not found:
			# pick out a random block.
			block_id = unvisited.pop()
			block = self.maze[block_id]
			# check its neighbors.
			for compass in block.neighbors:
				neighbor = block.neighbors[compass]
				# see if it has a blocked off neighbor.
				if block.neighbors[compass] is False:
					found = True

		# randomize compass order.
		random_neighbors = list(block.neighbors.items())
		random.shuffle(random_neighbors)

		# neighbors
		sibling_id = None
		sibling = None

		# check its compass neighbors.
		for compass, neighbor in random_neighbors:
			if neighbor is False:
				if compass == 'north':
					sibling_id = block_id - self.length
				elif compass == 'south':
					sibling_id = block_id + self.length
				elif compass == 'east':
					sibling_id = block_id + 1
				elif compass == 'west':
					sibling_id = block_id - 1
				sibling = self.maze[sibling_id]
				break

		# this is useful for doubly-linked vertices.
		reverse_compass = {
			'north': 'south',
			'south': 'north',
			'east': 'west',
			'west': 'east',
		}

		# reverse reverses compass, a cardinal direction.
		reverse = reverse_compass[compass]

		# finally set the new connection!
		block.neighbors[compass] = sibling
		sibling.neighbors[reverse] = block

		# keep going if n is more than 1.
		n -= 1
		if n > 0:
			self.aerate_maze(n)
*/


export default Maze

/***********************************************************
This section describes footnotes & comments for the project.
These should mostly contain bugs and todo items.

== TODO ==
Maze array should have a fixed size:
size = maze length × maze height

== TODO ==
Maze class only supports 2D-Square mazes.
Add support for ND-polyhedral mazes.

== TODO ==
Maze class only supports breadth-first traversal.
Add support for other maze-generation algorithms.

***********************************************************/
