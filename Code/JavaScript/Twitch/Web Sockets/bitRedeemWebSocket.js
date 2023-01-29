// https://github.com/twitchdev/pubsub-javascript-sample/blob/main/main.js (original code)
// WebSocket does not work with node.

const socket = new WebSocket('wss://pubsub-edge.twitch.tv');

// The channel that you are trying to read the bits for needs to match the user attached to the authentication token.
const request = {
  type: "LISTEN",
  nonce: nonce(15),
  data: {
    topics: ["channel-bits-events-v2.<streamer user id>"],
    auth_token: "<auth token>" // Auth Token must have scope of what you need.
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

//Actual text response
// { "type": "MESSAGE", "data": { "topic": "channel-bits-events-v2.<streamer id>", "message": "{\"data\":{\"user_name\":\"<cheerer username>\",\"channel_name\":\"<streamer user name>\",\"user_id\":\"<cheerer user id>\",\"channel_id\":\"<channel user id>\",\"time\":\"2023-01-16T04:23:12.545136054Z\",\"chat_message\":\"This is a Cheer10\",\"bits_used\":10,\"total_bits_used\":7990,\"is_anonymous\":false,\"context\":\"cheer\",\"badge_entitlement\":null},\"version\":\"1.0\",\"message_type\":\"bits_event\",\"message_id\":\"d203ee36-169a-534e-be90-90b49f85dd85\"}"; } }

// This is a Cheer10
const jsonResponseMessageBefore = {
  "type": "MESSAGE",
  "data": {
    "topic": "channel-bits-events-v2.<streamer user id>",
    "message": {
      "data": {
        "user_name": "<cheerer user name>",
        "channel_name": "<streamer user name>",
        "user_id": "<cheerer user id>",
        "channel_id": "<streamer user id>",
        "time": "2023-01-16T04:23:12.545136054Z",
        "chat_message": "This is a Cheer10",
        "bits_used": 10, "total_bits_used": 7990,
        "is_anonymous": false,
        "context": "cheer",
        "badge_entitlement": null
      },
      "version": "1.0",
      "message_type": "bits_event",
      "message_id": "d203ee36-169a-534e-be90-90b49f85dd85"
    }
  }
};

const jsonResponseMixedCheer = {
  "type": "MESSAGE",
  "data": {
    "topic": "channel-bits-events-v2.<streamer user id>",
    "message": {
      "data": {
        "user_name": "<cheerer user name>",
        "channel_name": "<streamer user name>",
        "user_id": "<cheerer user name>",
        "channel_id": "<streamer user name>",
        "time": "2023-01-16T04:27:35.624078197Z",
        "chat_message": "This Cheer12  is Cheer12  a Cheer12  test Cheer12",
        "bits_used": 48,
        "total_bits_used": 8038,
        "is_anonymous": false,
        "context": "cheer",
        "badge_entitlement": null
      },
      "version": "1.0",
      "message_type": "bits_event",
      "message_id": "bb5c3381-7211-52f7-8a37-66f77fc7af9c"
    }
  }
};

const jsonResponseNoMessage = {
  "type": "MESSAGE",
  "data": {
    "topic": "channel-bits-events-v2.<streamer user id>",
    "message": {
      "data": {
        "user_name": "<cheerer user name>",
        "channel_name": "<streamer user name>",
        "user_id": "<cheerer user id>",
        "channel_id": "<streamer user id>",
        "time": "2023-01-16T04:14:44.673769289Z",
        "chat_message": "Cheer10",
        "bits_used": 10, "total_bits_used": 7570,
        "is_anonymous": false,
        "context": "cheer",
        "badge_entitlement": null
      },
      "version": "1.0",
      "message_type": "bits_event",
      "message_id": "21563864-c60c-5110-bca4-63242a681b63"
    }
  }
};