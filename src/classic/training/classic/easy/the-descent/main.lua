-- Auto-generated code below aims at helping you parse
-- the standard input according to the problem statement.


-- game loop
while true do
    max = 0
    imax = 0
    for i=0,8-1 do
        mountainH = tonumber(io.read()) -- represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right.
        if mountainH > max then
            max = mountainH
            imax = i
        end
    end
    
    print(imax)
end