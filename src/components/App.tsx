import React, { useState } from 'react';
import './App.css';
import RenderClass from '../classes/render-class'

const myRender = new RenderClass()

const App = () => {
	const [words, setWords] = useState(myRender.text)
	return (
		<>
			<h1>Maze Generator</h1>
			<p>
				Generate your maze by clicking the button.
			</p>
			<input
				type='button'
				onClick={() => {
					myRender.addPoint()
					setWords(myRender.text)
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
