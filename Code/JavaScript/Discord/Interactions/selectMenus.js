/*
Script created with bot having admin rights.
Experiment with what rights your bot ACTAULLY needs.

  https://discordjs.guide/interactions/select-menus.html

The select menu and the multi-select menu are by far one of the most useful things you can create using discord API.
These menus will let you restrict a user input to just a few options just like any other selection box or drop down.

This selection can be managed by the "interactionCreate" event attached to the client just like and other interaction.

Result: 
  https://cdn.discordapp.com/attachments/1045035614266990675/1046536047007379516/image.png

*/

require('dotenv').config(); // npm i dotenv (process.env)
const {
  Client, //Base Client
  GatewayIntentBits, //Base Client
  REST, //Required for slash command
  Routes, //Required for slash command
  SlashCommandBuilder,//Required for slash command
  ActionRowBuilder, //Required for select menu
  SelectMenuBuilder,//Required for select menu

} = require("discord.js"); // npm i discord.js

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

// "ready" is called when the bot logs into the server.
discordClient.once('ready', () => createNewCommand());

// Creates a "/testselectmenu" command we can use when bot loads. 
// For more information check out "../Slash Commands/createNewSlashCommand.js"
function createNewCommand () {
  const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
  rest.get(Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.testServerID))
    .then((commands) => {
      if (commands.find((command) => command.name === 'testselectmenu') === undefined) {
        const newCommand = new SlashCommandBuilder()
          .setName('testselectmenu')
          .setDescription('select menu test command')
          .setDefaultMemberPermissions(4);
        commands.push(newCommand);
      }

      return rest.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.testServerID), { body: commands, });
    })
    .then((data) => console.log(data))
    .catch(() => console.error);
}

// The "interactionCreate" event is called when a slash command is used or an interaction object is used.
discordClient.on("interactionCreate", async (interaction) => {

  // Response to slash command - send select menus
  if (interaction.commandName === "testselectmenu") {
    const row = createSelectMenu();
    await interaction.reply({
      content: 'Select Menu!',
      components: [row.first, row.second],
      ephemeral: true
    });
  }

  //Respose to selection box being used
  if (interaction.customId === 'select') {
    await interaction.update({ content: 'Something was selected!', components: [] });
  }
  if (interaction.customId === 'select 2') {
    await interaction.update({ content: 'Something was selected 2!', components: [] });
  }
});

// Creates two different kinds of select menus, multiple possible selections or single selection.
function createSelectMenu () {
  const singleSelectMenu = new SelectMenuBuilder()
    .setCustomId('select')
    .setPlaceholder('Can only select one')
    .addOptions(
      {
        label: 'Select me',
        description: 'This is a description',
        value: 'first_option',
      },
      {
        label: 'Or you can select me too',
        description: 'This is also a description',
        value: 'second_option',
      },
    );
  const multiSelectMenu = new SelectMenuBuilder()
    .setCustomId('select 2')
    .setPlaceholder('Can select multiple options')
    .setMinValues(1)
    .setMaxValues(3)
    .addOptions([
      {
        label: 'Select me',
        description: 'This is a description',
        value: 'first_option',
      },
      {
        label: 'You can select me too',
        description: 'This is also a description',
        value: 'second_option',
      },
      {
        label: 'I am also an option',
        description: 'This is a description as well',
        value: 'third_option',
      },
    ]);

  return {
    first: new ActionRowBuilder().addComponents(singleSelectMenu),
    second: new ActionRowBuilder().addComponents(multiSelectMenu)
  };
};

discordClient.login(process.env.BOT_TOKEN);