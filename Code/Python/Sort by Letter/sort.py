import csv


class partNumber:
    def __init__(self, partNumber, partBin, quantity):
        self.partNumber = partNumber
        self.bin = partBin
        self.quantity = quantity


csvPath = "C:\\Users\\aadkins\\Desktop\\Sort By Letter\\template.csv"
newCSVPath = "C:\\Users\\aadkins\\Desktop\\Sort By Letter\\output.csv"

partNumbers = []

availableBins = 30

with open(csvPath, newline='') as csvfile:
    csvReader = csv.reader(csvfile, delimiter=' ', quotechar='|')
    for i in range(1, len(csvReader)):
        columns = csvReader[i][0].split(",")
        partNumbers.append(partNumber(columns[0], columns[1], columns[2]))


def sortList(list, pos1, pos2):
    list[pos1], list[pos2] = list[pos2], list[pos1]
    return list


def checkValues(partOne, partTwo, k):
    iByte = bytes(partOne, "ascii")[k]
    jByte = bytes(partTwo, "ascii")[k]
    iByte = iByte if iByte > 58 else iByte + 200
    jByte = jByte if jByte > 58 else jByte + 200
    if iByte < jByte:
        return True
    else:
        return False


for i in range(0, len(partNumbers)):
    for j in range(0, len(partNumbers)):
        for k in range(0, 10):
            if k == 0:
                canSwap = checkValues(
                    partNumbers[i].partNumber, partNumbers[j].partNumber, k)
                if canSwap:
                    partNumbers = sortList(partNumbers, i, j)
            else:
                splitString1 = partNumbers[i].partNumber[:k]
                splitString2 = partNumbers[j].partNumber[:k]
                if splitString1 == splitString2:
                    canSwap = checkValues(
                        partNumbers[i].partNumber, partNumbers[j].partNumber, k)
                    if canSwap:
                        partNumbers = sortList(partNumbers, i, j)

perBin = round(len(partNumbers) / availableBins)

print(perBin)

iterableRows = []
for partNumber in partNumbers:
    newRow = []
    newRow.append(
        f"{partNumber.partNumber},{partNumber.bin},{partNumber.quantity}")
    iterableRows.append(newRow)


with open(newCSVPath, 'w', newline='') as csvfile:
    csvReader = csv.writer(csvfile, delimiter=' ',
                           quotechar='|', quoting=csv.QUOTE_MINIMAL)
    csvReader.writerow(["PartNumber,Bin,Quantity"])
    for i in range(1, len(iterableRows) + 1):
        csvReader.writerow(iterableRows[i])
        if i % (perBin - 1) == 0 and i > 16:
            csvReader.writerow([])
