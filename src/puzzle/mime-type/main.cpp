#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <algorithm>

using namespace std;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
int main()
{

    map<string,string> typeMime;

    int N; // Number of elements which make up the association table.
    cin >> N; cin.ignore();
    int Q; // Number Q of file names to be analyzed.
    cin >> Q; cin.ignore();
    for (int i = 0; i < N; i++) {
        string EXT; // file extension
        string MT; // MIME type.
        cin >> EXT >> MT; cin.ignore();
        transform(EXT.begin(), EXT.end(), EXT.begin(), ::tolower);
        typeMime.insert(make_pair(EXT,MT));
     //   cerr << "EXT :"<< EXT << endl;
    }
    for (int i = 0; i < Q; i++) {
        string FNAME; // One file name per line.
        getline(cin, FNAME);
    //    cerr << "FNAME :" << FNAME << endl;
        try{
            if(FNAME.find_last_of('.') == string::npos)
                throw 0;
            string data = FNAME.substr(FNAME.find_last_of('.')+1);
            transform(data.begin(), data.end(), data.begin(), ::tolower);
            cout << typeMime.at( data) << endl;
        }catch(...){
            cout << "UNKNOWN" << endl;
        }

    }

    // Write an action using cout. DON'T FORGET THE "<< endl"
    // To debug: cerr << "Debug messages..." << endl;
     // For each of the Q filenames, display on a line the corresponding MIME type. If there is no corresponding type, then display UNKNOWN.
}