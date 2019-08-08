from maze import *
from block import *

def main():
	maze = Maze(2,6)
	print(maze.get_row(3))
	print(maze.get_column(1))
	print(maze.get_block(1,2))


if __name__ == '__main__':
	main()