const request = require("request") //npm i request

// With manually built URL
const options = {
    'method': 'POST',
    'url': 'https://id.twitch.tv/oauth2/token?client_id=m6oekfwnl9y1hoyicpckp48potda4v&client_secret=ex143kuhlq9b3wc6ropldpci6ulu8p&grant_type=client_credentials',
    'headers': {
    }
}

request(options, (error, response) => {
    if (error) throw new Error(error);
    console.log(response.body);
});

// With URLSearchParams (Query Builder)
const query = new URLSearchParams({
    "client_id": "m6oekfwnl9y1hoyicpckp48potda4v",
    "client_secret": "ex143kuhlq9b3wc6ropldpci6ulu8p",
    "grant_type": "client_credentials",
})

const options2 = {
    'method': 'POST',
    'url': 'https://id.twitch.tv/oauth2/token?' + query,
    'headers': {
    }
}

request(options2, (error, response) => {
    if (error) throw new Error(error);
    console.log(response.body);
});