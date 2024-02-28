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
    string expression;
    cin >> expression; cin.ignore();


    vector<int>* opened = new vector<int>();

    for(int i = 0; i < expression.length();i++){
        if(expression[i] == '('){
            opened->push_back(0);
            continue;
        }
        if(expression[i] == '['){
            opened->push_back(1);
            continue;
        }
        if(expression[i] == '{'){
            opened->push_back(2);
            continue;
        }
        if(expression[i] == ')'){
            if(opened->size() == 0 || opened->back() != 0){
                cout << "false" << endl;
                return 0;
            }
            opened->pop_back();
            continue;

        }
        if(expression[i] == ']'){
            if(opened->size() == 0 || opened->back() != 1){
                cout << "false" << endl;
                return 0;
            }
            opened->pop_back();
            continue;
        }
        if(expression[i] == '}'){
            if(opened->size() == 0 || opened->back() != 2){
                cout << "false" << endl;
                return 0;
            }
            opened->pop_back();
            continue;
        }
    }
    if(opened->size() > 0)
        cout << "false" << endl;
    else
        cout << "true" << endl;
}