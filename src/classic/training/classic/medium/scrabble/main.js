

function score(word){
	var res = 0;
	for(var i = 0;i < word.length ;i++){
		if(['e', 'a', 'i', 'o', 'n', 'r', 't', 'l', 's', 'u'].indexOf(word[i]) != -1) res += 1;
		else if(['d', 'g'].indexOf(word[i]) != -1) res += 2;
		else if(['b', 'c', 'm', 'p'].indexOf(word[i]) != -1) res += 3;
		else if(['f', 'h', 'v', 'w', 'y'].indexOf(word[i]) != -1) res += 4;
		else if(['k'].indexOf(word[i]) != -1) res += 5;
		else if(['j', 'x'].indexOf(word[i]) != -1) res += 8;
		else if(['q', 'z'].indexOf(word[i]) != -1) res += 10;
	}
	return res;
}

var dico = {}
var words = []

var N = parseInt(readline());
printErr("-----------");
for (var i = 0; i < N; i++) {
	var W = readline();
	dico[W] = score(W);
	words.push(W);
	printErr(W + " " + dico[W])
}
printErr("-----------");
var LETTERS = readline();
printErr(LETTERS)
printErr("-----------");

var sortedWords = words.sort((a,b) => dico[b] - dico[a])

var okWord = []
for(var word of sortedWords){
	if(okWord.length > 0 && dico[okWord[0]] != dico[word]) break;
	var tmp = word.split('');
	for(var i = 0;i < LETTERS.length && tmp.length > 0 ;i++){
		var index =tmp.indexOf(LETTERS[i]);
		if (index != -1){
			tmp.splice(index,1);
		}
	}
	if(tmp.length === 0){
		okWord.push(word);
		printErr(word + " " +dico[word])
	}
}
printErr("-----------");

for(var word of words){
	if(okWord.indexOf(word) != -1){
		print(word)
		break;
	}
}