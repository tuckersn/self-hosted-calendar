export function forLoop<RETURN_VALUE>(iterations: number, cb: (index: number) => RETURN_VALUE, start: number = 0): RETURN_VALUE[] {
	const returnValues = [];
	for (let i = start; i < iterations; i++) {
		returnValues.push(cb(i));
	}
	return returnValues;
}

