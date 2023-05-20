const env = require('config.json');
const {
  Client, //Base Client
  GatewayIntentBits, //Base Client
  REST, //Required for Slash Commands
  SlashCommandBuilder, //Required for Slash Commands
  Routes, //Required for Slash Commands
  PermissionFlagsBits, //Sugar syntax: In case you don't remember the permission numbers.
} = require("discord.js");

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

discordClient.on("ready", () => { createNewCommand(); });

discordClient.on("messageCreate", (message) => {
  message.channel.sendTyping(); //Resolves
});

discordClient.login(env.BOT_TOKEN);