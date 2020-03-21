- **Direction**: refers to a particular vector of named importance. *North*, *South*, *East*, and *West* come to mind.
- **Diametrics**: refers to *unordered* pairs of opposites. For example, 'north/south' is one such pair.
- **Opposites**: for each direction, there is an equal and opposite direction.
- **Cell**: refers to the particulars of a maze block component. Its location, neighbors, and boundaries are among its important features.


## Classes
- Maze
- Map
- Cell
- Compass

### Maze
### Map
- grid

### Cell
- position
- pathways
- neighbors
- boundaries


```
class SquareCompass
	dimensions:10, 10

	north:south
	south:north
	east:west
	west:east

	west:-dimensions[0]
	east:+dimensions[0]
	north:-dimensions[1]*dimensions[0]
	south:+dimensions[1]*dimensions[0]

class CubeCompass
	dimensions:10, 10, 10

	north:south
	south:north
	east:west
	west:east
	up:down
	down:up

	west: -dimensions[0]
	east: +dimensions[0]
	north:-dimensions[1]*dimensions[0]
	south:+dimensions[1]*dimensions[0]
	up:   -dimensions[2]*dimensions[1]*dimensions[0]
	down: +dimensions[2]*dimensions[1]*dimensions[0]

class HexagonCompass
	dimensions:10, 10

	west:east
	east:west
	northWest:southEast
	northEast:southWest
	southWest:northEast
	southEast:northWest

	west: -dimensions[0]
	east: +dimensions[0]
	northWest: -len
	northEast:
	southWest:
	southEast:

class StaggeredHexagonCompass
	dimensions:10, 10

	west:east
	east:west
	northWest:southEast
	northEast:southWest
	southWest:northEast
	southEast:northWest

	west: -dimensions[0]
	east: +dimensions[0]
	northWest: -len
	northEast:
	southWest:
	southEast:
```
