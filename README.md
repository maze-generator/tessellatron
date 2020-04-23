# Tessellatron
*Tessellatron creates graphs (represented by json structures) with tesselating spacial patterns.*

## Commands
### `npm run build`

# Graph Documentation
## Parameters
### `Graph.dimensions`
This property shows how long each dimension is.
For example, a 2D-square map might be 17 cells wide and 17 cells long, represented by the array `[17,17]`.

### `Graph.degree`
`Graph.degree` notes the number of dimensions.
It is equal to the length of the `Graph.dimension` array.

### `Graph.magnitudes`
For each dimension, there is a magnitude associated with it.
This represents how far apart each Cell is for a row, column, stack etc.
For example, moving east or west one unit requires offsetting a Cell ID by ±1.
Moving north or south one unit might require offsetting a Cell ID by ±17.

### `Graph.size`
`Graph.size` equals the product of all the dimensions.
It is also equal to the length of the `Graph.data` array.

### `Graph.data`
This property holds all the cells in a particular order.
Using the index of the cell, the `Graph` class can calculate its neighbors,
its coordinates, and whether or not has a boundary nearby.

### `Graph.compass`
The Compass Rose takes magnitudes and assigns them to various directions, and their reverse magnitude to respective antipodes.
<!-- This description is in need of help! -->

### `Graph.directions`
This property describes all valid directions in a Set.
A direction is a specially named vector.
For example, North and South are both directions, and are also antipodes of one another.

### `Graph.antipodes`
Usually, a direction can be associated with an antipode.
An antipode is also a direction.
Literally speaking, an antipode is the "Polar Opposite" of something, especially when dealing with directions or coordinates.

## Methods
### `Graph.holdsIndex()`
Confirms that a Cell ID fits within the boundaries of the graph.

### `Graph.holdsNeighbors()`
Confirms that two Cell IDs represent adjoined Cells.

### `Graph.connectPassage()`
Adds a passageway between two cells.
It takes in a direction and two Cell IDs.
The first cell, cell01, gains a passage in the given direction.
Likewise, cell02 gains a passage in the antipode of the given direction.

### `Graph.connectNeighbor()`
Adjoins two cells as neighbors.
It takes in a direction and two Cell IDs.
The given id02 index becomes a neighbor of cell01 in the given direction.
Likewise, id01 becomes a neighbor of cell02 in the antipode of the given direction.

### `Graph.findNeighborsOf()`
Calculates and returns all the valid neighbors of a given Cell ID.

### `Graph.findCoordinates()`
Calculates and returns the coordinates of the given Cell IDs.

### `Graph.findTensorSlice()`
Calculates valid Cell IDs based on the given coordinates.

# Cell Documentation
## Parameters
### `Cell.id`
Each cell has a unique ID.
The ID matches the Cell's index or location in a map-data array, which holds all the cells.

### `Cell.status`
This property is for use with algorithms.
When initialized, `Cell.status` starts as "**unvisited**".
As the algorithm processes each cell, the status switches between "**active**" and "**passive**".
There can only be one or zero "**active**" cells at a time.
When the status switches to "**complete**", the Cell's properties should not change again.

In summary, `Cell.status` can be one of four values:
- unvisited
- active
- passive
- complete

### `Cell.neighbors`
`Cell.neighbors` is a dictionary of nearby Cell IDs.
The keys in this dictionary are directions, as in north, south, east, and west.
Thus, a neighboring Cell ID is associated with a direction in which it can be accessed.

If the neighboring Cell in question is out-of-bounds, then a **null**s value is used instead of a Cell ID.

### `Cell.passages`
`Cell.passages` is a dictionary of truthy values that represent passages.
The keys in this dictionary are directions, as in north, south, east, and west.
Thus, a passage is associated with a direction.

A **true** value indicates an accessible neighbor.
Using the direction-passage pair, we know whether a neighbor is accessible or not.

## Methods

### `Cell.hasPath`
Determines if there are any **true** values in passages.
This is a getter function, so you can access it like a parameter.

### `Cell.hasWall`
Determines if there are any **false** values in passages.
This is a getter function, so you can access it like a parameter.
