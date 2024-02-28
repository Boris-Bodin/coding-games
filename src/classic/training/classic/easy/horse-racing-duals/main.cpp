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
    vector<int> puissances;
    int N;
    cin >> N; cin.ignore();
    for (int i = 0; i < N; i++) {
        int Pi;
        cin >> Pi; cin.ignore();
        puissances.push_back(Pi);
    }

    sort(puissances.begin(), puissances.end());

    int min = 99999;
    for (vector<int>::iterator it = puissances.begin(); it !=  puissances.end();it++) {
        if(min > abs(*it - *(it+1)))
        {
            min = abs(*it - *(it+1));
        }
    }

    // Write an action using cout. DON'T FORGET THE "<< endl"
    // To debug: cerr << "Debug messages..." << endl;

    cout << min << endl;
}