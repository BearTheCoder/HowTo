/*

*****     Guild Command Object     *****

Dependancies: NONE - Simple output object

  https://discord.js.org/#/docs/discord.js/main/class/ApplicationCommand

The Guild Command Object is listed below.
This object is obtained by calling the following code:

function getCommands () {
  const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN);
  rest.get(Routes.applicationGuildCommands(env.APPLICATION_ID, env.testServerID))
    .then((data) => { console.log(data); })
    .catch(console.error);
}

For more information please check out the following:
"../Slash Commands/getSlashCommands.js"
"../Slash Commands/createNewSlashCommand.js"

There are many other properties that will not show by default, please check the link above for more.

*/

output =
{
  id: '1048817440018137139',
  application_id: '1044262032452628590',
  version: '1048817440018137141',
  default_permission: true,
  default_member_permissions: null,
  type: 2,
  name: 'Say Hi',
  description: '',
  guild_id: '1045035613604294748'
};
