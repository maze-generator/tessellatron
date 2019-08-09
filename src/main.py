# python packages
import sys
# internal packages
from maze import *
from block import *

def main():
	sys.setrecursionlimit(5000)
	maze = Maze(50,5)
	# for block in maze.maze:
	# 	print(block.neighbors)
	print(maze)

if __name__ == '__main__':
	main()