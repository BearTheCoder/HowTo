/*
*   THESE LINKS DO A BETTER JOB AT EXPLAINING THAN I DO:
*   https://codereview.stackexchange.com/questions/142653/simple-irc-bot-in-c (original code)
*   https://en.wikipedia.org/wiki/Internet_Relay_Chat
*   https://dev.twitch.tv/docs/irc/authenticate-bot
*   https://dev.twitch.tv/docs/irc#rate-limits
*   https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#implicit-grant-flow
*   https://dev.twitch.tv/docs/authentication/#app-access-tokens
*   https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#examples-of-the-three-flows
*
*   Here's a good rule of thumb when using Twitch's API:
*       1.) Need chat messages? Use IRC.
*       2.) Need server-to-server, app-to-app event based communication? Use webhooks.
*       3.) Need request based communication? Use API.
*       4.) Need server-to-client event based communication? Use PubSub.
*
*   What is IRC?
*   Put simply, which is about the level at which I understand it, IRC is a type of server architecture that is designed specifically for chat messaging systems.
*   Which makes sense as to why Twitch uses it, and why you should as well when trying to capture chat messages.
*
*   Rate Limits?
*   When using any API, it important to know the rate limits and the cost for exceeding certain levels of the rate limits.
*   Twitch makes it easy as their API and alike are completely free to use.
*
*   Security Measures?
*   As said before, Twitch's API is free, so there is no monetary risk to exposing your sensitive API information, but you are vunerable to DoS attacks
*   if your API access information becomes exposed to the public. That being said, Twitch's policy boils down to this: You are responisble for your own security.
*   To access Twitch's API in any fashion, you need an access token or bearer token via OAuth. Getting the OAuth token is as easy as making an HTTP request using
*   your application's client ID and a callback URL (even if fake). The HTTP request then returns an OAuth token that you can use with the API.
*   One thing to note is that the URI you put into the HTTP request must match the URI you stated when registering your app with Twitch
*
*   Below is an example of the HTTP request:
*
*   https://id.twitch.tv/oauth2/authorize
*       ?response_type=token
*       &client_id=<your client id goes here>
*       &redirect_uri=<your app redirect uri>
*       &scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls
*       &state=c3ab8aa609ea11e793ae92361f002671
*
*   <copy here> https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=<your client id goes here>&redirect_uri=<your app redirect uri>&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671
*
*   Here is what a response would look like:
*   
*   http://<your app redirect uri>/
*       #access_token=<access token>
*       &scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls
*       &state=c3ab8aa609ea11e793ae92361f002671
*       &token_type=bearer
*
*   The type of HTTP request shown above is an "implicit grant flow" request. And Twitch recommends that you do this type of request if you are not using a server.
*   Please check the links above if you are choosing to use a server.
*
*   What is the risk?
*   Obviously, code that is ran client side is always exposed to the client, this means that any code written can be read by the user.
*   This means that the ClientID and the Callback URI that is hard coded into your application are usable by the client if they want to.
*   When using the IRC system you are allotted a certain amount of "JOINS" per 10 seconds. (20 per 10 seconds, maybe more depending on verification)
*   If someone wanted to shut down your application, all they have to do is get your clientID and URI and write their own application that joins
*   the IRC server over and over again, and then BOOM DoS attack.
*
*   This being said, there is no financial ruin that awaits you if this happens, maybe just a bad review or two. Maybe the attacker will attempt to 
*   ransom you. And here is what I say to that.
*   1.) If a person is DoS'ing your application to be spiteful, there is a very good chance that you might just be a shit person.
*   2.) If your application is big enough to be considered for ransom, invest in a server idiot. Security is step #1.
*   3.) In the odd change the other two options don't apply to you and you are still being attacked, I feel genuinely bad for you. 
*       Unfortunately it is time to buy server space, fortunately in today's age server space is cheap.
*/

internal class IRCClient
    {
        internal string NICK { get; private set; }
        internal string CHANNEL { get; private set; }
        public string SERVER = "irc.chat.twitch.tv";
        private int PORT = 6667;

        private string PASS = "oauth:<access-token>";

        internal IRCClient(string channelName)
        {
            CHANNEL = "#" + channelName;
            NICK = "IRCbot";
        }

        internal void startConnectionIRC()
        {
            NetworkStream stream;
            TcpClient irc;
            string inputLine;
            StreamReader reader;
            StreamWriter writer;

            try
            {
                irc = new TcpClient(SERVER, PORT);
                stream = irc.GetStream();
                reader = new StreamReader(stream);
                writer = new StreamWriter(stream);
                writer.WriteLine("PASS " + PASS);
                writer.WriteLine("NICK " + NICK);
                writer.Flush();
                writer.WriteLine(USER);
                writer.Flush();

                while (true)
                {
                    while ((inputLine = reader.ReadLine()) != null)
                    {
                        Console.WriteLine("<- " + inputLine);

                        string[] splitInput = inputLine.Split(new Char[] { ' ' });

                        if (splitInput[0] == "PING")
                        {
                            string PongReply = splitInput[1];
                            writer.WriteLine("PONG " + PongReply);
                            writer.Flush();
                        }

                        switch (splitInput[1])
                        {
                            case "001":
                                writer.WriteLine("JOIN " + CHANNEL);
                                writer.Flush();
                                break;
                            default:
                                break;
                        }
                    }

                    writer.Close();
                    reader.Close();
                    irc.Close();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
        }
    }
    
