/*
    Script created with bot having admin rights.
    Experiment with what rights your bot ACTAULLY needs.

    https://discord.js.org/#/

    The following script will create a new slash command upon being added to the Discord Server.
    Commands are removed from the server when a bot is kicked from the server.

    The code below:
      rest.get(Routes.applicationGuildCommands(env.APPLICATION_ID, guild.id));
    will get all existing commands and return them as an array of objects through a promise.

    You can then create a new command by using the SlashCommandBuilder or by creating a correctly formatted object.
    Both options are listed below.

    The true beauty of this code is the "guildCreate" event which will provide you with information
    about the guild/server the bot has been added too.

    This is important if you plan to provide your bot as a service as this will allow you to do some prepatory
    steps to allow usage of your bot without needing user intervention.

*/

const env = require('config.json'); // npm i dotenv
const {
  Client,
  GatewayIntentBits,
  REST,
  SlashCommandBuilder,
  Routes,
} = require("discord.js"); //npm i discord.js

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

//guildCreate is the same as "bot added to guild"
discordClient.on("guildCreate", (guild) => { createNewCommand(guild); });

function createNewCommand (guild) {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);
  rest
    .get(Routes.applicationGuildCommands(env.APPLICATION_ID, guild.id))
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

      return rest.put(Routes.applicationGuildCommands(env.APPLICATION_ID, guild.id), { body: commands, });
    })
    .then((data) => console.log(data))
    .catch(console.error);
}
discordClient.login(env.BOT_TOKEN);