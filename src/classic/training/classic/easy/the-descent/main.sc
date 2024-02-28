import math._
import scala.util._

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
object Player extends App {

    // game loop
    while(true) {
        var max = 0
        var imax = 0
        for(i <- 0 until 8) {
            val mountainh = readInt // represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right.
            if (mountainh > max) {
                max = mountainh
                imax = i
            }
        }
        
        println(imax)
    }
}