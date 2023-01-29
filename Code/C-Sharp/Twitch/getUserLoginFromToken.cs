HttpClient client = new HttpClient();
HttpRequestMessage requestMethod = new HttpRequestMessage(HttpMethod.Get, "https://api.twitch.tv/helix/users");
requestMethod.Headers.Add("Authorization", "Bearer <user access token>");
requestMethod.Headers.Add("Client-Id", "<client-id>");
HttpResponseMessage response = await client.SendAsync(requestMethod);
string responseBody = await response.Content.ReadAsStringAsync();
Console.WriteLine(responseBody.Split("\"login\":\"")[1].Split("\"")[0]); // "login" can be substituted for an param in response.


// EXAMPLE RESPONSE:
// {
//     "data": [
//         {
//             "id": "177484095",
//             "login": "bearthecoder",
//             "display_name": "BearTheCoder",
//             "type": "",
//             "broadcaster_type": "",
//             "description": "Eh. ",
//             "profile_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/5f615ed5-fd5e-4599-be2c-71e4690bfd27-profile_image-300x300.png",
//             "offline_image_url": "",
//             "view_count": 28,
//             "created_at": "2017-10-13T01:27:50Z"
//         }
//     ]
// }
