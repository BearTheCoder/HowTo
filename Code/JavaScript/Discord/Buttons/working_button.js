/*
Script created with bot having admin rights.
Experiment with what rights your bot ACTAULLY needs.

    https://discordjs.guide/interactions/buttons.html

Buttons seem useless, but the name of the game is optimization and effectiveness.
From my understanding, buttons are a great replacement for slash commands and reactions
when it comes to super user friendly interactions.

To understand this please ensure you understand how reactions and slash commands work.

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
} = require("discord.js"); // npm i discord.js

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

// "ready" is called when the bot logs into the server.
discordClient.once("ready", () => {
  console.log("ready...");
  createNewCommand();
});

// Creates a "/buttontest" command we can use when bot loads.
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

        rest.put(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID), { body: commands, })
          .then((data) => console.log(data))
          .catch(() => console.log("Command already exists..."));
      }
    })
    .catch(() => console.error);
}

// The "interactionCreate" event is called when a slash command is used or an interaction object is used.
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

// Modals use the TextInputBuilder and the TextInputStyle class.
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