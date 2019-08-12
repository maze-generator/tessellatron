class Block():
    def __init__(self, id):
        self.id = id
        self.neighbors = {
            'north': False,
            'south': False,
            'east': False,
            'west': False,
        }

    def __repr__(self):
        return str(self.id)
