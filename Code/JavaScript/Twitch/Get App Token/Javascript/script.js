
// With manually built query
fetch("https://id.twitch.tv/oauth2/token?client_id=m6oekfwnl9y1hoyicpckp48potda4v&client_secret=ex143kuhlq9b3wc6ropldpci6ulu8p&grant_type=client_credentials", { method: "POST" })
    .then(response => {
        response.json()
            .then(data => {
                console.log(data);
            })
    })

// With URLSearchParams (Query Builder)
const query = new URLSearchParams({
    "client_id": "m6oekfwnl9y1hoyicpckp48potda4v",
    "client_secret": "ex143kuhlq9b3wc6ropldpci6ulu8p",
    "grant_type": "client_credentials",
})

console.log(query.toString())

fetch("https://id.twitch.tv/oauth2/token?" + query, { method: "POST" })
    .then(response => {
        response.json()
            .then(data => {
                console.log(data);
            })
    })