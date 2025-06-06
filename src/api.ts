// Must have /api/ at the end of the URL
function getBaseURL(): string | 'https://lichess.org/api/' {
	if (process.env.NODE_ENV === 'development') {
		return process.env.API_TARGET_URL as string;
	}
	return 'https://lichess.org/api/';
}

export function getArenaInfoURL(arenaID: string): any {
	const baseURL = getBaseURL();
	const arenaInfoURL = `${baseURL}tournament/${arenaID}`;
	return arenaInfoURL;
}

export function getArenaResultsURL(arenaID: string, number: number): any {
	const baseURL = getBaseURL();
	const resultsURL = `${baseURL}tournament/${arenaID}/results?nb=${number}`;
	return resultsURL;
}
