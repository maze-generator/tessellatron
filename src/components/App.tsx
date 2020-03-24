import React, { useState } from 'react';
import './App.css';
import Maze from '../classes/maze'
import Graphic from '../classes/unicode-graphic'

const myMaze = new Maze([40,10])
const myGraphic = new Graphic(myMaze)

console.log(myMaze)

const App = () => {
	const [words, setWords] = useState(myGraphic.pipeMaze())
	return (
		<>
			<h1>Maze Generator</h1>
			<p>
				Generate your maze by clicking the button.
			</p>
			<input
				type='button'
				onClick={() => {
					const newMaze = new Maze([40,10])
					const newGraphic = new Graphic(newMaze)
					setWords(newGraphic.pipeMaze())
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
