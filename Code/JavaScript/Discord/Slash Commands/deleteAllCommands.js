/*

*****     DELETE ALL GUILD SLASH COMMANDS     *****

Please look at all four modules, 
  createNewSlashCommand.js, deleteAllCommands.js, getSlashCommands.js, and deleteCommandByID.js.
to fully understand slash commands.

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

  https://discordjs.guide/slash-commands/deleting-commands.html#deleting-all-commands

The following script will delete all commands associated with the bot in the guild by setting the body of the 
commands object to an empty array, and registering the empty array to the guild via Routes.

Generally, this is unimportant as commands are deleted from a guild when a bot is removed.

This only has utility in development when initially creating your commands.

*/

const env = require('config.json');
const {
  Client, //Base Client
  GatewayIntentBits, //Base Client
  REST, // Required to delete commands
  Routes, // Required to delete commands
} = require("discord.js");

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

// For more information on events, go to "../Events"
discordClient.on("ready", () => { deleteAllCommands(); });

function deleteAllCommands () {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);

  //Log Existing Guild Commands
  rest.get(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID))
    .then((data) => console.log(`List of commands before... \n ${data}`))
    .catch((err) => console.log(err));

  //Erase all existing guild commands by setting body array to an empty array
  rest.put(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID), { body: [], })
    .then((data) => console.log(`List of commands after... \n ${data}`))
    .catch(console.error);
}

discordClient.login(env.BOT_TOKEN);