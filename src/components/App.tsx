import React, { useState } from 'react'
import './App.css'
import Maze from '../classes/maze'

const myMaze: string = 'hello'
const test = new Maze([10,10])
console.log(JSON.parse(test.json))

const App = () => {
	const [words, setWords] = useState(myMaze)
	return (
		<>
			<h1>Maze Generator</h1>
			<p>
				Generate your maze by clicking the button.
			</p>
			<input
				type='button'
				onClick={() => {
					setWords(myMaze)
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
