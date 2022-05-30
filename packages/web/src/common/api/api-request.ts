export async function apiRequest(
	method: "GET" | "POST",
	path: string,
	options?: {
		body?: any
	}
) {
	let result;
	if(method === "GET") {
		result = await fetch(process.env.REACT_APP_SERVER_URL + path, {
			method,
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${process.env.REACT_APP_SERVER_TOKEN}`
			}
		});
	} else {
		result = await fetch(process.env.REACT_APP_SERVER_URL + path, {
			method,
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${process.env.REACT_APP_SERVER_TOKEN}`
			},
			body: options?.body ? JSON.stringify(options.body) : undefined
		});
	}

}