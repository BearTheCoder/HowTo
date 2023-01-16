/*
 *  The following code will allow a streamer's moderator to subscribe to mod events that happen within the streamer's channel.
 * 
 *  PubSub usually requires a user access token from the owner of the channel.
 *  Please keep that in mind going forward.
 *  In this situation the access token can be the moderator's token.
 *  
 *  If you are unfirmiliar how to get an access token please explore the links below:
 *  https://dev.twitch.tv/docs/authentication/#user-access-tokens
 *  https://github.com/BearTheCoder/HowTo/blob/main/Code/C-Sharp/Twitch/IRC_Bot.cs (I explain the process of auth better in this file)
 * 
 *  WebSockets are an open TCP connection to a server that has an event structure that is similar to webhooks.
 *  Whereas webhooks are designed to operate server-to-server, websockets are designed for server-to-client connections.
 *  Unfortunately, WebSockets in C# are a complicated mess that can be simplifed using a package/library called WebSocketSharp.
 *  See: https://github.com/sta/websocket-sharp
 *  
 *  WebSocketSharp is free and open-source and can be used for commercial use, so keep that in mind if you are hesitating to use it.
 *  The code below is an example of how to use it.
 *  
 *  The basic gist of WebSockets is this, you open a connection with the server by making a call to the server (in this case wss://pubsub-edge.twitch.tv) and you are free to send info back and forth.
 *  PubSub, which is Twitch's version of a WebSocket, has some requirements other than just the initial "handshake".
 *  PubSub requires a "listener" within the first 15 seconds of connection.
 *  This listener is provided in the form of a stringified JSON object, which can be seen below.
 *  A better for of the JSON object can be seen in the code here: https://github.com/BearTheCoder/HowTo/blob/main/Code/JavaScript/Twitch/bitRedeemWebSocket.js
 *  
 *  The listener must contain a nonce, which is a randomly genereated unique identifier that is tied to the connection, a topic...
 *  See: https://dev.twitch.tv/docs/pubsub/#topics for information on topics.
 *  And a user access token that has been authorized by the owner of the channel.
 * 
 *  When the listener is accepted, the PubSub connection is established.
 *  With the connection established you can now listen to the events that are being fire by the server.
 *  This is done through the "OnMessage" event.
 *  
 *  The only oteher thing to keep in mind is that PubSub requires a "ping" message to be sent every 5 minutes or the websocket connection is closed.
 *  Through WebSocketSharp this is as easy as calling ws.Ping();
 *  Though, you could also do...
 *      ws.Send("{ type: \"PING\" }");
 *  and it would do the same thing.
 * 
*/

using WebSocketSharp; // Open source and free to use (https://github.com/sta/websocket-sharp)

WebSocket ws = new WebSocket("wss://pubsub-edge.twitch.tv");
ws.Connect();

Console.WriteLine("Ping sent...");
Console.WriteLine("Pong recieved: " + ws.Ping());

string topic = "chat_moderator_actions.<moderator user id>.<channel/user id>";
string authToken = "<auth token>";
string stringifiedJSONRequest = "{\"type\": \"LISTEN\",\"nonce\": \"" + nonce(15) +"\",\"data\": {\"topics\": [\"" + topic + "\"],\"auth_token\": \"" + authToken + "\"}}";
ws.Send(stringifiedJSONRequest);

ws.OnMessage += (sender, e) => { Console.WriteLine(e.Data); };

Console.ReadKey(true);

string nonce(int length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
    {
        text += possible[new Random().Next(0, possible.Length)];
    }
    return text;
}
