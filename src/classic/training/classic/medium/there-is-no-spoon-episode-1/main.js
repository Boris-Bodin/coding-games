/**
 * Don't let the machines win. You are humanity's last hope...
 **/

var width = parseInt(readline()); // the number of cells on the X axis
var height = parseInt(readline()); // the number of cells on the Y axis

printErr('width : ' + width);
printErr('height : ' + height);

var mat = new Array(height);
for (var i = 0; i < height; i++) {
	mat[i] = new Array(width);
}

for (var i = 0; i < height; i++) {
	var line = readline(); // width characters, each either 0 or .
	for(var j = 0; j < width; j++)
	{
		if(line[j] == '.')
			mat[i][j] = 0;
		else if(line[j] == '0')
			mat[i][j] = 1;
		printErr('i : ' + i + ' | j : ' + j + ' | val : ' + mat[i][j] );
	}
}

var str = ""

for (var i = 0; i < height; i++)
{
	for(var j = 0; j < width; j++)
	{
		if(mat[i][j])
		{
			// printErr('node i : ' + i);
			//    printErr('node j : ' + j);
			str += j + ' ' + i + ' ';

			for (var j2 = j+1; j2 <= width; j2++)
			{
				if(j2 == width)
				{
					str += '-1 -1 ';
					break;
				}
				if(mat[i][j2])
				{
					str += j2 + ' ' + i + ' ';
					break;
				}
			}

			for (var i2 = i+1; i2 <= height; i2++)
			{
				//   printErr('i2 : ' + i2);
				//     printErr('height : ' + height);
				if(i2 == height)
				{
					str += '-1 -1 ';
					break;
				}
				if(mat[i2][j])
				{
					str += j + ' ' + i2 + ' ';
					break;
				}
			}

			print(str);
			str="";
		}
	}
}


// Write an action using print()
// To debug: printErr('Debug messages...');