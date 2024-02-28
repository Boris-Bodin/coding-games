(* Auto-generated code below aims at helping you parse *)
(* the standard input according to the problem statement. *)
open System


(* game loop *)
while true do
    let mutable max = 0
    let mutable imax = 0
    for i in 0 .. 8 - 1 do
        let mountainH = int(Console.In.ReadLine()) (* represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right. *)
        
        if mountainH > max then
            max <- mountainH
            imax <- i
            ()
        ()

    
    (* Write an action using printfn *)
    (* To debug: Console.Error.WriteLine("Debug message") *)
    
    printfn "%d" imax

    ()