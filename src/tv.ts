import { ArenaInfo, ArenaResultPlayer } from './types/tv';
import { Chessground } from 'chessground';
import { Config } from 'chessground/config';

let standings: { flairImageURL: string; name: string; score: number; }[] = [];

const arneaName = document.getElementById("arenaName") as HTMLDivElement;
const arenaTimeLeft = document.getElementById("arenaTimeLeft") as HTMLTableCellElement;

const boardElement = document.getElementById('board')!;

const config: Config = {
	draggable: {
		enabled: false
	}
};
const board = Chessground(boardElement, config);


// Arena id for test
const arenaID = "Q956jcrq";
const arenaInfo = fetch(`https://lichess.org/api/tournament/${arenaID}`);

arenaInfo
	.then(response => response.json())
	.then((data: ArenaInfo) => {
		console.log('Fetched arena info:', data);
		arneaName.innerText = data.fullName;
		arenaTimeLeft.innerText = data.minutes.toString(); // todo count down etc.

		const players = data.standing.players;
		for (const player of players) {
			standings.push({
				flairImageURL: player.flair
					? `https://lichess1.org/assets/flair/img/${player.flair}.webp`
					: `https://lichess1.org/assets/flair/img/activity.chess-pawn.webp`,
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

const standingsStream = fetch(
	`https://lichess.org/api/tournament/${arenaID}/results?nb=10`)

async function readNDJSONStream(url: string) {
	const response = await fetch(url);
}

console.table(standings);

window.addEventListener("DOMContentLoaded", () => {
	updateStandings();
	setInterval(updateStandings, 30000);
});


// todo only update the changed players
// avoid loading flair images very time
function updateStandings() {
	const tbody = document.getElementById("standingsBody") as HTMLTableSectionElement;
	tbody.innerHTML = ""; // Clear only the table body

	standings.forEach((player) => {
		const row = tbody.insertRow();
		const flairCell = row.insertCell();
		const usernameCell = row.insertCell();
		const pointsCell = row.insertCell();

		flairCell.innerHTML = `<img src="${player.flairImageURL}" alt="Flair">`;
		usernameCell.textContent = player.name;
		pointsCell.textContent = player.score.toString();
	});
}
