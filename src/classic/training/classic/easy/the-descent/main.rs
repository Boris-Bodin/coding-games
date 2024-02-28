use std::io;

macro_rules! parse_input {
    ($x:expr, $t:ident) => ($x.trim().parse::<$t>().unwrap())
}

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
fn main() {

    // game loop
    loop {
        let mut imax = 0;
        let mut max = 0;
        for i in 0..8 {
            let mut input_line = String::new();
            io::stdin().read_line(&mut input_line).unwrap();
            let mountain_h = parse_input!(input_line, i32); // represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right.
            
            if mountain_h > max {
                max = mountain_h;
                imax = i;
            }
        }
    
        println!("{}", imax);
    }
}