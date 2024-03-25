#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <sstream>

using namespace std;


int river(int a){
    stringstream ss;
    ss << a;
    string str = ss.str();
    long long out = a;

    cerr << out << ' ' << str << endl;
    for(int i = 0; i < str.length();i++){
        string tmp = str.substr(i,1);
        out += atoi(tmp.c_str());
    }

    return out ;
}

int main()
{
    long long r1;
    cin >> r1; cin.ignore();
    long long r2;
    cin >> r2; cin.ignore();

    while(r1 != r2){
        if(r1 > r2){
            r2 = river(r2);
        }
        else{
            r1 = river(r1);
        }
    }

    cout << r1 << endl;
}