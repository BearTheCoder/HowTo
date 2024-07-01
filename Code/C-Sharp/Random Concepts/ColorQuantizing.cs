using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;

namespace Random_Concepts
{
    internal class ColorQuantizing
    {
        public Color[] QuantizedImagePixels { get; private set; }

        public List<Color> QuantizedPallet { get; private set; }

        private float _threshold;

        public ColorQuantizing(float threshold)
        {
            _threshold = threshold;
            PNGDataExtractor pngData = new PNGDataExtractor(EnvVars.PNGFolderPath + "testtest.png");
            QuantizedImagePixels = pngData.data.PixelColors;
            CountColors(pngData.data.PixelColors);
            CreateQuantizedImage(pngData);
        }

        private void CountColors(Color[] pixelColors)
        {
            Dictionary<Color, int> elementCounts = CountOccurrences(pixelColors);

            Dictionary<Color, int> sortedByValue = elementCounts.OrderByDescending(entry => entry.Value)
                .ToDictionary(entry => entry.Key, entry => entry.Value);

            Console.WriteLine(elementCounts.Count);

            GetQuantizedPallet(sortedByValue);
        }

        private void CreateQuantizedImage(PNGDataExtractor pngData)
        {
            using (Bitmap bitmap = new Bitmap(pngData.data.ImageWidth, pngData.data.ImageHeight))
            {
                for (int y = 0; y < pngData.data.ImageHeight; y++)
                {
                    for (int x = 0; x < pngData.data.ImageWidth; x++)
                    {
                        int index = (y * pngData.data.ImageWidth) + x;
                        bitmap.SetPixel(x, y, QuantizedImagePixels[index]);
                    }
                }

                bitmap.Save(EnvVars.PNGFolderPath + "output.png", System.Drawing.Imaging.ImageFormat.Png);
            }
        }



        static Dictionary<Color, int> CountOccurrences(Color[] pixelColors)
        {
            Dictionary<Color, int> counts = new Dictionary<Color, int>();

            foreach (Color c in pixelColors)
            {
                counts[c] = counts.ContainsKey(c) ? counts[c] + 1 : 1;
            }

            return counts;
        }

        static double CheckSimilarityByDistance(Color c1, Color c2)
        {
            var red = Math.Pow((c1.R - c2.R), 2);
            var green = Math.Pow((c1.G - c2.G), 2);
            var blue = Math.Pow((c1.B - c2.B), 2);
            return Math.Sqrt(red + green + blue);
        }

        void GetQuantizedPallet(Dictionary<Color, int> sortedByDescendingColorPallet)
        {
            QuantizedPallet = new List<Color>();
            Color[] oldColorPallet_Sorted = sortedByDescendingColorPallet.Keys.ToArray();

            for (int i = 0; i < oldColorPallet_Sorted.Length; i++)
            {
                if (QuantizedPallet.Count == 0)
                {
                    QuantizedPallet.Add(oldColorPallet_Sorted[i]);
                }

                else
                {
                    bool canAdd = true;

                    for (int j = 0; j < QuantizedPallet.Count; j++)
                    {
                        double similarity = CheckSimilarityByDistance(oldColorPallet_Sorted[i], QuantizedPallet[j]);

                        if (similarity < _threshold)
                        {
                            for (int k = 0; k < QuantizedImagePixels.Length; k++)
                            {
                                if (QuantizedImagePixels[k] == oldColorPallet_Sorted[i])
                                {
                                    QuantizedImagePixels[k] = QuantizedPallet[j];
                                }
                            }

                            canAdd = false;
                            break;
                        }
                    }

                    if (canAdd)
                    {
                        QuantizedPallet.Add(oldColorPallet_Sorted[i]);
                    }
                }
            }

            Console.WriteLine($"Pallet count: {QuantizedPallet.Count}");
        }
    }
}
