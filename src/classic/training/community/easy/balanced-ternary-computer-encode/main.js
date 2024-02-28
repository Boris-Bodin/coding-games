
var digits = ['0','1','T']
var out = '';
var DEC = parseInt(readline());
var originDEC = DEC;
DEC = Math.abs(DEC)
while(DEC != 0){
	if(DEC%3 < 2){
		out = digits[DEC%3] + out
		DEC = (DEC -(DEC%3)) /3
	}
	else if(DEC%3 == 2){
		out = digits[DEC%3] + out
		DEC = (DEC+1) / 3
	}
}

printErr(out)
printErr(out.replace(/T/g,'2').replace(/1/g,'T').replace(/2/g,'1'))

if(out == '') print(0)
else {
	if(originDEC < 0)
		print(out.replace(/T/g,'2').replace(/1/g,'T').replace(/2/g,'1'));
	else
		print(out);
}