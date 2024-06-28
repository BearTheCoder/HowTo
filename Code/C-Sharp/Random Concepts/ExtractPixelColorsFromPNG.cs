// This is done using System.Drawing. This is not a method to fully extract and decompress pixel data from PNGs

using System.Drawing; // This is a Microsoft only assembly/packe

namespace Random_Concepts
{
    internal class ExtractPixelColorsFromPNG
    {
        public BitMapData data { get; private set; }
        public PNGDataExtractor(string file)
        {
            Bitmap bmp = new Bitmap(file);
            Color[] colors = new Color[bmp.Height * bmp.Width];

            for (int y = 0; y < bmp.Height; y++)
            {
                for (int x = 0; x < bmp.Width; x++)
                {
                    colors[(y * bmp.Height) + x] = bmp.GetPixel(x, y);
                }
            }
            data = new BitMapData(bmp.Width, bmp.Height, colors);
        }
    }
}