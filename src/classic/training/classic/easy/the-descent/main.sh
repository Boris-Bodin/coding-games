# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.


# game loop
while true; do
    m=()
    max=0
    imax=0
    for (( i=0; i<8; i++ )); do
        # mountainH: represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right.
        read mountainH
        if (( $mountainH > $max )); then
          max=$mountainH
          imax=$i
        fi
    done

    echo $imax
done