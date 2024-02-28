import java.util.*;
import java.io.*;
import java.math.*;

class Position{
    int x;
    int y;

    Position(int x, int y){
        this.x = x;
        this.y = y;
    }

    @Override
    public int hashCode(){
        return ("[" + x + "," + y + "]").hashCode();
    }

    @Override
    public boolean equals(Object p){
        return x == ((Position)p).x && y == ((Position)p).y;
    }
    @Override

    public String toString() {
        return ""+x+" "+y;
    }
}

class Tiles{
    Position pos;
    String type;

    Tiles(Position pos, String type){
        this.pos = pos;
        this.type = type;
    }

    Position GetNextTiles(String dir){
        switch(type){
            case "1":
                return new Position(pos.x,pos.y+1);
            case "2":
                return new Position(dir.equals("LEFT") ? pos.x+1:pos.x-1,pos.y);
            case "3":
                return new Position(pos.x,pos.y+1);
            case "4":
                return new Position(pos.x - (dir.equals("TOP") ? 1:0),pos.y +( dir.equals("RIGHT") ? 1:0));
            case "5":
                return new Position(pos.x + (dir.equals("TOP") ? 1:0),pos.y + (dir.equals("LEFT") ? 1:0));
            case "6":
                return new Position(dir.equals("LEFT") ? pos.x+1:pos.x-1,pos.y);
            case "7":
                return new Position(pos.x,pos.y+1);
            case "8":
                return new Position(pos.x,pos.y+1);
            case "9":
                return new Position(pos.x,pos.y+1);
            case "10":
                return new Position(pos.x-1,pos.y);
            case "11":
                return new Position(pos.x+1,pos.y);
            case "12":
                return new Position(pos.x,pos.y+1);
            case "13":
                return new Position(pos.x,pos.y+1);
        }

        return new Position(pos.x,pos.y);
    }

    @Override
    public int hashCode(){
        return (pos.toString() + type).hashCode();
    }

    @Override
    public boolean equals(Object t){
        return pos.equals(((Tiles)t).pos) && type == ((Tiles)t).type;
    }
    @Override

    public String toString() {
        return pos.toString() +" " + type;
    }
}


class Player {

    public static void main(String args[]) {

        Map<Position,Tiles> maps = new HashMap();

        Scanner in = new Scanner(System.in);
        int W = in.nextInt(); // number of columns.
        int H = in.nextInt(); // number of rows.
        if (in.hasNextLine()) {
            in.nextLine();
        }
        for (int y = 0; y < H; y++) {
            String LINE = in.nextLine(); // represents a line in the grid and contains W integers. Each integer represents one room of a given type.
            String[] tiles = LINE.split(" ");
            for (int x = 0; x < W; x++) {
                Position pos = new Position(x,y);
                maps.put(pos,new Tiles(pos,tiles[x]));
            }
        }
        int EX = in.nextInt(); // the coordinate along the X axis of the exit (not useful for this first mission, but must be read).





        // game loop
        while (true) {
            int XI = in.nextInt();
            int YI = in.nextInt();
            String POS = in.next();

            Position currentPos = new Position(XI,YI);
            Position nextPos= maps.get(currentPos).GetNextTiles(POS);

            System.out.println(nextPos.toString());
        }
    }
}