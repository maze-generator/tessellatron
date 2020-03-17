// random shuffle helper function
// uses fisher yates randomizer
const shuffle = (
	array:Array<any>,
	items:number = array.length,
	random:Function = Math.random,
):Array<any> => {
	const keys = [...array] // create copy
	const results = []
	for (let i=0; i<items; i++) {
		const roll = Math.floor(random() * keys.length)
		results.push(keys[roll])
		keys.splice(roll, 1)
	}
	return results
}

export default shuffle
