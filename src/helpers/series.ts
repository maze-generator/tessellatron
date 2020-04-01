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
