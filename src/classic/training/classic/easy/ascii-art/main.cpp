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
    int L;
    cin >> L; cin.ignore();
    int H;
    cin >> H; cin.ignore();
    string T;
    getline(cin, T);
    string** alpha= new string*[27];
    for (int i = 0; i < 27; i++) {
        alpha[i]= new string[H];
    }
    for (int i = 0; i < H; i++) {
        string ROW;
        getline(cin, ROW);
        for (int y = 0; y < 27; y++) {
            alpha[y][i]= ROW.substr(y*L,L);
        }
    }
    for (int y = 0; y < H; y++) {
        string line = "";
        for (int i = 0; i < T.length(); i++) {
            int index = (int)T[i];
            if(index >= 'A' && index <= 'Z') index -= (int)'A';
            else if(index >= 'a' && index <= 'z') index -= (int)'a';
            else index = 26;

            line += alpha[index][y];
        }
        cout << line << endl;
    }
}