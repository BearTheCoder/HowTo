/*

*****     SELECT MENUS     *****

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

  https://discordjs.guide/interactions/select-menus.html

The select menu and the multi-select menu are by far one of the most useful things you can create using discord API.
These menus will let you restrict a user input to just a few options just like any other selection box or drop down.

This selection can be managed by the "interactionCreate" event attached to the client just like and other interaction.

Result: 
  https://cdn.discordapp.com/attachments/1045035614266990675/1046536047007379516/image.png

*/

const env = require('config.json');
const {
  Client, //Base Client
  GatewayIntentBits, //Base Client
  REST, //Required for slash command
  Routes, //Required for slash command
  SlashCommandBuilder,//Required for slash command
  ActionRowBuilder, //Required for select menu
  SelectMenuBuilder,//Required for select menu

} = require("discord.js");

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

// For more information on events, go to "../Events"
discordClient.once('ready', () => createNewCommand());

// Creates a "/testselectmenu" command we can use when bot loads. 
// For more information check out "../Slash Commands/createNewSlashCommand.js"
function createNewCommand () {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);
  rest.get(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID))
    .then((commands) => {
      if (commands.find((command) => command.name === 'testselectmenu') === undefined) {
        const newCommand = new SlashCommandBuilder()
          .setName('testselectmenu')
          .setDescription('select menu test command')
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

  // Response to slash command - send select menus
  if (interaction.commandName === "testselectmenu") {
    const row = createSelectMenu();
    await interaction.reply({
      content: 'Select Menu!',
      components: [row.first, row.second],
      ephemeral: true
    });
  }

  //Respose to selection box being used, event fires whenever select box is closed
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
    .setCustomId('select') //Must be unique
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
    .setCustomId('select 2') //Must be unique
    .setPlaceholder('Can select multiple options')
    .setMinValues(1) //has to select one
    .setMaxValues(3) //can select up to three
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

  //Not good practice, don't return multiple menus if using, demonstration only.
  return {
    first: new ActionRowBuilder().addComponents(singleSelectMenu),
    second: new ActionRowBuilder().addComponents(multiSelectMenu)
  };
};

discordClient.login(env.BOT_TOKEN);