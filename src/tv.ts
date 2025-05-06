import { ArenaInfo, ArenaResultPlayer } from './types/tv';
import { Chessground } from 'chessground';
import { Config } from 'chessground/config';

let standings: { flair: string; name: string; score: number; }[] = [];
//	const standings = [
//		{ flair: "🏆", name: "Player1", score: 100 },
//	];

const element = document.getElementById('board')!;

const config: Config = {
	draggable: {
		enabled: true
	}
};
const board = Chessground(element, config);



// Arena id for test
const arenaID = "Q956jcrq";

const arenaInfo = fetch(`https://lichess.org/api/tournament/${arenaID}`);

arenaInfo
	.then(response => response.json())
	.then((data: ArenaInfo) => {
		console.log('Fetched arena info:', data);
		const players = data.standing.players;
		for (const player of players) {
			standings.push({
				flair: player.flair || "♟️",
				name: player.name,
				score: player.score
			});
		}
	})
	.catch(error => {
		console.error('Error fetching arena info:', error);
	});


console.log(arenaInfo);

//Get ndjson from https://lichess.org/api/tournament/{id}/results

// Read a ND-JSON stream from the browser or from nodejs
// https://gist.github.com/ornicar/a097406810939cf7be1df8ea30e94f3e
interface ProcessLine {
	(data: Record<string, ArenaResultPlayer>): void;
}

interface ReadStream {
	(processLine: ProcessLine): (response: Response) => Promise<void>;
}

const readStream: ReadStream = processLine => response => {
	const stream = response.body!.getReader();
	const matcher = /\r?\n/;
	const decoder = new TextDecoder();
	let buf = '';

	const loop = (): Promise<void> =>
		stream.read().then(({ done, value }) => {
			if (done) {
				if (buf.length > 0) processLine(JSON.parse(buf));
			} else {
				const chunk = decoder.decode(value, {
					stream: true
				});
				buf += chunk;

				const parts = buf.split(matcher);
				buf = parts.pop()!;
				for (const i of parts.filter(p => p)) processLine(JSON.parse(i));
				return loop();
			}
		});

	return loop();
};


// 	const standingsStream = fetch(
// 		`https://lichess.org/api/tournament/${arenaID}/results?nb=10`, // 	{
// 		headers: {
// 			"Accept": "application/x-ndjson"
// 		}
// 	});
const onMessage = (/** @type {any} */ obj: any) => {
	console.log(obj);
};
const onComplete = () => console.log('The stream has completed');
// standingsStream
//	.then(readStream(onMessage))
//	.then(onComplete);

console.table(standings);

window.addEventListener("DOMContentLoaded", () => {
	updateStandings();
	setInterval(updateStandings, 1000);
});


function updateStandings() {
	const table = document.getElementById("standings") as HTMLTableElement;
	table.innerHTML = ""; // Clear the table

	standings.forEach((player) => {
		const row = table.insertRow();
		const flairCell = row.insertCell();
		const usernameCell = row.insertCell();
		const pointsCell = row.insertCell();

		flairCell.textContent = player.flair;
		usernameCell.textContent = player.name;
		pointsCell.textContent = player.score.toString();
	});
}
