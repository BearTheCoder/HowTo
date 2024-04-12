const ws = new WebSocket("wss://eventsub.wss.twitch.tv/ws");

ws.addEventListener("open", event => {
    console.log(event);
})

ws.addEventListener("message", (event) => {
    const dataJSON = JSON.parse(event.data);
    if (dataJSON.payload.session.status == "connected") {
        const data = {
            "type": "channel.follow",
            "version": "2",
            "condition": {
                "broadcaster_user_id": "1234",
                "moderator_user_id": "1234"
            },
            "transport": {
                "method": "webhook",
                "callback": "https://localhost:8000",
                "secret": "s3cre77890ab"
            }
        }


        fetch("https://api.twitch.tv/helix/eventsub/subscriptions", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Authorization": "Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx",
                "Client-Id": "wbmytr93xzw8zbg0p1izqyzzc5mbiz",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
    }
});