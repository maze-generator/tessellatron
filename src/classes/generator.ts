import Cell from './cell'
import Maze from './maze'
import {shuffle} from '../helpers/random'

export default class Generator {
	data: Array<Cell>
	directions: Set<string>
	antipodes: Record<string, string>
	algorithm: string
	constructor(
		maze: Maze,
		algorithm: string,
	) {
		this.data = maze.map.data
		this.directions = maze.compass.directions
		this.antipodes = maze.compass.antipodes
		this.algorithm = algorithm
	}

	recursiveDFS (
		id01: number,
	): void {
		// create cell from id.
		const cell01: Cell = this.data[id01]

		// mark self as active.
		cell01.status = 'active'

		// TODO: await command to continue.
		// ...

		// loop through neighbors in a random order.
		const eligibleDirs: Array<string> = Object.keys(cell01.neighbors)
		const randomDirs: Array<string> = shuffle(eligibleDirs)
		for (const direction of randomDirs) {
			console.log(direction)
			// identify the neighbor cell.
			const id02: number = cell01.neighbors[direction]
			const cell02: Cell = this.data[id02]

			// check for unvisited neighbors.
			if (cell02.status === 'unvisited') {

				// connect the cells
				cell01.passages[direction] = true
				cell02.passages[this.antipodes[direction]] = true

				// transfer 'active' state to id02.
				cell01.status = 'passive'

				// recursively call with new neighbor.
				this.recursiveDFS(id02)
			}
		}

		// mark cell as completed; neighbors have been exhuasted.
		cell01.status = 'complete'
	}
}

/*

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
