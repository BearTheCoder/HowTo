/*
    Script created with bot having admin rights.
    Experiment with what rights your bot ACTAULLY needs.

    https://discord.js.org/#/

    The following script will create a new slash command on load and add it to existing commands 
    as long as the command names are unique, otherwise it will throw an error

    The code below:
     rest.get(Routes.applicationGuildCommands(env.APPLICATION_ID, guildID))
    will return all existing slash commands to an array through a promise.

    Each Slash command can be built using the SlashCommandBuilder or by creating an appropriate object.

    Both options are show below.

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

*/

const env = require('config.json'); // npm i dotenv
const {
  Client,
  GatewayIntentBits,
  REST,
  SlashCommandBuilder,
  Routes,
} = require("discord.js"); //npm i discord.js

const discordClient = new Client({
  intents: [GatewayIntentBits.Guilds,],
});

//"ready" is called after the bot is logged in and active.
discordClient.on("ready", () => { createNewCommand(); });

function createNewCommand () {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);
  rest
    .get(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID))
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

      return rest.put(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID), { body: commands, });
    })
    .then((data) => console.log(data))
    .catch(console.error);
}

discordClient.login(env.BOT_TOKEN);