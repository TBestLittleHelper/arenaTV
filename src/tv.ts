const standings = [
	{ emoji: "🏆", username: "Player1", points: 100 },
	{ emoji: "🥈", username: "Player2", points: 90 },
	{ emoji: "🥉", username: "Player3", points: 80 },
	{ username: "Player4", points: 70 },
	{ username: "Player5", points: 60 }
];

console.table(standings);

window.addEventListener("DOMContentLoaded", () => {
	const table = document.getElementById("standings") as HTMLTableElement;

	standings.forEach((player) => {
		const row = table.insertRow();
		const emojiCell = row.insertCell();
		const usernameCell = row.insertCell();
		const pointsCell = row.insertCell();

		emojiCell.textContent = player.emoji || "";
		usernameCell.textContent = player.username;
		pointsCell.textContent = player.points.toString();
	});
});
