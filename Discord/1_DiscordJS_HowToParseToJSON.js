/*
  Requirements:
    1.) NodeJS
    2.) Discord.js
    3.) Discord developer account.
    4.) A discord guild with admin access.
    
  How to setup:
    Too much to type, just know you have to setup a developer account, create a bot with admin access, add the bot to your discord server, 
    then run the application using node.

  What does this script do?
    This script uses discord to search through every message looking for a certain keyword.
    If the script finds the keyword, it will take the message that contains the keyword and save it to a JSON file,
    giving it a unique identifier to be saved later.
    
  Why did I create this script?
    In the future I want to create a fully user compatible, mostly dummy proof application that can be set up by the user using
    modals (a discord form). To do this, user inputted information will have to be created and accessed by the code.

  Things that confused me at first:
    1.) Two different file names? Why? Well, "require" is a NODE function and node functions are located in 
    "node_modules" hence "test.json" because "test.json" is in "node_modules" but "fs.writeFile" is a function
    that exists as a method attached to object "fs" with is attached to the script "jsonParseTest.js" which is
    in the folder "BearCub" which is a level higher. So, we now have to specify to the script the exact location.
    2.) You do not have to specify or check if the file already exists, JavaScript/Node does that automatically. If
    the file doesn't exist, it is created.
    
  ** THIS FILE IS HEAVILY COMMENTED FOR LEARNING AND IS NOT A GOOD EXAMPLE FOR HOW COMMENTS SHOULD BE **
*/

const token = "INSERT_TOKEN_HERE";
const fs = require("fs");
const { Client, GatewayIntentBits } = require("discord.js");
const FileName_Node = "FILENAME.json";
const FileName_Script = "node_modules/FILENAME.json";
let JSONObject = require(FileName_Node); //node function

const MyClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

MyClient.once("ready", () => {
  console.log("Bot Loaded...");
  if (JSONObject.MessageCount == undefined) {
    JSONObject.MessageCount = 0;
    fs.writeFile(FileName_Script, JSON.stringify(JSONObject), (err) => {
      console.log("Added Message Count...");
      console.log(err);
    });
  }
});

// Event Listener - Fires every time a message is sent within your server.
MyClient.on("messageCreate", async (message) => {
  if (!message.content.toLowerCase().includes("KEYWORD")) return;
  console.log("Parsing to JSON...");
  JSONObject.Messages = {
    [`Message_${JSONObject.MessageCount}`]: message.toString(),
  };
  JSONObject.MessageCount++;
  fs.writeFile(FileName_Script, JSON.stringify(JSONObject, null, 2), (err) => {
    console.log("JSON successfully parsed...");
    console.log(err);
  });
  message.reply("Hey, you talking KEYWORD? Parsed to JSON for later...");
});

MyClient.login(token);
