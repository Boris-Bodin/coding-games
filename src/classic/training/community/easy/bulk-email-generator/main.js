var str = ''

var N = parseInt(readline());
nbchoice = 0;
for (var i = 0; i < N; i++) {
	str += readline() + '\r';
}

var out  = '';
var index = -1;
while(str && (index = str.indexOf('(')) != -1 && (indexClose = str.substr(index).indexOf(')')) != -1) {

	out += str.substr(0,index);

	clauses = str.substr(index+1,indexClose-1).split('|')
	out += clauses[ nbchoice% clauses.length]
	nbchoice++;

	str = str.substr(index + indexClose+1);
}
out += str;

out.split('\r').forEach(x => print(x))