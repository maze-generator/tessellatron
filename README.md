# Square-Based Maze Generation
## How To Use
1. navigate to `src/` folder in terminal.
1. run `python main.py`
    - this can take additional parameters:
        1. the length of the maze to be generated (int)
        1. the width of the maze to be generated (int)
        1. the aeration of the maze to be generated (int)
1. follow any on-screen prompts for additional inputs.
1. view the output results in terminal.

# Further Information
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
