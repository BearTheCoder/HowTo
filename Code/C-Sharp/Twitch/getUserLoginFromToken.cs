HttpClient client = new HttpClient();
HttpRequestMessage requestMethod = new HttpRequestMessage(HttpMethod.Get, "https://api.twitch.tv/helix/users");
requestMethod.Headers.Add("Authorization", "Bearer <user access token>");
requestMethod.Headers.Add("Client-Id", "<client-id>");
HttpResponseMessage response = await client.SendAsync(requestMethod);
string responseBody = await response.Content.ReadAsStringAsync();
Console.WriteLine(responseBody.Split("\"login\":\"")[1].Split("\"")[0]);
