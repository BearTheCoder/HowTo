require("dotenv").config(); //npm i dotenv
const webSocketClient = require("websocket").client; //npm i websocket

const {
  Client, //Base Client
  GatewayIntentBits, //Base Client
} = require("discord.js");

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

discordClient.on("ready", () => {
  discordClient.channels.fetch(process.env.CHANNEL_ID)
    .then(channel => {
      channel.send("<Message>");
    });
});

discordClient.login(process.env.TOKEN);