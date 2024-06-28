using System;
using System.Collections.Generic;
using System.Linq;

namespace Random_Concepts
{
    internal class CountOccurencesInArray
    {
        public int[] numbers =
            new int[] {
                1,                            // 1
                2, 2, 2, 2, 2,                // 5
                3, 3, 3,                      // 3
                4, 4, 4, 4, 4, 4, 4,          // 7
                5, 5,                         // 2
                6, 6, 6, 6,                   // 4
                7, 7, 7, 7, 7, 7, 7, 7,       // 8
                8, 8, 8, 8, 8, 8, 8, 8, 8, 8, // 10
                9, 9, 9, 9, 9, 9,             // 6
                0, 0, 0, 0, 0, 0, 0, 0, 0     // 9
            };

        public CountOccurencesInArray()
        {
            Console.WriteLine(numbers.Length);

            Dictionary<int, int> elementCounts = CountOccurrences(numbers);

            // Sorted highest to lowest using Linq
            var sortedByValue = elementCounts.OrderByDescending(entry => entry.Value)
                .ToDictionary(entry => entry.Key, entry => entry.Value);

            foreach (var item in sortedByValue)
            {
                Console.WriteLine($"Element {item.Key} occurs {item.Value} times.");
            }
        }

        static Dictionary<int, int> CountOccurrences(int[] numbers)
        {
            Dictionary<int, int> counts = new Dictionary<int, int>();

            foreach (int i in numbers)
            {
                counts[i] = counts.ContainsKey(i) ? counts[i] + 1 : 1;
            }

            return counts;
        }
    }
}
