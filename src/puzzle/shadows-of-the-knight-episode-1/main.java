import java.util.*;
import java.io.*;
import java.math.*;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
class Player {

    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        int W = in.nextInt(); // width of the building.
        int H = in.nextInt(); // height of the building.
        int N = in.nextInt(); // maximum number of turns before game over.
        int X0 = in.nextInt();
        int Y0 = in.nextInt();


        int Ymin = 0;
        int Ymax = H;
        int Xmin = 0;
        int Xmax = W;

        // game loop
        while (true) {
            String BOMB_DIR = in.next(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)

            // Write an action using System.out.println()
            // To debug: System.err.println("Debug messages...");

            switch(BOMB_DIR)
            {
                case "U":
                    Ymin = Ymin;
                    Ymax = Y0;
                    Xmin = X0;
                    Xmax = X0;
                    break;
                case "UR":
                    Ymin = Ymin;
                    Ymax = Y0;
                    Xmin = X0;
                    Xmax = Xmax;
                    break;
                case "R":
                    Ymin = Y0;
                    Ymax = Y0;
                    Xmin = X0;
                    Xmax = Xmax;
                    break;
                case "DR":
                    Ymin = Y0;
                    Ymax = Ymax;
                    Xmin = X0;
                    Xmax = Xmax;
                    break;
                case "D":
                    Ymin = Y0;
                    Ymax = Ymax;
                    Xmin = X0;
                    Xmax = X0;
                    break;
                case "DL":
                    Ymin = Y0;
                    Ymax = Ymax;
                    Xmin = Xmin;
                    Xmax = X0;
                    break;
                case "L":
                    Ymin = Y0;
                    Ymax = Y0;
                    Xmin = Xmin;
                    Xmax = X0;
                    break;
                case "UL":
                    Ymin = Ymin;
                    Ymax = Y0;
                    Xmin = Xmin;
                    Xmax = X0;
                    break;
            }
            X0 = Xmin + ((Xmax - Xmin) / 2);
            Y0 = Ymin + ((Ymax - Ymin) / 2);
            System.out.println(X0 + " " + Y0);
        }
    }
}