/*
Script created with bot having admin rights.
Experiment with what rights your bot ACTAULLY needs.

    https://discordjs.guide/popular-topics/embeds.html

An embed is a fairly common "special message" that you can use to display all sorts of information
formatted to an appealing style.

This is the same as "sugar syntax" as it has no use besides displaying information, links, authors, etc in a more appealing
manner.

Result:
    https://cdn.discordapp.com/attachments/1045035614266990675/1046454405228154941/image.png

*/

require('dotenv').config(); // npm i dotenv (process.env)
const {
  Client, //Base Client
  GatewayIntentBits, //Base Client
  REST, //Needed for slash command
  SlashCommandBuilder, //Needed for slash command
  Routes, //Needed for slash command
  EmbedBuilder, //Needed for embed
} = require("discord.js"); // npm i discord.js

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

// "ready" is called when the bot logs into the server.
discordClient.once("ready", () => {
  createNewCommand();
});

// Creates a "/testembed" command we can use when bot loads. 
// For more information check out "../Slash Commands/createNewSlashCommand.js"
function createNewCommand () {
  const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
  rest.get(Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.testServerID))
    .then((commands) => {
      if (commands.find((command) => command.name === 'testembed') !== undefined) {
        const newCommand = new SlashCommandBuilder()
          .setName('testembed')
          .setDescription('embed test command')
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

  // Response to slash command to show embed
  if (interaction.commandName === "testembed") {
    const embed = createEmbed();
    await interaction.reply({
      content: 'This is a test sentence...',
      embeds: [embed],
    });
  }
});

// EmbedBuilder ripped from link in header
function createEmbed () {
  return new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
    .setDescription('Some description here')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    .setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
};

discordClient.login(process.env.BOT_TOKEN);