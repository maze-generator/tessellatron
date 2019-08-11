# python packages
import sys
# internal packages
from maze import Maze


def main(length=None, height=None):
	# there will be a lot of recursion...
	sys.setrecursionlimit(20000)
	# create maze.
	maze = Maze(length, height)
	# output to terminal.
	print(maze)


if __name__ == '__main__':
	# check if there are input parameters.
	# call main in either case - with different params.
	if len(sys.argv) == 3:
		length = int(sys.argv[1])
		height = int(sys.argv[2])
		main(length, height)
	else:
		main()
