// dependency imports
import chai from 'chai'
const { expect } = chai

// project imports
import HypercubeGraph from './hypercube.js'

// test the project
describe('Hypercube Graph', () => {
	it('should compute basic addition', () => {
		expect(2 + 2).to.equal(4)
	})

	it('should generate a zero-dimensional graph with exactly one (1) node', () => {
		const dimensions = []
		const hypercube0D = new HypercubeGraph(dimensions)
		expect(hypercube0D.dimensions.length).to.equal(0)
		expect(hypercube0D.magnitudes.length).to.equal(0)
		expect(hypercube0D.data.length).to.equal(1)
		expect(hypercube0D.data[0].status).to.equal('unvisited')
	})

	it('should generate a one-dimensional graph with zero (0) nodes', () => {
		const dimensions = [0]
		const hypercube1D = new HypercubeGraph(dimensions)
		expect(hypercube1D.dimensions.length).to.equal(1)
		expect(hypercube1D.magnitudes.length).to.equal(1)
		expect(hypercube1D.data.length).to.equal(0)
	})

	it('should generate a one-dimensional graph with one (1) node', () => {
		const dimensions = [1]
		const hypercube1D = new HypercubeGraph(dimensions)

		// examine graph
		expect(hypercube1D.dimensions.length).to.equal(1)
		expect(hypercube1D.magnitudes.length).to.equal(1)
		expect(hypercube1D.data.length).to.equal(1)

		// examine node
		expect(hypercube1D.data[0].id).to.equal(0)
		expect(hypercube1D.data[0].status).to.equal('unvisited')

		// node should have zero neighbors
		expect(hypercube1D.data[0].neighbors['west']).to.equal(null)
		expect(hypercube1D.data[0].neighbors['east']).to.equal(null)
	})

	it('should generate a one-dimensional graph with ten (10) nodes', () => {
		const dimensions = [10]
		const hypercube1D = new HypercubeGraph(dimensions)

		// examine graph
		expect(hypercube1D.dimensions.length).to.equal(1)
		expect(hypercube1D.magnitudes.length).to.equal(1)
		expect(hypercube1D.data.length).to.equal(10)

		// test first node
		expect(hypercube1D.data[0].id).to.equal(0)
		expect(hypercube1D.data[0].status).to.equal('unvisited')
		expect(hypercube1D.data[0].neighbors['west']).to.equal(null)

		// test final node
		expect(hypercube1D.data[9].id).to.equal(9)
		expect(hypercube1D.data[9].status).to.equal('unvisited')
		expect(hypercube1D.data[9].neighbors['east']).to.equal(null)

		// test middle nodes
		for (let id = 1; id < 9; id++) {
			expect(hypercube1D.data[id].id).to.equal(id)
			expect(hypercube1D.data[id].status).to.equal('unvisited')
			expect(hypercube1D.data[id].neighbors['west']).to.equal(id - 1)
			expect(hypercube1D.data[id].neighbors['east']).to.equal(id + 1)
		}
	})

	/* We'll be testing an array of 2D graph objects of different sizes. */
	it('should generate a two-dimensional graph that has zero (0) nodes', () => {
		// Each of these dimension sets produce a 2D-graph with zero nodes.
		const dimensionalArrays = [
			[0, 0],
			[0, 1],
			[0, 10],
			[1, 0],
			[10, 0],
		]
		for (const dimensions of dimensionalArrays) {
			const hypercube2D = new HypercubeGraph(dimensions)
			expect(hypercube2D.dimensions.length).to.equal(2)
			expect(hypercube2D.magnitudes.length).to.equal(2)
			expect(hypercube2D.data.length).to.equal(0)
		}
	})

	it('should generate a two-dimensional graph that has exactly one (1) node', () => {
		const dimensions = [1, 1]
		const hypercube2D = new HypercubeGraph(dimensions)

		// examine graph
		expect(hypercube2D.dimensions.length).to.equal(2)
		expect(hypercube2D.magnitudes.length).to.equal(2)
		expect(hypercube2D.data.length).to.equal(1)

		// examine node
		expect(hypercube2D.data[0].id).to.equal(0)
		expect(hypercube2D.data[0].status).to.equal('unvisited')

		// node should have zero neighbors
		for (const neighbor of Object.values(hypercube2D.data[0].neighbors)) {
			expect(neighbor).to.equal(null)
		}
	})

	it('should generate a two-dimensional graph with a length of ten and height of one (10×1)', () => {
		const dimensions = [10, 1]
		const hypercube2D = new HypercubeGraph(dimensions)

		// examine graph
		expect(hypercube2D.dimensions.length).to.equal(2)
		expect(hypercube2D.magnitudes.length).to.equal(2)
		expect(hypercube2D.data.length).to.equal(10)

		// nodes should never have north or south neighbors
		for (const [id, node] of Object.entries(hypercube2D.data)) {
			expect(node.id).to.equal(parseInt(id))
			expect(node.neighbors['north']).to.equal(null)
			expect(node.neighbors['south']).to.equal(null)
		}

		// leftmost node should have no west neighbor, and
		// rightmost node should have no east neighbor
		expect(hypercube2D.data[0].neighbors['west']).to.equal(null)
		expect(hypercube2D.data[9].neighbors['east']).to.equal(null)
	})

	it('should generate a two-dimensional graph with a length of one and height of ten (1×10)', () => {
		const dimensions = [1, 10]
		const hypercube2D = new HypercubeGraph(dimensions)

		// examine graph
		expect(hypercube2D.dimensions.length).to.equal(2)
		expect(hypercube2D.magnitudes.length).to.equal(2)
		expect(hypercube2D.data.length).to.equal(10)

		// nodes should never have north or south neighbors
		for (const [id, node] of Object.entries(hypercube2D.data)) {
			expect(node.id).to.equal(parseInt(id))
			expect(node.neighbors['west']).to.equal(null)
			expect(node.neighbors['east']).to.equal(null)
		}

		// leftmost node should have no west neighbor, and
		// rightmost node should have no east neighbor
		expect(hypercube2D.data[0].neighbors['north']).to.equal(null)
		expect(hypercube2D.data[9].neighbors['south']).to.equal(null)
	})

	it('should generate a two-dimensional graph with a length of ten and height of five (10×5)', () => {
		const dimensions = [10, 5]
		const hypercube2D = new HypercubeGraph(dimensions)

		// examine graph
		expect(hypercube2D.dimensions.length).to.equal(2)
		expect(hypercube2D.magnitudes.length).to.equal(2)
		expect(hypercube2D.data.length).to.equal(50)

		const northIDs = hypercube2D.findTensorSlice(undefined, 0)
		const southIDs = hypercube2D.findTensorSlice(undefined, 4)
		const westIDs = hypercube2D.findTensorSlice(0, undefined)
		const eastIDs = hypercube2D.findTensorSlice(9, undefined)

		for (const id of Object.values(northIDs)) {
			const node = hypercube2D.data[id]
			expect(node.neighbors['north']).to.equal(null)
		}
		for (const id of Object.values(southIDs)) {
			const node = hypercube2D.data[id]
			expect(node.neighbors['south']).to.equal(null)
		}
		for (const id of Object.values(westIDs)) {
			const node = hypercube2D.data[id]
			expect(node.neighbors['west']).to.equal(null)
		}
		for (const id of Object.values(eastIDs)) {
			const node = hypercube2D.data[id]
			expect(node.neighbors['east']).to.equal(null)
		}
	})

	it('should generate a two-dimensional graph with a length of five and height of ten (5×10)', () => {
		const dimensions = [5, 10]
		const hypercube2D = new HypercubeGraph(dimensions)

		// examine graph
		expect(hypercube2D.dimensions.length).to.equal(2)
		expect(hypercube2D.magnitudes.length).to.equal(2)
		expect(hypercube2D.data.length).to.equal(50)

		const northIDs = hypercube2D.findTensorSlice(undefined, 0)
		const southIDs = hypercube2D.findTensorSlice(undefined, 9)
		const westIDs = hypercube2D.findTensorSlice(0, undefined)
		const eastIDs = hypercube2D.findTensorSlice(4, undefined)

		for (const id of Object.values(northIDs)) {
			const node = hypercube2D.data[id]
			expect(node.neighbors['north']).to.equal(null)
		}
		for (const id of Object.values(southIDs)) {
			const node = hypercube2D.data[id]
			expect(node.neighbors['south']).to.equal(null)
		}
		for (const id of Object.values(westIDs)) {
			const node = hypercube2D.data[id]
			expect(node.neighbors['west']).to.equal(null)
		}
		for (const id of Object.values(eastIDs)) {
			const node = hypercube2D.data[id]
			expect(node.neighbors['east']).to.equal(null)
		}
	})
})
