#include<iostream>
main(){int x,y,X,Y;std::cin>>x>>y>>X>>Y;for(;;){std::cout<<(y>Y++?"S":y<(--Y)?"N":"")<<(x>X++?"E":x<(--X)?"W":"")<<"\n";}}