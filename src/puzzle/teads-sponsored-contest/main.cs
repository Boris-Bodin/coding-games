using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;




class Solution
{
    static void Main(string[] args)
    {


        int n = int.Parse(Console.ReadLine()); // the number of adjacency relations

        Dictionary<int,List<int>> graph= new Dictionary<int,List<int>>();

        for (int i = 0; i < n; i++)
        {
            string[] inputs = Console.ReadLine().Split(' ');
            int xi = int.Parse(inputs[0]); // the ID of a person which is adjacent to yi
            int yi = int.Parse(inputs[1]); // the ID of a person which is adjacent to xi

            if(!graph.ContainsKey(xi))
            {
                graph[xi] =  new List<int>();
            }
            graph[xi].Add(yi);
        }

        IEnumerable<int> list = graph.Select((item) => item.Value.Count);


        Console.WriteLine(list.Max());
    }
}