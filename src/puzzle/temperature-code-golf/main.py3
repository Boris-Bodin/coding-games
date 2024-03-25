r=input
print(0if r()=='0'else sorted(map(int,r().split()),key=lambda x:(x*(x-.1)))[0])