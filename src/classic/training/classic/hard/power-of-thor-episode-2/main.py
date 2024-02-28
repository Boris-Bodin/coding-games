import sys, math
TX, TY = [int(i) for i in raw_input().split()]

def __distance(X,Y):
    return math.floor(math.sqrt(abs(TX-X)*abs(TX-X) + abs(TY-Y)*abs(TY-Y)))
def distance(coordo):
    return __distance(coordo[0],coordo[1])


# game loop
while 1:
    # H: the remaining number of hammer strikes.
    # N: the number of giants which are still present on the map.
    H, N = [int(i) for i in raw_input().split()]
    monsters = list()
    for i in xrange(N):
        X, Y = [int(j) for j in raw_input().split()]
        monsters.append((X,Y))

    min = 40+18;
    minPos = (TX, TY);
    for monster in monsters:
        d = distance(monster)
        if(d < min):
            min = d
            minPos = monster

    if min >2:
        print "WAIT"
        continue
    else:
        move = list()
        for monster in monsters:
            d = distance(monster)
            if(d <= 3):
                if (TX-monster[0] < 0):
                    if (TY-monster[1] > 0):
                        move.append("N")
                        move.append("NE")
                        move.append("E")
                    elif (TY-monster[1] < 0):
                        move.append("S")
                        move.append("SE")
                        move.append("E")
                    else:
                        move.append("E")
                        move.append("NE")
                        move.append("SE")
                elif (TX-monster[0] > 0):
                    if (TY-monster[1] > 0):
                        move.append("N")
                        move.append("NW")
                        move.append("W")
                    elif (TY-monster[1] < 0):
                        move.append("SW")
                        move.append("S")
                        move.append("W")
                    else:
                        move.append("SW")
                        move.append("NW")
                        move.append("W")
                else:
                    if (TY-monster[1] > 0):
                        move.append("N")
                        move.append("NE")
                        move.append("NW")
                    else:
                        move.append("S")
                        move.append("SE")
                        move.append("SW")
            elif(d <= 5):
                if (TX-monster[0] < 0):
                    if (TY-monster[1] > 0):
                        move.append("NE")
                    elif (TY-monster[1] < 0):
                        move.append("SE")
                    else:
                        move.append("E")
                elif (TX-monster[0] > 0):
                    if (TY-monster[1] > 0):
                        move.append("NW")
                    elif (TY-monster[1] < 0):
                        move.append("SW")
                    else:
                        move.append("W")
                else:
                    if (TY-monster[1] > 0):
                        move.append("N")
                    else:
                        move.append("S")
        nb =0
        for monster in monsters:
            d = distance(monster)
            if(d <= 2):
                nb += 1
        print >> sys.stderr, N
        print >> sys.stderr, nb
        if nb == 8:
            print "STRIKE"
            continue
        elif nb == N:
            print "STRIKE"
            continue
        elif nb >= N/H:
            print "STRIKE"
            continue

        moveb = 0

        if (TY == 0):
            move.append("N")
            move.append("NE")
            move.append("NW")
        if (TY == 17):
            move.append("S")
            move.append("SE")
            move.append("SW")
        if (TX == 0):
            move.append("W")
            move.append("NW")
            move.append("SW")
        if (TX == 39):
            move.append("E")
            move.append("NE")
            move.append("SE")


        print >> sys.stderr, move
        for s in { "N", "NE", "E", "SE", "S", "SW", "W", "NW"}:
            if(s not in move):
                if(s == "N"):
                    TY -= 1
                if(s == "S"):
                    TY += 1
                if(s == "E"):
                    TX += 1
                if(s == "W"):
                    TX -= 1
                if(s == "NE"):
                    TY -= 1
                    TX += 1
                if(s == "SE"):
                    TY += 1
                    TX += 1
                if(s == "NW"):
                    TY -= 1
                    TX -= 1
                if(s == "SW"):
                    TX -= 1
                    TY += 1
                print s
                moveb = 1
                break
        if(moveb == 0):
            print "STRIKE"
            continue


    # Write an action using print
    # To debug: print >> sys.stderr, "Debug messages..."
    # The movement or action to be carried out: WAIT STRIKE N NE E SE S SW W or N