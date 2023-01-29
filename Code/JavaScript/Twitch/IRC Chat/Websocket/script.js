const oAuth = "5pm2jgry9oqeghu1nunqe5pprrq3iz";
const user = "bearthecoder";
const channel = "bearthecoder";

const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

socket.addEventListener('open', (event) => {
  socket.send(`PASS oauth:${oAuth}`);
  socket.send(`NICK ${user}`);
  socket.send(`JOIN #${channel}`);
});

socket.addEventListener('message', (event) => {
  document.getElementById("serverOutput").innerText += event.data;
  if (event.data.includes("Hello World")) socket.send(`PRIVMSG #${channel} :cringe`);
  if (event.data.includes("PING")) socket.send("PONG");
  if (event.data.includes("PART")) {
    socket.send(`JOIN #${randomChannel}`);
  }
});

