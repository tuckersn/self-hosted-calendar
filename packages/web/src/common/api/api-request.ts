export async function apiRequest(
	method: "GET" | "POST",
	path: string,
	options?: {
		body?: any
	}
) {
	//TODO: reject users not logged in
	let result;
	if(method === "GET") {
		result = await fetch(process.env.REACT_APP_SERVER_URL + path, {
			method,
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("jwt")}`
			}
		});
	} else {
		result = await fetch(process.env.REACT_APP_SERVER_URL + path, {
			method,
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("jwt")}`
			},
			body: options?.body ? JSON.stringify(options.body) : undefined
		});
	}

	if(result.status > 399 && result.status !== 404) {
		alert(`Error occurred:\n` + JSON.stringify(await result.json(), null, 4));
	}

	return result;
}