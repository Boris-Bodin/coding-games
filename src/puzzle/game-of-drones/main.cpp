#include <iostream>
#include <string>
#include <cmath>
#include <map>
#include <vector>
#include <cstdlib>
#include <ctime>

using namespace std;

static const int AREA_RADIUS = 100;

typedef struct Point_ {
    int x = 0;
    int y = 0;
} Point;

typedef struct Zone_ {
    Point center; // center of this zone  (circle radius = 100 units)
    int ownerId = -1; // ID of the team which owns this zone, -1 otherwise
} Zone;

typedef struct Drone_ {
    Point pos; // position of the drone
    Zone* aim; // position of the drone
} Drone;


typedef struct Team_ {
    vector<Drone*> drones; // drones of the team
} Team;


int distance(Point p1, Point p2)
{
    int x = abs(p1.x-p2.x);
    int y = abs(p1.y-p2.y);
    return sqrt(x*x+y*y);
}


typedef struct Game_ {
    vector<Zone*> zones; // all game zones
    vector<Team*> teams; // all the team of drones. Array index = team's ID
    int myTeamId; // index of my team in the array of teams

    // read initial games data (one time at the beginning of the game: P I D Z...)
    void init() {
        int p, i, d, z;
        cin >> p >> i >> d >> z;

        myTeamId = i;
        for(int areaId = 0; areaId < z; areaId++) {
            int x, y;
            Zone *z = new Zone();
            cin >> z->center.x >> z->center.y;
            zones.push_back(z);
        }

        for(int teamId = 0; teamId < p; teamId++) {
            Team *t = new Team();
            teams.push_back(t);
            for(int droneId = 0; droneId < d; droneId++) {
                Drone *drone = new Drone();
                t->drones.push_back(drone);
            }
        }
    }

    // Run the main loop (parse inputs and play)
    void run() {
        while (true) {
            for(Zone *zone : zones) {
                cin >> zone->ownerId; // update zones owner
            }

            for(Team *team : teams) {
                for(Drone * drone : team->drones) {
                    cin >> drone->pos.x >> drone->pos.y; // update drones position
                }
            }
            play();
        }
    }

    Zone* nearZoneAt(Point p,int index)
    {
        std::map<int,Zone*> zonesSorted;
        for(Zone *zone : zones)
        {
            int dist = distance(p,zone->center);
            zonesSorted.insert(std::make_pair(dist,zone));
        }
        std::map<int,Zone*>::iterator it= zonesSorted.begin();
        for(int i = 0; i < index ;i++,it++);

        return it->second;
    }

    Zone* nearZoneConflitAt(Point pos)
    {
        Zone* zone;
        int id = 0;
        try{
            do{
                if(id > zones.size())
                {
                    zone = 0;
                    break;
                }
                zone = nearZoneAt(pos,id);
                id++;
            }while(zone && zone->ownerId == myTeamId);
        } catch(std::exception& e){
            zone = 0;
            return 0;
        }
        return zone;
    }

    int calcRatioDroneFor(Zone* zone)
    {
        int tmp = 0;
        for(Team *team : teams) {
            for(Drone * drone : team->drones) {
                if(drone->aim == zone)
                {
                    if(team == teams[myTeamId])
                        tmp++;
                    else
                        tmp--;
                }
            }
        }
        return tmp;
    }

    int nbDroneAimZoneBy(Zone* zone, int teamId)
    {
        if(teamId >= teams.size())
            return 0;
        int count = 0;
        vector<Drone*> myDrones = teams[teamId]->drones;
        for(Drone *drone : myDrones)
        {
            if(drone->aim && drone->aim == zone)
                count++;
            else if (!drone->aim)
            {
                if(drone->pos.x == zone->center.x && drone->pos.y == zone->center.y)
                    count++;
            }
        }
        return count;
    }

    int nbDroneAimZoneByOther(Zone* zone, int teamId)
    {
        return nbDroneAimZoneBy(zone,0) + nbDroneAimZoneBy(zone,1) + nbDroneAimZoneBy(zone,2) + nbDroneAimZoneBy(zone,3) - nbDroneAimZoneBy(zone,teamId);
    }

    void play() {
        vector<Drone*> myDrones = teams[myTeamId]->drones;
        for(Drone *drone : myDrones) {
            if(!drone->aim || drone->aim->ownerId == myTeamId)
            {
                if(!drone->aim || nbDroneAimZoneBy(drone->aim,myTeamId) > nbDroneAimZoneByOther(drone->aim,myTeamId))
                {
                    Zone* zone = nearZoneConflitAt(drone->pos);
                    if(!zone)
                    {
                        if(drone->aim)
                            zone = drone->aim;
                        else
                            zone = nearZoneAt(drone->pos,0);
                    }
                    drone->aim = zone;
                }
            }
            else
            {
                Zone* zone = nearZoneConflitAt(drone->pos);
                if(zone && zone != drone->aim)
                {
                    int tmp = calcRatioDroneFor(zone);
                    if(tmp < 0)
                        drone->aim = zone;
                }
            }
            cout << drone->aim->center.x << " " << drone->aim->center.y << endl;
        }
    }
} Game;


int main()
{
    Game g;
    g.init();
    g.run();

    return 0;
}