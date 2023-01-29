document.getElementById("getTokenButton") = () => {
  url = "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=wsqid1edf3xb0v2ou4g09hafn1ufb4&redirect_uri=http://localhost:8200&scope=chat%3Aread+chat%3Aedit";
  fetch();
};