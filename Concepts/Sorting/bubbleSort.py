"""
Bubble sort "bubbles" the highest (or lowest) to the top of the array.

Let's say we have an array of numbers

    [9, 4, 15, 6, 7, 23, 5]

What we have to do is iterate through the array and with each element you compare with the rest of the array.

If the current number is higher (or lower) than the number you are comparing to, then you swap the positions of
the two numbers.

For example:

    Start: [9, 4, 15, 6, 7, 23, 5]
    1: [4, 6, 15, 7, 5, 23, 9]
    2: [4, 6, 15, 7, 5, 23, 9]




"""

import Data.dataController
import time

startTime = time.time()

data = Data.dataController.getData()

def swapPositions(numI, numJ, i, j):
    data[i] = numJ
    data[j] = numI

i = 0;
while i < len(data):
    hasSwaped = False;
    for j in range(0, len(data)):
        if (data[i] > data[j]):
            swapPositions(data[i], data[j], i, j)
            hasSwaped = True;
    if not hasSwaped:
        i += 1

Data.dataController.writeData(data)

endTime = time.time()
elapsedTime = endTime - startTime

print(elapsedTime)
