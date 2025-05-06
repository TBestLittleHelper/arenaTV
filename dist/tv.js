import { Chessground } from 'chessground';
const standings = [
    { emoji: "🏆", username: "Player1", points: 100 },
    { emoji: "🥈", username: "Player2", points: 90 },
    { emoji: "🥉", username: "Player3", points: 80 },
    { username: "Player4", points: 70 },
    { username: "Player5", points: 60 }
];
const element = document.getElementById('board');
const config = {
    draggable: {
        enabled: true
    }
};
const board = Chessground(element, config);
// Arena id for test
const arenaID = "Q956jcrq";
const arenaInfo = fetch(`https://lichess.org/api/tournament/` + { arenaID });
console.log(arenaInfo);
const readStream = processLine => response => {
    const stream = response.body.getReader();
    const matcher = /\r?\n/;
    const decoder = new TextDecoder();
    let buf = '';
    const loop = () => stream.read().then(({ done, value }) => {
        if (done) {
            if (buf.length > 0)
                processLine(JSON.parse(buf));
        }
        else {
            const chunk = decoder.decode(value, {
                stream: true
            });
            buf += chunk;
            const parts = buf.split(matcher);
            buf = parts.pop();
            for (const i of parts.filter(p => p))
                processLine(JSON.parse(i));
            return loop();
        }
    });
    return loop();
};
const standingsStream = fetch(`https://lichess.org/api/tournament/${arenaID}/results?nb=10`, {
    headers: {
        "Accept": "application/x-ndjson"
    }
});
const onMessage = (/** @type {any} */ obj) => {
    console.log(obj);
};
const onComplete = () => console.log('The stream has completed');
standingsStream
    .then(readStream(onMessage))
    .then(onComplete);
console.table(standings);
window.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("standings");
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
