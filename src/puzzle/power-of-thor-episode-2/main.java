import java.util.*;
import java.io.*;
import java.math.*;

class Player {

    public static void main(String args[]) {
         Scanner in = new Scanner(System.in);

        int thorX = in.nextInt();
        int thorY = in.nextInt();

        int nbCoups;
        int nbGeant;

        while (true) {

            nbCoups = in.nextInt();
            nbGeant = in.nextInt();

            int[] geantX = new int[nbGeant];
            int[] geantY = new int[nbGeant];

            for(int i=0; i< nbGeant ; i++){
                geantX[i] = in.nextInt();
                geantY[i] = in.nextInt();
            }

            String choix = actionThor(geantX, geantY, thorX, thorY, nbCoups);

            switch(choix){
                case "N":   thorY -= 1;
                break;
                case "S":   thorY += 1;
                break;
                case "NE":   thorY -= 1;
                            thorX +=1 ;
                break;
                case "SE":   thorY += 1;
                            thorX +=1 ;
                break;
                case "NW":   thorY -= 1;
                            thorX -=1 ;
                break;
                case "SW":   thorY += 1;
                            thorX -=1 ;
                break;
                case "E":   thorX +=1 ;
                break;
                case "W":   thorX -=1 ;
                break;

            }

            // Write action to standard output
            System.out.println(choix );
        }
    }

    public static String actionThor(int[] geantX, int[] geantY,int thorX,int thorY, int nbCoups){
        String dir = "";
        int nbGeantPorte = 0;

        int nbGeant = geantX.length;

        int[] X = new int[nbGeant];
        int[] Y = new int[nbGeant];

        int[] indiceGeant = new int[nbGeant];

        if(nbGeant < nbCoups){
            for(int i =0; i<nbGeant; i++){
                X[i] = geantX[i] - thorX;
                Y[i] = geantY[i] - thorY;

                if((Math.abs(X[i]) >0 && Math.abs(X[i])<3) || (Math.abs(Y[i]) >0 && Math.abs(Y[i])<3)){
                    dir = "STRIKE";
                    break;
                }
            }
        }else{
            for(int i =0; i<nbGeant; i++){
                indiceGeant[0] = 0;
                X[i] = geantX[i] - thorX;
                Y[i] = geantY[i] - thorY;
                 if((Math.abs(X[i]) > 0 && Math.abs(X[i])<3) || (Math.abs(Y[i]) >0 && Math.abs(Y[i])<3)){
                    nbGeantPorte++;
                }else{
                    if(Math.abs(X[i]) >Math.abs(Y[i]) ){
                        indiceGeant[i] = X[i];
                    }else{
                        indiceGeant[i] = Y[i];
                    }
                }
            }
            int max = indiceGeant[0];
            int indice =0;
            if(nbGeantPorte<nbGeant){
                for(int i =1; i<nbGeant; i++){
                    if(indiceGeant[i]>max){
                        max = indiceGeant[i];
                        indice = i;
                    }
                }

                if(Y[indice]>0){
                    dir +="S";
                }else if(Y[indice]<0){
                    dir +="N";
                }
                if(X[indice]>0){
                    dir +="E";
                }else if(X[indice]<0){
                    dir +="W";
                }
            }else{
                dir = "STRIKE";
            }
        }
        for(int i =0; i<nbGeant; i++){
            int Xtmp = geantX[i] - thorX;
            int Ytmp = geantY[i] - thorY;
            if(dir=="S"){Ytmp++;}
            if(dir=="N"){Ytmp--;}
            if(dir=="E"){Xtmp++;}
            if(dir=="W"){Xtmp--;}

            if(dir=="SE"){Ytmp++;Xtmp++;}
            if(dir=="SW"){Ytmp++;Xtmp--;}
            if(dir=="NE"){Ytmp--;Xtmp++;}
            if(dir=="NW"){Ytmp--;Xtmp--;}
            if((Math.abs(Xtmp) >= 0 && Math.abs(Xtmp)<=1) && (Math.abs(Ytmp) >=0 && Math.abs(Ytmp)<=1)){
                dir = "STRIKE";
            }
        }

        if("".equalsIgnoreCase(dir)){
            dir = "WAIT";
        }
        //System.out.println(dir);
        return dir;
    }
}

