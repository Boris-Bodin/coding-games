import sys
import math

yHouses = []
xMin = 0
xHouseMin = 0
xHouseMax = 0
n = int(raw_input())
for i in xrange(n):
    x, y = [int(j) for j in raw_input().split()]
    yHouses.append(y)
    if(i == 0 or x > xHouseMax):
        xHouseMax = x
    if(i == 0 or x < xHouseMin):
        xHouseMin = x

yHouses.sort()
cableLength = xHouseMax - xHouseMin

yCable = None
nbHouses = len(yHouses)
if nbHouses % 2 == 0:
    yCable = int(round((yHouses[nbHouses/2-1] + yHouses[nbHouses/2])/2))
elif nbHouses % 2 == 1:
    yCable = yHouses[(nbHouses-1)/2]

for yHouse in yHouses:
    cableLength += abs(yHouse - yCable)

print cableLength