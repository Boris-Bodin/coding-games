import sys, numpy, random

import sys
import math
from collections import Counter
import numpy as np

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

TEXT = raw_input()

# Write an action using print
# To debug: print >> sys.stderr, "Debug messages..."


ARRAY_SIZE = 30

ALPHABET = [" ", "A", "B", "C", "D", "E", "F",
                 "G", "H", "I", "J", "K", "L",
                 "M", "N", "O", "P", "Q", "R",
                 "S", "T", "U", "V", "W", "X", "Y", "Z"]

INC    = "+"
DEC    = "-"
SELECT = "."
LEFT   = "<"
RIGHT  = ">"
START  = "["
STOP   = "]"



def text2num (text) :
    res = []
    for i in range (len(text)) :
        for j in range (len(ALPHABET)) :
            if text[i] == ALPHABET[j] :
                res += [j]
                continue
    return res

def minimum_distance (first,second,l) :
    minimum = [
            second - first,
            - (first - second + l) ,
            (second - first + l),
            - (first -second) ]
    select = minimum[0]
    for v in minimum :
        if abs(select) > abs (v) :
            select = v
    return select

def num2inc (seq) :
    res = []
    for i in range (len(seq)-1) :
        first   = seq[i]
        second   = seq[i+1]
        res += [minimum_distance(first,second,len(ALPHABET))]
    return res

def search_pattern (seq, depth = 0, debug = False) :
    MAX_PATTERN_SIZE = 14
    pattern_size = 1


    if seq == [] :
        return []
    res = ([seq[0]],1)
    all_res = [res]
    while pattern_size <= MAX_PATTERN_SIZE :
        pattern = seq[0:pattern_size]
        count = 1
        found = True
        while found :
            found = False
            to_test = seq[count * pattern_size : count * pattern_size + pattern_size  ]
            if pattern == to_test :
                count += 1
                found = True

        if res[1] < count :
            res = (seq[:pattern_size],count)
        if  count > 1 :
            all_res += [(seq[:pattern_size],count)]
        pattern_size += 1
    possible_solutions = []


    return [res] + search_pattern(seq[len(res[0]) * res[1] :], depth + 1)



def generate_pattern (seq) :
    res = []
    for v in seq :
        if v > 0 :
            res += [INC] * abs(v)
        else :
            res += [DEC] * abs(v)
        res += [SELECT]
    return res

def compress_pattern (l, init_val) :

    if l == [] :
        return []
    current = l[0]

    current_seq , current_count = current
    remain  = l[1:]
    best_n    = 1
    best_size = len(PATTERN2SEQ([current]))
    valid_solution = []

    for i in range (2,10) :
        if current_count % i == 0 :
            ncurrent_count = current_count / i
            ncurrent_seq   = current_seq * i
            ncurrent = (current_seq,current_count)

            if best_size > len(PATTERN2SEQ([ncurrent])) :
                best_size = len(PATTERN2SEQ([ncurrent]))
                best_n    = i
            if (ncurrent_count < len(ALPHABET)) :
                valid_solution += [ncurrent]
    # POSSIBLE CHANGE
    #current_count /= best_n
    #current_seq    = current_seq * best_n
    #current        = (current_seq,current_count)

    if current_count > ( len (ALPHABET)  - 1 ) :
        new_list = []
        new_count = current_count
        while new_count > ( len (ALPHABET)  - 1 ) :
            new_list += [ ( current_seq,                  len (ALPHABET) - 1 ) ]
            new_count -=  len (ALPHABET) - 1
        new_first = ( current_seq, new_count )
        valid_solution += [ [new_first] + compress_pattern ( new_list , new_first[-1] ) ]
        return valid_solution[-1] +  compress_pattern (   remain , new_first[0][-1] )
    if len(valid_solution) > 0 :
        #return valid_solution[-1] +  compress_pattern (   remain , 0 )
        #print valid_solution
        best_sol = valid_solution[0]
        for sol in valid_solution :
            pass
            if PATTERN2SEQ([sol]) > PATTERN2SEQ([best_sol]) :
                best_sol = sol
        return [best_sol] + compress_pattern (  remain , best_sol[0][-1] )

    elif current_count == 1 and len(current_seq) > 1 :
        new_list = [([x],1) for x in current_seq]
        return compress_pattern (   new_list +  remain , x )
    else :
        return [current] + compress_pattern ( remain , current_seq[-1] )

