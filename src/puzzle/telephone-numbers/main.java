import java.util.*;
import java.io.*;
import java.math.*;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

class Solution {



    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        int N = in.nextInt();

        Node carnets = new Node();

        for (int i = 0; i < N; i++) {
            String telephone = in.next();
            carnets.AddNumber(telephone);
        }

        System.out.println(carnets.CountNode() - 1);
    }
}

 class Node{
    Map<String,Node> children = new HashMap();


    void AddNumber(String number){
        Node node = children.get(number.substring(0,1));
        if(node ==null){
            node = new Node();
            children.put(number.substring(0,1),node);
        }
        if(number.length() > 1)
            node.AddNumber(number.substring(1));
    }

    int CountNode(){
        int res = 1;
        for(Node child:children.values()){
            res += child.CountNode();
        }
        return res;
    }
}