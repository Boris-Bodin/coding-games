import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

n = int(raw_input())
vs = raw_input()

list = vs.split(" ")

max = 0
tmp = int(list[0])
for i in range(0,len(list)):
    if( int(list[i]) - tmp < max):
        max = int(list[i]) - tmp
    if (int(list[i]) > tmp):
        tmp = int(list[i])
    print >> sys.stderr, list[i]

print max