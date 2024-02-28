#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
int main()
{
    int LX; // the X position of the light of power
    int LY; // the Y position of the light of power
    int TX; // Thor's starting X position
    int TY; // Thor's starting Y position
    cin >> LX >> LY >> TX >> TY; cin.ignore();

    // game loop
    while (1) {
        int E; // The level of Thor's remaining energy, representing the number of moves he can still make.
        cin >> E; cin.ignore();

        if(LX > TX)
        {
            if(LY < TY)
            {
                cout << "NE" << endl;
                TY--;
                TX++;
            }
            else if(LY > TY)
            {
                cout << "SE" << endl;
                TY++;
                TX++;
            }
            else
            {
                cout << "E" << endl;
                TX++;
            }
        }
        else if(LX < TX)
        {
            if(LY < TY)
            {
                cout << "NW" << endl;
                TY--;
                TX--;
            }
            if(LY > TY)
            {
                cout << "SW" << endl;
                TY++;
                TX--;
            }
            else
            {
                cout << "W" << endl;
                TX--;
            }
        }
        else
        {
            if(LY < TY)
            {
                cout << "N" << endl;
                TY--;
            }
            else
            {
                cout << "S" << endl;
                TY++;
            }
        }

    }
}