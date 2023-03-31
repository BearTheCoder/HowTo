import Data.dataController
import time

startTime = time.time()

data = Data.dataController.getData()


def swapPositions(numI, numJ, i, j):
    data[i] = numJ
    data[j] = numI


for i in range(0, len(data)):
    for j in range(0, len(data)):
        if (data[i] > data[j]):
            swapPositions(data[i], data[j], i, j)


Data.dataController.writeData(data)

endTime = time.time()
elapsedTime = endTime - startTime

print(elapsedTime)
