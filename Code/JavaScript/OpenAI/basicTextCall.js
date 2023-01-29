//To be used with Node
//npm i openai

//Tokens are how many words it can respond with

//There are many different models, each with a different expense. 
//DaVinci is the most expensive model at 20 cents per 750 words.

const secret = "";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: secret,
});
const openai = new OpenAIApi(configuration);
const response = openai.createCompletion({
  model: "text-davinci-003",
  prompt: "What is internet relay chat?",
  temperature: 0,
  max_tokens: 1000,
});

response.then(res => {
  console.log(res.data.choices[0].text);
  console.log("\n\n");
});