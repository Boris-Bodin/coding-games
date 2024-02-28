input = new Scanner(System.in);

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/


// game loop
while (true) {
    max = 0
    imax = 0

    for (i = 0; i < 8; i++) {
        mountainH = input.nextInt() // represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right.
        if (mountainH > max) {
            max = mountainH
            imax = i
        }
    }
    
    println(imax)
}