import csv

csvPath = "D:\\Code\\HowTo\\Concepts\\Sorting\\Data\\data.csv"
newCSVPath = "D:\\Code\\HowTo\\Concepts\\Sorting\\Data\\dataExport.csv"

numbers = []


def getData():
    data = []
    with open(csvPath, newline='') as csvFile:
        csvReader = csv.reader(csvFile, delimiter=',', quotechar='|')
        for row in csvReader:
            data.append(int(row[0]))
    return data


def writeData(sortedData):
    for i in range(0, len(sortedData)):
        numbers.append([sortedData[i]])

    with open(newCSVPath, 'w', newline='') as csvfile:
        csvReader = csv.writer(
            csvfile,
            delimiter=' ',
            quotechar='|',
            quoting=csv.QUOTE_MINIMAL)

        for i in range(0, len(sortedData)):
            csvReader.writerow(numbers[i])
