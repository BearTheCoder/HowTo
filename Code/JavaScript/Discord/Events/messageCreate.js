/*

*****     MESSAGE CREATE EVENT     *****

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

    https://discord.js.org/#/docs/discord.js/main/typedef/Events
    https://discordjs.guide/creating-your-bot/event-handling.html

The "messageCreate" event is fired any time a user sends a message within the guild.

As you can imagine, this is memory intensive, but sometimes has it's utility. At this point and time of me typing this
Discord.JS has had an AutoMod feature for an hour and a half. (Release 14.7.0)

Presumably, the AutoMod feature will make this feature relatively useless. But it's here if you need it.

Just like other obscure events, this event requires special Gateway Intents to make full use of.
Be sure to include those.

The "messageCreate" event can be fired multiple times, hence it needs to be paired with the "on" method.

*/

const env = require('config.json');
const {
 Client, // Base Client
 GatewayIntentBits, // Base Client
 Events, // Sugar Syntax if you don't want to type in the name as a string
} = require("discord.js");

const discordClient = new Client({
 intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
 ],
});

// Events.MessageCreate is fired anytime a user sends a message in the guild
discordClient.on(Events.MessageCreate, (message) => {
 console.log("Someone sent a message...");
 console.log(message);
});

// Alternate Syntax - Comment out before running code
discordClient.on("messageCreate", (message) => {
 console.log("Someone sent a message...");
 console.log(message);
});

discordClient.login(env.BOT_TOKEN);
