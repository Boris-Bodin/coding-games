// Read inputs from System.in, Write outputs to System.out.
// Your class name has to be Solution

import java.util.*;
import java.io.*;
import java.math.*;

class Solution {
    static Map<Integer,Integer> sommeEnCours = new HashMap<>();
	public static void main(String args[]) {
		Scanner in = new Scanner(System.in);
		int nbSalle = in.nextInt();
		String salle[][] = new String[nbSalle][4];

		for (int i = 0; i < nbSalle; i++) {
			salle[i][0] = in.next();
			salle[i][1] = in.next();
			salle[i][2] = in.next();
			salle[i][3] = in.next();
			//System.err.println("salle "+salle[i][0]+ " - "+salle[i][1]+ " - "+salle[i][2]+ " - "+salle[i][3]);
		}

		System.out.println(calculSommeArgent(salle, 0));

	}

	public static Integer calculSommeArgent(String salle[][], int numeroSalle){
	    Integer somme = sommeEnCours.get(numeroSalle);
		//System.err.println("salle : " + numeroSalle);
		if (somme != null)
			return somme;
	    //System.err.println("salle : " + numeroSalle);

		int somme1 =Integer.valueOf(salle[numeroSalle][1]);
		int somme2 =Integer.valueOf(salle[numeroSalle][1]);
	    if(!salle[numeroSalle][2].equalsIgnoreCase("E")){
	        somme1 += calculSommeArgent(salle, Integer.valueOf(salle[numeroSalle][2]));
	        //System.err.println("somme1 : " + somme1);
	    }
	    if(!salle[numeroSalle][3].equalsIgnoreCase("E")){
	        somme2 += calculSommeArgent(salle, Integer.valueOf(salle[numeroSalle][3]));
	        //System.err.println("somme2 : " + somme2);
	    }
	    somme = Math.max(somme1, somme2);
	    sommeEnCours.put(numeroSalle, somme);
	    return somme;
	}
}