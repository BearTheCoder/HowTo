/*

*****     GLOBAL SLASH COMMANDS     *****

This code is a follow up to guild slash commands - If you don't under stand that please check those first.
Go to: "../Slash Commands"

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

  https://discordjs.guide/creating-your-bot/slash-commands.html#before-you-continue
  https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands

Global commands and guild commands are VERY similar. There are three key differences. 
Other than that, everything is the exact same.

Key difference #1:
  A global command is attached to the bot instead of the guild. Meaning, once a global command is registered, it follows
  your bot everywhere and the only way to remove the command it to delete it. Whereas guild commands are removed from
  a guild whenever the bot remains, in this context, if you only had your bot in ONE guild, 
  removed it from that guild, yes, from that guild, the command would disappear. 
  And though the bot exists in no other guild, the command would persist.
  And when the bot is readded, low and behold, the command is still there

Key difference #2
  The "route" you take to access global commands is "applicationCommands" versus "applicationGuildCommands".

Key difference #3
  In the object the SlashCommandBuilder() outputs no longer has reference to a guild, but instead
  to DM permissions.

Considering the main difference between a guild command and a global command is the route.
Only global command creation is show below. All other scripts should be the same. Just replace the route with
the correct path.

Lastly, if you are considering providing your bot as an overall service, all commands you create should be global commands.

  //Global Command Object
  {
    id: '1046863413076303872',
    application_id: '1044262032452628590',
    version: '1046863413076303873',
    default_permission: true,
    default_member_permissions: '0',
    type: 1,
    name: 'globalcommandtest',
    name_localizations: null,
    description: 'test command',
    description_localizations: null,
    dm_permission: true
  }

  //Guild Command Object
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

const env = require('config.json');
const {
  Client, //Base Client
  GatewayIntentBits, //Base Client
  REST, //Required for Slash Commands
  SlashCommandBuilder, //Required for Slash Commands
  Routes, //Required for Slash Commands
} = require("discord.js");

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

// For more information on events, go to "../Events"
discordClient.on("ready", () => { createNewCommand(); });

function createNewCommand () {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);
  rest.get(Routes.applicationCommands(env.APPLICATION_ID)) //Get existing via Routes
    .then((commands) => {
      if (commands.find((command) => command.name === "globalcommandtest") === undefined) {
        const newCommand = new SlashCommandBuilder()
          .setName('globalcommandtest')
          .setDescription('test command')
          .setDefaultMemberPermissions(0);
        commands.push(newCommand);
      }
      return rest.put(Routes.applicationCommands(env.APPLICATION_ID), { body: commands, });
    })
    .then((data) => console.log(data))
    .catch(console.error);
}

discordClient.login(env.BOT_TOKEN);