const clientID = "CLIENTID"
const redirectURI = "CALLBACK"
const scope = "chat%3Aread+chat%3Aedit" // IRC BOT SCOPE

document.getElementById("getTokenButton").addEventListener("click", () => {
  url = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}`;

  fetch(url, { method: "POST" })
    .then(response => {
      response.json()
        .then(data => {
          console.log(data);
        })
    })
})