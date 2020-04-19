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
`Cell.passages` is a dictionary of truthy values.
The keys in this dictionary are directions, as in north, south, east, and west.
Thus, a passage is associated with a direction.

If there is a **true** value, then it represents an accessible neighbor.
Using the direction-boolean pair, we know whether a neighbor is accessible or not.

### `Cell.boundaries`
`Cell.boundaries` is the opposite of `Cell.passages`. Instead of a true value, it will just have a false value.

### :warning: ~~`Cell._passages`~~
*Do not modify this property directly!*

It contains Private info on `Cell.passages`.
Use `Cell.passages` instead.

### :warning: ~~`Cell._boundaries`~~
*Do not modify this property directly!*

It contains Private info on `Cell.boundaries`.
Use `Cell.boundaries` instead.
