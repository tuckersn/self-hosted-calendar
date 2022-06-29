export function returnRecord<RECORD_TYPE = any>(resultOfQuery: [unknown[], unknown]): RECORD_TYPE {
	if(!Array.isArray(resultOfQuery[0])) {
		throw new Error(`Invalid result of ${resultOfQuery} here.`);
	}

	const record = resultOfQuery[0][0];

	if(record === null || record === undefined) {
		throw new Error("Failed to insert user record, no record returned");
	}

	return record;
}