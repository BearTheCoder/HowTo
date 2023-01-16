// https://github.com/twitchdev/pubsub-javascript-sample/blob/main/main.js (original code)
// WebSocket does not work with node.

const socket = new WebSocket('wss://pubsub-edge.twitch.tv');

// The channel that you are trying to read the bits for needs to match the user attached to the authentication token.
const request = {
  type: "LISTEN",
  nonce: nonce(15),
  data: {
    topics: ["channel-bits-events-v2.<channel or user id>"],
    auth_token: "<auth token goes here>" // Auth Token must have scope of what you need.
  }
};

socket.addEventListener('open', (event) => {
  socket.send(JSON.stringify({ type: "PING" })); //Replies with pong
  socket.send(JSON.stringify(request)); //Replies with empty response.
});

socket.addEventListener('message', (event) => {
  console.log(event);
  console.log('Message from server ', event.data);
});

// nonce is a psuedorandom string of characters that is intended to be a unique identifier for a subscriber/listener relationship
function nonce (length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}