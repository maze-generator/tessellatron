import Cell from './cell'
import {TetragonCompass} from './compass'
import {shuffle} from '../helpers/random'

export default class Maze {
	compass:TetragonCompass
	dimensions:Array<number>
	magnitudes:Array<number>
	size:number
	map:Array<Cell|null|undefined>
	constructor(
		dimensions:Array<number>,
	) {

		// dimensions represents the shape of the maze.
		// eg length=3, width=4, height=5; or simply [3, 4, 5].
		this.dimensions = dimensions

		// create a mini-multiplier reducer function.
		const multiplier = (a:number, b:number):number => a * b

		// the magnitudes are how much an index must move as
		// to offset an associated coordinate by exactly one.
		const magnitudes:Array<number> = []
		// loop through dimensions via each index, `i`.
		for (let i:number = 0; i < dimensions.length; i += 1) {
			// collect antecedent dimensions leading up to this.
			const previous:Array<number> = dimensions.slice(0, i)
			// calculate the product of those dimensions.
			const product:number = previous.reduce(multiplier, 1)
			// add the product to the list of magnitudes.
			magnitudes.push(product)
		}

		// apply calculated effects to this object.
		this.magnitudes = magnitudes

		// calculate size of the maze, aka the number of cells.
		this.size = dimensions.reduce(multiplier)

		// the maze board begins blank.
		this.map = new Array(this.size)

		// create compass
		this.compass = new TetragonCompass(dimensions)

		// TODO: generation shall not execute here.
		this.generate(0)
	}

	validIndex (
		index:number,
	):boolean {
		return 0 <= index && index < this.size
	}

	validNeighbors (
		index1:number,
		index2:number,
	):boolean {
		// helper function.
		// removes neighbors that are invalid in some way,
		// such as being out of bounds or across the map.
		if (
			!this.validIndex(index1)
			|| !this.validIndex(index2)
		) {
			return false
		}

		// calculate coordinates.
		const coordinates1:Array<number> = this.compass.triangulate(index1)
		const coordinates2:Array<number> = this.compass.triangulate(index2)

		// count the differences.
		let differences:number = 0
		// the coordinates must share all but one dimension.
		coordinates1.forEach((
			coordinate1:number,
			position:number,
		) => {
			const coordinate2:number = coordinates2[position]
			if (coordinate1 !== coordinate2) {
				differences += 1
			}
		})

		// now, check the differences, and return.
		if (differences > 1) {
			return false
		} else {
			return true
		}
	}

	generate (
		index:number
	) {
		// generates a perfect maze.
		// its done recursively via a depth-first traversal tree.
		// this is a setter function; it does not return anything.
		// ---
		// compass = cardinal direction
		// reverse = reversed cardinal direction
		// root_pos = root position
		// neighbor = neighbor position

		// first, fill the maze spot with an empty cell.
		const currentCell:Cell = new Cell(this.compass, index)
		this.map[index] = currentCell

		// next, randomize compass order and loop through.
		const randomCompass:Array<string> = shuffle([...this.compass.directions])
		randomCompass.forEach((direction:string):void => {

			// get the index of the neighbor via direction.
			const neighborIndex:number = this.compass.rose[direction] + index
			let neighborCell:Cell

			// if validating the neighborIndex fails, then the
			// neighborIndex is a maze boundary.
			if (!this.validIndex(neighborIndex)
			|| !this.validNeighbors(index, neighborIndex)) {
				// null represents such a boundary.
				currentCell['neighbors'][direction] = null
				// continue to next loop item...

			// otherwise the neighborCell should exist.
			// if the the neighborIndex points to undefined,
			// then we can visit the index and fill the Cell.
			} else if (this.map[neighborIndex] === undefined) {
				// generate a new maze block with the neighborIndex.
				neighborCell = this.generate(neighborIndex)
				// link up the net / graph / tree.
				currentCell.joinWithNeighbor(neighborCell, direction)
				currentCell.pathWithNeighbor(neighborCell, direction)

			// if the Cell already exists, we can't hook it up.
			} else if (this.map[neighborIndex] instanceof Cell) {
				// this spot is not empty.
				// @ts-ignore
				neighborCell = this.map[neighborIndex]
				// link up the net / graph / tree.
				currentCell.joinWithNeighbor(neighborCell, direction)
			}
		})

		// this current cell is used in the stack upstream.
		// if this is the root cell, the returned item
		// simply might not be caught by anything.
		return currentCell
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

/*
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
