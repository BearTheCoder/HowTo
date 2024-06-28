using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;

namespace Random_Concepts
{
    internal class CheckColorSimilaritiesUsingDistance
    {
        public CheckColorSimilaritiesUsingDistance()
        {
            var red = Color.FromArgb(255, 255, 0, 0);
            var offRed = Color.FromArgb(255, 254, 1, 1);
            var blue = Color.FromArgb(255, 0, 0, 255);
            Console.WriteLine($"Distance between two similar red colors: {GetDistance(red, offRed)}");
            Console.WriteLine($"Distance between red and blue: {GetDistance(red, blue)}");
        }

        static double GetDistance(Color c1, Color c2)
        {
            var red = Math.Pow((c1.R - c2.R), 2);
            var green = Math.Pow((c1.G - c2.G), 2);
            var blue = Math.Pow((c1.B - c2.B), 2);
            return Math.Sqrt(red + green + blue);
        }
    }
}
