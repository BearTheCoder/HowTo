import csv

partNumbers = []

csvFilePath = "C:\\Users\\aadkins\\Desktop\\pythonTest.csv"

with open(csvFilePath, newline='') as csvFile:
    csvReader = csv.reader(csvFile, delimiter=',', quotechar='|')
    for row in csvReader:
        partNumbers.append(row[0])


def swapPositions(partsList, pos1, pos2):
    partsList[pos1], partsList[pos2] = partsList[pos2], partsList[pos1]
    return partsList


def sortRows():
    for i in range(0, len(partNumbers)):
        for j in range(0, len(partNumbers)):
            if i == j:
                continue
            iByte = bytes(partNumbers[i], "ascii")[0]
            jByte = bytes(partNumbers[j], "ascii")[0]
            iByte = iByte if iByte > 58 else iByte + 200
            jByte = jByte if jByte > 58 else jByte + 200
            if iByte > jByte:
                global partNumbers
                partNumbers = swapPositions(partNumbers, i, j)


sortRows()
print(partNumbers)
