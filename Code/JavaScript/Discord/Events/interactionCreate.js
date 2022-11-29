/*

*****     INTERACTION CREATE EVENT     *****

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

    https://discord.js.org/#/docs/discord.js/main/typedef/Events
    https://discordjs.guide/creating-your-bot/event-handling.html

The "interactionCreate" event is the most useful and widely used event that Discord offers.
The "interactionCreate" event fires every time a user interacts with any interactable object.
The callback function manages an Interaction Object that includes tons of useful information.

Interaction Objects include modals, slash commands, buttons, select menus, context menu commands, etc.

The "interactionCreate" event can fire multiple times, hence it needs to be paired with the "on" method.

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
discordClient.on(Events.InteractionCreate, (interaction) => {
  console.log("Bot received interaction..."); //Won't do anything, needs interaction.
  console.log(interaction);
});

// Alternate Syntax - Comment out before running code
discordClient.on("interactionCreate", (interaction) => {
  console.log("Bot received interaction..."); //Won't do anything, needs interaction.
  console.log(interaction);
});

discordClient.login(env.BOT_TOKEN);