# python packages
import sys
# internal packages
from maze import Maze


def main(length=None, height=None, aeration=0, visuals='e'):
	# there will be a lot of recursion...
	sys.setrecursionlimit(20000)
	# create maze.
	maze = Maze(length, height, aeration, visuals)
	# airrate
	print('---')
	print('solution array:', maze.shortest_path_bfs())
	print('---')
	# output to terminal.
	print(maze)


if __name__ == '__main__':
	# check if there are input parameters.
	# call main in either case - with different params.
	if len(sys.argv) == 5:
		length = int(sys.argv[1])
		height = int(sys.argv[2])
		aeration = int(sys.argv[3])
		visuals = sys.argv[4]
		main(length, height, aeration, visuals)
	elif len(sys.argv) == 4:
		length = int(sys.argv[1])
		height = int(sys.argv[2])
		aeration = int(sys.argv[3])
		main(length, height, aeration)
	elif len(sys.argv) == 3:
		length = int(sys.argv[1])
		height = int(sys.argv[2])
		main(length, height)
	else:
		main()
