import java.util.*;
import java.io.*;
import java.math.*;

class Player {

    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);

        int n = in.nextInt();

        Integer x[] = new Integer[n];
        Integer y[] = new Integer[n];
        for(int i=0; i< n; i++){
            x[i] = in.nextInt();
            y[i] = in.nextInt();
        }

        int xMax = 0;
        int xMin = x[0];
        int yPlat = y[0];

        int xTemp =0;
        int yTemp = 0;

        for(int i=1; i< n; i++){
           xTemp =x[i];
           yTemp = y[i];
           if(yPlat == yTemp){
               xMax = xTemp;
               break;
           }else{
               xMin = xTemp;
               yPlat = yTemp;
           }
        }
        xMin += 100;
        xMax -= 100;
        //System.out.println("Xmin : " + xMin +" Xmax : " + xMax + " Y : " + yPlat);
        in.nextLine();

        double g = -3.711;
        int vHMax = 20;
        int vVMax = 40;

        while (true) {
            int xPos = in.nextInt();
            int yPos = in.nextInt();
            int vHorizontale = in.nextInt();
            int vVerticale = in.nextInt();
            int fuel = in.nextInt();
            int teta = in.nextInt();
            int puissance = in.nextInt();
            /*
            System.out.println("X : "+xPos+" Y : "+yPos+" HS : "+vHorizontale+" VS : "
                +vVerticale+" F : "+fuel+" R : "+teta+" P : "+puissance);
            */
            String messageDiffX = diffPosX(xPos, xMin, xMax);
            String[] messageSplit = messageDiffX.split(";");
            String diffXMot = messageSplit[0];
            Integer diffX = Integer.valueOf(messageSplit[1]);
            //System.out.println("diffXMot : "+diffXMot + " diffX : "+diffX);

            // Calcul distance restant
            int diffY = yPos - yPlat;
            // Calcul temps en seconde
            int tempsAtterissage = 0;
            if(vVerticale !=0 ){
                tempsAtterissage = diffY/(Math.abs(vVerticale));
            }
            // Fuel OK
            Boolean fuelOk = true;
            int fuelrestant = fuel - (tempsAtterissage*4);
            if(fuelrestant > 0){
                fuelOk = true;
            }else{
                fuelOk = false;
            }
            int tetaRes = 0;
            int puissanceRes = 0;
            if(diffX <= 0 &&  diffXMot.equalsIgnoreCase("Max")){
               tetaRes = 20;
               if (teta < 0){
                   puissanceRes = 4;
               }else{
                   puissanceRes = 3;
               }
            }else if(diffX <= 0 &&  diffXMot.equalsIgnoreCase("Min")){
                tetaRes = -20;
               if (teta > 0){
                   puissanceRes = 4;
               }else{
                   if(fuelOk){
                        puissanceRes = 3;
                   }else{
                       puissanceRes = 0;
                   }
               }
            }else if(diffXMot.equalsIgnoreCase("E")){
                tetaRes = 0;
               if (Math.abs(vHorizontale) > 18 || Math.abs(vVerticale) > 38){
                   puissanceRes = 4;
               }else{
                   puissanceRes = 3;
               }
            }

            // Write action to standard output
            System.out.println(tetaRes + " " +puissanceRes);
        }
    }

    public static String diffPosX(int xPos, int xMin, int xMax){
        if(xPos < xMax && xPos > xMin){
            return "E;"+(xMax-xPos);
        }else if(xPos >= xMax){
            return "Max;"+(xMax-xPos);
        }else if(xPos <= xMin){
            return "Min;"+(xPos-xMin);
        }
        return "Erreur;"+0;
    }
}