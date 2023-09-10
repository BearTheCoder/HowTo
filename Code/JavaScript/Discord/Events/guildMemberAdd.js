/*

*****     GUILD MEMBER ADD EVENT     *****

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

    <Link>
    <link>
*/

const env = require('config.json');
const {
  Client, // Base Client
  GatewayIntentBits, // Base Client
  Events, // Sugar Syntax if you don't want to type in the name as a string
} = require("discord.js");

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

// Events.InteractionCreate is fired anytime a user interacts with an interactable object
// (Slash Commands, Modals, Context Menu Commands, Select Menus, Buttons, etc.)
discordClient.on(Events.GuildMemberAdd, (member) => {
  console.log("Member added to guild."); //Won't do anything, needs interaction.
  member.guild.channels.fetch("<Channel ID>")
    .then(channel => {
      channel.send("<Message>");
    });
});

discordClient.login(env.BOT_TOKEN);