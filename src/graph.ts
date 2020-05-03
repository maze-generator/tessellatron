import HypercubeGraph from './graph/hypercube'
import Cell from './cell'

export default class Graph {
	// == TODO ==
	// figure out how to implement an interface
	// instead of doing all of this mess.
	layout: string
	dimensions: Array<number>
	magnitudes: Array<number>
	degree: number
	size: number
	compass: Record<string, number>
	directions: Set<string>
	antipodes: Record<string, string>
	data: Array<Cell>

	constructor(
		dimensions: Array<number>,
		layout: string = 'hypercube',
	) {
		// == TODO ==
		// figure out how to implement an interface
		// instead of doing all of this mess.
		this.layout = ''
		this.dimensions = []
		this.magnitudes = []
		this.degree = 0
		this.size = 0
		this.compass = {}
		this.directions = new Set()
		this.antipodes = {}
		this.data = []

		// get the associated typing.
		if (layout === 'hypercube') {
			return new HypercubeGraph(dimensions)
		}
	}

	// == TODO ==
	// figure out how to implement an interface
	// instead of doing all of this mess.
	holdsIndex (
		id: number,
	): boolean {
		throw new Error('cannot access non-existant method.')
	}

	holdsNeighbors (
		id01: number,
		id02: number,
	): boolean {
		throw new Error('cannot access non-existant method.')
	}

	connectPassage (
		direction: string,
		id01: number,
		id02: number,
	): void {
		throw new Error('cannot access non-existant method.')
	}

	connectNeighbor (
		direction: string,
		id01: number,
		id02: number,
	): void {
		throw new Error('cannot access non-existant method.')
	}

	findNeighborsOf (
		id01: number,
	): Record<string, number|null> {
		throw new Error('cannot access non-existant method.')
	}

	findCoordinates (
		...indexTensor: Array<number>
	): Array<number|undefined> {
		throw new Error('cannot access non-existant method.')
	}

	findTensorSlice (
		...coordinates: Array<number|undefined>
	): Array<number> {
		throw new Error('cannot access non-existant method.')
	}

	get json (
	): string {
		throw new Error('cannot access non-existant method.')
	}
}
