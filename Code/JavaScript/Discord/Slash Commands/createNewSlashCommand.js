/*

*****     CREATE NEW GUILD SLASH COMMANDS     *****

Please look at all four modules, 
  createNewSlashCommand.js, deleteAllCommands.js, getSlashCommands.js, and deleteCommandByID.js.
to fully understand slash commands.

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

  https://discordjs.guide/creating-your-bot/slash-commands.html#before-you-continue
  https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands

The following script will create a new slash command on load and add it to existing commands 
as long as the command names are unique, otherwise it will throw an error.
This can be fixed by checking for the command first by using:
  if (commands.find((command) => command.name === "testecho") === undefined) {}
But this was left out intentionally so the code can throw an error if ran twice.

The code below:
  rest.get(Routes.applicationGuildCommands(env.APPLICATION_ID, guildID))
will return all existing slash commands to an array through a promise.

Each Slash command can be built using the SlashCommandBuilder or by creating an appropriate object.

Both options are show below in the code.

Slash command builder result:
  {
    id: '1046501955301806142',
    application_id: '1044262032452628590',
    version: '1046501955301806144',
    default_permission: true,
    default_member_permissions: '4',
    type: 1,
    name: 'test2',
    name_localizations: null,
    description: '(MODS) does nothing',
    description_localizations: null,
    guild_id: '1045035613604294748'
  }

Result:
  https://cdn.discordapp.com/attachments/1045035614266990675/1046579222166118460/image.png

*/

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

// For more information on events, go to "../Events"
discordClient.on("ready", () => { createNewCommand(); });

function createNewCommand () {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);
  rest
    .get(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID)) //Get existing via Routes
    .then((commands) => {

      //Both commands below are valid syntax
      const newCommand = new SlashCommandBuilder()
        .setName('test') // Must be lower case and unique
        .setDescription('test command') // Will be shown to users
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator); // Same as "0"

      const newCommand2 = {
        name: 'test2', // Must be lower case and unique
        description: '(MODS) does nothing', // Will be shown to users
        options: [], //For more information on options go to "./Options"
        default_permission: undefined,
        default_member_permissions: '4', // '0' for admins, '4' for mods, undefined for all users.
        dm_permission: undefined
      };

      commands.push(newCommand); //Add to command array
      commands.push(newCommand2); //Add to command array

      // Re-register commands via Routes
      return rest.put(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID), { body: commands, });
    })
    .then((data) => console.log(data))
    .catch(console.error);
}

discordClient.login(env.BOT_TOKEN);