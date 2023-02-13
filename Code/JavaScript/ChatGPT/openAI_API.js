/*
  NOTES -----
    What does OpenAI's API offer? 
      Well, there are 4 features you can access through the API. 
        GPT-3, or the text creation tool that everyone is raving about. 
        DALL-E or the image creator that has spawned a plethora of variants that has given the art community as much stress as dog on the Fourth of July. 
        Similarly, Codex, which is a variant of GPT-3 that is designed around code creation, but this model is misleading. 
          Code creation is generally apart of the GPT-3 text creation tool. Codex on the other hand
          is seemingly designed to be integrated into IDE's, bridging the gap between code creation and implementation. 
        Content filtering, which is free and designed to remove hate/inappropriate speech from where ever it is implemented.

      Codex and Content filtering will be minimally discussed going forward.

    MODELS: 
      ChatGPT has several models that you can use.
      GPT-3:
        For GPT-3 there are 4 models you can choose from: Ada, Babbage, Curie, and DaVinci. 
        text-davinci-003
        text-curie-001
        text-babbage-001
        text-ada-001
        Starting at Ada the models get better performing as they go up the chain, but so does the cost.
        There are also previous version of models that you can access and use with training data.
      CODEX:
        There are two Codex Models: DaVinci and Cushman
        According to OpenAI, Cushman is "Almost as capable as Davinci Codex, but slightly faster."
        Though DaVinci shares the same name and is technically the same as the GPT-3 model. The Codex version of DaVinci is accessed seperately 
        from the GPT-3 version.
      CONTENT FILTER:
        Content-filtering, or now known as the "moderation endpoint", uses the model "content-filter-alpha" and is not within the scope of this script.
      DALLE:
        Since midjourney came out, DALLE has been a seemingly forgotten portion of OpenAI, though it still exists, OpenAI seems to have focused less
        of their attention here. So much so, that DALLE isn't even mentioned in the overview, but later mentioned in the "guides" portion.
      OpenAI recommends that you write your code around DaVinci and experiment with your code using DaVinci then once everything is working, downgrade the model.
      to see if a lower cost, faster model will give you the same results.


    GPT-3 TOKENS: 
      ChatGPT uses tokens, which breaks down the word into pieces of characters and feeds them to the API as "tokens".
      They don't exactly go into detail about what constitutes a "token" but presumably words are broken down into easier to digest patterns.
      That the AI can process. Considering, according to the "tokenizer tool" that OpenAI offers, tokens have specific token-ids meaning the word.
      "hamburger" is [2763, 6236, 1362] and the sentence "ham is my favorite food" is [2763, 318, 616, 4004, 2057].
      In both token-id arrays, the "2763" is showing that both prompts start with "ham". 
      Of course, this is all speculation.

    MODEL COST: 
      GPT-3:
        Cost is determined by the amount of tokens that you use. The tokens, as stated before, are a breakdown of words into numbers.
        How these tokens are determined is up to the API. So, how to determine cost? Well, OpenAI gives a rule of thumb of "4 characters are 1 token".
        They also state that the Prompt is part of the tokens counted. Davinci, ChatGPT's best performing model, is $0.02 US dollars per 1,000 tokens.
        Ada for example is $0.0004 US dollars per 1,000 tokens.
        Babbage is $0.0005 US dollars per 1,000 tokens.
        Curie is $0.002 US dollars per 1,000 tokens.
        and DaVinci, as stated before, is $0.02 US dollars per 1,000 tokens.
      CODEX:
        While in limited beta, all codex models are free.
      CONTENT FILTER:
        The content filter is free.
      DALLE:
        The pricing depends on the size:
        1024x1024 = $0.02 US DOLLARS per image.
        512x512 = $0.018 US DOLLARS per image.
        256x256 = $0.016 US DOLLARS per image.
    
    USAGE POLICY: 
      Fortunately, OpenAI has a clear and concise Usage Policy that is meant to prevent any user from using ChatGPT or any AI model for something malicious 
      or deceiving. Hate, spam, dishonesty, manipulation, political influence, deception, etc. All is covered under the usage policy and should be 
      understood before continuing.

    PROMPTS: 
      GPT-3, Codex, and DALL-E works off of YOUR prompts, so the better your prompt is at explaining what you want and the more colorful language you use
      to describe what you want, the better your results. The AI is only as powerful as the prompt, therefore the more powerful the user's imagination,
      the better the result will be. There is no exact answer as to how to prompt the system, the best thing you can do is just test different prompt 
      strategies.

    GPT-3 TEMPATURE: 
      This AI has a "tempature" setting which is essentially the AI's confidence level. The "tempature" is on a scale from 0 to 1. A "0" means that the AI
      will not take risks. It will only allow answers that it is 100% sure and accurate on. A tempature setting of "1" is bold and will give more 
      diverse answers at the risk of accuracy. Adjusting the tempature can greatly vary the results you get.

    FREE PERIOD: 
      You get $18 US DOLLARS or 3 MONTHS free, whichever comes first.

    FINE-TUNING: 
      You could fine tune the models to do exactly what you need it to, but that is out of the scope of this script. If you are interested, follow this link:
      https://platform.openai.com/docs/guides/fine-tuning
      Also, there are increased costs for using the fine tuning model, read up on that here:
      https://openai.com/api/pricing/

    LIBRARIES: 
      OpenAI and ChatGPT provide libraies to be used with both Python and NodeJS. But have also provided community created resources for other languages:
      https://platform.openai.com/docs/libraries
    
    RATE LIMITS (free tier):
      All Models have a 20 request per minute rate limit.
      GPT-3:
        150,000 Tokens per Minute
      CODEX:
        40,000 Token per Minute
      DALLE:
        50 Images Per Minute

    Playground:
      If you want to play with CODEX try using openai's playground:
      https://platform.openai.com/playground (this is different from ChatGPT)
*/

// npm install openai

const secret = "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"; //Move to .env file - DO NOT HARD CODE THIS HERE
const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({ apiKey: secret });
const openai = new OpenAIApi(config);

function GPT3 (userPrompt) {
  const response = openai.createCompletion({
    model: "text-curie-001",
    prompt: userPrompt,
    temperature: 0,
    max_tokens: 100, // More tokens means more allowed in response.
  });

  response.then(res => {
    console.log(res);
    console.log(res.data.choices[0].text);
  });
}

function DALLE (userPrompt) {
  const response = openai.createImage({
    prompt: userPrompt,
    n: 1, //Number of images to generate
    size: "1024x1024",
  });

  response.then(res => {
    console.log(res);
    console.log(res.data.data[0].url);
  });
}

GPT3("Write a hello world script in c++");