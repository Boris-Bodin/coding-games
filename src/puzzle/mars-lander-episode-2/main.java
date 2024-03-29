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
        xMin += 200;
        xMax -= 200;
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

            String messageDiffX = diffPosX(xPos, xMin, xMax);
            String[] messageSplit = messageDiffX.split(";");
            String diffXMot = messageSplit[0];
            Integer diffX = Integer.valueOf(messageSplit[1]);

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

            if(diffXMot.equalsIgnoreCase("Max")){

               if (vHorizontale < 20 && vHorizontale >= 0){

                    if(fuelOk){
                            puissanceRes = 4;
                   }else{
                       puissanceRes = 0;
                   }
                   tetaRes = 20;
               }else if (vHorizontale < 0 && vHorizontale > -20){

                    if(fuelOk){
                            puissanceRes = 4;
                   }else{
                       puissanceRes = 0;
                   }
                   tetaRes = 20;
               }else{
                   if (Math.abs(vHorizontale) > 18 || Math.abs(vVerticale) > 38){
                        puissanceRes = 4;
                       tetaRes = teta(vHorizontale,diffXMot);
                   }else{
                       if(fuelOk){
                            puissanceRes = 3;
                       }else{
                           puissanceRes = 0;
                       }
                   }
               }
            }else if(diffXMot.equalsIgnoreCase("Min")){

               if (vHorizontale < 20 && vHorizontale >= 0){

                    if(fuelOk){
                            puissanceRes = 4;
                   }else{
                       puissanceRes = 0;
                   }
                   tetaRes = -20;
               }else if (vHorizontale < 0 && vHorizontale > -20){

                    if(fuelOk){
                            puissanceRes = 4;
                   }else{
                       puissanceRes = 0;
                   }
                   tetaRes = -20;
               }else{
                   if (Math.abs(vHorizontale) > 18 || Math.abs(vVerticale) > 38){
                        puissanceRes = 4;
                       tetaRes = teta(vHorizontale,diffXMot);
                   }else{
                       if(fuelOk){
                            puissanceRes = 3;
                       }else{
                           puissanceRes = 0;
                       }
                   }
               }
            }else if(diffXMot.equalsIgnoreCase("E")){
                tetaRes = 0;
               if (Math.abs(vHorizontale) > 18 || Math.abs(vVerticale) > 38){
                    puissanceRes = 4;
                    tetaRes = teta(vHorizontale,diffXMot);
               }else{
                   if(diffY > 100){
                       if(vHorizontale>0){
                           tetaRes = -vHorizontale;
                       }else if(vHorizontale < 0){
                           tetaRes = vHorizontale;
                       }
                   }
                  if(fuelOk){
                        puissanceRes = 3;
                   }else{
                       puissanceRes = 0;
                   }
               }
            }

            // Write action to standard output
            System.out.println(tetaRes + " " +puissanceRes);
        }
    }
    public static int teta(int vHorizontale,String diffXMot ){
        if (vHorizontale < -80){
            return -20;
       }else if (vHorizontale < -60){
            return -60;
       }else if (vHorizontale < -18){
            return -20;
       }else  if (vHorizontale > 70){
            return 20;
       }else  if (vHorizontale > 60){
            return 60;
       }else  if (vHorizontale > 18){
            return 20;
       }else{
           if(diffXMot.equalsIgnoreCase("E")){
               return 0;
           }else if(diffXMot.equalsIgnoreCase("Min")){
               return -20;
           }else if(diffXMot.equalsIgnoreCase("Max")){
               return 20;
           }
       }
       return 0;
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