/*
  Key Points:
    Listen message must be sent within 15 seconds of connecting
    Ping message must be sent every 5 minutes with some variance to time to prevent multiple ping messages happening at once.
    Messages sent to the server are in stringified JSON format
    A reconnect message is sent every now and then in the case of server maintenence
    If every reconnected from the server, twitch recommends an exponential backoff (ie try after 1 second, then 2, then 4, then 8, maximum 2 minutes.) to prevent
      multiple reconnections at once.
    One Client ID can listen up to 50 topics per websocket connection, and a single IP is allowed up to 10 websocket connections.
    Approved applications "have a relaxed limit" (no limit?)
    Malicious or careless applications can be banned from the PubSub server.
    The three main topics are Bits, Subscriptions, and Channel Points.
    The data that is returned is also in stringified JSON format, so it is kind of hard to deal with.
*/

const socket = new WebSocket("wss://pubsub-edge.twitch.tv");

const pingMsg = { type: "PING" };

const listenMsg = {
  type: "LISTEN",
  data: {
    topics: ["chat_moderator_actions.<USER ID>.<MODERATOR ID>"],
    auth_token: "<AUTH TOKEN>"
  }
};

socket.addEventListener("open", () => {
  socket.send(JSON.stringify(pingMsg)); //Must be done every 5 minutes with variance
  socket.send(JSON.stringify(listenMsg)); //Must be done within 15 seconds
});

socket.addEventListener("message", event => {

  console.log(event)

  const layer1 = JSON.parse(event.data);

  console.log(layer1)

  if (layer1.type == "MESSAGE") {
    const layer2 = JSON.parse(layer1.data.message).data;
    console.log(layer2);
  }
});