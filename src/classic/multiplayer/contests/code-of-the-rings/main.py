import sys, math

magicPhrase = raw_input()
lettre = {" " : 0,"A" : 1,"B" : 2,"C" : 3,"D" : 4,"E" : 5,"F" : 6,"G" : 7,"H" : 8,"I" : 9,"J" : 10,"K" : 11,"L" : 12,"M" : 13,"N" : 14,"O" : 15,"P" : 16,"Q" : 17,"R" : 18,"S" : 19,"T" : 20,"U" : 21,"V" : 22,"W" : 23,"X" : 24,"Y" : 25,"Z" : 26}
res =""
id = 0
runes = [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "]
pos = 0
diffLeter = list()

def compter(dist):
    nb =0
    for i in range(pos+1,len(magicPhrase)):
        if(magicPhrase[i] == dist):
            nb += 1
    return nb

def getIndex(dist):
    if(len(diffLeter) > 1):
        idmin = (id + 1)%30
        minValue = 1 + min(abs(lettre[dist] - lettre[runes[idmin]]), abs(lettre[dist]+27 - lettre[runes[idmin]]))
        minNb = compter(dist)
        for i in range(0,len(runes)):
            nb = compter(runes[i])
            distance = 0
            if(id > i):
                if( id - i < i+30 - id ):
                    distance += id - i
                else:
                    distance += i+30 - id
            elif(id < i):
                if(i - id < id + 30 - i  ):
                    distance += i - id
                else:
                    distance += id+30 - i
            if(lettre[dist] > lettre[runes[i]]):
                if(lettre[dist] - lettre[runes[i]] < lettre[runes[i]]+27 - lettre[dist] ):
                    distance += lettre[dist] - lettre[runes[i]]
                else:
                    distance += lettre[runes[i]]+27 - lettre[dist]
            elif(lettre[dist] < lettre[runes[i]]):
                if(lettre[runes[i]] - lettre[dist] < lettre[dist]+27 - lettre[runes[i]] ):
                    distance += lettre[runes[i]] - lettre[dist]
                else:
                    distance += lettre[dist]+27 - lettre[runes[i]]
            if minValue >= distance:
                #if(minNb >= nb):
                    minValue = distance
                    idmin = i
                    idNb = nb
        return idmin
    else:
        if(dist in runes):
            return runes.index(dist)
        else:
            idmin = runes.index(" ")
            minValue = 1 + min(abs(lettre[dist] - lettre[runes[idmin]]), abs(lettre[dist]+27 - lettre[runes[idmin]]))
            for i in range(0,len(runes)):
                if(runes[i] != " "):
                    nb = compter(runes[i])
                    distance = 0
                    if(id > i):
                        if( id - i < i+30 - id ):
                            distance += id - i
                        else:
                            distance += i+30 - id
                    elif(id < i):
                        if(i - id < id + 30 - i  ):
                            distance += i - id
                        else:
                            distance += id+30 - i
                    if(lettre[dist] > lettre[runes[i]]):
                        if(lettre[dist] - lettre[runes[i]] < lettre[runes[i]]+27 - lettre[dist] ):
                            distance += lettre[dist] - lettre[runes[i]]
                        else:
                            distance += lettre[runes[i]]+27 - lettre[dist]
                    elif(lettre[dist] < lettre[runes[i]]):
                        if(lettre[runes[i]] - lettre[dist] < lettre[dist]+27 - lettre[runes[i]] ):
                            distance += lettre[runes[i]] - lettre[dist]
                        else:
                            distance += lettre[dist]+27 - lettre[runes[i]]
                    if minValue >= distance:
                        #if(minNb >= nb):
                            minValue = distance
                            idmin = i
                            idNb = nb
            return idmin

if __name__ == '__main__':
    for c in magicPhrase:
        if(c not in diffLeter):
            diffLeter.append(c)
    while( pos < len(magicPhrase)):
        listPattern = list()
        listPattern.append(magicPhrase[pos])

        i = pos+1
        while (i < len(magicPhrase)):
            if(magicPhrase[i] != magicPhrase[pos]):
                listPattern.append(magicPhrase[i])
            else:
                if(len(listPattern) > 1 and i+1 < len(magicPhrase)):
                    if(magicPhrase[i+1] != magicPhrase[pos+1]):
                        listPattern.append(magicPhrase[i])
                    else:
                        break
            i += 1
        if i < len(magicPhrase):
            if len(listPattern) > 1:
                if len(listPattern) < 30:
                    nb = 0
                    i += 1
                    while (i < len(magicPhrase)):
                        if(magicPhrase[i] == listPattern[(i-pos)%len(listPattern)]):
                            if((pos-i)%len(listPattern) == len(listPattern)-1):
                                nb +=1
                        else:
                            break
                        i += 1
                    if nb > 3:
                        distanceRight = 0
                        for i in range(0,len(listPattern)):
                            dist = listPattern[i]
                            if(lettre[dist] > lettre[runes[id+i]]):
                                if(lettre[dist] - lettre[runes[id+i]] < lettre[runes[id+i]]+27 - lettre[dist] ):
                                    distanceRight += lettre[dist] - lettre[runes[id+i]]
                                else:
                                    distanceRight += lettre[runes[id+i]]+27 - lettre[dist]
                            elif(lettre[dist] < lettre[runes[id+i]]):
                                if(lettre[runes[id+i]] - lettre[dist] < lettre[dist]+27 - lettre[runes[id+i]] ):
                                    distanceRight += lettre[runes[id+i]] - lettre[dist]
                                else:
                                    distanceRight += lettre[dist]+27 - lettre[runes[id+i]]
                        distanceLeft = 0
                        for i in range(0,len(listPattern)):
                            dist = listPattern[i]
                            if(lettre[dist] > lettre[runes[id-i]]):
                                if(lettre[dist] - lettre[runes[id-i]] < lettre[runes[id-i]]+27 - lettre[dist] ):
                                    distanceLeft += lettre[dist] - lettre[runes[id-i]]
                                else:
                                    distanceLeft += lettre[runes[id-i]]+27 - lettre[dist]
                            elif(lettre[dist] < lettre[runes[id-i]]):
                                if(lettre[runes[id-i]] - lettre[dist] < lettre[dist]+27 - lettre[runes[id-i]] ):
                                    distanceLeft += lettre[runes[id-i]] - lettre[dist]
                                else:
                                    distanceLeft += lettre[dist]+27 - lettre[runes[id -i]]

                        if(distanceRight < distanceLeft):
                            for i in range(0,len(listPattern)):
                                dist = listPattern[i]
                                if(lettre[dist] > lettre[runes[id]]):
                                    if(lettre[dist] - lettre[runes[id]] < lettre[runes[id]]+27 - lettre[dist] ):
                                        for i in range(0,lettre[dist] - lettre[runes[id]]):
                                            res+= "+"
                                    else:
                                        for i in range(0,lettre[runes[id]]+27 - lettre[dist]):
                                            res+= "-"
                                elif(lettre[dist] < lettre[runes[id]]):
                                    if(lettre[runes[id]] - lettre[dist] < lettre[dist]+27 - lettre[runes[id]] ):
                                        for i in range(0,lettre[runes[id]] - lettre[dist]):
                                            res+= "-"
                                    else:
                                        for i in range(0,lettre[dist]+27 - lettre[runes[id]]):
                                            res+= "+"
                                runes[id] = dist
                                res +=".>"
                                id += 1
                                pos += 1

                            if(nb > 26):
                                nb = 26
                            for j in range(0,27 - nb):
                                res += "-"
                            res +="["
                            if(len(listPattern) >= 15):
                                for i in range(len(listPattern),30):
                                    res +=">"
                            else:
                                for i in range(0,len(listPattern)):
                                    res +="<"
                            for i in range(0,len(listPattern)):
                                res +=".>"
                            res +="-]"
                            id %= 30
                            pos += (nb)*len(listPattern)
                            continue
                        else :
                            for i in range(0,len(listPattern)):
                                dist = listPattern[i]
                                if(lettre[dist] > lettre[runes[id]]):
                                    if(lettre[dist] - lettre[runes[id]] < lettre[runes[id]]+27 - lettre[dist] ):
                                        for i in range(0,lettre[dist] - lettre[runes[id]]):
                                            res+= "+"
                                    else:
                                        for i in range(0,lettre[runes[id]]+27 - lettre[dist]):
                                            res+= "-"
                                elif(lettre[dist] < lettre[runes[id]]):
                                    if(lettre[runes[id]] - lettre[dist] < lettre[dist]+27 - lettre[runes[id]] ):
                                        for i in range(0,lettre[runes[id]] - lettre[dist]):
                                            res+= "-"
                                    else:
                                        for i in range(0,lettre[dist]+27 - lettre[runes[id]]):
                                            res+= "+"
                                runes[id] = dist
                                res +=".<"
                                id -= 1
                                pos += 1

                            if(nb > 26):
                                nb = 26
                            for j in range(0,27 - nb):
                                res += "-"
                            res +="["
                            if(len(listPattern) >= 15):
                                for i in range(len(listPattern),30):
                                    res +="<"
                            else:
                                for i in range(0,len(listPattern)):
                                    res +=">"
                            for i in range(0,len(listPattern)):
                                res +=".<"
                            res +="-]"
                            id %= 30
                            pos += (nb)*len(listPattern)
                            continue
        if(pos < len(magicPhrase)):
            dist = magicPhrase[pos]
            newid = getIndex(dist)
            if(id > newid):
                if( id - newid < newid+30 - id ):
                    for i in range(0,id - newid):
                        res+= "<"
                else:
                    for i in range(0,newid+30 - id):
                        res+= ">"
                id = newid
            elif(id < newid):
                if(newid - id < id + 30 - newid  ):
                    for i in range(0,newid - id):
                        res+= ">"
                else:
                    for i in range(0,id + 30 - newid ):
                        res+= "<"
                id = newid
            if(lettre[dist] > lettre[runes[id]]):
                if(lettre[dist] - lettre[runes[id]] < lettre[runes[id]]+27 - lettre[dist] ):
                    for i in range(0,lettre[dist] - lettre[runes[id]]):
                        res+= "+"
                else:
                    for i in range(0,lettre[runes[id]]+27 - lettre[dist]):
                        res+= "-"
            elif(lettre[dist] < lettre[runes[id]]):
                if(lettre[runes[id]] - lettre[dist] < lettre[dist]+27 - lettre[runes[id]] ):
                    for i in range(0,lettre[runes[id]] - lettre[dist]):
                        res+= "-"
                else:
                    for i in range(0,lettre[dist]+27 - lettre[runes[id]]):
                        res+= "+"
            runes[id] = dist
            nb = 1
            for j in range(pos+1,len(magicPhrase)):
                if(magicPhrase[j] != dist):
                    break
                nb += 1

            if(nb > 27-nb + 6):
                if(runes[(id+1) % 30] == " "):
                    res +=">"
                    if(nb > 26):
                        nb = 26
                    for j in range(0,27 - nb):
                        res += "-"
                    res +="[<.>-]"
                    id += 1
                    id %= 30
                    pos += nb
                elif(runes[(id-1) % 30] == " "):
                    res +="<"
                    if(nb > 26):
                        nb = 26
                    for j in range(0,27 - nb):
                        res += "-"
                    res +="[>.<-]"
                    id -= 1
                    id %= 30
                    pos += nb
                else:
                    res+= "."
                    pos += 1
            else:
                res+= "."
                pos += 1
    pos = 0
    newres = ""
    print >> sys.stderr, res
    while( pos < len(res)):
        listPattern = list()
        listPattern.append(res[pos])

        i = pos+1
        while (i < len(res)):
            if(res[i] != res[pos]):
                listPattern.append(res[i])
            else:
                if(len(listPattern) > 1 and i+1 < len(res)):
                    if(res[i+1] != res[pos+1]):
                        listPattern.append(res[i])
                    else:
                        break
            i += 1
        if i < len(res):
            if len(listPattern) > 1:
                if len(listPattern) < 30:

                    countdepla = 0
                    for i in range(0,len(listPattern)):
                        if listPattern[i] == "<":
                            countdepla +=1
                        if listPattern[i] == ">":
                            countdepla -=1
                    if(countdepla == 0):
                        nb = 0
                        i += 1
                        while (i < len(res)):
                            if(res[i] == listPattern[(i-pos)%len(listPattern)]):
                                if((pos-i)%len(listPattern) == len(listPattern)-1):
                                    nb +=1
                            else:
                                break
                            i += 1
                        if nb > 3 : # and nb*len(listPattern) > 20:
                            countinf = 0
                            maxcount = 0
                            for i in range(0,len(listPattern)):
                                if listPattern[i] == "<":
                                    countinf +=1
                                if listPattern[i] == ">":
                                    countinf -=1
                                if(maxcount < countinf):
                                    maxcount = countinf

                            for i in range(0,maxcount+1):
                                newres +="<"

                            if(nb > 26):
                                nb = 26
                            for j in range(0,27 - nb+1):
                                newres += "-"
                            newres +="["
                            for i in range(0,maxcount+1):
                                newres +=">"
                            for i in range(0,len(listPattern)):
                                newres += listPattern[i]
                            for i in range(0,maxcount+1):
                                newres +="<"
                            newres +="-]"
                            for i in range(0,maxcount+1):
                                newres +=">"
                            pos += (nb-1)*len(listPattern)
                        else:
                            newres += res[pos]
                            pos += 1
                    else:
                        newres += res[pos]
                        pos += 1
                else:
                    newres += res[pos]
                    pos += 1
            else:
                newres += res[pos]
                pos += 1
        else:
            newres += res[pos]
            pos += 1
    if(len(res) < len(newres)):
        print res
    else:
        print newres