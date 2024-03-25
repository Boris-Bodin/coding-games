// Auto-generated code below aims at helping you parse
// the standard input according to the problem statement.
program Answer;
{$H+}
uses sysutils, classes, math;

// Helper to read a line and split tokens
procedure ParseIn(Inputs: TStrings) ;
var Line : string;
begin
    readln(Line);
    Inputs.Clear;
    Inputs.Delimiter := ' ';
    Inputs.DelimitedText := Line;
end;

var
    mountainH : Int32; // represents the height of one mountain, from 9 to 0. Mountain heights are provided from left to right.
    i : Int32;
    Inputs: TStringList;
    max : Int32;
    imax : Int32;
begin
    Inputs := TStringList.Create;

    // game loop
    while true do
    begin
        max := 0;
        imax := 0;
        for i := 0 to 7 do
        begin
            ParseIn(Inputs);
            mountainH := StrToInt(Inputs[0]);
            if mountainH > max then
            begin
                max := mountainH;
                imax := i;
            end;
        end;

        writeln(imax);
        
        flush(StdErr); flush(output); // DO NOT REMOVE
    end;
end.