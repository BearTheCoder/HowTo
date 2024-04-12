using System.Text;

internal class GIF2TXT
{
  public GIF2TXT(string gifPath, string txtPath)
  {
    byte[] fileBytes = File.ReadAllBytes(gifPath);

    string byteString = "";

    foreach (byte b in fileBytes)
    {
      byteString += b.ToString("X2") + " ";
    }

    Console.WriteLine(byteString);
    Console.ReadLine();
    File.WriteAllText(txtPath, byteString);
  }
}