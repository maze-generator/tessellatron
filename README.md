# Square-Based Maze Generator
## Proposal
- Create a solvable maze-graph object representation of a 2D-maze with 90˚ branches.
	- Ensure abstract model of the maze would fit within 2D space.
	- Allow buckling-back (or cycles) in the maze.
	- Generate less or more branches of greater or lesser depths when first making the maze.
- Find the *top 3* shortest paths from start to finish on a maze-graph object.
- Validate that the maze-graph model fits within 2D space.
- Analyze maze difficulty based on number and depth of branches, twists, etc

## Sources

[imperfect mazes](https://gamedev.stackexchange.com/questions/75623/non-perfect-maze-generation-algorithm)


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
