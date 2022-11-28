/*

*****     CONTEXT MENUS     *****

Context menus are very similar to slash commands, everything is the same except for the "type".
For more information check out "../Slash Commands/createNewSlashCommand.js"

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

  https://discordjs.guide/interactions/context-menus.html

The context menu lets you add commands to the right click menu for either messages or users.

These commands are similar to slash commands in the way that they are registered via routes.
Their usefulness comes about when you have a command that needs to target a specific message or user.
Thus the "context" in context menu.

// Slash Command
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

// User Context Menu Commands
{
    id: '1046493997264273569',
    application_id: '1044262032452628590',
    version: '1046493997264273570',
    default_permission: true,
    default_member_permissions: null,
    type: 2,
    name: 'User Information',
    name_localizations: null,
    description: '',
    description_localizations: null,
    guild_id: '1045035613604294748'
  }

  // Message Context Menu Commands
  {
    id: '1046494416136847391',
    application_id: '1044262032452628590',
    version: '1046494416136847392',
    default_permission: true,
    default_member_permissions: null,
    type: 3,
    name: 'Message Information',
    name_localizations: null,
    description: '',
    description_localizations: null,
    guild_id: '1045035613604294748'
  },

  This also means that you can create the command without the ContextMenuCommandBuilder() 
  by creating the object yourself

Result:
  https://cdn.discordapp.com/attachments/1045035614266990675/1046490727980474519/image.png
  https://cdn.discordapp.com/attachments/1045035614266990675/1046501148590342204/image.png

*/

const env = require('config.json');
const {
  Client, //Base Client
  GatewayIntentBits, //Base Client
  REST, // Require for context menus
  ContextMenuCommandBuilder, // Require for context menus
  Routes, // Require for context menus
  ApplicationCommandType, // Optional: You could remember the number types and use those instead
} = require("discord.js");

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

// For more information on events, go to "../Events"
discordClient.once("ready", () => { createNewContextMenuCommand(); });

function createNewContextMenuCommand () {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);
  rest
    .get(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID))
    .then((commands) => {
      if (commands.find((command) => command.name === 'Say Hi') === undefined) {
        // User context menu
        const userMenu = new ContextMenuCommandBuilder()
          .setName('Say Hi')
          .setType(ApplicationCommandType.User);
        commands.push(userMenu);
      }

      if (commands.find((command) => command.name === 'Message Information') === undefined) {
        // Message context menu
        const messageMenu = new ContextMenuCommandBuilder()
          .setName('Message Information')
          .setType(3); // (ApplicationCommandType.Message) sugar syntax so you dont have to remember the number
        commands.push(messageMenu);
      }

      return rest.put(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID), { body: commands, });
    })
    .then((data) => console.log(data))
    .catch(console.error);
}

// The "interactionCreate" event is called when a slash command is used or an interaction object is used.
discordClient.on("interactionCreate", async interaction => {
  if (interaction.commandName === 'Say Hi') {
    await interaction.reply(`${interaction.targetUser} HI!`); //Reply needed to end interaction without ephmeral error
  }
  else if (interaction.commandName === 'Message Information') {
    await interaction.reply(`This does something...`); //Reply needed to end interaction without ephmeral error
  }

});


discordClient.login(env.BOT_TOKEN);