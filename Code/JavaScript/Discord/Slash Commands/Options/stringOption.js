/*

*****     STRING OPTION     *****

To understand options, you should probably understand how slash commands work.
Go To: "../createNewSlashCommand.js" to get started.

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

  https://discordjs.guide/slash-commands/advanced-creation.html#adding-options

The following code will create a slash command with a required string input.
The will ensure that when a user uses the slash command, they are required to enter some text as well.
This can also be optional by setting required to false.
This can be seen in the build in discord command "shrug"
  https://cdn.discordapp.com/attachments/1045035614266990675/1046790016040448101/image.png

The input is given a set ID and is managed through the "interactionCreate" event by accessing the interactions
options and getting the string option by ID.

Result:
  https://cdn.discordapp.com/attachments/1045035614266990675/1046789139485438002/image.png
  https://cdn.discordapp.com/attachments/1045035614266990675/1046789175111843870/image.png

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

// Creates a "/testecho" command we can use when bot loads.
// For more information check out "../createNewSlashCommand.js"
function createNewCommand () {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);
  rest.get(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID))
    .then((commands) => {
      if (commands.find((command) => command.name === "testecho") === undefined) {
        const newCommand = new SlashCommandBuilder()
          .setName('testecho')
          .setDescription('test string required command')
          .setDefaultMemberPermissions(0)

          // Adds a required string input option to the slash command
          .addStringOption(option => option
            .setName('input') // same as the command name (unique identifier)
            .setDescription('The input to echo back')
            .setRequired(true)); // "false" will let the input be optional

        commands.push(newCommand);
      }
      return rest.put(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID), { body: commands, });
    })
    .then((data) => console.log(data))
    .catch(console.error);
}

// The "interactionCreate" event is called when a slash command is used or an interaction object is used.
discordClient.on("interactionCreate", (interaction) => {
  if (interaction.commandName !== "testecho") return;
  interaction.reply(interaction.options.getString('input'));
});

discordClient.login(env.BOT_TOKEN);