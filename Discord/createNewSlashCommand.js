/*
    Script created with bot having admin rights.
    Experiment with what rights your bot ACTAULLY needs.

    https://discord.js.org/#/

    The following script will create a new slash command on load and add it to existing commands 
    as long as the command names are unique, otherwise it will throw an error

    The code below:
     rest.get(Routes.applicationGuildCommands(process.env.APPLICATION_ID, guildID))
    will return all existing slash commands to an array through a promise.

    Each Slash command can be built using the SlashCommandBuilder or by creating an appropriate object.

    Both options are show below.

*/

require('dotenv').config(); // npm i dotenv
const {
 Client,
 GatewayIntentBits,
 REST,
 SlashCommandBuilder,
 Routes,
} = require("discord.js"); //npm i discord.js

const discordClient = new Client({
 intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
 ],
});

//"ready" is called after the bot is logged in and active.
discordClient.on("ready", () => {
 createNewCommand(process.env.testServerID);
});

function createNewCommand (guildID) {
 const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
 rest
  .get(Routes.applicationGuildCommands(process.env.APPLICATION_ID, guildID))
  .then((commands) => {

   //Both commands below are valid syntax
   const newCommand = new SlashCommandBuilder()
    .setName('test')
    .setDescription('test command')
    .setDefaultMemberPermissions(0);

   const newCommand2 = {
    name: 'test2',
    description: '(MODS) does nothing',
    options: [],
    default_permission: undefined,
    default_member_permissions: '4',
    dm_permission: undefined
   };

   commands.push(newCommand);
   commands.push(newCommand2);

   return rest.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID, guildID), { body: commands, });
  })
  .then((data) => console.log(data))
  .catch(console.error);
}
discordClient.login(process.env.BOT_TOKEN);