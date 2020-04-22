## Cell
- **Properties**
	- position (`int`)
	- neighbors (`obj:[str:Cell]`)
	- pathways  (`obj:[str:bool]`)
- **Functions**
	- `get` boundaries => (`obj[str:bool]`)
	- `fun` hasPath()? => (`bool`)
	- `fun` hasWall()? => (`bool`)
	- `fun` addNeighbor(`str`, `Cell`)
	- `fun` addPathway(`str`)

## Maze
- **Properties**
	- map (`array[null, undf, Cell]`)

# Story Flow
## Step 1: Create the Base Class
The base class takes in several parameters, including the compass and the dimensions.

### Get `this.map`
Based on the dimensions, we will know how many cell spaces are needed in the array. Its simple multiplication. Note that each entry in the array must be null or Cell.

### Fill `this.map` with cells
