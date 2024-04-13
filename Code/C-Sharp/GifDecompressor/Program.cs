string filePath = "gif.gif";

GIFByteExtractor GBE = new(filePath);

Console.WriteLine(GBE.Header);
Console.WriteLine(GBE.LSDString);
Console.WriteLine(GBE.GIFWidth);
Console.WriteLine(GBE.GIFHeight);
Console.WriteLine(GBE.LSDPackedData);
Console.WriteLine(GBE.GlobalColorFlag);
Console.WriteLine(GBE.GCTSize);

string colorTable = "";
foreach (GlobalColor gc in GBE.GlobalColors)
{
  colorTable += gc.Hex + " ";
}

Console.WriteLine(colorTable.TrimEnd());

Console.WriteLine(GBE.BackgroundColorIndex);

// Print Blocks
foreach (string s in GBE.ImageData)
{
  Console.WriteLine(s);
  Console.WriteLine("");
}

// Print Image Pixel Arrays

Console.ReadLine();
