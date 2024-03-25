package main

import "fmt"
//import "os"

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

func main() {
    for {
        var imax = 0;
        var max = 0;

        for i := 0; i < 8; i++ {
            // mountainH: represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right.
            var mountainH int
            fmt.Scan(&mountainH)
            if mountainH > max {
                max = mountainH
                imax = i
            }
        }

        fmt.Println(imax)
    }
}