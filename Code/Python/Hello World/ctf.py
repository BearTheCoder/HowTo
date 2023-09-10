andArray = [67, 0, 20, 3, 2, 16, 57, 4, 0, 25, 5, 2, 18, 65]
output = ""

currentMask = 0;

def operate():
    global andArray;
    global xorArray;
    global currentMask;
    newMask = 0;
    for i in range(0, 14, 1):
        if (i % 2 == 0):
            newMask = currentMask & andArray[i]
            print(newMask);
            currentMask = newMask;
        else:
            newMask = currentMask | andArray[i]
            print(newMask);
            currentMask = newMask;


operate();