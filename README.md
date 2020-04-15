# Maze Generator
This app creates mazes for you to save as text.

The project was created [@MakeSchool][makeschool].
You can find the project instructions [here][instructions].

This project was refactored during an intensive period.
You can find the intensive proposal [here][proposal].

## License
The code is released under the [MIT License][license].

## React.js
This project was bootstrapped with react.
Check out its readme [here][react].

## Needed Functionality
- Maze.isIndexValid (id) -> (boolean)
- Maze.areNeighbors (Array of IDs) -> (boolean)
- Maze.triangulate (Array of IDs) -> (Coordinates)
- Maze.tensorSlice (Coordinates) -> (Array of IDs)
- Cell.getNeighbors (id) -> (Record of Directions to IDs)
- Cell.addNeighbor (id)
- Cell.addPassage  (id)
- Cell.hasPath () -> (boolean)
- Cell.hasWall () -> (boolean)

<!--
## How To Use
1. navigate to `src/` folder in terminal.
1. run `python main.py`
	- If you input 0 extra parameters:
		- follow the on-screen prompts
	- You can input 2 extra parameters:
		1. the length of the maze to be generated (int)
		1. the width of the maze to be generated (int)
	- You can input 3 extra parameters:
		1. the length of the maze to be generated (int)
		1. the width of the maze to be generated (int)
		1. the aeration of the maze to be generated (int)
	- Or you can input 4 extra parameters:
		1. the length of the maze to be generated (int)
		1. the width of the maze to be generated (int)
		1. the aeration of the maze to be generated (int)
		1. the unicode visual style of the maze (`e` or `p`)
1. follow any on-screen prompts for additional inputs.
1. view the output results in terminal.

# Further Information
## [Presentation Slides](https://docs.google.com/presentation/d/1J7tgyFyMymNs60c_-nkp1iJ_B9I-l3WTMHfsbggwCaw/edit?usp=sharing)
## Proposal
- Create a solvable maze-graph object representation of a 2D-maze with 90˚ branches.
	- Ensure abstract model of the maze would fit within 2D space.
	- Allow buckling-back (or cycles) in the maze.
	- Generate less or more branches of greater or lesser depths when first making the maze.
- Find the *top 3* shortest paths from start to finish on a maze-graph object.
- Validate that the maze-graph model fits within ~~3D~~ 2D space. <small>*3D was a typo*</small>.
- Analyze maze difficulty based on number and depth of branches, twists, etc

## Product Features
- Depth-First Search maze generation.
- Maze scrambler. (deletes `n` halls)
- Unicode-drawn maze representation.
- Maze solution finder, finds best path.

## Sources

- [maze generation](http://weblog.jamisbuck.org/2011/2/7/maze-generation-algorithm-recap)
- [imperfect mazes](https://gamedev.stackexchange.com/questions/75623/non-perfect-maze-generation-algorithm)

## Brainstorming

### Customize Block-Type Probabilities
- *walls* - blocks with `0` neighbors
- *dead-ends* - blocks with `1` neighbor
- *hallways* - blocks with `2` neighbors
- *forks* - blocks with `3` neighbors
- *intersections* -  blocks with `4` neighbors

### Textual representation of blocks

```md
# wall
┼┼
┼┼

# dead-end
┤├
┼┼

# hallway
┤└
┼┬

# fork
┤└
┤┌

# intersection
┘└
┐┌

```
--->

[makeschool]: https://www.makeschool.com/
[instructions]: ./INSTRUCTIONS.md
[proposal]: ./PROPOSAL.md
[license]: ./LICENSE.md
[react]: ./REACT.md
