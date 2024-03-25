STDOUT.sync = true # DO NOT REMOVE
# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

loop do
    max = 0
    imax = 0
    8.times do |i|
        mountain_h = gets.to_i # represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right.
        if mountain_h > max then
            max = mountain_h
            imax = i
        end
    end

    puts imax
end