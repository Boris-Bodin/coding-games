/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var N = parseInt(readline());
var MESSAGE = readline();
printErr(N)
printErr(MESSAGE)

function encode(message){
	var out = '';
	var count = 1;

	while(message !== ''){
		if(count%2 === 0)
			out = message.slice(0,count) + out;
		else
			out = out + message.slice(0,count);
		message = message.substr(count)
		count++;
	}

	return out
}


function decode(message){
	var remain = 0

	var count = 1;
	var index = 0
	while((index + count) < message.length){
		index+= count
		count++;
	}
	remain = message.length - index;

	printErr(count)
	printErr(remain)

	var out = "";

	printErr(out + " | " + message);

	if(count%2 === 0) {
		out = message.slice(0,remain);
		message = message.substr(remain);
	}
	else {
		out = message.slice(-remain);
		message = message.substr(0,message.length - remain);
	}
	count--;
	printErr(out + " | " + message + " | " + count);

	while(count != 0){

		if(count%2 === 0) {
			out = message.slice(0,count) + out;
			message = message.substr(count);
		}
		else {
			out = message.slice(-count) + out;
			message = message.substr(0,message.length - count);
		}
		count--;

		printErr(out + " | " + message + " | " + count);
	}

	return out
}

var method = N < 0 ? encode : decode

for(var i = 0; i < Math.abs(N);i++){
	MESSAGE = method(MESSAGE);
}

print(MESSAGE);