(* Auto-generated code below aims at helping you parse *)
(* the standard input according to the problem statement. *)


(* game loop *)
while true do
    let max = ref 0 and imax = ref 0 in
    for i = 0 to 7 do
        let mountainh = int_of_string (input_line stdin) in (* represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right. *)
        if mountainh > !max then
        begin
            max := mountainh;
            imax := i;
        end;
        ();
    done;
    
    print_int !imax;
    print_endline "";
    ();
done;