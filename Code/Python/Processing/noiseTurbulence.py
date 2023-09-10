# Original Code written in Java: https://openprocessing.org/sketch/143842
# Code Author: Raven Kwok
# Converted to python by BearTheCoder
# To be used with Processing

pts = []
onPressed = False


def setup():
    fullScreen()
    smooth()
    colorMode(HSB)
    rectMode(CENTER)
    background(255)


def draw():
    global onPressed
    global pts
    if onPressed:
        for i in range(10):
            newP = Particle(i + len(pts), i + len(pts))
            pts.append(newP)

    for i in range(len(pts) - 1, 0, -1):
        global pts
        p = pts[i]

        if p.dead:
            pts.pop(i)
        else:
            p.update()
            p.display()


def mousePressed():
    global onPressed
    onPressed = True


def mouseReleased():
    global onPressed
    onPressed = False


def keyPressed():
    global pts
    if (key == 'c'):
        for i in range(len(pts) - 1, 0, -1):
            p = pts[i]
            pts.pop(i)
        background(255)


class Particle:

    def __init__(self, xOfst, yOfst):
        self.loc = PVector(mouseX, mouseY)
        randDegrees = random(360)
        self.vel = PVector(cos(radians(randDegrees)),
                           sin(radians(randDegrees)))
        self.vel.mult(random(5))
        self.acc = PVector(0, 0)
        self.lifeSpan = random(30, 90)
        self.fDecay = random(0.75, 0.9)
        self.c = color(random(255), random(255), 255)
        self.fWeightRange = float(random(3, 50))
        self.fXOfst = xOfst
        self.fYOfst = yOfst
        self.dead = False
        self.passedLife = 0

    def update(self):

        if (self.passedLife >= self.lifeSpan):
            self.dead = True
        else:
            self.passedLife += 1

        self.fAlpha = float(self.lifeSpan-self.passedLife) / \
            self.lifeSpan * 70+50
        self.fWeight = float(self.lifeSpan-self.passedLife) / \
            self.lifeSpan * self.fWeightRange
        self.acc.set(0, 0)
        rn = (noise((self.loc.x + frameCount + self.fXOfst) * 0.01,
              (self.loc.y + frameCount + self.fYOfst) * 0.01) - 0.5) * TWO_PI * 4
        iMag = noise((self.loc.y - frameCount) * 0.01,
                     (self.loc.x - frameCount) * 0.01)
        dir = PVector(cos(rn), sin(rn))
        self.acc.add(dir)
        self.acc.mult(iMag)
        randRn = random(TWO_PI)
        randV = PVector(cos(randRn), sin(randRn))
        randV.mult(.25)
        self.acc.add(randV)
        self.vel.add(self.acc)
        self.vel.mult(self.fDecay)
        self.vel.limit(3)
        self.loc.add(self.vel)

    def display(self):
        if (self.fWeight > 0):
            strokeWeight(self.fWeight + 1.5)
            stroke(0, self.fAlpha)
            point(self.loc.x, self.loc.y)
            strokeWeight(self.fWeight)
            stroke(self.c)
            point(self.loc.x, self.loc.y)
