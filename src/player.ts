import { ArenaInfo, Player, RatingClass } from "./types/tv";

export function createPlayer(arenaPlayer: ArenaInfo['standing']["players"][number]) {

	const ratingClass = getRatingClass(arenaPlayer.rating) // check if we can get the rating at start of arena
	const flairImageURL = arenaPlayer.flair
		? `https://lichess1.org/assets/flair/img/${arenaPlayer.flair}.webp`
		: `https://lichess1.org/assets/flair/img/activity.chess-pawn.webp`;

	const player: Player = {
		name: arenaPlayer.name,
		flairImageURL: flairImageURL,
		score: arenaPlayer.score,
		ratingClass: ratingClass,
	}

	return player;
}

function getRatingClass(rating: number): RatingClass {
	if (rating < 1400) {
		return 'u1400';
	} else if (rating < 2000) {
		return 'u2000';
	} else if (rating < 2700) {
		return 'master';
	} else {
		return 'legendary';
	}
}
