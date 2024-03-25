/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var N = parseInt(readline()); // the number of temperatures to analyse
var TEMPS = readline(); // the N temperatures expressed as integers ranging from -273 to 5526

// Write an action using print()
// To debug: printErr('Debug messages...');

if(N > 0)
{
	var tmp = TEMPS.split(" ");

	var max = 9999;

	for(var strt in tmp)
	{
		var t =parseInt(tmp[strt]);
		if( Math.abs(max) > Math.abs(t))
			max = t;
		else if ( Math.abs(max) == Math.abs(t) && max < t)
			max = t;
	}
	print(max);
}
else
	print(0);