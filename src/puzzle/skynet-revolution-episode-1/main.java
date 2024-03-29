import java.util.*;
import java.io.*;
import java.math.*;

class Player {

    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);

        int nbNoeud = in.nextInt();
        int nbLien = in.nextInt();
        int nbPasserelle = in.nextInt();

        List<Lien> liens = new ArrayList<>();
        List<Passerelle> passerelles = new ArrayList<>();


        for(int i=0; i<nbLien ; i++){
            int noeud1 = in.nextInt();
            int noeud2 = in.nextInt();
            Lien lien = new Lien(noeud1,noeud2);
            liens.add(lien);
            System.err.println("lien " + lien);
        }

        for(int i=0; i<nbPasserelle ; i++){
            int indexNoeud = in.nextInt();
            Passerelle passerelle = new Passerelle(indexNoeud);
            passerelles.add(passerelle);
            System.err.println("passerelle " + passerelle);
        }

        while (true) {
            // Read information from standard input
            int position = in.nextInt();
            System.err.println("position " + position);
            // Compute logic here
            String coupeLien = choixCoupe(liens,passerelles,position,nbNoeud);
            // System.err.println("Debug messages...");

            // Write action to standard output
            System.out.println(coupeLien);
        }
    }

    public static String choixCoupe(List<Lien> liens,List<Passerelle> passerelles , int position, int nbNoeud ){
        for(int i=0; i<liens.size(); i++){
            for(int j=0; j<passerelles.size(); j++){
                if((position == liens.get(i).getNoeud1() && liens.get(i).getNoeud2()==passerelles.get(j).getIndexNoeud())
                || (position == liens.get(i).getNoeud2() && liens.get(i).getNoeud1()==passerelles.get(j).getIndexNoeud())){
                    String retour = ""+liens.get(i);
                    liens.remove(i);
                    return retour;
                }
            }
        }
        for(int i=0; i<liens.size(); i++){
			if((position == liens.get(i).getNoeud1() || position == liens.get(i).getNoeud2())){
				String retour = ""+liens.get(i);
				liens.remove(i);
				return retour;
			}
        }
        return null;
    }
}

class Lien{
    private int noeud1;
    private int noeud2;

    Lien(int noeud1, int noeud2){
        this.noeud1 = noeud1;
        this.noeud2 = noeud2;
    }

    public int getNoeud1(){
        return noeud1;
    }
    public int getNoeud2(){
        return noeud2;
    }
    public String toString(){
        return noeud1+" "+noeud2;
    }
}

class Passerelle{
    private int indexNoeud;

    Passerelle(int indexNoeud){
        this.indexNoeud = indexNoeud;
    }
    public int getIndexNoeud(){
        return indexNoeud;
    }
    public String toString(){
        return ""+indexNoeud;
    }

}