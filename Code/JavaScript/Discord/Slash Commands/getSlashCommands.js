/*

*****     LIST ALL GUILD SLASH COMMANDS     *****

Please look at all four modules, 
  createNewSlashCommand.js, deleteAllCommands.js, getSlashCommands.js, and deleteCommandByID.js.
to fully understand slash commands.

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

  https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration

The following script retreives all slash commands associated with the bot and returns the commands as an
array of objects through a promise and then logs it to the console.

*/

const env = require('config.json');
const {
  Client, //Base Client
  GatewayIntentBits, //Base Client
  REST, //Require to access slash commands
  Routes, //Require to access slash commands
} = require("discord.js");

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

// For more information on events, go to "../Events"
discordClient.on('ready', () => { getCommands(); });

function getCommands () {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);
  rest.get(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID))
    .then((data) => { console.log(data); })
    .catch(console.error);
}

discordClient.login(env.BOT_TOKEN);