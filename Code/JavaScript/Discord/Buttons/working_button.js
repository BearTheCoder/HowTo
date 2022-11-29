/*

*****     CREATE AND USE BUTTONS     *****

To understand why we use buttons, you should understand that buttons are intended to replace reactions
where applicable.

Go to "../Reactions" to learn more.

Discord's opinion on Buttons vs Reactions (Last paragraph of article):
  https://support-dev.discord.com/hc/en-us/articles/6381892888087-Bots-Buttons

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

    https://discordjs.guide/interactions/buttons.html

DESCRIPTION - SCRIPT WORKS BUT WHY IS IT BETTER THAN REACTIONS?

*/

const env = require('config.json');
const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  REST,
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  Routes,
} = require("discord.js");

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

// For more information on events, go to "../Events"
discordClient.once("ready", () => {
  console.log("ready...");
  createNewCommand();
});

// Creates a "/buttontest" command we can use when bot loads.
// For more information check out "../Slash Commands/createNewSlashCommand.js"
function createNewCommand () {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);
  rest.get(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID))
    .then((commands) => {
      if (commands.find((command) => command.name === 'buttontest') === undefined) {
        const newCommand = new SlashCommandBuilder()
          .setName('buttontest')
          .setDescription('button test command')
          .setDefaultMemberPermissions(4);
        commands.push(newCommand);
      }
      return rest.put(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID), { body: commands, });
    })
    .then((data) => console.log(data))
    .catch(() => console.error);
}

// For more information on events, go to "../Events"
discordClient.on("interactionCreate", async (interaction) => {

  // Response to slash command to show button
  if (interaction.commandName === "buttontest") {
    const button = createButton();
    await interaction.reply({
      content: 'I think you should,',
      components: [button],
    });
  }
});

function createButton () {
  return new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('primaryButton')
        .setLabel('Click me!')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('1046273317939707934'),
    );
};

discordClient.login(env.BOT_TOKEN);