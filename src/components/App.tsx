import React, { useState } from 'react'
import './App.css'
import Maze from '../classes/maze/tetragon-maze'
import Graphic from '../classes/unicode-graphic'

const myMaze = new Maze([3,2])
const myVisual = new Graphic(myMaze)
const results: string = myVisual.pipeMaze()

console.log(myVisual.pipeMaze())
myMaze.generate(0)
console.log(myVisual.pipeMaze())
console.log(myMaze.json)

const App = () => {
	const [words, setWords] = useState(results)
	return (
		<>
			<h1>Maze Generator</h1>
			<p>
				Generate your maze by clicking the button.
			</p>
			<input
				type='button'
				onClick={() => {
					const newMaze = new Maze([10, 10])
					newMaze.generate(0)
					const newVisual = new Graphic(newMaze)
					setWords(newVisual.pipeMaze())
				}}
				value='Generate'
			/>

			<textarea
				className='results'
				value={words}
				readOnly={true}
			/>
		</>
	)
}

export default App;
