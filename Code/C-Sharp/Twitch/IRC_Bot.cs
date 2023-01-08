internal class IRCClient
    {
        /*      IMPORTANT LINKS TO UNDERSTAND      */
        // https://www.rfc-editor.org/rfc/rfc2812
        // https://codereview.stackexchange.com/questions/142653/simple-irc-bot-in-c
        // https://dev.twitch.tv/docs/irc/authenticate-bot
        // https://dev.twitch.tv/docs/irc#rate-limits

        internal string NICK { get; private set; }
        internal string CHANNEL { get; private set; }
        public string SERVER = "irc.chat.twitch.tv";
        private int PORT = 6667;
        private string USER = "USER IRCbot 0 * :IRCbot"; //Check RFC2812 for IRC Standards

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
    
