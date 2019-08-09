# python packages
import sys
# internal packages
from maze import *
from block import *

def main(x,y):
	sys.setrecursionlimit(20000)
	maze = Maze(x,y)
	# for block in maze.maze:
	# 	print(block.neighbors)
	print(maze)

if __name__ == '__main__':
	x = int(input('how wide will the maze be?\t'))
	y = int(input('how tall will the maze be?\t'))
	main(x,y)
