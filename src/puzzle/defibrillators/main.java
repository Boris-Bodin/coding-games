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
        String LON = in.next();
        in.nextLine();
        String LAT = in.next();
        in.nextLine();
        int N = in.nextInt();
        in.nextLine();

        String answer = "nothing";
        double lonA = Double.parseDouble(LON.replace(',','.'));
        double latA = Double.parseDouble(LAT.replace(',','.'));
        double min = 999999999;
        double x = 0;
        double y = 0;

        for (int i = 0; i < N; i++) {
            String DEFIB = in.nextLine();
            String defiblist[]  = DEFIB.split(";");
            double latB = Double.parseDouble(defiblist[5].replace(',','.'));
            double lonB = Double.parseDouble(defiblist[4].replace(',','.'));
            x = (lonB - lonA) * Math.cos( (latA + latB) /2);
            y = latB - latA;
            double distance = Math.sqrt(x*x + y*y) * 6371;
        System.err.println(distance);
            if (min > distance)
            {
                min = distance;
                answer = defiblist[1];
            }
        }

        // Write an action using System.out.println()
        // To debug: System.err.println("Debug messages...");

        System.out.println(answer);
    }
}