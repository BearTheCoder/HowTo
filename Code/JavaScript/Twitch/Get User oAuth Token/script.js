const clientID = "izae85kii1aibr4gtcv30xsyhmp9en"
const redirectURI = "http://localhost:8008"
const scope = "channel%3Aread%3Aredemptions" // IRC BOT SCOPE

document.getElementById("getTokenButton").addEventListener("click", () => {
  url = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}`;

  window.location.href = url;
})