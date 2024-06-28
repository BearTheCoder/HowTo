/*
    To get SCOOP, in windows powershell:
        > Set-ExecutionPolicy RemoteSigned -Scope CurrentUser # Optional: Needed to run a remote script the first time
        > irm get.scoop.sh | iex
        > scoop bucket add twitch https://github.com/twitchdev/scoop-bucket.git
        > scoop install twitch-cli

    To start twitch CLI, in windows powershell:
        > twitch event websocket start-server

    Find the line where it says "Connect to the WebSocket server at: ws://127.0.0.1:8080/ws"

    Make sure the websocket matches the code below:

    Now if you open the webpage, the Twitch CLI will show a connection.

    The code written for usage is different than the code used for the Twitch CLI, but the CLI will send faux event messages that match
    the actual response exactly.
*/

const websocket = "ws://127.0.0.1:8080/ws";

const socket = new WebSocket(`${websocket}`);

const pingMsg = { type: "PING" };

socket.addEventListener("open", () => { console.log("connected") });

socket.addEventListener("message", event => console.log(event));
