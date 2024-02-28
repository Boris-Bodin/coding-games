import 'dart:io';
import 'dart:math';

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
void main() {
    List inputs;

    // game loop
    while (true) {
        var max = 0, imax = 0;
        for (int i = 0; i < 8; i++) {
            int mountainH = int.parse(stdin.readLineSync()); // represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right.
            if (mountainH > max) {
                max = mountainH;
                imax = i;
            }
        }
        
        print(imax);
    }
}