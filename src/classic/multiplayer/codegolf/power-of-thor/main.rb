STDOUT.sync=true
x,y,X,Y=gets.split.map(&:to_i)
loop{Y,v=(Y<y)?[Y+1,'S']:(Y>y)?[Y-1,'N']:[Y,'']
X,h=(X<x)?[X+1,'E']:(X>x)?[X-1,'W']:[X,'']
puts v+h}