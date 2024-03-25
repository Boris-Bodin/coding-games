import sys, math

directions = ("SOUTH", "EAST", "NORTH", "WEST")
inversed = 0

def constant(f):
    def fset(self, value):
        raise SyntaxError
    def fget(self):
        return f()
    return property(fget, fset)
class _Const(object):
    @constant
    def SUD():
        if(inversed == 0):
            return 0
        else:
            return 3
    @constant
    def EST():
        if(inversed == 0):
            return 1
        else:
            return 2
    @constant
    def NORD():
        if(inversed == 0):
            return 2
        else:
            return 1
    @constant
    def OUEST():
        if(inversed == 0):
            return 3
        else:
            return 0
    @constant
    def BLENDER():
        return '@'
CONST = _Const()


def getFutureBlock(blender,direction):
    if(direction == CONST.SUD):
        return (blender[0]+1,blender[1])
    if(direction == CONST.EST):
        return (blender[0],blender[1]+1)
    if(direction == CONST.NORD):
        return (blender[0]-1,blender[1])
    if(direction == CONST.OUEST):
        return (blender[0],blender[1]-1)



def searchBlender(L,C,map):
    for row in xrange(L):
        for col in xrange(C):
            if(map[row][col] == CONST.BLENDER):
                return (row,col)

def getOtherTp(L,C,map,tp):
    for row in xrange(L):
        for col in xrange(C):
            if(map[row][col] == "T"):
                if(row != tp[0]):
                    return (row,col)
                if(col != tp[1]):
                    return (row,col)

if __name__ == '__main__' :
    L, C = [int(i) for i in raw_input().split()]
    map = []
    for i in xrange(L):
        row = raw_input()
        map.append([])
        for c in row:
            map[i].append(c)
    oldBlock = ' '
    direction = CONST.SUD
    run=0
    casseur=0
    res=""
    nb =0
    while(nb < 1000):
        blender = searchBlender(L,C,map)
        futureBlock = getFutureBlock(blender,direction)
        typeFutureBlock = map[futureBlock[0]][futureBlock[1]]
        if(typeFutureBlock == ' '):
            map[blender[0]][blender[1]] = oldBlock
            oldBlock = map[futureBlock[0]][futureBlock[1]]
            map[futureBlock[0]][futureBlock[1]] = CONST.BLENDER
            res += directions[direction] + "\n"
            run = 1
        elif(typeFutureBlock == '#'):
            if(run == 1):
                direction = 0
                run = 0
            else:
                direction +=1
        elif(typeFutureBlock == 'T'):
            map[blender[0]][blender[1]] = oldBlock
            oldBlock = map[futureBlock[0]][futureBlock[1]]
            tpblock = getOtherTp(L,C,map,futureBlock)
            map[tpblock[0]][tpblock[1]] = CONST.BLENDER
            res += directions[direction] + "\n"
        elif(typeFutureBlock == 'B'):
            map[blender[0]][blender[1]] = oldBlock
            oldBlock = map[futureBlock[0]][futureBlock[1]]
            map[futureBlock[0]][futureBlock[1]] = CONST.BLENDER
            res += directions[direction] + "\n"
            run = 1
            if(casseur == 1):
                casseur = 0
            else:
                casseur = 1
        elif(typeFutureBlock == 'X'):
            if(casseur == 1):
                map[blender[0]][blender[1]] = oldBlock
                oldBlock = " "
                map[futureBlock[0]][futureBlock[1]] = CONST.BLENDER
                res += directions[direction] + "\n"
                run = 1
            else:
                if(run == 1):
                    direction = 0
                    run = 0
                else:
                    direction +=1
        elif(typeFutureBlock == 'S'):
            map[blender[0]][blender[1]] = oldBlock
            oldBlock = map[futureBlock[0]][futureBlock[1]]
            map[futureBlock[0]][futureBlock[1]] = CONST.BLENDER
            res += directions[direction] + "\n"
            run = 1
            direction = CONST.SUD
        elif(typeFutureBlock == 'W'):
            map[blender[0]][blender[1]] = oldBlock
            oldBlock = map[futureBlock[0]][futureBlock[1]]
            map[futureBlock[0]][futureBlock[1]] = CONST.BLENDER
            res += directions[direction] + "\n"
            run = 1
            direction = CONST.OUEST
        elif(typeFutureBlock == 'N'):
            map[blender[0]][blender[1]] = oldBlock
            oldBlock = map[futureBlock[0]][futureBlock[1]]
            map[futureBlock[0]][futureBlock[1]] = CONST.BLENDER
            res += directions[direction] + "\n"
            run = 1
            direction = CONST.NORD
        elif(typeFutureBlock == 'I'):
            map[blender[0]][blender[1]] = oldBlock
            oldBlock = map[futureBlock[0]][futureBlock[1]]
            map[futureBlock[0]][futureBlock[1]] = CONST.BLENDER
            res += directions[direction] + "\n"
            run = 1
            if(directions[0] == "SOUTH"):
                direction = 3 - direction
                inversed = 1
                directions = ("WEST", "NORTH", "EAST", "SOUTH")
            else:
                direction = 3 - direction
                directions = ("SOUTH", "EAST", "NORTH", "WEST")
                inversed = 0
        elif(typeFutureBlock == 'E'):
            map[blender[0]][blender[1]] = oldBlock
            oldBlock = map[futureBlock[0]][futureBlock[1]]
            map[futureBlock[0]][futureBlock[1]] = CONST.BLENDER
            res += directions[direction] + "\n"
            run = 1
            direction = CONST.EST
        elif(typeFutureBlock == '$'):
            res += directions[direction] + "\n"
            break
        else:
            break
        nb = nb + 1
if(nb == 1000):
    print "LOOP"
else:
    print res