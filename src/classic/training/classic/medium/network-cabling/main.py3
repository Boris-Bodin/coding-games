import sys
import math


n = int(input())
print("N : " + str(n), file=sys.stderr)
maison = []
for i in range(n):
    maison.append([int(j) for j in input().split()])

def computeLength(yCable):
    length = maxX-minX
    for x,y in maison:
        length += abs(yCable-y)

    return length


minX = maison[0][0];
maxX = maison[0][0];
minY = maison[0][1];
maxY = maison[0][1];
Y =[];
for x,y in maison:
    minX =  min(x,minX)
    maxX =  max(x,maxX)
    minY =  min(y,minY)
    maxY =  max(y,maxY)
    Y.append(y);

Y.sort()
minLenght = sys.maxsize;

yCable = minY + round((maxY-minY)/2);
if n % 2 == 0:
    yCable = int(round((Y[round(n/2-1)] + Y[round(n/2)])/2));
elif n % 2 == 1:
    yCable = Y[round((n-1)/2)];

while 1:
    d = computeLength(yCable);
    dp = computeLength(yCable+1);
    dm = computeLength(yCable-1);
    minLenght = d;
    if d > dp :
        yCable = yCable+1;
    elif d > dm:
        yCable = yCable-1;
    else:
        break;




print(minLenght)
# Write an action using print
# To debug: print("Debug messages...", file=sys.stderr)