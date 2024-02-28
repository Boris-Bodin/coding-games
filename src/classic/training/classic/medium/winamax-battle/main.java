import java.util.*;
import java.io.*;
import java.math.*;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
class Solution {

    public static Map<String,Integer> cards = new HashMap();

    public static int WhoWin(String p1, String p2){
        if(p1.substring(0,p1.length()-1).equals(p2.substring(0,p2.length()-1))){
            return 0;
        }
        return cards.get(p1.substring(0,p1.length()-1))
        > cards.get(p2.substring(0,p2.length()-1)) ? 1:2;
    }

    public static void main(String args[]) {

        cards.put("2",1);
        cards.put("3",2);
        cards.put("4",3);
        cards.put("5",4);
        cards.put("6",5);
        cards.put("7",6);
        cards.put("8",7);
        cards.put("9",8);
        cards.put("10",9);
        cards.put("J",10);
        cards.put("Q",11);
        cards.put("K",12);
        cards.put("A",13);

        ArrayDeque<String> deckp1 = new ArrayDeque();
        ArrayDeque<String> deckp2 = new ArrayDeque();


        Scanner in = new Scanner(System.in);
        int n = in.nextInt(); // the number of cards for player 1
        for (int i = 0; i < n; i++) {
            String cardp1 = in.next(); // the n cards of player 1
            deckp1.addLast(cardp1);
        }
        int m = in.nextInt(); // the number of cards for player 2
        for (int i = 0; i < m; i++) {
            String cardp2 = in.next(); // the m cards of player 2
            deckp2.addLast(cardp2);
        }
        int idManche = 0;
        ArrayDeque<String> defausep1 = new ArrayDeque();
        ArrayDeque<String> defausep2 = new ArrayDeque();

        while(deckp1.size() >0 && deckp2.size() >0){
            idManche++;
            //System.err.println("Debug : deckp1 :" + deckp1.size());
            //System.err.println("Debug : deckp2 :" + deckp2.size());
            String cardp1 = deckp1.pollFirst();
            defausep1.addLast(cardp1);
            String cardp2 = deckp2.pollFirst();
            defausep2.addLast(cardp2);
            int pw = WhoWin(cardp1,cardp2);

           // System.err.println("Debug : p1 : " + cardp1 + " p2 : " + cardp2 + " pw : " + pw);
            if(pw == 1){
                for(String card : defausep1)
                    deckp1.addLast(card);
                defausep1.clear();
                for(String card : defausep2)
                    deckp1.addLast(card);
                defausep2.clear();
            }
            else if(pw == 2){
                for(String card : defausep1)
                    deckp2.addLast(card);
                defausep1.clear();
                for(String card : defausep2)
                    deckp2.addLast(card);
                defausep2.clear();
            }
            else {
                if(deckp1.size() < 4){
                    System.out.println("PAT" );
                    return;
                }
                if(deckp2.size() < 4){
                    System.out.println("PAT" );
                    return;
                }
                defausep1.addLast(deckp1.pollFirst());
                defausep1.addLast(deckp1.pollFirst());
                defausep1.addLast(deckp1.pollFirst());
                defausep2.addLast(deckp2.pollFirst());
                defausep2.addLast(deckp2.pollFirst());
                defausep2.addLast(deckp2.pollFirst());
                idManche--;
            }
        }

        System.out.println((deckp1.size() >0 ? "1" : "2") + " " + idManche );
    }
}