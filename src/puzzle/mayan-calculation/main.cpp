#include <iostream>
#include <string>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

typedef std::vector<std::string> Num;

std::vector<Num> nums;
int L;
int H;

int maya2int(Num n)
{
    int res = 0;
    for(int x =0; x < n.size();x+=L)
    {
        for(int i =0; i < 20 ;i++)
        {
            bool seek = true;
            for(int l = 0 ; l < L;l++)
            {
                if(nums[i][l] != n[x+l])
                {
                    seek = false;
                    break;
                }
            }
            if(seek)
            {
                res += i * pow(20,(n.size()/L)-(x/L)-1);
                break;
            }
        }
    }
    return res;
}

Num int2Maya(long i)
{
    Num n;
    if(i == 0) return nums[0];
    int lastOrder =-1;
    while(i>=0)
    {
        int order = log(i) / log(20);
        int index = (i/pow(20,order));
        if(i == 0){
            index = 0;
            order = 0;
        }
        if(lastOrder != -1 && order+1 != lastOrder){
            n.insert(n.end(),nums[0].begin(),nums[0].end());
        }
        cerr << "Debug : i : "<< i << endl;
        cerr << "Debug : order : "<< order << endl;
        cerr << "Debug : index : "<< index << endl;
        n.insert(n.end(),nums[index].begin(),nums[index].end());
        if(order == 0)
            i = -1;
        else
            i = i - (index * pow(20,order));
        lastOrder = order;
    }
    return n;
}
void displayMaya(Num n)
{
    for(auto l : n)
        cout << l << endl;
}
int main()
{
    cin >> L >> H; cin.ignore();
    cerr << L << " " << H << std::endl;
    for (int i = 0; i < H; i++) {
        string numeral;
        cin >> numeral; cin.ignore();
        for(int j = 0; j < 20;j++)
        {
      //      cerr<< "Debug : " << j <<" " << numeral.substr(j*L,L)<< endl;
            if(nums.size() == j)
                nums.push_back(Num());
            nums[j].push_back(numeral.substr(j*L,L));
        }
    }

    int S1;
    cin >> S1; cin.ignore();
    Num num1;
    for (int i = 0; i < S1; i++) {
        string num1Line;
        cin >> num1Line; cin.ignore();
        num1.push_back(num1Line);
    //    cerr<< "Debug : " << "n1 " << num1Line<< endl;
    }

    int S2;
    cin >> S2; cin.ignore();

    Num num2;
    for (int i = 0; i < S2; i++) {
        string num2Line;
        cin >> num2Line; cin.ignore();
     //   cerr << "Debug : " << "n2 " << num2Line<< endl;
        num2.push_back(num2Line);
    }
    string operation;
    cin >> operation; cin.ignore();
   // cerr << "Debug : " << "operation " << operation<< endl;

    long numI1 = maya2int(num1);
    long numI2 = maya2int(num2);
    long res =0;


    if (operation == "+")res = numI1+numI2;
    if (operation == "-")res = numI1-numI2;
    if (operation == "*")res = numI1*numI2;
    if (operation == "/")res = numI1/numI2;

    cerr << "Debug :"<< numI1 << " " << operation << " " << numI2 <<" = " << res << endl;

    displayMaya(int2Maya(res));
}