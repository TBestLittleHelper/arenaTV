export type PlayerStandings = {
	players: Player[];
};

export type Player = {
	name: string;
	flairImageURL: string;
	score: number;
	ratingClass: RatingClass;
}

export type RatingClass = 'u1400' | 'u2000' | 'master' | 'legendary';


export type ArenaResultPlayer = {
	rank: number;
	score: number;
	rating: number;
	username: string;
	title?: string;
	performance: number;
	team: string;
	sheet?: {
		scores: string;
	};
};

export type ArenaInfo = {
	id: string;
	fullName: string;
	nbPlayers: number;
	isFinished: boolean;
	rated?: boolean;
	berserkable?: boolean;
	onlyTitled?: boolean;
	pairingsClosed?: boolean;
	createdBy: string;
	startsAt: number;
	system: string;
	description: string;
	variant: string;

	clock: {
		limit: number;
		increment: number;
	};

	minutes: number;

	perf: {
		key: string;
		name: string;
		icon: string;
	};

	duels: any[]; // ideally replace with a specific type

	stats: {
		moves: number;
		averageRating: number;
		berserks: number;
		blackWins: number;
		games: number;
		draws: number;
		whiteWins: number;
	};

	podium: {
		name: string;
		title: string;
		patron?: boolean;
		rank: number;
		rating: number;
		score: number;
		nb: {
			game: number;
			berserk: number;
			win: number;
		};
		performance: number;
		flair?: string;
	}[];

	standing: {
		page: number;
		players: {
			name: string;
			flair?: string;
			title?: string;
			patron?: boolean;
			rank: number;
			rating: number;
			score: number;
			sheet: {
				scores: string;
				fire?: boolean;
			};
		}[];
	};

	spotlight?: {
		headline: string;
	};

	verdicts?: {
		list: {
			condition: string;
			verdict: string;
		}[];
		accepted: boolean;
	};

	schedule?: {
		freq: string;
		speed: string;
	};
};
