// Filename:  HttpServer.cs        
// Author:    Benjamin N. Summerton <define-private-public>        
// License:   Unlicense (http://unlicense.org/)

// https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=<client id>&redirect_uri=<redirect uri>&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671

using System.Text;
using System.Net;

class HttpServer
{
    public static HttpListener listener;
    public static string url = "http://localhost:8200/";
    public static int pageViews = 0;
    public static int requestCount = 0;
    public static string pageData =
        "<!DOCTYPE>" +
        "<html>" +
        "  <head>" +
        "    <title>HttpListener Example</title>" +
        "  </head>" +
        "  <body>" +
        "    <p id='accessToken'>Feel free to close this page.</p>" +
        "  </body>" +
        "  <script>" +
        "  if (!window.location.href.includes('?'))" +
        "    window.location = window.location.origin + '/?' + window.location.href.split('#')[1];;" +
        "  </script>" +
        "</html>";

    public static async Task HandleIncomingConnections()
    {
        bool runServer = true;

        while (runServer)
        {
            HttpListenerContext ctx = await listener.GetContextAsync();
            HttpListenerRequest req = ctx.Request;
            HttpListenerResponse resp = ctx.Response;

            Console.WriteLine(req.Url);

            byte[] data = Encoding.UTF8.GetBytes(String.Format(pageData));
            resp.ContentType = "text/html";
            resp.ContentEncoding = Encoding.UTF8;
            resp.ContentLength64 = data.LongLength;
            await resp.OutputStream.WriteAsync(data, 0, data.Length);
            resp.Close();
        }
    }

    public static void Main(string[] args)
    {
        listener = new HttpListener();
        listener.Prefixes.Add(url);
        listener.Start();
        Task listenTask = HandleIncomingConnections();
        listenTask.GetAwaiter().GetResult();
        listener.Close();
    }
}
