/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/


// game loop
while true {    
    var imax = 0
    var max = 0
    for i in 0...7 {
        let mountainH = Int(readLine()!)! // represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right.
        
        if mountainH > max {
            max = mountainH
            imax = i
        }
    }
    print(imax)
}