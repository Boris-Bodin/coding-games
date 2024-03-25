using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
class Solution
{
    static string conway(string R){
        string res = "";
        var cs =R.Split(' ');
        for(var i = 0; i < cs.Length  ;i++){
            var c = cs[i];
            var count = 1;
            while((i+1) < cs.Length && c == cs[i+1]){
                count++;
                i++;
            }
            res += count.ToString()+ " " + c + " ";
        }
        return res.Substring(0,res.Length-1);
    }

    static void Main(string[] args)
    {
        string R = Console.ReadLine();
        int L = int.Parse(Console.ReadLine());

        for(int i = 1 ;i < L;i++) {
            Console.Error.WriteLine(R);
            R = conway(R);
        }

        Console.WriteLine(R);
    }
}