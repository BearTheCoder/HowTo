# Original Code written in P5js: https://openprocessing.org/sketch/1604942
# Code Author: Aaron Reuland
# Converted to python by BearTheCoder
# To be used with Processing

drips = []
colors = ['#6a0136', '#bfab25', '#b81365', '#026c7c', '#055864']
colorPicker = 0


def setup():
    global drips
    global colorPicker
    size(700, 500)
    drips.append(createDrip(colorPicker % 5, -height * 0.65))
    colorPicker += 1


def draw():
    global drips
    global colorPicker
    if (frameCount % 100 == 0):
        drips.append(createDrip(colorPicker % 5, -height))
        colorPicker += 1

    for i in range(len(drips), 0, -1):
        drips[i - 1].drop()
        # drips[i].display();

    for drip in drips:
        # drip.drop();
        drip.display()


def createDrip(local_colorPicker, local_start):
    return drip(local_colorPicker, local_start)


class drip:
    global colors
    global drips

    def __init__(self, colorIndex, start):
        self.points = []
        self.progress = start
        # self.acc=0.003
        # self.vel=0
        self.extent = height
        self.color = colors[colorIndex]
        self.changeOffset = random(1000)

    def drop(self):
        self.progress += 1.2
        if self.progress > height + 30:
            index = drips.index(self)
            drips.pop(index)
        self.changeOffset += 0.001
        self.points = []
        for x in range(-30, width + 31, 20):
            thisNoise = noise(float(x) / (float(width)/3.0), self.changeOffset)
            y = self.progress + thisNoise * self.extent
            pointer = PVector(x, y)
            self.points.append(pointer)

    def display(self):

        noStroke()
        fill(self.color)

        beginShape()
        curveVertex(-20, -20)
        curveVertex(-20, -10)
        for i in range(0, len(self.points), 1):
            curveVertex(self.points[i].x, self.points[i].y)
        curveVertex(width + 20, self.progress - 20)
        curveVertex(width + 20, -10)
        curveVertex(width + 20, -20)
        endShape(CLOSE)

        fill(255, 200)

        beginShape()
        for i in range(0, len(self.points), 1):
            curveVertex(self.points[i].x, self.points[i].y-2)
        for i in range(len(self.points), 0, -1):
            curveVertex(self.points[i - 1].x, self.points[i - 1].y-7)
        endShape()

        fill(255, 70)

        beginShape()
        for i in range(0, len(self.points), 1):
            curveVertex(self.points[i].x, self.points[i].y-7)
        for i in range(len(self.points), 0, -1):
            curveVertex(self.points[i - 1].x, self.points[i - 1].y-17)
        endShape()
