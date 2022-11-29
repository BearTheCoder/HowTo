/*

*****     TYPING START EVENT     *****

Dependancies: discord.js (npm install discord.js)

Script created with bot having admin rights.
Experiment with what rights your bot ACTUALLY needs.

    https://discord.js.org/#/docs/discord.js/main/typedef/Events
    https://discordjs.guide/creating-your-bot/event-handling.html

The "typingStart" event is fired everytime a user is decected as typing. Go figure.
The event returns a a plethra of information that may or may not be useful considering there are a bunch of different
and better ways to get that informatio.

But the true beauty is knowing when a certain person is typing.

I used this for a faux conversational bot, and used the "typingStart" event to pause
the bot's reply, making the bot feel more "alive"

But, that's just a goofy example, honestly there probably isn't much use for a typing event as
most discord bots reply to messages or commands.

Please keep in mind that besides the more common events, this event requires a different Gateway Intent and
must be included to use the event.

The "typingStart" event can be fired multiple times, hence it should be paired with the "on" method.

*/

const env = require('config.json');
const {
 Client, // Base Client
 GatewayIntentBits, // Base Client
 Events, // Sugar Syntax if you don't want to type in the name as a string
} = require("discord.js");

const discordClient = new Client({
 intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessageTyping,
 ],
});

// Events.TypingStart is fired anytime a user types in any channel.
discordClient.on(Events.TypingStart, (typing) => {
 console.log("Someone is typing...");
 console.log(typing);
});

// Alternate Syntax - Comment out before running code
discordClient.on("typingStart", (typing) => {
 console.log("Someone is typing...");
 console.log(typing);
});

discordClient.login(env.BOT_TOKEN);
