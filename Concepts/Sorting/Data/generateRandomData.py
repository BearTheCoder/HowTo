import csv
import random

csvPath = "C:\\Users\\aadkins\\Desktop\\Code\\HowTo\\Concepts\\Sorting\\Data\\data.csv"

numbers = []

dataLength = 1_000_000
dataCount = 10_000

for i in range(0, dataCount):
    numbers.append([random.randint(0, dataLength)])

with open(csvPath, 'w', newline='') as csvfile:
    csvReader = csv.writer(
        csvfile,
        delimiter=' ',
        quotechar='|',
        quoting=csv.QUOTE_MINIMAL)
    for i in range(0, dataCount):
        csvReader.writerow(numbers[i])
