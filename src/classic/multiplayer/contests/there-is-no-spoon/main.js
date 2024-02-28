/**
 * Don't let the machines win. You are humanity's last hope...
 **/

var width = parseInt(readline()); // the number of cells on the X axis
var height = parseInt(readline()); // the number of cells on the Y axis

printErr('width : ' + width);
printErr('height : ' + height);

var nodes = new Array(9);
for (var i = 0; i < 9; i++) {
	nodes[i] = 0;
}
var nodesInit = new Array(9);
for (var i = 0; i < 9; i++) {
	nodesInit[i] = 0;
}
var matInit = new Array(height);
for (var i = 0; i < height; i++) {
	matInit[i] = new Array(width);
}
var mat = new Array(height);
for (var i = 0; i < height; i++) {
	mat[i] = new Array(width);
}
var nbNode =0;
var nblink =0;
for (var i = 0; i < height; i++) {
	var line = readline(); // width characters, each either 0 or .
	for(var j = 0; j < width; j++)
	{
		if(line[j] == '.')
		{
			mat[i][j] = -1;
			matInit[i][j] = -1;
			nodes[0] += 1
			nodesInit[0] += 1
		}
		else
		{
			mat[i][j] = line[j];
			matInit[i][j] = line[j];
			nodes[line[j]] += 1
			nodesInit[line[j]] += 1
		}
		nbNode++;
	}
}

var links = new Array(nbNode*2);
for (var i = 0; i < nbNode*2; i++) {
	links[i] = ""
}


for (var i = 0; i < 8; i++) {
	printErr('nodes : ' + i + ' = ' + nodes[i] );
}

