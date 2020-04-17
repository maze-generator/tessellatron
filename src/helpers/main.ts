// which random function to use as default
const RANDOM = Math.random

// random shuffle helper function
// uses fisher yates randomizer
export const shuffle = (
	array:Array<any>,
	items:number = array.length,
	random:Function = RANDOM,
):Array<any> => {
	const keys = [...array] // create copy
	const results = [] // store choices here
	for (let i=0; i<items; i++) {
		const choice = Math.floor(random() * keys.length)
		results.push(keys[choice]) // add choice to results
		keys.splice(choice, 1) // remove choice from keys
	}
	return results
}

// classic range function from python etc.
export const range = (
	start:number,
	finish:number,
):Array<number> => {
	// track results
	const results:Array<number> = []
	// loop through range
	for (let i:number = start; i < finish; i += 1) {
		results.push(i)
	}
	// return range
	return results
}