def PATTERN2SEQ(pattern_to_generate) :
    result = []
    for pattern in pattern_to_generate :
        seq , count = pattern
        internal = generate_pattern(seq)
        local_result = []
        if count == 1   :
            local_result += internal
        elif (2 * count) >= len (ALPHABET)  :
            local_result += [RIGHT]
            local_result += (len(ALPHABET)  - count) * [DEC]
            local_result += [START] + [LEFT]
            local_result += internal
            local_result += [RIGHT] + [DEC] + [STOP]
            local_result += [LEFT]
        else :
            local_result += [RIGHT]
            local_result += (count) * [INC]
            local_result += [START] + [LEFT]
            local_result += internal
            local_result += [RIGHT] + [DEC] + [STOP]
            local_result += [LEFT]

        if len(count * internal) <= len(local_result) :
            local_result = count * internal
        result += local_result
    return result


def COMPRESS_SEQ(SEQ) :
    res = []
    for op in SEQ :
        if   len(res) > 0 and op == LEFT and res[-1] == RIGHT :
            res = res[:-1]
        elif len(res) > 0 and op == RIGHT and res[-1] == LEFT :
            res = res[:-1]
        else :
            res += [op]
    if res[-1] == LEFT or res[-1] == RIGHT :
        res = res[:-1]

    return res

def TEXT2SEQ(text) :

    NUM = text2num(text)
    pattern_to_generate = search_pattern ( num2inc ([0] + NUM))
    pattern_to_generate = compress_pattern (pattern_to_generate,0)
    sys.stderr.write(str(pattern_to_generate))
    SEQ = PATTERN2SEQ(pattern_to_generate)
    return "".join(COMPRESS_SEQ(SEQ))

def EVALGREEDY (NUM) :
    res   = []
    state = [0] * ARRAY_SIZE
    pos   = 0
    for v in NUM :
        cost  = [0] * ARRAY_SIZE
        for new_pos in range (ARRAY_SIZE) :
            cost [new_pos] = abs(minimum_distance (new_pos,pos,ARRAY_SIZE)) + abs(minimum_distance(state[new_pos], v,len(ALPHABET)))

        position = minimum_distance(pos,np.argmin(cost),ARRAY_SIZE)


        pos = (pos + position + ARRAY_SIZE) % ARRAY_SIZE

        if position == 0 :
            pass
        elif position > 0 :
            res += [RIGHT] * abs(position)
        elif position < 0 :
            res += [LEFT] * abs(position)
        distance_now = minimum_distance(state[pos],v,len(ALPHABET))
        if distance_now > 0 :
            res += [INC] * abs(distance_now)
        else :
            res += [DEC] * abs(distance_now)
        state[pos] = v
        res += [SELECT]
    return res



def TEXT2SEQWINIT (text) :
    best = []
    NUM = text2num(text)
    for init in set(NUM) :
        INC_LIST =  num2inc ([init] + NUM)
        pattern_to_generate = search_pattern (  INC_LIST , debug = ("debug" in sys.argv))
        pattern_to_generate = compress_pattern (pattern_to_generate,init)
        SEQ = PATTERN2SEQ(pattern_to_generate)
        SEQ = COMPRESS_SEQ(SEQ)
        init_distance = minimum_distance(0,init,len(ALPHABET))
        if init_distance >= 0 :
            SEQ = abs(init_distance) * [INC] + SEQ
        else :
            SEQ = abs(init_distance) * [DEC] + SEQ

        if best == [] :
            best = SEQ
        #print "init = %d len(SEQ) = %d  SEQ = %s" % (init , len(SEQ), "".join(SEQ))
        #print "init = %d len(BEST) = %d" % (init , len(best))
        if len(best) > len(SEQ) :
            best = SEQ
        #print "init = %d len(BEST) = %d" % (init , len(best))

    SEQ = COMPRESS_SEQ(EVALGREEDY(NUM))
    if len(best) > len(SEQ) :
        best = SEQ
    return best



