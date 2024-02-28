#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <map>

using namespace std;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

int main()
{
    int N; // the total number of nodes in the level, including the gateways
    int L; // the number of links
    int E; // the number of exit gateways

    vector<int> gateways;
    multimap<int,int> links;

    cin >> N >> L >> E; cin.ignore();
    for (int i = 0; i < L; i++) {
        int N1; // N1 and N2 defines a link between these nodes
        int N2;
        cin >> N1 >> N2; cin.ignore();
        links.insert(make_pair(N1,N2));
    }
    for (int i = 0; i < E; i++) {
        int EI; // the index of a gateway node
        cin >> EI; cin.ignore();
        gateways.push_back(EI);
    }

    // game loop
    while (1) {
        int SI; // The index of the node on which the Skynet agent is positioned this turn
        cin >> SI; cin.ignore();

        bool erase = false;
        for(int node : gateways){
            for( multimap<int,int>::iterator it = links.begin(); it != links.end() ;it++){
                if((it->first == SI && it->second == node) || (it->first == node && it->second == SI)){
                    cout << it->first << " " << it->second << endl;
                    links.erase(it);
                    erase = true;
                    break;
                }
            }
            if(erase)
                break;
        }

        if(erase)
            continue;

        for(int node : gateways){
            for( multimap<int,int>::iterator it = links.begin(); it != links.end() ;it++){
                if(it->first == node || it->second == node){
                    cout << it->first << " " << it->second << endl;
                    links.erase(it);
                    erase = true;
                    break;
                }
            }
            if(erase)
                break;
        }

    }
}