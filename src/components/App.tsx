import React, { useState } from 'react';
import './App.css';

const App = () => {
	const [words, setWords] = useState('Hello, world')
	return (
		<>
			<h1>Maze Generator</h1>
			<p>
				Generate your maze by clicking the button.
				<br />
				<input
					type='button'
					onClick={() => setWords(words + '!')}
					value='Generate'
				/>
			</p>
			<textarea
				className='results'
				value={words}
				readOnly={true}
			/>
		</>
	)
}

export default App;