idLetter = {" " : 0,"A" : 1,"B" : 2,"C" : 3,"D" : 4,"E" : 5,"F" : 6,"G" : 7,"H" : 8,"I" : 9,"J" : 10,"K" : 11,"L" : 12,"M" : 13,"N" : 14,"O" : 15,"P" : 16,"Q" : 17,"R" : 18,"S" : 19,"T" : 20,"U" : 21,"V" : 22,"W" : 23,"X" : 24,"Y" : 25,"Z" : 26}

class Game:
    def __init__(self):
        self.input = TEXT
        self.existLetter = []
        for c in self.input:
            if(c not in self.existLetter):
                self.existLetter.append(c)
        self.runes = [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "]
        self.idInput = 0
        self.position = 0
        self.res = ""

    def __str__(self):
        tmp = ""
        tmp += "Input : " + self.input + "\n"
        tmp += "Runes : " + "-".join(self.runes) + "\n"
        tmp += "IdInput : " + str(self.idInput) + "\n"
        tmp += "Position : " + str(self.position) + "\n"
        tmp += "Res : " + self.res + "\n"
        return tmp

    def compute(self):
        #First Shoot
        allRes = []
        allResFirst = []
        for i in range(0,50):
            res = ""
            self.runes = [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "]
            self.idInput = 0
            self.position = 0
            while( self.idInput < len(self.input)):
                c = self.input[self.idInput]
                #SEARCH PATTERN
                pattern = self.getPattern()
                if(len(pattern) != len(self.input)) :
                    nb = 0
                    i = self.idInput+ len(pattern) +1
                    while (i < len(self.input)):
                        if(self.input[i] == pattern[(i-self.position)%len(pattern)]):
                            if((self.idInput-i)%len(pattern) == len(pattern)-1):
                                nb +=1
                        else:
                            break
                        i += 1
                    # PARAMETRE NB
                    if nb > random.randint(1, 10)  :
                        distanceRight = 0
                        for i in range(0,len(pattern)):
                            dist = pattern[i]
                            distanceRight += 27 -((idLetter[dist] - idLetter[self.runes[(self.position + i) % 30]]) % 27)
                        distanceLeft = 0
                        for i in range(0,len(pattern)):
                            dist = pattern[i]
                            distanceRight += ((idLetter[dist] - idLetter[self.runes[(self.position + i) % 30]]) % 27)
                        if(distanceRight < distanceLeft):
                            for i in range(0,len(pattern)):
                                res += self.prepare(pattern[i],self.position)
                                res +=".<"
                                self.idInput += 1
                                self.position += 1
                            if(nb > 26):
                                nb = 26
                            if( 27- nb > nb):
                                for j in range(0,nb):
                                    res += "+"
                            else:
                                for j in range(0,27 - nb):
                                    res += "-"
                            res +="["
                            if(len(pattern) >= 15):
                                for i in range(len(pattern),30):
                                    res +="<"
                            else:
                                for i in range(0,len(pattern)):
                                    res +=">"
                            for i in range(0,len(pattern)):
                                res +=".<"
                            res +="-]"
                            self.position %= 30
                            self.idInput += (nb)*len(pattern)
                            continue
                        else :
                            for i in range(0,len(pattern)):
                                res += self.prepare(pattern[i],self.position)
                                res +=".>"
                                self.idInput += 1
                                self.position += 1
                            if(nb > 26):
                                nb = 26
                            if( 27- nb > nb):
                                for j in range(0,nb):
                                    res += "+"
                            else:
                                for j in range(0,27 - nb):
                                    res += "-"
                            res +="["
                            if(len(pattern) >= 15):
                                for i in range(len(pattern),30):
                                    res +=">"
                            else:
                                for i in range(0,len(pattern)):
                                    res +="<"
                            for i in range(0,len(pattern)):
                                res +=".>"
                            res +="-]"
                            self.position %= 30
                            self.idInput += (nb)*len(pattern)
                            continue
                #SEARCH PATTERN INCREMENTALE
                inc = 0
                if (self.idInput+1 < len(self.input)):
                    inc = idLetter[self.input[self.idInput+1]] - idLetter[self.input[self.idInput]]

                if inc != 0 :
                    nb = 1
                    i = self.idInput+1
                    while (i+1 < len(self.input)):
                        if(idLetter[self.input[i+1]] == (idLetter[self.input[i]] + inc) % 27):
                            nb = nb+1
                        else:
                            break;
                        i += 1

                    if nb > random.randint(3, 10)  :

                        if( 27- (idLetter[c] - idLetter[self.runes[self.position]]) % 27 > (idLetter[c] - idLetter[self.runes[self.position]]) % 27):
                            for j in range(0,(idLetter[c] - idLetter[self.runes[self.position]]) % 27):
                                res += "+"
                        else:
                            for j in range(0,27 - (idLetter[c] - idLetter[self.runes[self.position]]) % 27):
                                res += "-"
                        self.runes[self.position] = c
                        res +=".>"
                        self.position += 1
                        self.idInput += 1
                        self.runes[self.position-1] = self.input[self.idInput + inc+2]
                        if(nb > 26):
                            nb = 26
                        if( 27- nb > 13):
                            for j in range(0,nb):
                                res += "+"
                        else:
                            for j in range(0,27 - nb):
                                res += "-"
                        res +="[<"
                        for i in range(0,abs(inc)):
                            if(inc < 0):
                                res +="-"
                            if(inc > 0):
                                res +="+"
                        res +=".>-]"

                        self.position  %= 30
                        self.runes[self.position] = " "
                        self.idInput += (nb)

                        continue
                #BASIC
                if(self.idInput < len(self.input)):
                    newPosition = self.getBestIndex(c)
                    res += self.prepare(c,newPosition)

                    #SEARCH PATTERN Repetitif
                    nb = 1
                    for j in range(self.idInput+1,len(self.input)):
                        if(self.input[j] != c):
                            break
                        nb += 1

                    if(nb > 27-nb + 6 ):
                        if(self.runes[(self.position+1) % 30] == " "):
                            res +=">"
                            if(nb > 26):
                                nb = 26
                            if( 27- nb > nb):
                                for j in range(0,nb):
                                    res += "+"
                            else:
                                for j in range(0,27 - nb):
                                    res += "-"
                            res +="[<.>-]"
                            self.position += 1
                            self.position %= 30
                            self.idInput += nb
                        elif(self.runes[(self.position-1) % 30] == " "):
                            res +="<"
                            if(nb > 26):
                                nb = 26
                            if( 27- nb > nb):
                                for j in range(0,nb):
                                    res += "+"
                            else:
                                for j in range(0,27 - nb):
                                    res += "-"
                            res +="[>.<-]"
                            self.position -= 1
                            self.position %= 30
                            self.idInput += nb
                        else:
                            res+= "."
                            self.idInput += 1
                    else:
                        res+= "."
                        self.idInput += 1

            allResFirst.append(res)

        #Second Shoot
        for res in allResFirst:
            allRes.append(res)
            pos = 0
            newRes = ""
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
                            i = 0
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
                                if nb > 1 : # and nb*len(listPattern) > 20:
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
                                        newRes +="<"

                                    if(nb > 26):
                                        nb = 26
                                    if( 27- (nb-1) > (nb-1)):
                                        for j in range(0,nb-1):
                                            newRes += "+"
                                    else:
                                        for j in range(0,27 - (nb-1)):
                                            newRes += "-"
                                    newRes +="["
                                    for i in range(0,maxcount+1):
                                        newRes +=">"
                                    for i in range(0,len(listPattern)):
                                        newRes += listPattern[i]
                                    for i in range(0,maxcount+1):
                                        newRes +="<"
                                    newRes +="-]"
                                    for i in range(0,maxcount+1):
                                        newRes +=">"
                                    pos += (nb-1)*len(listPattern)
                                else:
                                    newRes += res[pos]
                                    pos += 1
                            else:
                                newRes += res[pos]
                                pos += 1
                        else:
                            newRes += res[pos]
                            pos += 1
                    else:
                        newRes += res[pos]
                        pos += 1
                else:
                    newRes += res[pos]
                    pos += 1
          #allRes.append(newRes)
        # Search Opti
        min = 4000
        for r in allRes:
            if len(r) < min :
                min = len(r)
                self.res = r

    def prepare(self,char,position):
        res = ""
        if( ((self.position - position) % 30) < 30 -((self.position - position) % 30)):
            for i in range(0,((self.position - position) % 30) ):
                res+= "<"
        else:
            for i in range(0,30 -((self.position - position) % 30)):
                res+= ">"
        self.position = position % 30

        if( ((idLetter[char] - idLetter[self.runes[self.position]]) % 27) < 27 -((idLetter[char] - idLetter[self.runes[self.position]]) % 27)):
            for i in range(0,((idLetter[char] - idLetter[self.runes[self.position]]) % 27) ):
                res+= "+"
        else:
            for i in range(0,27 -((idLetter[char] - idLetter[self.runes[self.position]]) % 27)):
                res+= "-"
        self.runes[self.position] = char
        return res

    def countChar(self,inputChar):
        nb = 0
        for i in range(self.position+1,len(self.input)):
            if(self.input[i] == inputChar):
                nb += 1
        return nb

    def getBestIndex(self,inputChar):
        idMin = 0
        minValue = min( ((self.position - idMin) % 30), 30 -((self.position - idMin) % 30))
        minValue += min( ((idLetter[inputChar] - idLetter[self.runes[idMin]]) % 27), 27 -((idLetter[inputChar] - idLetter[self.runes[idMin]]) % 27))
        for i in range(0,len(self.runes)):
            distance = min( ((self.position - i) % 30), 30 -((self.position - i) % 30))
            distance += min( ((idLetter[inputChar] - idLetter[self.runes[i]]) % 27), 27 -((idLetter[inputChar] - idLetter[self.runes[i]]) % 27))
            idLetter[inputChar] - idLetter[self.runes[i]]
            if minValue > distance:
                minValue = distance
                idMin = i
            elif minValue == distance:
                if (random.randint(0, 1) == 1):
                    minValue = distance
                    idMin = i
        return idMin

    def getPattern(self):
        pattern = list()
        pattern.append(self.input[self.idInput])

        i = self.idInput + 1
        while (i < len(self.input)):
            if(self.input[i] != self.input[self.idInput]):
                pattern.append(self.input[i])
            else:
                if(len(pattern) > 1 and i+1 < len(self.input)):
                    if(self.input[i+1] != self.input[self.idInput+1]):
                        pattern.append(self.input[i])
                    else:
                        break
            i += 1
        return pattern

if __name__ == '__main__':
    game = Game()
    game.compute()
    RES = TEXT2SEQWINIT(TEXT)
    if( len(game.res) > len(RES)):
        print "".join(RES)
    else:
        print game.res
    print >> sys.stderr, "Lenght : " , len(game.res)