var str = "";
var change = 0;
while (nodes[0] < nbNode)
{
	printErr('start change : ' + change);
	change = 0
	for(var actu = 1; actu < 9; actu++)
	{
		printErr('actu : ' + actu + ' | nodes[actu] = ' + nodes[actu]);
		if(!nodesInit[actu])
			continue;
		for (var i = 0; i < height; i++)
		{
			for(var j = 0; j < width; j++)
			{

				printErr('matInit : ' + matInit[i][j] + ' | actu : ' + actu);
				if(matInit[i][j] == actu)
				{
					var j2;
					var i2;
					for (j2 = j+1; j2 <= width; j2++)
					{
						if(j2 == width)
							break;
						if(mat[i][j2] != -1)
							break;
					}
					for ( i2 = i+1; i2 <= height; i2++)
					{
						if(i2 == height)
							break;
						if(mat[i2][j] != -1)
							break;
					}

					if(i2 < height && j2 < width && mat[i2][j] != 0 && mat[i][j2] != 0)
					{
						switch(mat[i][j])
						{
							case '2':
							case 2:
								str ="" +  j + ' ' + i + ' ' + j2 + ' ' + i + ' ' + '1';
								str2 ="" +  j + ' ' + i + ' ' + j + ' ' + i2 + ' ' + '1';
								if(sended(str) || sended(str2))
									break;
								print( str);
								links[nblink] = str;
								nblink++;
								print( str2);
								links[nblink] = str2;
								nblink++;
								nodes[mat[i][j]] -= 1;
								nodes[mat[i2][j]] -= 1;
								nodes[mat[i][j2]] -= 1;
								mat[i][j] -= 2;
								mat[i2][j] -= 1;
								mat[i][j2] -= 1;
								nodes[mat[i][j]] += 1;
								nodes[mat[i2][j]] += 1;
								nodes[mat[i][j2]] += 1;
								change = 1;
								break;
							case '3':
							case 3:
								if(mat[i2][j] < mat[i][j2])
								{
									str ="" +  j + ' ' + i + ' ' + j2 + ' ' + i + ' ' + '2';
									str2 ="" +  j + ' ' + i + ' ' + j + ' ' + i2 + ' ' + '1';
									if(sended(str) || sended(str2))
										break;
									print( str);
									links[nblink] = str;
									nblink++;
									print( str2);
									links[nblink] = str2;
									nblink++;
									nodes[mat[i][j]] -= 1;
									nodes[mat[i2][j]] -= 1;
									nodes[mat[i][j2]] -= 1;
									mat[i][j] -= 3;
									mat[i2][j] -= 1;
									mat[i][j2] -= 2;
									nodes[mat[i][j]] += 1;
									nodes[mat[i2][j]] += 1;
									nodes[mat[i][j2]] += 1;
									change = 1;
								}
								else
								{
									str ="" +  j + ' ' + i + ' ' + j2 + ' ' + i + ' ' + '1';
									str2 ="" +  j + ' ' + i + ' ' + j + ' ' + i2 + ' ' + '2';
									if(sended(str) || sended(str2))
										break;
									print( str);
									links[nblink] = str;
									nblink++;
									print( str2);
									links[nblink] = str2;
									nblink++;
									nodes[mat[i][j]] -= 1;
									nodes[mat[i2][j]] -= 1;
									nodes[mat[i][j2]] -= 1;
									mat[i][j] -= 3;
									mat[i2][j] -= 2;
									mat[i][j2] -= 1;
									nodes[mat[i][j]] += 1;
									nodes[mat[i2][j]] += 1;
									nodes[mat[i][j2]] += 1;
									change = 1;
								}
								break;
							case '4':
							case 4:
							case '5':
							case 5:
							case '6':
							case 6:
							case '7':
							case 7:
							case '8':
							case 8:
								str ="" +  j + ' ' + i + ' ' + j2 + ' ' + i + ' ' + '2';
								str2 ="" +  j + ' ' + i + ' ' + j + ' ' + i2 + ' ' + '2';
								if(sended(str) || sended(str2))
									break;
								print( str);
								links[nblink] = str;
								nblink++;
								print( str2);
								links[nblink] = str2;
								nblink++;
								nodes[mat[i][j]] -= 1;
								nodes[mat[i2][j]] -= 1;
								nodes[mat[i][j2]] -= 1;
								mat[i][j] -= 4;
								mat[i2][j] -= 2;
								mat[i][j2] -= 2;
								nodes[mat[i][j]] += 1;
								nodes[mat[i2][j]] += 1;
								nodes[mat[i][j2]] += 1;
								change = 1;
								break;
						}
					}
					else if (i2 == height && j2 == width)
						;
					else
					{
						switch(mat[i][j])
						{
							case '1':
							case 1:
								if(i2 < height && mat[i2][j] !=0 && mat[i2][j] >= mat[i][j])
								{
									str ="" +  j + ' ' + i + ' ' + j + ' ' + i2 + ' ' + '1';
									if(sended(str))
										break;
									print( str);
									links[nblink] = str;
									nblink++;
									nodes[mat[i][j]] -= 1;
									nodes[mat[i2][j]] -= 1;
									mat[i][j] -= 1;
									mat[i2][j] -= 1;
									nodes[mat[i][j]] += 1;
									nodes[mat[i2][j]] += 1;
									change = 1;
								}
								else if (mat[i][j2] >= mat[i][j])
								{
									str ="" +  j + ' ' + i + ' ' + j2 + ' ' + i + ' ' + '1';
									if(sended(str))
										break;
									print( str);
									links[nblink] = str;
									nblink++;
									nodes[mat[i][j]] -= 1;
									nodes[mat[i][j2]] -= 1;
									mat[i][j] -= 1;
									mat[i][j2] -= 1;
									nodes[mat[i][j]] += 1;
									nodes[mat[i][j2]] += 1;
									change = 1;
								}
								break;
							case '2':
							case 2:
							case '3':
							case 3:
							case '4':
							case 4:
							case '5':
							case 5:
							case '6':
							case 6:
							case '7':
							case 7:
							case '8':
							case 8:
								if(i2 < height && mat[i2][j] !=0 && mat[i2][j] >= mat[i][j])
								{
									str ="" +  j + ' ' + i + ' ' + j + ' ' + i2 + ' ' + '2';
									if(sended(str))
										break;
									print( str);
									links[nblink] = str;
									nblink++;
									nodes[mat[i][j]] -= 1;
									nodes[mat[i2][j]] -= 1;
									mat[i][j] -= 2;
									mat[i2][j] -= 2;
									nodes[mat[i][j]] += 1;
									nodes[mat[i2][j]] += 1;
									change = 1;
								}
								else if (mat[i][j2] >= 2)
								{
									str ="" +  j + ' ' + i + ' ' + j2 + ' ' + i + ' ' + '2';
									if(sended(str))
										break;
									print( str);
									links[nblink] = str;
									nblink++;
									nodes[mat[i][j]] -= 1;
									nodes[mat[i][j2]] -= 1;
									mat[i][j] -= 2;
									mat[i][j2] -= 2;
									nodes[mat[i][j]] += 1;
									nodes[mat[i][j2]] += 1;
									change = 1;
								}
								else if (mat[i][j2] >= 1)
								{
									str ="" +  j + ' ' + i + ' ' + j2 + ' ' + i + ' ' + '1';
									if(sended(str))
										break;
									print( str);
									links[nblink] = str;
									nblink++;
									nodes[mat[i][j]] -= 1;
									nodes[mat[i][j2]] -= 1;
									mat[i][j] -= 1;
									mat[i][j2] -= 1;
									nodes[mat[i][j]] += 1;
									nodes[mat[i][j2]] += 1;
									change = 1;
								}
								break;
							default:
								break;
						}
					}
				}
				if(change)
					break;
			}
			if(change)
				break;
		}
		if(change)
			break;
	}
}


function sended(str){
	for (var i = 0; i < nbNode*2; i++) {
		if(links[i] == str)
			return 1;
		if(links[i] == "")
			return 0;
	}
}

// Write an action using print()
// To debug: printErr('Debug messages...');