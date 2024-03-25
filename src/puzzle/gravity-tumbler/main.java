import java.util.*;
import java.io.*;
import java.math.*;

class Solution {

    static int width;
    static int height;
    static char[][] map;

    public static void DebugMap(){
        for (int i = 0; i < height; i++) {
            String raster = "";
            for (int j = 0; j < width; j++) {
                raster += map[i][j];
            }
            System.err.println(raster);
        }
    }

    public static void PrintMap(){
        for (int i = 0; i < height; i++) {
            String raster = "";
            for (int j = 0; j < width; j++) {
                raster += map[i][j];
            }
            System.out.println(raster);
        }
    }


    public static char[][]  RollMap(){
        char[][] mapTmp = new char[width][];
        for (int i = 0; i < width; i++) {
            mapTmp[i] = new char[height];
            for (int j = 0; j < height; j++) {
                mapTmp[i][j] = map[j][width-i-1];
            }
        }

        int heightTmp = height;
        height = width;
        width = heightTmp;

        for (int j = 0; j < width; j++) {
            int number = 0;
            for (int i = 0; i < height; i++) {
                if(mapTmp[i][j] == '#')
                    number++;
            }
            int i = 0;
            for (i = 0; i < height-number; i++) {
                mapTmp[i][j] = '.';
            }
            for (; i < height; i++) {
                mapTmp[i][j] = '#';
            }
        }


        return mapTmp;
    }

    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);

        width = in.nextInt();
        height = in.nextInt();

        int count = in.nextInt();
        if (in.hasNextLine()) {
            in.nextLine();
        }

        map = new char[height][];
        for (int i = 0; i < height; i++) {
            map[i] = new char[width];
            String raster = in.nextLine();

            for (int j = 0; j < width; j++) {
                map[i][j] = raster.charAt(j);
            }
        }

       // DebugMap();

        for (int i = 0; i < count; i++) {
            map = RollMap();
        }

        PrintMap();
    }
}