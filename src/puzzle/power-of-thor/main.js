[x,y,X,Y]=readline().split(' ')
for(;;)print((y>Y++?"S":y<--Y?"N":"")+(x>X++?"E":x<--X?"W":""))