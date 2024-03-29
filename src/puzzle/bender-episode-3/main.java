// Read inputs from System.in, Write outputs to System.out.
// Your class name has to be Solution

import java.util.*;
import java.io.*;
import java.math.*;

class Solution {

	public static void main(String args[]) {
		Scanner in = new Scanner(System.in);
		int n = in.nextInt();
		Integer rapport[];
		rapport = new Integer[n];
		Integer nbItems[];
		nbItems = new Integer[n];
		Integer temps[];
		temps = new Integer[n];
		Integer diff[];
		diff = new Integer[n];

		for (int i = 0; i < n; i++) {
			nbItems[i] = in.nextInt();
			temps[i] = in.nextInt();
			rapport[i]=temps[i]/nbItems[i];

			//System.out.println(rapport[i]);
		}

		int pente1 = (temps[n/2]-temps[1])/(nbItems[n/2]-nbItems[1]);
		int pente2 = (temps[n-1]-temps[n/2])/(nbItems[n-1]-nbItems[n/2]);

	    complexity(pente1, pente2);

	}
	public static void complexity(int pente1, int pente2){
	    if(pente1!=0 && pente2!=0){
		    int rapportPente = pente2/pente1;
		    int rapportPenteInv = pente1/pente2;
		    int diffPente = Math.abs(pente1 - pente2);
		    if(rapportPente > 50){
		        System.out.println("O(2^n)");
		    }else if(rapportPente ==1 && rapportPenteInv == 1){
		        System.out.println("O(n)");
		    }else if(rapportPenteInv > 2){
		        System.out.println("O(log n)");
		    }else if(rapportPente > 3){
		        System.out.println("O(n^3)");
		    }else if(rapportPente > 1 && diffPente > 1000){
		        System.out.println("O(n^2 log n)");
		    }else if(rapportPente > 1 && diffPente > 100){
		        System.out.println("O(n^2)");
		    }else if(rapportPente > 0 ){
		        System.out.println("O(n log n)");
		    }

		  }else{
		    System.out.println("O(1)");
		}
	}
}