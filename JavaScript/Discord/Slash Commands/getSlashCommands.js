/*
    Script created with bot having admin rights.
    Experiment with what rights your bot ACTAULLY needs.

    https://discord.js.org/#/

    The following script retreives all slash commands associated with the bot and returns the commands as an
    array of objects through a promise.

*/

require('dotenv').config(); // npm i dotenv
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
} = require("discord.js"); //npm i discord.js

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

discordClient.on('ready', () => { getCommands(); });

function getCommands () {
  const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
  rest
    .get(Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.testServerID))
    .then((data) => {
      console.log(data);
    })
    .catch(console.error);
}

discordClient.login(process.env.BOT_TOKEN);