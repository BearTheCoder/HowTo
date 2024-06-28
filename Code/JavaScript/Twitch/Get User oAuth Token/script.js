const clientID = "<CLIENT ID>"
const redirectURI = "<CALLBACK URL>"
const scope = "<SCOPE>" // IRC BOT SCOPE

document.getElementById("getTokenButton").addEventListener("click", () => {
  url = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}`;

  window.location.href = url;
})