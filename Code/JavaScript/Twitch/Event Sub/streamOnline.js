const webSocketClient = require("websocket").client; //npm i websocket
const client = new webSocketClient();

client.on('connectFailed', error => console.log('Connect Error: ' + error.toString()));

client.on('connect', function (connection) {
  console.log('WebSocket Client Connected');
  connection.on('error', error => console.log("Connection Error: " + error.toString()));
  connection.on('close', () => console.log('echo-protocol Connection Closed'));
  connection.on('message', message => {
    console.log(message);
    const messageData = JSON.parse(message.utf8Data);
    if (messageData.metadata.message_type == "session_welcome") {
      console.log(messageData.payload.session.id);

      const body = {
        "type": "stream.online", // https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/
        "version": "1",
        "condition": {
          "broadcaster_user_id": "<USER ID>",
        },
        "transport": {
          "method": "websocket",
          "session_id": messageData.payload.session.id,
        }
      };

      const headers = {
        "method": "POST",
        "headers": {
          "Authorization": "Bearer <ACCESS TOKEN>",
          "Client-Id": "<CLIENT ID>",
          "Content-Type": "application/json",
        },
        "body": JSON.stringify(body)
      };

      fetch("https://api.twitch.tv/helix/eventsub/subscriptions", headers);
    }
  });
});

client.connect('wss://eventsub.wss.twitch.tv/ws');