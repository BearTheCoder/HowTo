// https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=<client id>&redirect_uri=<redirect url>&scope=<scope>&state=c3ab8aa609ea11e793ae92361f002671

using System.Text;
using System.Net;

class HttpServer
{
    public static HttpListener listener;
    public static string url = "<redirect url>";

    public static async Task HandleIncomingConnections()
    {
        while (true)
        {
            HttpListenerContext ctx = await listener.GetContextAsync();
            HttpListenerRequest req = ctx.Request;
            HttpListenerResponse resp = ctx.Response;

            if (req.Url.ToString().Contains("?"))
            {
                Console.WriteLine(req.Url);
                Console.WriteLine();
                string accessToken = req.Url.ToString().Split("?")[1].Split("=")[1].Split("&")[0];
                Console.WriteLine(accessToken);
            }

            var data = File.ReadAllBytes(@"index.html");
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
