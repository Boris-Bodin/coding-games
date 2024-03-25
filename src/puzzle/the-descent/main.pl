use strict;
use warnings;
#use diagnostics;
use 5.20.1;

select(STDOUT); $| = 1; # DO NOT REMOVE

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

my $tokens;


# game loop
while (1) {
    my ($max, $imax) = (0, 0);
    for my $i (0..7) {
        chomp(my $mountain_h = <STDIN>); # represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right.
        if ($mountain_h > $max) {
            $max = $mountain_h;
            $imax = $i;
        }
    }
    
    say $imax;
}