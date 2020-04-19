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

### `Cell.hasPath()`
Determines if there are any **true** values in passages.

### `Cell.hasWall()`
Determines if there are any **false** values in passages.
