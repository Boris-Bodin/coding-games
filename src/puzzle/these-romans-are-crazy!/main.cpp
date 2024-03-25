#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

int arab[13]={1000,900,500,400,100,90,50,40,10,9,5,4,1};
char *roman[13]={"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};


int val(char c)
{
    if(c == 'I') return 1;
    if(c == 'V') return 5;
    if(c == 'X') return 10;
    if(c == 'L') return 50;
    if(c == 'C') return 100;
    if(c == 'D') return 500;
    if(c == 'M') return 1000;
    return 0;
}
int decode(std::string str)
{
    int i=0,k = 0;
    for (int j=0;j<(str.size()-1);j++)
    {
        if(val(str[j]) >= val(str[j+1]))
        {
            k+=val(str[j])-i;
            i=0;
        }
        else
            i+=val(str[j]);
    }
    k+=val(str[str.size()-1])-i;
    return k;
}

std::string encode(int val)
{
    std::string res = "";
    int i=0;
    while(val!=0) {
        while(val>=arab[i]){
            val=val-arab[i];
            res += roman[i];
        }
        i++;
    }
    return res;
}

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
int main()
{
    std::string rom1;
    std::cin >> rom1; std::cin.ignore();
    std::string rom2;
    std::cin >> rom2; std::cin.ignore();
    int a = decode(rom1);
    int b = decode(rom2);
    std::cerr << rom1 << " " << a << std::endl;
    std::cerr << rom2 << " " << b << std::endl;
    std::cerr << a+b << std::endl;
    std::cout << encode(a+b) << std::endl;
}