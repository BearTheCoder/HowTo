/*

*****     DELETE GUILD SLASH COMMAND BY ID     *****

Please look at all four modules, 
  createNewSlashCommand.js, deleteAllCommands.js, getSlashCommands.js, and deleteCommandByID.js.
to fully understand slash commands.

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

  https://discordjs.guide/slash-commands/deleting-commands.html#deleting-specific-commands

Let's say that you created a bunch of commands, one last stretch and your bot will be complete.
You go to make the last command and through tired eyes and realize the command is redundant and not needed.
You need to delete it, so you need to pull the commands ID and use the REST API and Routes to delete it.

The astute of you may have thought that you could just use the reduce method on the commands array that
the REST API returns through the get methond and re-register the commands through the put method.

And yes. You can do that.

Though the REST API has a delete method that does this for you.

*/

const env = require('config.json');
const {
  Client, //Base Client
  GatewayIntentBits, //Base Client
  SlashCommandBuilder, // Required to create commands
  REST, // Required to delete commands
  Routes, // Required to delete commands
} = require("discord.js");

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds,], });

// For more information on events, go to "../Events"
discordClient.on("ready", () => {
  createNewCommand(); // Create command to be deleted
});

// Creates a "/testcommand" command so we can delete it later...
// For more information check out "./createNewSlashCommand.js"
function createNewCommand () {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);
  rest.get(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID))
    .then((commands) => {
      if (commands.find((command) => command.name === "testcommand") === undefined) {
        let newCommand = new SlashCommandBuilder()
          .setName('testcommand')
          .setDescription('test command')
          .setDefaultMemberPermissions(0);
        commands.push(newCommand);
      }
      return rest.put(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID), { body: commands, });
    })
    .then((data) => {
      const commandObj = JSON.parse(JSON.stringify(data[0]));
      console.log(`List of commands...`);
      console.log(commandObj);
      deleteCommandByID(); // Delete command that was created
    })
    .catch(console.error);
}

// The following code will find the command, extract it's ID, then delete it.
function deleteCommandByID () {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);
  rest.get(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID))
    .then((commands) => {
      const commandToBeDeleted = commands.find((command) => command.name === "testcommand");
      if (commandToBeDeleted !== undefined) {
        rest.delete(Routes.applicationGuildCommand(env.APPLICATION_ID, env.testServerID, commandToBeDeleted.id))
          .then((data) => console.log(`Command deleted... \n ${data}`))
          .catch((err) => console.log(err));
      }
    })
    .catch(console.error);
}

discordClient.login(env.BOT_TOKEN);;