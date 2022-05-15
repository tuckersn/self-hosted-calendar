export async function apiRequest(
	method: "GET" | "POST",
	path: string,
	options: {
		body: any
	}
) {
	const result = await fetch(process.env.REACT_APP_SERVER_URL + path, {
		method,
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${process.env.REACT_APP_SERVER_TOKEN}`
		}
	});
	console.log("RESULT:", result, );

}