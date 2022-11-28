/*

*****     MODALS     *****

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

  https://discordjs.guide/interactions/modals.html

A modal is a string input form for that can have as many as 5 fields that you can then do something with.
When a modal is submitted, this interaction is handled by the "interactionCreate" event
attached to the discord client.
 
Result:
  https://cdn.discordapp.com/attachments/1045035614266990675/1046540187385200690/image.png

*/

const env = require('config.json');
const {
  Client, //Base Client
  GatewayIntentBits, //Base Client
  REST, //Required for slash command
  SlashCommandBuilder, //Required for slash command
  Routes, //Required for slash command
  ModalBuilder, //Required for modal
  ActionRowBuilder, //Required for modal
  TextInputBuilder, //Required for modal
  TextInputStyle, //Required for modal
} = require("discord.js");

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

// For more information on events, go to "../Events"
discordClient.once("ready", () => { createNewCommand(); });

// Creates a "/modaltest" command we can use when bot loads.
// For more information check out "../Slash Commands/createNewSlashCommand.js"
function createNewCommand () {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);
  rest.get(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID))
    .then((commands) => {
      if (commands.find((command) => command.name === 'modaltest') === undefined) {
        const newCommand = new SlashCommandBuilder()
          .setName('modaltest')
          .setDescription('modal test command')
          .setDefaultMemberPermissions(4);
        commands.push(newCommand);
      }
      return rest.put(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID), { body: commands, });
    })
    .then((data) => console.log(data))
    .catch(() => console.error);
}

// The "interactionCreate" event is called when a slash command is used or an interaction object is used.
discordClient.on("interactionCreate", async (interaction) => {

  // Response to slash command to show modal
  if (interaction.commandName === "modaltest") {
    const modal = showCustomModal();
    await interaction.showModal(modal);
  }

  // Response to modal submission
  else if (interaction.customId === "modalObject") {
    interaction.reply(`You said ${interaction.fields.getTextInputValue("text")}`);
  }
});

// Modals use the TextInputBuilder and the TextInputStyle class.
function showCustomModal () {
  const modal = new ModalBuilder()
    .setCustomId("modalObject") //Must be unique
    .setTitle("This is a modal!");
  const text = new TextInputBuilder()
    .setCustomId("text") //Each field must have a custom ID
    .setLabel("You can put text here.")
    .setStyle(TextInputStyle.Paragraph);
  modal.addComponents(
    // Can have up to 5 text fields
    new ActionRowBuilder().addComponents(text),
  );
  return modal;
};

discordClient.login(env.BOT_TOKEN);