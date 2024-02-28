#include <iostream>
#include <string>
#include <cmath>
#include <map>
#include <vector>
#include <cstdlib>
#include <ctime>

#define FREE 255

#define MAP_HEIGHT 20
#define MAP_WIDTH 35
#define FOR_PLAYERS for (int i = 1; i <= opponentCount; i++)
#define FOR_MAPX for (int j = 0; j < MAP_WIDTH; j++)
#define FOR_MAPY for (int i = 0; i < MAP_HEIGHT; i++)


typedef unsigned char uchar;

typedef struct Point_ {
    int x = 0;
    int y = 0;
} Point;

typedef struct Map_ {
    uchar** data;
} Map;

typedef struct Player_ {
    Point pos;
    int back;
} Player;


int distance(Point p1, Point p2)
{
    int x = abs(p1.x-p2.x);
    int y = abs(p1.y-p2.y);
    return sqrt(x*x+y*y);
}


typedef struct Game_ {
    Map map;
    Player* players;
    int gameRound;
    int opponentCount;

    bool inWork;
    int step;
    int x1;
    int y1;
    int x2;
    int y2;

    void init() {
        std::cin >> opponentCount; std::cin.ignore();
        inWork = false;
        players = new Player[opponentCount];
        map.data = new uchar*[MAP_HEIGHT];
        FOR_MAPY {
            map.data[i] = new uchar[MAP_WIDTH];
        }
    }

    Point createPoint(int x, int y)
    {
        Point p;
        p.x = x;
        p.y = y;
        return p;
    }

    Point searchNearFreePoint(Point p)
    {
        int i = 0;
        while(true)
        {
            int j = 0;
            while(j <= i+1)
            {
                if(!(i == 0 && j == 0))
                {
                    if (p.y+i < MAP_HEIGHT && p.x+j < MAP_WIDTH && map.data[p.y+i][p.x+j] == FREE)
                        return createPoint(p.x+j,p.y+i);
                    if (p.y-i >= 0 && p.x-j >= 0 && map.data[p.y-i][p.x-j] == FREE)
                        return createPoint(p.x-j,p.y-i);
                    if (p.y+i < MAP_HEIGHT && p.x-j >= 0 && map.data[p.y+i][p.x-j] == FREE)
                        return createPoint(p.x-j,p.y+i);
                    if (p.y-i >= 0 && p.x+j < MAP_WIDTH && map.data[p.y-i][p.x+j] == FREE)
                        return createPoint(p.x+j,p.y-i);
                }
                j++;
            }
            i++;
        }
    }

    void run() {
        while (true) {
            std::cin >> gameRound;// std::cin.ignore();
            std::cin >> players[0].pos.x >> players[0].pos.y >> players[0].back; //std::cin.ignore();
            FOR_PLAYERS {
                std::cin >> players[i].pos.x >> players[i].pos.y >> players[i].back; //std::cin.ignore();
            }
            FOR_MAPY {
                std::string line; // One line of the map ('.' = free, '0' = you, otherwise the id of the opponent)
                std::cin >> line; //std::cin.ignore();
                FOR_MAPX {
                    if(line[j] == '.')
                        map.data[i][j] = FREE;
                    else
                        map.data[i][j] = line[j] - '0';
                }
            }
            play();
        }
    }

    void printPoint(Point p)
    {
        std::cout << p.x << " " << p.y << std::endl;
    }

    void printPoint(int x, int y)
    {
        std::cout << x << " " << y << std::endl;
    }

    void play() {

        int x = players[0].pos.x;
        int y = players[0].pos.y;
        if(x==x1 && y == y1)
            inWork = false;
        if(!inWork)
        {
            int minX = MAP_WIDTH;
            int minY = MAP_HEIGHT;
            FOR_PLAYERS{
                int diffX = std::abs(players[0].pos.x - players[i].pos.x);
                int diffY = std::abs(players[0].pos.y - players[i].pos.y);
                minX = (minX > diffX) ? diffX:minY;
                minY = (minY > diffY) ? diffY:minX;
            }
            if(minX > 5 && minY > 5)
            {
                int offsetX = minX/2;
                int offsetY = minY/2;
                x1 = players[0].pos.x;
                y1 = players[0].pos.y;
                x2 = (x1 + offsetX >= MAP_WIDTH) ? x1 - offsetX : x1 + offsetX;
                y2 = (y1 + offsetY >= MAP_HEIGHT) ? y1 - offsetY : y1 + offsetY;


                inWork = true;
                step = 1;
            }
        }
        if(inWork)
        {
            if(x==x2 && y == y2)
                step = 2;
            if(step == 1)
                printPoint(x2,y2);
            if(step == 2)
                printPoint(x1,y1);
        }
        else
            printPoint(searchNearFreePoint(players[0].pos));
    }
} Game;


int main()
{
    Game g;
    g.init();
    g.run();

    return 0;
}