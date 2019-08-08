from maze import *
from block import *

def main():
	maze = Maze(20,20)
	for block in maze.maze:
		print(block.neighbors)
	print(maze)


if __name__ == '__main__':
	main()