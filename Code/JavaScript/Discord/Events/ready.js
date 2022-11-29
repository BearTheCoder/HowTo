/*

*****     CLIENT READY EVENT     *****

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

    https://discord.js.org/#/docs/discord.js/main/typedef/Events
    https://discordjs.guide/creating-your-bot/event-handling.html

The "ready" event is fired after "client.login()" method.
This is only fired once, so typically it should be paired with the "once" method.
Though, because this is only fired once, this can be paired with the "on" method
and it will make little to no difference. Though, semantically, we should use "once".

The "ready" event returns the client that can be managed by a callback function.

This has little to no use besides preventing your client from being global.

*/

const env = require('config.json');
const {
  Client, //Base Client
  GatewayIntentBits, //Base Client
  Events, //Sugar Syntax if you don't want to type in the name as a string
} = require("discord.js");

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

//Events.ClientReady is fired once the bot "logs in"
discordClient.once(Events.ClientReady, (client) => {
  console.log("Bot ready to do work...");
  console.log(client);
});

// Alternate Syntax - Comment out before running code
discordClient.on("ready", (client) => {
  console.log("Bot ready to do work...");
  console.log(client);
});

discordClient.login(env.BOT_TOKEN);