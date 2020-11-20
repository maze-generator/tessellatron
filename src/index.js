import Graph from './graph.js'
import HypercubeGraph from './graph/hypercube.js'
import Cell from './cell.js'

// export those who should never have breaking changes.
export {
	HypercubeGraph,
	Cell,
}

// export a omnipotent class-generator class.
// this is expiremental, so be on your guard.
export default Graph
