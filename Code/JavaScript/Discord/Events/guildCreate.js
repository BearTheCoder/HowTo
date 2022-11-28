/*

*****     GUILD CREATE EVENT     *****

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

  https://discord.js.org/#/docs/discord.js/main/class/Client?scrollTo=e-guildCreate
  https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

The following script will log a message as soon as the bot is logged into the server.

If you are creating a bot as a service, maybe using the "guidCreate" event to register the
user's guild to your chosen persistence method would be best practice for user experience.

*/

const env = require('config.json');
const {
  Client, //Base Client
  GatewayIntentBits, //Base Client
  Events, //Sugar Syntax if you don't want to type in the name as a string
} = require("discord.js");

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

//Events.GuildCreate is the same as "bot added to guild": Events.GuildCreate could also be "guildCreate"
discordClient.on(Events.GuildCreate, (guild) => {
  console.log("Guild added bot...");
  console.log(guild);
});

discordClient.login(env.BOT_TOKEN);