// Read inputs from System.in, Write outputs to System.out.
// Your class name has to be Solution

import java.util.*;
import java.io.*;
import java.math.*;

class Solution {

	public static void main(String args[]) {
		Scanner in = new Scanner(System.in);
		int n = in.nextInt();
		Integer tabJour[][];
		tabJour = new Integer[n][3];

		remplirTableau(in, tabJour,n);

	    trieTableauCroissant(tabJour);

		System.out.println(nombreScientifique( tabJour, n));

	}
	public static void remplirTableau(Scanner in, Integer tabJour[][],int n){
	    	for (int i = 0; i < n; i++) {
		   tabJour[i][0] = in.nextInt();
		   tabJour[i][1] = in.nextInt();
		   tabJour[i][2] = tabJour[i][1] + tabJour[i][0] - 1;
		}
	}

	public static void trieTableauCroissant(Integer tabJour[][]){
	    // trie le tableau en fonction des jours de fin de calcul
		Arrays.sort(tabJour, new java.util.Comparator<Integer[]>() {
		    @Override
            public int compare(Integer[] a, Integer[] b) {
                return Integer.compare(a[2], b[2]);
            }
        });
	}

	public static int nombreScientifique( Integer tabJour[][],int n){
	    int compteur = 0;
		int limitSup = -1;
		for (int i=0; i<n; i++){
		    // Teste si le premier jour d'utilisation n'est pas dans la limite d'utilisation
		    if(limitSup < tabJour[i][0]){
		        // ajout limite avec la fin d'utilisation du calculateur
		        limitSup = tabJour[i][2];
		        compteur++;
		    }
		}
		return compteur;
	}
}