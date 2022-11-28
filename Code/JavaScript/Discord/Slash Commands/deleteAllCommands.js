/*
    Script created with bot having admin rights.
    Experiment with what rights your bot ACTAULLY needs.

    https://discord.js.org/#/

    The following script will delete all commands associated with the bot by setting the body of the commands object to an empty array.
*/

const env = require('config.json'); // npm i dotenv
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
} = require("discord.js"); //npm i discord.js

const discordClient = new Client({
  intents: [GatewayIntentBits.Guilds,],
});

//"ready" is called after the bot is logged in and active.
discordClient.on("ready", () => { deleteAllCommands(); });

function deleteAllCommands () {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);
  rest
    .put(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID), { body: [], })
    .then((data) => console.log(data))
    .catch(console.error);
}

discordClient.login(env.BOT_TOKEN);