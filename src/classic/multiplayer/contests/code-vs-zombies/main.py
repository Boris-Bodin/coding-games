import sys
import math

# Save humans, destroy zombies!

# game loop

while 1:
    x, y = [int(i) for i in raw_input().split()]
    human_count = int(raw_input())
    human = list()
    for i in xrange(human_count):
        human.append([int(j) for j in raw_input().split()])
    zombie_count = int(raw_input())
    zombie = list()
    for i in xrange(zombie_count):
        zombie.append([int(j) for j in raw_input().split()])


    idHuman =0
    idZombie =0
    max = 0
    for i in xrange(human_count):
        min = 999999999
        for j in xrange(zombie_count):
            dist = (zombie[j][3] - human[i][1]) * (zombie[j][3] - human[i][1]) + (zombie[j][4] - human[i][2]) * (zombie[j][4] - human[i][2])
            if min > dist :
                min = dist
        if(max < min):
            idHuman = i
            max = min

    idZombie =0
    min = 99999999
    for j in xrange(zombie_count):
        dist = (zombie[j][3] - human[idHuman][1]) * (zombie[j][3] - human[idHuman][1]) + (zombie[j][4] - human[idHuman][2]) * (zombie[j][4] - human[idHuman][2])
        if min > dist :
            min = dist
            idZombie = j

    print "" + str(zombie[idZombie][3]) +" " + str(zombie[idZombie][4])
