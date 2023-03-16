import csv

class partNumber:
    def __init__(self, partNumber):
        self.partNumber = partNumber

csvPath = "C:\\Users\\aaron\\Desktop\\testCSV.csv"

partNumbers = []

with open(csvPath, newline='') as csvfile:
    csvReader = csv.reader(csvfile, delimiter=' ', quotechar='|')
    for row in csvReader:
        partNumbers.append(partNumber(row[0]))

def sortList(list, pos1, pos2):
    list[pos1], list[pos2] = list[pos2], list[pos1]
    return list;

def checkValues(partOne, partTwo, k):
    iByte = bytes(partOne, "ascii")[k];
    jByte = bytes(partTwo, "ascii")[k];
    iByte = iByte if iByte > 58 else iByte + 200
    jByte = jByte if jByte > 58 else jByte + 200
    if iByte < jByte:
        return True
    else:
        return False;

for i in range(0, len(partNumbers)):
    for j in range(0, len(partNumbers)):
        for k in range(0, 10):
            if k == 0:
                canSwap = checkValues(partNumbers[i].partNumber, partNumbers[j].partNumber, k)
                if canSwap:
                    partNumbers = sortList(partNumbers, i, j)
            else:
                splitString1 = partNumbers[i].partNumber[:k]
                splitString2 = partNumbers[j].partNumber[:k]
                if splitString1 == splitString2:
                    canSwap = checkValues(partNumbers[i].partNumber, partNumbers[j].partNumber, k)
                    if canSwap:
                        partNumbers = sortList(partNumbers, i, j)


for partNumber in partNumbers:
    print(partNumber.partNumber)








